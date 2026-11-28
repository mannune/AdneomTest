// Tests de la logique de l'app (sans navigateur). Lancer : node --test tests/
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const dossier = path.join(__dirname, "..", "batchcooking");
const contexte = vm.createContext({});
for (const f of ["recipes.js", "app.js"]) {
  vm.runInContext(fs.readFileSync(path.join(dossier, f), "utf8"), contexte, { filename: f });
}
const L = vm.runInContext(
  "({ RECETTES, ALLERGENES, GROUPES, recettesCompatibles, formaterQuantite, estDisponible, analyserRecette })",
  contexte
);

const membre = (age, allergies = []) => ({ id: age, nom: age, age, allergies });

test("la base contient 40 recettes aux identifiants uniques", () => {
  assert.strictEqual(L.RECETTES.length, 40);
  assert.strictEqual(new Set(L.RECETTES.map((r) => r.id)).size, 40);
});

test("chaque recette est complète et cohérente", () => {
  for (const r of L.RECETTES) {
    assert.ok(r.nom && r.base > 0, r.id);
    assert.ok(r.ingredients.length > 0 && r.etapes.length > 0, r.id);
    assert.ok(r.groupes.length > 0 && r.groupes.every((g) => g in L.GROUPES), r.id);
    assert.ok(r.allergenes.every((a) => a in L.ALLERGENES), `${r.id} : allergène inconnu`);
    assert.ok(r.prep > 0 && r.cuisson >= 0, r.id);
    assert.strictEqual(typeof r.vegetarien, "boolean", r.id);
    assert.strictEqual(typeof r.four, "boolean", r.id);
    assert.ok(r.conservation.frigo > 0, r.id);
    assert.strictEqual(r.conservation.congel > 0, r.congelable, `${r.id} : congélation incohérente`);
    for (const i of r.ingredients) assert.ok(i.nom && i.qte > 0 && i.unite, `${r.id} : ingrédient invalide`);
  }
});

test("les recettes végétariennes n'ont ni viande ni poisson", () => {
  const interdits = /poulet|boeuf|dinde|saumon|cabillaud|thon|crevette|jambon/i;
  for (const r of L.RECETTES.filter((r) => r.vegetarien)) {
    for (const i of r.ingredients) assert.ok(!interdits.test(i.nom), `${r.id} contient ${i.nom}`);
  }
  for (const r of L.RECETTES.filter((r) => !r.vegetarien)) {
    assert.ok(r.ingredients.some((i) => interdits.test(i.nom)), `${r.id} marquée non végétarienne sans viande`);
  }
});

test("aucune recette contenant un allergène n'est proposée à un foyer concerné", () => {
  for (const allergene of Object.keys(L.ALLERGENES)) {
    const res = L.recettesCompatibles([membre("adulte", [allergene])], { type: "tout" });
    for (const r of res) assert.ok(!r.allergenes.includes(allergene), `${r.id} contient ${allergene}`);
  }
});

test("les allergènes évidents sont bien déclarés", () => {
  const exige = [
    [/pâtes|semoule|boulgour|farine|chapelure|nouilles|lasagne|avoine|pâte brisée/i, "gluten"],
    [/lait(?! de coco)|crème|fromage|feta|beurre/i, "lactose"],
    [/oeufs/i, "oeufs"],
    [/saumon|cabillaud|thon/i, "poisson"],
    [/crevette/i, "crustaces"],
    [/soja|tofu/i, "soja"],
    [/sésame/i, "sesame"],
    [/amande|noix(?! de coco)|noisette/i, "fruits_a_coque"],
    [/céleri/i, "celeri"],
  ];
  for (const r of L.RECETTES) {
    for (const i of r.ingredients) {
      for (const [motif, allergene] of exige) {
        if (motif.test(i.nom)) assert.ok(r.allergenes.includes(allergene), `${r.id} : "${i.nom}" exige ${allergene}`);
      }
    }
  }
});

test("un bébé n'a que des recettes adaptées", () => {
  for (const r of L.recettesCompatibles([membre("bebe")], { type: "tout" })) {
    assert.ok(r.groupes.includes("bebe"), r.id);
  }
});

test("le filtre végétarien, sans four et temps max fonctionnent", () => {
  const foyer = [membre("adulte")];
  assert.ok(L.recettesCompatibles(foyer, { vegetarien: true }).every((r) => r.vegetarien));
  assert.ok(L.recettesCompatibles(foyer, { sansFour: true }).every((r) => !r.four));
  assert.ok(L.recettesCompatibles(foyer, { tempsMax: 30 }).every((r) => r.prep + r.cuisson <= 30));
});

test("le type par défaut exclut petit-déjeuner et goûter", () => {
  const types = new Set(L.recettesCompatibles([membre("adulte")]).map((r) => r.type || "repas"));
  assert.deepStrictEqual([...types], ["repas"]);
  assert.ok(L.recettesCompatibles([membre("adulte")], { type: "gouter" }).length > 0);
});

test("chaque combinaison d'une seule allergie laisse au moins 3 recettes", () => {
  for (const allergene of Object.keys(L.ALLERGENES)) {
    for (const age of ["bebe", "enfant", "adulte"]) {
      const n = L.recettesCompatibles([membre(age, [allergene])]).length;
      assert.ok(n >= 3, `${age} + ${allergene} : seulement ${n} recettes`);
    }
  }
});

test("arrondi des quantités comptables et disponibilité dans le frigo", () => {
  assert.strictEqual(L.formaterQuantite(0.2, "pièce"), "1");
  assert.strictEqual(L.formaterQuantite(2.6, "gousses"), "3");
  assert.strictEqual(L.formaterQuantite(1.25, "kg"), "1,3");
  assert.ok(L.estDisponible("pommes de terre", ["Pommes de terre"]));
  assert.ok(L.estDisponible("oignon", ["oignons"]));
});
