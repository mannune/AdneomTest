// Application de batch cooking : foyer, frigo, plan de la semaine.
// Données stockées localement dans le navigateur (localStorage).

const CLE_STOCKAGE = "batchcooking-v1";

const etat = {
  membres: [], // { id, nom, age, allergies: [] }
  frigo: [],   // noms d'ingrédients disponibles
};

// ---------- Utilitaires ----------

function normaliser(texte) {
  return String(texte)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function echapper(texte) {
  const div = document.createElement("div");
  div.textContent = String(texte);
  return div.innerHTML;
}

function nouvelId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formaterQuantite(n) {
  const arrondi = Math.round(n * 10) / 10;
  return Number.isInteger(arrondi) ? String(arrondi) : arrondi.toFixed(1).replace(".", ",");
}

// Un ingrédient de recette est considéré disponible si le frigo contient un nom proche.
function estDisponible(nomIngredient, frigo) {
  const cible = normaliser(nomIngredient);
  return frigo.some((f) => {
    const x = normaliser(f);
    return x.includes(cible) || cible.includes(x);
  });
}

// ---------- Persistance ----------

function sauvegarder() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
  } catch (e) {
    // Stockage indisponible (navigation privée, etc.) : l'app reste utilisable.
  }
}

function charger() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (!brut) return;
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees.membres)) etat.membres = donnees.membres;
    if (Array.isArray(donnees.frigo)) etat.frigo = donnees.frigo;
  } catch (e) {
    // Données corrompues : on repart de zéro.
  }
}

// ---------- Onglets ----------

function afficherOnglet(nom) {
  for (const btn of document.querySelectorAll("nav button")) {
    btn.classList.toggle("actif", btn.dataset.onglet === nom);
  }
  for (const id of ["foyer", "frigo", "plan"]) {
    document.getElementById("onglet-" + id).hidden = id !== nom;
  }
}

// ---------- Foyer ----------

function construireCasesAllergies() {
  const conteneur = document.getElementById("membre-allergies");
  conteneur.innerHTML = Object.entries(ALLERGENES)
    .map(([cle, libelle]) => `
      <label>
        <input type="checkbox" name="allergie" value="${cle}">
        ${echapper(libelle)}
      </label>`)
    .join("");
}

function afficherMembres() {
  const ul = document.getElementById("liste-membres");
  if (etat.membres.length === 0) {
    ul.innerHTML = '<li class="vide">Aucun membre pour le moment.</li>';
    return;
  }
  ul.innerHTML = etat.membres
    .map((m) => `
      <li>
        <div>
          <strong>${echapper(m.nom)}</strong> · ${echapper(GROUPES[m.age])}
          <div>${m.allergies.length
            ? m.allergies.map((a) => `<span class="badge">${echapper(ALLERGENES[a])}</span>`).join("")
            : '<span class="discret">Aucune intolérance</span>'}</div>
        </div>
        <button class="petit" data-supprimer-membre="${m.id}">Retirer</button>
      </li>`)
    .join("");
}

function ajouterMembre(evenement) {
  evenement.preventDefault();
  const nom = document.getElementById("membre-nom").value.trim();
  const age = document.getElementById("membre-age").value;
  const allergies = [...document.querySelectorAll('input[name="allergie"]:checked')].map((c) => c.value);
  if (!nom) return;

  etat.membres.push({ id: nouvelId(), nom, age, allergies });
  sauvegarder();
  afficherMembres();

  evenement.target.reset();
  document.getElementById("membre-age").value = "adulte";
  construireCasesAllergies();
}

function supprimerMembre(id) {
  etat.membres = etat.membres.filter((m) => m.id !== id);
  sauvegarder();
  afficherMembres();
}

// ---------- Frigo ----------

function afficherFrigo() {
  const ul = document.getElementById("liste-frigo");
  if (etat.frigo.length === 0) {
    ul.innerHTML = '<li class="vide">Le frigo est vide pour le moment.</li>';
  } else {
    ul.innerHTML = etat.frigo
      .map((nom, i) => `
        <li>
          <span>${echapper(nom)}</span>
          <button class="petit" data-supprimer-ingredient="${i}">Retirer</button>
        </li>`)
      .join("");
  }
  remplirSuggestions();
}

function remplirSuggestions() {
  const noms = new Set();
  for (const recette of RECETTES) {
    for (const ing of recette.ingredients) noms.add(ing.nom);
  }
  document.getElementById("suggestions").innerHTML =
    [...noms].sort().map((n) => `<option value="${echapper(n)}">`).join("");
}

function ajouterIngredient(evenement) {
  evenement.preventDefault();
  const champ = document.getElementById("ing-nom");
  const nom = champ.value.trim();
  if (!nom) return;
  if (!etat.frigo.some((f) => normaliser(f) === normaliser(nom))) {
    etat.frigo.push(nom);
    sauvegarder();
    afficherFrigo();
  }
  evenement.target.reset();
  champ.focus();
}

function supprimerIngredient(index) {
  etat.frigo.splice(index, 1);
  sauvegarder();
  afficherFrigo();
}

// ---------- Plan ----------

// Recettes compatibles avec les intolérances et les âges du foyer.
function recettesCompatibles() {
  const allergiesFoyer = new Set(etat.membres.flatMap((m) => m.allergies));
  const groupesFoyer = new Set(etat.membres.map((m) => m.age));

  return RECETTES.filter((r) => {
    if (r.allergenes.some((a) => allergiesFoyer.has(a))) return false;
    return [...groupesFoyer].every((g) => r.groupes.includes(g));
  });
}

// Pour chaque recette : ingrédients disponibles, manquants et score.
function analyserRecette(recette, frigo) {
  const disponibles = [];
  const manquants = [];
  for (const ing of recette.ingredients) {
    (estDisponible(ing.nom, frigo) ? disponibles : manquants).push(ing);
  }
  const score = disponibles.length / recette.ingredients.length;
  return { recette, disponibles, manquants, score };
}

function genererPlan() {
  const zone = document.getElementById("resultat-plan");

  if (etat.membres.length === 0) {
    zone.innerHTML = '<p class="alerte">Ajoutez d’abord les personnes du foyer (onglet 1).</p>';
    return;
  }

  const compatibles = recettesCompatibles();
  if (compatibles.length === 0) {
    zone.innerHTML = '<p class="alerte">Aucune recette ne convient à toutes les intolérances et tranches d’âge du foyer. Il faudra enrichir la base de recettes.</p>';
    return;
  }

  // Nombre de portions d'adulte équivalentes pour le foyer.
  const facteurFoyer = etat.membres.reduce((somme, m) => somme + FACTEUR_PORTION[m.age], 0);
  const nbSessions = Number(document.getElementById("nb-sessions").value);
  const repasCouverts = Number(document.getElementById("repas-couverts").value);

  // Tri : les recettes les mieux couvertes par le frigo d'abord.
  const analyses = compatibles
    .map((r) => analyserRecette(r, etat.frigo))
    .sort((a, b) => b.score - a.score || a.manquants.length - b.manquants.length);

  const choisies = analyses.slice(0, nbSessions);
  const liste = new Map(); // courses à faire

  const html = choisies.map((analyse) => {
    const r = analyse.recette;
    const portionsNecessaires = facteurFoyer * repasCouverts;
    const coefficient = portionsNecessaires / r.base;

    for (const ing of analyse.manquants) {
      const cle = normaliser(ing.nom);
      const existant = liste.get(cle);
      const qte = ing.qte * coefficient;
      if (existant && existant.unite === ing.unite) {
        existant.qte += qte;
      } else if (!existant) {
        liste.set(cle, { nom: ing.nom, qte, unite: ing.unite });
      }
    }

    const lignes = r.ingredients.map((ing) => {
      const dispo = estDisponible(ing.nom, etat.frigo);
      const qte = formaterQuantite(ing.qte * coefficient);
      return `<li class="${dispo ? "ok" : ""}">${dispo ? "✓" : "○"} ${echapper(qte)} ${echapper(ing.unite)} ${echapper(ing.nom)}${dispo ? "" : " <em>(à acheter)</em>"}</li>`;
    }).join("");

    const etapes = r.etapes.map((e) => `<li>${echapper(e)}</li>`).join("");
    const notes = [];
    if (r.congelable) notes.push("Congelable : portionner et congeler dès refroidissement.");
    if (etat.membres.some((m) => m.age === "bebe")) {
      notes.push("Bébé dans le foyer : prélever sa portion avant l'assaisonnement et la mixer si besoin.");
    }

    return `
      <div class="recette">
        <h3>${echapper(r.nom)}</h3>
        <div class="discret">Pour ${formaterQuantite(portionsNecessaires)} portions · couvre ${repasCouverts} repas · ${formaterQuantite(analyse.score * 100)} % des ingrédients déjà au frigo</div>
        <ul class="ingredients">${lignes}</ul>
        <ol>${etapes}</ol>
        ${notes.map((n) => `<p class="discret">${echapper(n)}</p>`).join("")}
      </div>`;
  }).join("");

  const courses = [...liste.values()]
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"))
    .map((i) => `<li><span>${echapper(formaterQuantite(i.qte))} ${echapper(i.unite)} ${echapper(i.nom)}</span></li>`)
    .join("");

  const exclues = RECETTES.length - compatibles.length;

  zone.innerHTML = `
    <div class="recette">
      <h2>Recettes de la semaine</h2>
      <p class="discret">Foyer : ${etat.membres.length} personne(s), équivalent ${formaterQuantite(facteurFoyer)} adulte(s). ${exclues > 0 ? exclues + " recette(s) écartée(s) à cause des intolérances ou des âges." : ""}</p>
      ${html}
    </div>
    <div class="recette">
      <h2>Liste de courses</h2>
      ${courses ? `<ul class="liste">${courses}</ul>` : '<p class="ok">Rien à acheter : le frigo couvre tout le plan.</p>'}
    </div>`;
}

// ---------- Initialisation ----------

function init() {
  charger();
  construireCasesAllergies();
  afficherMembres();
  afficherFrigo();

  for (const btn of document.querySelectorAll("nav button")) {
    btn.addEventListener("click", () => afficherOnglet(btn.dataset.onglet));
  }
  document.getElementById("form-membre").addEventListener("submit", ajouterMembre);
  document.getElementById("form-ingredient").addEventListener("submit", ajouterIngredient);
  document.getElementById("btn-generer").addEventListener("click", genererPlan);

  document.getElementById("liste-membres").addEventListener("click", (e) => {
    const id = e.target.dataset.supprimerMembre;
    if (id) supprimerMembre(id);
  });
  document.getElementById("liste-frigo").addEventListener("click", (e) => {
    const index = e.target.dataset.supprimerIngredient;
    if (index !== undefined) supprimerIngredient(Number(index));
  });
}

document.addEventListener("DOMContentLoaded", init);
