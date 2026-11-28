// Base de recettes de batch cooking.
// base : nombre de portions pour adulte produites par la recette de référence.
// allergenes : clés utilisées pour filtrer selon les intolérances du foyer.
//   Ils sont déclarés de façon prudente : en cas de doute (pâtes, bouillon, sauce soja...),
//   l'allergène est listé. Toujours vérifier les étiquettes des produits achetés.
// groupes : tranches d'âge pour lesquelles la recette convient.
//   'bebe' (0-3 ans), 'enfant' (3-12 ans), 'ado' (13-17 ans), 'adulte' (18+)
// cuisine : clé de CUISINES (france, tunisie, italie, moyen-orient). Absente = "monde".
// note : conseil affiché avec la recette (piment, version sans vin...).
// type : "repas" par défaut ; "petit-dej" ou "gouter" pour les autres.
// vegetarien : true si la recette ne contient ni viande ni poisson.
// four : true si la recette nécessite un four.
// prep / cuisson : durées en minutes.
// congelable : peut-on congeler la recette cuite.
// conservation : { frigo: jours au réfrigérateur, congel: mois au congélateur (0 si non congelable) }.
//   Valeurs indicatives pour un plat cuit, refroidi vite et conservé à 4 °C maximum.
// ingredients : { nom, qte, unite } pour la recette de référence (base portions).
//   Unités comptables : "pièce(s)", "boîte(s)", "gousse(s)" (arrondies à l'entier).

const ALLERGENES = {
  gluten: "Gluten (blé, orge, seigle, avoine)",
  lactose: "Lait et produits laitiers",
  oeufs: "Œufs",
  arachides: "Arachides",
  fruits_a_coque: "Fruits à coque",
  soja: "Soja",
  poisson: "Poisson",
  crustaces: "Crustacés et mollusques",
  sesame: "Sésame",
  celeri: "Céleri",
};

// Cuisines proposées en filtre. Les recettes sans cuisine sont rangées dans "monde".
const CUISINES = {
  france: "France",
  tunisie: "Tunisie",
  italie: "Italie",
  "moyen-orient": "Moyen-Orient",
  monde: "Autres cuisines",
};

const GROUPES = {
  bebe: "Bébé (0-3 ans)",
  enfant: "Enfant (3-12 ans)",
  ado: "Ado (13-17 ans)",
  adulte: "Adulte (18+)",
};

// Coefficient de portion par tranche d'âge (1 = adulte).
const FACTEUR_PORTION = { bebe: 0.4, enfant: 0.7, ado: 1, adulte: 1 };

const TOUS_GROUPES = ["bebe", "enfant", "ado", "adulte"];

const I = (nom, qte, unite) => ({ nom, qte, unite });
const TOUS = ["bebe", "enfant", "ado", "adulte"];
const GRANDS = ["enfant", "ado", "adulte"];

const RECETTES = [
  // ---------- Plats complets ----------
  {
    id: "chili-sin-carne",
    nom: "Chili sin carne aux haricots rouges",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: true, four: false,
    prep: 15, cuisson: 30, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("haricots rouges en conserve", 2, "boîtes"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 2, "pièces"), I("ail", 2, "gousses"), I("poivron", 1, "pièce"),
      I("maïs", 1, "boîte"), I("cumin", 1, "c. à café"), I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Faire revenir l'oignon, l'ail et le poivron dans l'huile.",
      "Ajouter les épices, les tomates et les haricots égouttés.",
      "Laisser mijoter 25 minutes, ajouter le maïs.",
    ],
  },
  {
    id: "gratin-courgettes-pates",
    nom: "Gratin de courgettes et pâtes",
    base: 6, allergenes: ["gluten", "lactose", "oeufs"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 20, cuisson: 30, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("pâtes", 500, "g"), I("courgette", 3, "pièces"), I("oignon", 1, "pièce"),
      I("oeufs", 2, "pièces"), I("crème fraîche", 20, "cl"), I("fromage râpé", 100, "g"),
    ],
    etapes: [
      "Cuire les pâtes al dente.",
      "Faire revenir courgettes et oignon émincés.",
      "Mélanger le tout avec les œufs battus et la crème, garnir de fromage, gratiner 20 minutes à 180 °C.",
    ],
  },
  {
    id: "riz-poulet-legumes",
    nom: "Riz au poulet et légumes",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: false, four: false,
    prep: 15, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("riz", 300, "g"), I("blanc de poulet", 500, "g"), I("carotte", 3, "pièces"),
      I("courgette", 2, "pièces"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Cuire le riz.",
      "Cuire le poulet coupé en morceaux à la poêle avec un filet d'huile.",
      "Cuire les légumes à la vapeur, mixer ou écraser pour les plus petits.",
    ],
  },
  {
    id: "lentilles-corail",
    nom: "Dahl de lentilles corail",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 25, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("lentilles corail", 300, "g"), I("tomates concassées", 1, "boîte"), I("oignon", 1, "pièce"),
      I("carotte", 2, "pièces"), I("lait de coco", 20, "cl"), I("curcuma", 1, "c. à café"),
    ],
    etapes: [
      "Faire revenir oignon et carotte émincés.",
      "Ajouter lentilles, tomates, curcuma et 60 cl d'eau, cuire 20 minutes.",
      "Ajouter le lait de coco en fin de cuisson.",
    ],
  },
  {
    id: "saumon-four-legumes",
    nom: "Saumon au four et légumes rôtis",
    base: 4, allergenes: ["poisson"], groupes: GRANDS, vegetarien: false, four: true,
    prep: 15, cuisson: 37, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("pavé de saumon", 4, "pièces"), I("pommes de terre", 800, "g"), I("courgette", 2, "pièces"),
      I("huile d'olive", 2, "c. à soupe"), I("citron", 1, "pièce"),
    ],
    etapes: [
      "Couper les légumes, les arroser d'huile et les rôtir 25 minutes à 200 °C.",
      "Ajouter le saumon citronné et poursuivre 12 minutes.",
    ],
  },
  {
    id: "omelette-four-legumes",
    nom: "Frittata aux légumes",
    base: 4, allergenes: ["oeufs", "lactose"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 10, cuisson: 20, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("oeufs", 8, "pièces"), I("poivron", 1, "pièce"), I("épinards", 200, "g"),
      I("oignon", 1, "pièce"), I("fromage râpé", 60, "g"),
    ],
    etapes: [
      "Faire revenir oignon, poivron et épinards.",
      "Battre les œufs avec le fromage, verser sur les légumes et cuire à couvert 10 minutes.",
    ],
  },
  {
    id: "bolognaise-lentilles",
    cuisine: "italie",
    nom: "Bolognaise de lentilles vertes et pâtes",
    base: 6, allergenes: ["gluten"], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 35, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("pâtes", 500, "g"), I("lentilles vertes", 250, "g"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 1, "pièce"), I("carotte", 2, "pièces"), I("ail", 2, "gousses"),
      I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Cuire les lentilles 20 minutes dans l'eau, égoutter.",
      "Faire revenir oignon, carotte râpée et ail, ajouter tomates et lentilles, mijoter 15 minutes.",
      "Cuire les pâtes et les servir avec la sauce. Mixer légèrement la sauce pour les petits.",
    ],
  },
  {
    id: "bolognaise-boeuf",
    cuisine: "italie",
    nom: "Bolognaise de bœuf et pâtes",
    base: 6, allergenes: ["gluten"], groupes: TOUS, vegetarien: false, four: false,
    prep: 15, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("pâtes", 500, "g"), I("boeuf haché", 500, "g"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 1, "pièce"), I("carotte", 2, "pièces"), I("ail", 2, "gousses"),
      I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Faire revenir oignon, carotte râpée et ail, ajouter le bœuf et bien le cuire.",
      "Ajouter les tomates, mijoter 30 minutes.",
      "Cuire les pâtes, servir avec la sauce.",
    ],
  },
  {
    id: "poulet-curry-coco",
    nom: "Poulet curry coco et riz",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: false, four: false,
    prep: 15, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("riz", 300, "g"), I("blanc de poulet", 600, "g"), I("lait de coco", 40, "cl"),
      I("oignon", 1, "pièce"), I("curry doux", 2, "c. à café"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Dorer le poulet en morceaux avec l'oignon émincé.",
      "Ajouter le curry puis le lait de coco, mijoter 15 minutes.",
      "Servir sur le riz cuit.",
    ],
  },
  {
    id: "blanquette-dinde",
    cuisine: "france",
    nom: "Blanquette de dinde et carottes",
    base: 6, allergenes: ["gluten", "lactose"], groupes: TOUS, vegetarien: false, four: false,
    prep: 20, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("escalope de dinde", 600, "g"), I("carotte", 4, "pièces"), I("champignons", 250, "g"),
      I("oignon", 1, "pièce"), I("farine", 30, "g"), I("crème fraîche", 20, "cl"),
      I("beurre", 30, "g"),
    ],
    etapes: [
      "Faire revenir la dinde coupée en cubes dans le beurre avec l'oignon.",
      "Ajouter la farine, 50 cl d'eau, les carottes et les champignons, cuire 30 minutes.",
      "Hors du feu, ajouter la crème fraîche.",
    ],
  },
  {
    id: "gratin-pdt-poireaux",
    cuisine: "france",
    nom: "Gratin de pommes de terre et poireaux",
    base: 6, allergenes: ["lactose"], groupes: TOUS, vegetarien: true, four: true,
    prep: 20, cuisson: 45, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("pommes de terre", 1, "kg"), I("poireau", 3, "pièces"), I("crème fraîche", 20, "cl"),
      I("fromage râpé", 100, "g"), I("ail", 1, "gousse"),
    ],
    etapes: [
      "Éplucher et trancher finement pommes de terre et poireaux.",
      "Les disposer en couches dans un plat avec la crème et l'ail.",
      "Couvrir de fromage et cuire 45 minutes à 180 °C.",
    ],
  },
  {
    id: "hachis-parmentier",
    cuisine: "france",
    nom: "Hachis parmentier",
    base: 6, allergenes: ["lactose"], groupes: TOUS, vegetarien: false, four: true,
    prep: 25, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("boeuf haché", 500, "g"), I("pommes de terre", 1.2, "kg"), I("oignon", 1, "pièce"),
      I("carotte", 2, "pièces"), I("lait", 20, "cl"), I("beurre", 40, "g"),
    ],
    etapes: [
      "Cuire les pommes de terre, les écraser avec le lait et le beurre.",
      "Faire revenir oignon, carotte râpée et bœuf.",
      "Étaler la viande dans un plat, couvrir de purée et gratiner 25 minutes à 190 °C.",
    ],
  },
  {
    id: "curry-pois-chiches",
    nom: "Curry de pois chiches et épinards",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: true, four: false,
    prep: 10, cuisson: 25, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("pois chiches en conserve", 3, "boîtes"), I("épinards", 300, "g"), I("tomates concassées", 1, "boîte"),
      I("lait de coco", 20, "cl"), I("oignon", 1, "pièce"), I("curry doux", 2, "c. à café"),
    ],
    etapes: [
      "Faire revenir l'oignon et le curry.",
      "Ajouter pois chiches égouttés, tomates et lait de coco, mijoter 15 minutes.",
      "Ajouter les épinards en fin de cuisson.",
    ],
  },
  {
    id: "curry-patate-douce",
    nom: "Curry doux de patate douce",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 25, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("patate douce", 1, "kg"), I("lait de coco", 40, "cl"), I("oignon", 1, "pièce"),
      I("lentilles corail", 100, "g"), I("curry doux", 1, "c. à café"),
    ],
    etapes: [
      "Faire revenir l'oignon, ajouter les patates douces en dés et le curry.",
      "Verser le lait de coco, 20 cl d'eau et les lentilles, cuire 25 minutes.",
      "Écraser grossièrement pour les petits.",
    ],
  },
  {
    id: "tajine-poulet",
    nom: "Tajine de poulet aux légumes et semoule",
    base: 6, allergenes: ["gluten"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 20, cuisson: 45, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("cuisses de poulet", 6, "pièces"), I("carotte", 4, "pièces"), I("courgette", 2, "pièces"),
      I("oignon", 2, "pièces"), I("semoule", 300, "g"), I("ras el hanout", 2, "c. à café"),
    ],
    etapes: [
      "Dorer le poulet avec les oignons et les épices.",
      "Ajouter les légumes, couvrir d'eau à mi-hauteur, mijoter 40 minutes à couvert.",
      "Préparer la semoule et servir.",
    ],
  },
  {
    id: "couscous-legumes",
    cuisine: "tunisie",
    nom: "Couscous aux légumes et pois chiches",
    base: 6, allergenes: ["gluten"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 20, cuisson: 35, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("semoule", 400, "g"), I("pois chiches en conserve", 2, "boîtes"), I("carotte", 3, "pièces"),
      I("courgette", 2, "pièces"), I("navet", 2, "pièces"), I("tomates concassées", 1, "boîte"),
      I("ras el hanout", 2, "c. à café"),
    ],
    etapes: [
      "Cuire les légumes en morceaux dans un bouillon d'eau et de tomates épicé, 30 minutes.",
      "Ajouter les pois chiches en fin de cuisson.",
      "Préparer la semoule et servir avec les légumes.",
    ],
  },
  {
    id: "boulettes-sauce-tomate",
    nom: "Boulettes de bœuf, sauce tomate et riz",
    base: 6, allergenes: ["gluten", "oeufs"], groupes: TOUS, vegetarien: false, four: false,
    prep: 25, cuisson: 30, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("boeuf haché", 500, "g"), I("oeufs", 1, "pièce"), I("chapelure", 50, "g"),
      I("tomates concassées", 2, "boîtes"), I("oignon", 1, "pièce"), I("riz", 300, "g"),
    ],
    etapes: [
      "Mélanger bœuf, œuf et chapelure, former des boulettes.",
      "Les dorer à la poêle, ajouter oignon et tomates, mijoter 20 minutes.",
      "Servir avec le riz cuit.",
    ],
  },
  {
    id: "riz-cantonais",
    nom: "Riz cantonais au poulet",
    base: 4, allergenes: ["oeufs", "soja", "gluten"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 15, cuisson: 15, congelable: true, conservation: { frigo: 2, congel: 2 },
    ingredients: [
      I("riz", 250, "g"), I("blanc de poulet", 300, "g"), I("oeufs", 3, "pièces"),
      I("petits pois", 150, "g"), I("carotte", 1, "pièce"), I("sauce soja", 3, "c. à soupe"),
    ],
    etapes: [
      "Cuire le riz la veille ou le laisser refroidir.",
      "Faire sauter le poulet, les petits pois et la carotte en dés.",
      "Ajouter le riz, la sauce soja et les œufs brouillés, mélanger à feu vif.",
    ],
  },
  {
    id: "wok-nouilles-tofu",
    nom: "Wok de nouilles, légumes et tofu",
    base: 4, allergenes: ["gluten", "soja", "sesame"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 20, cuisson: 15, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("nouilles", 250, "g"), I("tofu ferme", 250, "g"), I("carotte", 2, "pièces"),
      I("poivron", 1, "pièce"), I("sauce soja", 3, "c. à soupe"), I("huile de sésame", 1, "c. à soupe"),
    ],
    etapes: [
      "Cuire les nouilles, égoutter.",
      "Faire dorer le tofu en cubes, ajouter les légumes en lamelles.",
      "Ajouter nouilles, sauce soja et huile de sésame, mélanger 2 minutes.",
    ],
  },
  {
    id: "quiche-legumes",
    cuisine: "france",
    nom: "Quiche aux légumes et fromage",
    base: 6, allergenes: ["gluten", "lactose", "oeufs"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 20, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("pâte brisée", 1, "pièce"), I("courgette", 2, "pièces"), I("poireau", 1, "pièce"),
      I("oeufs", 3, "pièces"), I("crème fraîche", 20, "cl"), I("fromage râpé", 100, "g"),
    ],
    etapes: [
      "Faire revenir courgettes et poireau émincés.",
      "Étaler la pâte, garnir de légumes, verser œufs battus et crème, parsemer de fromage.",
      "Cuire 35 à 40 minutes à 180 °C.",
    ],
  },
  {
    id: "lasagnes-legumes",
    cuisine: "italie",
    nom: "Lasagnes aux légumes",
    base: 6, allergenes: ["gluten", "lactose", "oeufs"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 30, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("feuilles de lasagne", 250, "g"), I("courgette", 3, "pièces"), I("carotte", 2, "pièces"),
      I("tomates concassées", 2, "boîtes"), I("lait", 50, "cl"), I("farine", 40, "g"),
      I("beurre", 40, "g"), I("fromage râpé", 100, "g"),
    ],
    etapes: [
      "Faire cuire les légumes en dés avec les tomates 15 minutes.",
      "Préparer la béchamel : beurre, farine, puis lait chaud en fouettant.",
      "Monter en couches pâtes, légumes, béchamel, finir au fromage. Cuire 35 minutes à 190 °C.",
    ],
  },
  {
    id: "lasagnes-boeuf",
    cuisine: "italie",
    nom: "Lasagnes au bœuf",
    base: 6, allergenes: ["gluten", "lactose", "oeufs"], groupes: GRANDS, vegetarien: false, four: true,
    prep: 30, cuisson: 45, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("feuilles de lasagne", 250, "g"), I("boeuf haché", 500, "g"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 1, "pièce"), I("lait", 50, "cl"), I("farine", 40, "g"),
      I("beurre", 40, "g"), I("fromage râpé", 100, "g"),
    ],
    etapes: [
      "Préparer la sauce bolognaise : oignon, bœuf, tomates, mijoter 20 minutes.",
      "Préparer la béchamel : beurre, farine, puis lait chaud en fouettant.",
      "Monter en couches pâtes, viande, béchamel, finir au fromage. Cuire 40 minutes à 190 °C.",
    ],
  },
  {
    id: "cabillaud-patate-douce",
    nom: "Cabillaud et purée de patate douce",
    base: 4, allergenes: ["poisson"], groupes: TOUS, vegetarien: false, four: true,
    prep: 15, cuisson: 25, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("filet de cabillaud", 4, "pièces"), I("patate douce", 800, "g"), I("citron", 1, "pièce"),
      I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Cuire les patates douces à la vapeur 20 minutes, les écraser.",
      "Cuire le cabillaud citronné 12 minutes à 180 °C, bien vérifier l'absence d'arêtes pour les petits.",
    ],
  },
  {
    id: "papillotes-cabillaud",
    nom: "Papillotes de cabillaud et légumes",
    base: 4, allergenes: ["poisson"], groupes: GRANDS, vegetarien: false, four: true,
    prep: 20, cuisson: 20, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("filet de cabillaud", 4, "pièces"), I("courgette", 2, "pièces"), I("carotte", 2, "pièces"),
      I("citron", 1, "pièce"), I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Couper les légumes en fines rondelles.",
      "Disposer poisson, légumes, huile et citron dans du papier cuisson, bien refermer.",
      "Cuire 20 minutes à 180 °C.",
    ],
  },
  {
    id: "pates-thon-tomate",
    cuisine: "italie",
    nom: "Pâtes au thon et à la tomate",
    base: 4, allergenes: ["gluten", "poisson"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 10, cuisson: 20, congelable: true, conservation: { frigo: 2, congel: 2 },
    ingredients: [
      I("pâtes", 350, "g"), I("thon en conserve", 2, "boîtes"), I("tomates concassées", 1, "boîte"),
      I("oignon", 1, "pièce"), I("ail", 1, "gousse"),
    ],
    etapes: [
      "Faire revenir oignon et ail, ajouter les tomates, mijoter 10 minutes.",
      "Ajouter le thon égoutté, puis les pâtes cuites.",
    ],
  },
  {
    id: "gratin-chou-fleur",
    cuisine: "france",
    nom: "Gratin de chou-fleur",
    base: 6, allergenes: ["gluten", "lactose"], groupes: TOUS, vegetarien: true, four: true,
    prep: 20, cuisson: 30, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("chou-fleur", 1, "pièce"), I("lait", 50, "cl"), I("farine", 40, "g"),
      I("beurre", 40, "g"), I("fromage râpé", 100, "g"),
    ],
    etapes: [
      "Cuire le chou-fleur en bouquets à la vapeur 10 minutes.",
      "Préparer la béchamel : beurre, farine, lait chaud.",
      "Napper le chou-fleur, parsemer de fromage et gratiner 20 minutes à 190 °C.",
    ],
  },
  {
    id: "poulet-basquaise",
    cuisine: "france",
    nom: "Poulet basquaise et riz",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: false, four: false,
    prep: 20, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("cuisses de poulet", 6, "pièces"), I("poivron", 3, "pièces"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 2, "pièces"), I("ail", 2, "gousses"), I("riz", 300, "g"),
    ],
    etapes: [
      "Dorer le poulet, le réserver.",
      "Faire revenir oignons, poivrons et ail, ajouter tomates et poulet, mijoter 35 minutes à couvert.",
      "Servir avec le riz cuit.",
    ],
  },
  {
    id: "poulet-citron-pdt",
    nom: "Poulet au citron et pommes de terre",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: false, four: true,
    prep: 15, cuisson: 50, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("cuisses de poulet", 6, "pièces"), I("pommes de terre", 1, "kg"), I("citron", 2, "pièces"),
      I("ail", 3, "gousses"), I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Mettre poulet et pommes de terre en morceaux dans un plat avec ail, citron et huile.",
      "Cuire 50 minutes à 200 °C en retournant à mi-cuisson.",
    ],
  },
  {
    id: "crevettes-ail-riz",
    nom: "Crevettes à l'ail et riz aux petits pois",
    base: 4, allergenes: ["crustaces"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 10, cuisson: 20, congelable: false, conservation: { frigo: 1, congel: 0 },
    ingredients: [
      I("crevettes décortiquées", 400, "g"), I("riz", 250, "g"), I("petits pois", 150, "g"),
      I("ail", 2, "gousses"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Cuire le riz avec les petits pois.",
      "Saisir les crevettes à l'ail dans l'huile 4 minutes.",
      "Servir ensemble. À consommer dans la journée ou le lendemain.",
    ],
  },
  {
    id: "salade-lentilles-feta",
    nom: "Salade de lentilles, carottes et feta",
    base: 4, allergenes: ["lactose"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 15, cuisson: 20, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("lentilles vertes", 250, "g"), I("carotte", 2, "pièces"), I("feta", 150, "g"),
      I("oignon", 1, "pièce"), I("huile d'olive", 2, "c. à soupe"), I("citron", 1, "pièce"),
    ],
    etapes: [
      "Cuire les lentilles 20 minutes, égoutter et laisser refroidir.",
      "Ajouter carottes râpées, oignon émincé et feta émiettée.",
      "Assaisonner d'huile et de jus de citron.",
    ],
  },
  {
    id: "ratatouille-riz",
    cuisine: "france",
    nom: "Ratatouille et riz",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 20, cuisson: 40, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("courgette", 3, "pièces"), I("aubergine", 2, "pièces"), I("poivron", 2, "pièces"),
      I("tomates concassées", 2, "boîtes"), I("oignon", 1, "pièce"), I("riz", 300, "g"),
      I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Couper tous les légumes en dés.",
      "Faire revenir l'oignon, ajouter les légumes puis les tomates, mijoter 35 minutes à couvert.",
      "Servir avec le riz cuit. Écraser les légumes pour les petits.",
    ],
  },
  {
    id: "taboule-boulgour",
    cuisine: "moyen-orient",
    nom: "Taboulé de boulgour",
    base: 6, allergenes: ["gluten"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 20, cuisson: 0, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("boulgour", 300, "g"), I("tomate", 4, "pièces"), I("concombre", 1, "pièce"),
      I("persil", 1, "botte"), I("citron", 2, "pièces"), I("huile d'olive", 3, "c. à soupe"),
    ],
    etapes: [
      "Hydrater le boulgour à l'eau chaude 10 minutes.",
      "Ajouter tomates et concombre en dés, persil haché, citron et huile.",
      "Laisser reposer 1 heure au frais.",
    ],
  },

  // ---------- Soupes et veloutés ----------
  {
    id: "soupe-potiron",
    nom: "Velouté de potiron",
    base: 6, allergenes: ["lactose"], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("potiron", 1, "kg"), I("pommes de terre", 2, "pièces"), I("oignon", 1, "pièce"),
      I("fromage frais", 100, "g"),
    ],
    etapes: [
      "Faire cuire potiron, pomme de terre et oignon dans 1,2 L d'eau 25 minutes.",
      "Mixer, ajouter le fromage frais. Pour les bébés, utiliser le bouillon sans le fromage.",
    ],
  },
  {
    id: "soupe-poireaux-pdt",
    cuisine: "france",
    nom: "Soupe poireaux et pommes de terre",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 30, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("poireau", 4, "pièces"), I("pommes de terre", 600, "g"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Faire suer les poireaux émincés dans l'huile.",
      "Ajouter les pommes de terre en dés et 1,2 L d'eau, cuire 25 minutes, mixer.",
    ],
  },
  {
    id: "soupe-carottes-coriandre",
    nom: "Soupe de carottes à la coriandre",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("carotte", 8, "pièces"), I("oignon", 1, "pièce"), I("pommes de terre", 1, "pièce"),
      I("coriandre", 1, "botte"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Faire revenir l'oignon, ajouter carottes et pomme de terre en dés et 1,2 L d'eau.",
      "Cuire 25 minutes, ajouter la coriandre, mixer.",
    ],
  },
  {
    id: "soupe-legumes-verts",
    nom: "Soupe de légumes verts",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 20, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("courgette", 3, "pièces"), I("épinards", 200, "g"), I("pommes de terre", 2, "pièces"),
      I("petits pois", 200, "g"), I("oignon", 1, "pièce"),
    ],
    etapes: [
      "Cuire courgettes, pommes de terre, oignon et petits pois dans 1 L d'eau 15 minutes.",
      "Ajouter les épinards 3 minutes, mixer.",
    ],
  },
  {
    id: "minestrone",
    cuisine: "italie",
    nom: "Minestrone de légumes et petites pâtes",
    base: 6, allergenes: ["gluten", "celeri"], groupes: TOUS, vegetarien: true, four: false,
    prep: 20, cuisson: 30, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("carotte", 3, "pièces"), I("courgette", 2, "pièces"), I("céleri branche", 3, "pièces"),
      I("tomates concassées", 1, "boîte"), I("haricots blancs en conserve", 1, "boîte"),
      I("petites pâtes", 120, "g"), I("oignon", 1, "pièce"),
    ],
    etapes: [
      "Faire revenir oignon, carotte et céleri en dés.",
      "Ajouter tomates, courgette et 1,2 L d'eau, cuire 20 minutes.",
      "Ajouter haricots et pâtes, cuire 8 minutes.",
    ],
  },

  // ---------- Petit-déjeuner et goûter ----------
  {
    id: "porridge-pommes",
    type: "petit-dej",
    nom: "Porridge d'avoine aux pommes",
    base: 4, allergenes: ["gluten", "lactose"], groupes: TOUS, vegetarien: true, four: false,
    prep: 5, cuisson: 10, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("flocons d'avoine", 200, "g"), I("lait", 80, "cl"), I("pomme", 4, "pièces"),
      I("cannelle", 1, "c. à café"),
    ],
    etapes: [
      "Cuire les flocons dans le lait 5 minutes en remuant.",
      "Ajouter les pommes en dés et la cannelle, cuire 5 minutes. Se réchauffe avec un peu de lait.",
    ],
  },
  {
    id: "compote-pommes-poires",
    type: "gouter",
    nom: "Compote maison pommes-poires",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 20, congelable: true, conservation: { frigo: 4, congel: 6 },
    ingredients: [
      I("pomme", 6, "pièces"), I("poire", 4, "pièces"), I("cannelle", 1, "c. à café"),
    ],
    etapes: [
      "Éplucher et couper les fruits.",
      "Cuire à couvert avec un fond d'eau 20 minutes, écraser ou mixer. Sans sucre ajouté.",
    ],
  },
  {
    id: "energy-balls-dattes",
    type: "gouter",
    nom: "Boules d'énergie dattes et amandes",
    base: 6, allergenes: ["fruits_a_coque"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 15, cuisson: 0, congelable: true, conservation: { frigo: 7, congel: 3 },
    ingredients: [
      I("dattes", 200, "g"), I("amandes en poudre", 100, "g"), I("noix de coco râpée", 30, "g"),
      I("cacao non sucré", 1, "c. à soupe"),
    ],
    etapes: [
      "Mixer les dattes dénoyautées avec la poudre d'amandes et le cacao.",
      "Former des boules, les rouler dans la noix de coco. Conserver au frais.",
    ],
  },

  // ---------- Spécialités tunisiennes ----------
  {
    id: "chakchouka",
    nom: "Chakchouka aux poivrons et œufs",
    cuisine: "tunisie",
    base: 4, allergenes: ["oeufs"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 10, cuisson: 25, congelable: false, conservation: { frigo: 2, congel: 0 },
    note: "Harissa à ajouter à table pour les adultes : la version de base n'est pas piquante.",
    ingredients: [
      I("poivron", 3, "pièces"), I("tomates concassées", 2, "boîtes"), I("oignon", 1, "pièce"),
      I("ail", 2, "gousses"), I("oeufs", 6, "pièces"), I("cumin", 1, "c. à café"),
      I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Faire revenir oignon et poivrons émincés dans l'huile, ajouter l'ail et le cumin.",
      "Ajouter les tomates, mijoter 15 minutes jusqu'à une sauce épaisse.",
      "Creuser 6 puits, y casser les œufs, couvrir et cuire 6 à 8 minutes.",
    ],
  },
  {
    id: "lablabi",
    nom: "Lablabi (soupe tunisienne de pois chiches)",
    cuisine: "tunisie",
    base: 4, allergenes: ["gluten"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 10, cuisson: 20, congelable: false, conservation: { frigo: 3, congel: 0 },
    note: "Servir le pain à part, sinon il se détrempe au stockage. Harissa à ajouter à table.",
    ingredients: [
      I("pois chiches en conserve", 3, "boîtes"), I("ail", 3, "gousses"), I("cumin", 2, "c. à café"),
      I("citron", 1, "pièce"), I("pain", 4, "tranches"), I("huile d'olive", 3, "c. à soupe"),
    ],
    etapes: [
      "Chauffer les pois chiches avec leur eau, l'ail écrasé et le cumin 15 minutes.",
      "Verser dans des bols sur des morceaux de pain rassis.",
      "Terminer avec huile d'olive et jus de citron.",
    ],
  },
  {
    id: "couscous-tunisien-poulet",
    nom: "Couscous tunisien au poulet et pois chiches",
    cuisine: "tunisie",
    base: 6, allergenes: ["gluten"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 25, cuisson: 50, congelable: true, conservation: { frigo: 3, congel: 3 },
    note: "Harissa à ajouter à table pour les adultes.",
    ingredients: [
      I("semoule", 400, "g"), I("cuisses de poulet", 6, "pièces"), I("pois chiches en conserve", 2, "boîtes"),
      I("carotte", 3, "pièces"), I("courgette", 2, "pièces"), I("pommes de terre", 3, "pièces"),
      I("tomates concassées", 1, "boîte"), I("oignon", 2, "pièces"),
    ],
    etapes: [
      "Dorer le poulet avec les oignons, ajouter les tomates et 1,5 L d'eau.",
      "Ajouter carottes et pommes de terre, cuire 30 minutes, puis courgettes et pois chiches 15 minutes.",
      "Hydrater la semoule à l'eau chaude, l'égrener, servir avec le bouillon.",
    ],
  },
  {
    id: "brik-oeuf-thon",
    nom: "Briks au four à l'œuf et au thon",
    cuisine: "tunisie",
    base: 4, allergenes: ["gluten", "oeufs", "poisson"], groupes: GRANDS, vegetarien: false, four: true,
    prep: 25, cuisson: 15, congelable: false, conservation: { frigo: 1, congel: 0 },
    note: "À manger frais. Version au four, plus légère que la friture.",
    ingredients: [
      I("feuilles de brick", 4, "pièces"), I("oeufs", 4, "pièces"), I("thon en conserve", 1, "boîte"),
      I("persil", 1, "botte"), I("oignon", 1, "pièce"), I("huile d'olive", 2, "c. à soupe"),
    ],
    etapes: [
      "Mélanger thon émietté, oignon et persil hachés.",
      "Garnir chaque feuille de brick de farce, casser un œuf au centre, replier en triangle.",
      "Badigeonner d'huile, cuire 12 à 15 minutes à 200 °C.",
    ],
  },
  {
    id: "ojja-merguez",
    nom: "Ojja aux merguez",
    cuisine: "tunisie",
    base: 4, allergenes: ["oeufs"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 10, cuisson: 25, congelable: false, conservation: { frigo: 2, congel: 0 },
    note: "Les merguez sont épicées : choisir une version douce ou les remplacer par de la viande hachée pour les enfants. Vérifier l'étiquette.",
    ingredients: [
      I("merguez", 400, "g"), I("oeufs", 6, "pièces"), I("poivron", 2, "pièces"),
      I("tomates concassées", 2, "boîtes"), I("ail", 2, "gousses"), I("harissa", 1, "c. à café"),
    ],
    etapes: [
      "Faire dorer les merguez coupées en tronçons, les réserver.",
      "Cuire poivrons, ail, tomates et harissa 15 minutes.",
      "Remettre les merguez, casser les œufs dessus et remuer doucement 5 minutes.",
    ],
  },
  {
    id: "salade-mechouia",
    nom: "Salade méchouia (poivrons et tomates grillés)",
    cuisine: "tunisie",
    base: 4, allergenes: [], groupes: GRANDS, vegetarien: true, four: true,
    prep: 20, cuisson: 30, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("poivron", 4, "pièces"), I("tomate", 3, "pièces"), I("ail", 2, "gousses"),
      I("citron", 1, "pièce"), I("huile d'olive", 3, "c. à soupe"),
    ],
    etapes: [
      "Griller poivrons et tomates 30 minutes à 220 °C, les laisser refroidir sous un linge.",
      "Les peler, retirer les graines, les hacher grossièrement.",
      "Assaisonner avec ail écrasé, huile et citron.",
    ],
  },
  {
    id: "chorba-tunisienne",
    nom: "Chorba tunisienne au poulet",
    cuisine: "tunisie",
    base: 6, allergenes: ["gluten"], groupes: GRANDS, vegetarien: false, four: false,
    prep: 15, cuisson: 40, congelable: true, conservation: { frigo: 3, congel: 2 },
    note: "Pour congeler, ne pas ajouter les pâtes : les cuire au moment de réchauffer.",
    ingredients: [
      I("blanc de poulet", 300, "g"), I("pois chiches en conserve", 1, "boîte"), I("tomates concassées", 1, "boîte"),
      I("oignon", 1, "pièce"), I("petites pâtes", 100, "g"), I("coriandre", 1, "botte"),
    ],
    etapes: [
      "Faire revenir l'oignon, ajouter le poulet en dés, les tomates et 1,5 L d'eau.",
      "Cuire 25 minutes avec les pois chiches, ajouter les pâtes 8 minutes.",
      "Parsemer de coriandre ciselée.",
    ],
  },

  // ---------- Spécialités italiennes ----------
  {
    id: "risotto-champignons",
    nom: "Risotto aux champignons",
    cuisine: "italie",
    base: 4, allergenes: ["lactose", "celeri"], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 30, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("riz rond", 300, "g"), I("champignons", 400, "g"), I("oignon", 1, "pièce"),
      I("bouillon de légumes", 1, "L"), I("parmesan", 60, "g"), I("beurre", 30, "g"),
    ],
    etapes: [
      "Faire revenir l'oignon et les champignons dans le beurre, ajouter le riz 2 minutes.",
      "Ajouter le bouillon chaud louche par louche en remuant, 20 minutes.",
      "Terminer avec le parmesan.",
    ],
  },
  {
    id: "gnocchis-tomate",
    nom: "Gnocchis sauce tomate et basilic",
    cuisine: "italie",
    base: 4, allergenes: ["gluten", "oeufs", "lactose"], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 20, congelable: false, conservation: { frigo: 2, congel: 0 },
    ingredients: [
      I("gnocchis", 800, "g"), I("tomates concassées", 2, "boîtes"), I("oignon", 1, "pièce"),
      I("basilic", 1, "botte"), I("parmesan", 50, "g"),
    ],
    etapes: [
      "Faire revenir l'oignon, ajouter les tomates, mijoter 15 minutes, mixer pour les petits.",
      "Cuire les gnocchis 2 à 3 minutes dans l'eau bouillante, mélanger à la sauce.",
      "Ajouter le basilic et le parmesan.",
    ],
  },
  {
    id: "pizza-maison",
    nom: "Pizza maison aux légumes",
    cuisine: "italie",
    base: 4, allergenes: ["gluten", "lactose"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 30, cuisson: 15, congelable: true, conservation: { frigo: 2, congel: 2 },
    note: "Pâte à préparer 1 heure avant pour qu'elle lève.",
    ingredients: [
      I("farine", 500, "g"), I("levure de boulanger", 1, "pièce"), I("tomates concassées", 1, "boîte"),
      I("mozzarella", 250, "g"), I("champignons", 200, "g"), I("poivron", 1, "pièce"),
    ],
    etapes: [
      "Pétrir farine, levure, 30 cl d'eau tiède et sel, laisser lever 1 heure.",
      "Étaler la pâte, garnir de tomates, légumes et mozzarella.",
      "Cuire 12 à 15 minutes à 240 °C.",
    ],
  },
  {
    id: "parmigiana-aubergines",
    nom: "Parmigiana d'aubergines",
    cuisine: "italie",
    base: 6, allergenes: ["lactose"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 25, cuisson: 45, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("aubergine", 4, "pièces"), I("tomates concassées", 2, "boîtes"), I("mozzarella", 250, "g"),
      I("parmesan", 50, "g"), I("basilic", 1, "botte"), I("huile d'olive", 3, "c. à soupe"),
    ],
    etapes: [
      "Trancher les aubergines, les rôtir 20 minutes à 200 °C avec un peu d'huile.",
      "Alterner couches d'aubergines, sauce tomate, mozzarella et basilic.",
      "Couvrir de parmesan, cuire 25 minutes à 180 °C.",
    ],
  },
  {
    id: "pates-pesto",
    nom: "Pâtes au pesto maison",
    cuisine: "italie",
    base: 4, allergenes: ["gluten", "lactose", "fruits_a_coque"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 15, cuisson: 12, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("pâtes", 400, "g"), I("basilic", 1, "botte"), I("pignons de pin", 40, "g"),
      I("parmesan", 50, "g"), I("ail", 1, "gousse"), I("huile d'olive", 8, "c. à soupe"),
    ],
    etapes: [
      "Mixer basilic, pignons, parmesan, ail et huile.",
      "Cuire les pâtes, les mélanger au pesto avec un peu d'eau de cuisson.",
    ],
  },
  {
    id: "pasta-e-fagioli",
    nom: "Pasta e fagioli (soupe de haricots et pâtes)",
    cuisine: "italie",
    base: 6, allergenes: ["gluten", "celeri"], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 30, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("haricots blancs en conserve", 2, "boîtes"), I("petites pâtes", 150, "g"), I("tomates concassées", 1, "boîte"),
      I("carotte", 2, "pièces"), I("céleri branche", 2, "pièces"), I("oignon", 1, "pièce"),
      I("ail", 2, "gousses"),
    ],
    etapes: [
      "Faire revenir oignon, carotte, céleri et ail en petits dés.",
      "Ajouter tomates, haricots et 1 L d'eau, cuire 15 minutes.",
      "Ajouter les pâtes et cuire 8 minutes. Écraser un peu de haricots pour épaissir.",
    ],
  },
  {
    id: "poulet-cacciatore",
    nom: "Poulet cacciatore aux olives",
    cuisine: "italie",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: false, four: false,
    prep: 15, cuisson: 45, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("cuisses de poulet", 6, "pièces"), I("poivron", 2, "pièces"), I("tomates concassées", 2, "boîtes"),
      I("oignon", 1, "pièce"), I("olives noires", 100, "g"), I("ail", 2, "gousses"),
    ],
    etapes: [
      "Dorer le poulet, le réserver.",
      "Faire revenir oignon, poivrons et ail, ajouter tomates et poulet, mijoter 35 minutes à couvert.",
      "Ajouter les olives en fin de cuisson.",
    ],
  },

  // ---------- Spécialités françaises ----------
  {
    id: "boeuf-bourguignon",
    nom: "Bœuf bourguignon",
    cuisine: "france",
    base: 6, allergenes: ["gluten", "celeri"], groupes: TOUS, vegetarien: false, four: false,
    prep: 25, cuisson: 120, congelable: true, conservation: { frigo: 3, congel: 3 },
    note: "Version sans vin, adaptée aux enfants. Pour les adultes, remplacer la moitié du bouillon par du vin rouge.",
    ingredients: [
      I("boeuf à braiser", 800, "g"), I("carotte", 4, "pièces"), I("oignon", 2, "pièces"),
      I("champignons", 250, "g"), I("bouillon de boeuf", 50, "cl"), I("farine", 20, "g"),
      I("pommes de terre", 1, "kg"),
    ],
    etapes: [
      "Fariner et dorer la viande en cubes avec les oignons.",
      "Ajouter bouillon, carottes et champignons, mijoter 2 heures à couvert à feu doux.",
      "Cuire les pommes de terre à part et servir ensemble.",
    ],
  },
  {
    id: "gratin-dauphinois",
    nom: "Gratin dauphinois",
    cuisine: "france",
    base: 6, allergenes: ["lactose"], groupes: TOUS, vegetarien: true, four: true,
    prep: 20, cuisson: 75, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("pommes de terre", 1.2, "kg"), I("crème fraîche", 40, "cl"), I("lait", 20, "cl"),
      I("ail", 1, "gousse"),
    ],
    etapes: [
      "Trancher finement les pommes de terre, frotter le plat d'ail.",
      "Disposer les tranches, verser crème et lait mélangés.",
      "Cuire 1 h 15 à 160 °C jusqu'à ce que le dessus soit doré.",
    ],
  },
  {
    id: "soupe-oignon-gratinee",
    nom: "Soupe à l'oignon gratinée",
    cuisine: "france",
    base: 6, allergenes: ["gluten", "lactose", "celeri"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 20, cuisson: 50, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("oignon", 8, "pièces"), I("beurre", 40, "g"), I("farine", 20, "g"),
      I("bouillon de légumes", 1.2, "L"), I("pain", 6, "tranches"), I("fromage râpé", 150, "g"),
    ],
    etapes: [
      "Faire fondre les oignons émincés dans le beurre 25 minutes à feu doux.",
      "Ajouter la farine puis le bouillon, cuire 20 minutes.",
      "Verser en bols, couvrir de pain et de fromage, gratiner 5 minutes sous le gril.",
    ],
  },
  {
    id: "pot-au-feu",
    nom: "Pot-au-feu",
    cuisine: "france",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: false, four: false,
    prep: 25, cuisson: 150, congelable: true, conservation: { frigo: 3, congel: 3 },
    note: "Le bouillon peut servir de base à une soupe avec des vermicelles les jours suivants.",
    ingredients: [
      I("boeuf à bouillir", 900, "g"), I("carotte", 5, "pièces"), I("poireau", 3, "pièces"),
      I("navet", 3, "pièces"), I("pommes de terre", 6, "pièces"), I("oignon", 2, "pièces"),
    ],
    etapes: [
      "Couvrir la viande d'eau froide, porter à frémissement, écumer, cuire 1 h 30.",
      "Ajouter oignons, carottes, navets et poireaux, cuire 40 minutes.",
      "Ajouter les pommes de terre 25 minutes avant la fin.",
    ],
  },
  {
    id: "crepes",
    nom: "Crêpes maison",
    cuisine: "france",
    type: "gouter",
    base: 6, allergenes: ["gluten", "oeufs", "lactose"], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 20, congelable: true, conservation: { frigo: 3, congel: 2 },
    note: "Environ 12 crêpes. Intercaler du papier cuisson avant de congeler.",
    ingredients: [
      I("farine", 250, "g"), I("oeufs", 3, "pièces"), I("lait", 50, "cl"), I("beurre", 30, "g"),
    ],
    etapes: [
      "Mélanger farine et œufs, ajouter le lait peu à peu, puis le beurre fondu.",
      "Laisser reposer 30 minutes, cuire à la poêle chaude.",
    ],
  },
  {
    id: "clafoutis-pommes",
    nom: "Clafoutis aux pommes",
    cuisine: "france",
    type: "gouter",
    base: 6, allergenes: ["gluten", "oeufs", "lactose"], groupes: TOUS, vegetarien: true, four: true,
    prep: 15, cuisson: 35, congelable: false, conservation: { frigo: 3, congel: 0 },
    ingredients: [
      I("pomme", 4, "pièces"), I("oeufs", 3, "pièces"), I("farine", 100, "g"),
      I("lait", 25, "cl"), I("sucre", 60, "g"),
    ],
    etapes: [
      "Battre œufs, sucre, farine et lait.",
      "Disposer les pommes en dés dans un plat beurré, verser la pâte.",
      "Cuire 35 minutes à 180 °C.",
    ],
  },
  {
    id: "veloute-champignons",
    nom: "Velouté de champignons",
    cuisine: "france",
    base: 6, allergenes: ["lactose"], groupes: TOUS, vegetarien: true, four: false,
    prep: 15, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("champignons", 500, "g"), I("pommes de terre", 2, "pièces"), I("oignon", 1, "pièce"),
      I("crème fraîche", 10, "cl"),
    ],
    etapes: [
      "Faire revenir oignon et champignons émincés, ajouter les pommes de terre en dés et 1 L d'eau.",
      "Cuire 20 minutes, mixer, ajouter la crème.",
    ],
  },

  // ---------- Spécialités du Moyen-Orient ----------
  {
    id: "houmous-crudites",
    nom: "Houmous maison et crudités",
    cuisine: "moyen-orient",
    base: 6, allergenes: ["sesame"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 15, cuisson: 0, congelable: true, conservation: { frigo: 5, congel: 2 },
    ingredients: [
      I("pois chiches en conserve", 2, "boîtes"), I("tahini", 3, "c. à soupe"), I("citron", 1, "pièce"),
      I("ail", 1, "gousse"), I("huile d'olive", 3, "c. à soupe"), I("carotte", 3, "pièces"),
      I("concombre", 1, "pièce"),
    ],
    etapes: [
      "Mixer pois chiches égouttés, tahini, citron, ail et huile avec un peu d'eau.",
      "Servir avec carottes et concombre en bâtonnets.",
    ],
  },
  {
    id: "falafels-four",
    nom: "Falafels au four",
    cuisine: "moyen-orient",
    base: 4, allergenes: ["gluten"], groupes: GRANDS, vegetarien: true, four: true,
    prep: 20, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("pois chiches en conserve", 2, "boîtes"), I("oignon", 1, "pièce"), I("ail", 2, "gousses"),
      I("persil", 1, "botte"), I("cumin", 2, "c. à café"), I("farine", 3, "c. à soupe"),
    ],
    etapes: [
      "Mixer grossièrement tous les ingrédients.",
      "Former des boulettes, les poser sur une plaque huilée.",
      "Cuire 25 minutes à 200 °C en les retournant à mi-cuisson.",
    ],
  },
  {
    id: "mujaddara",
    nom: "Mujaddara (lentilles, riz et oignons caramélisés)",
    cuisine: "moyen-orient",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 40, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("lentilles vertes", 250, "g"), I("riz", 200, "g"), I("oignon", 4, "pièces"),
      I("cumin", 2, "c. à café"), I("huile d'olive", 3, "c. à soupe"),
    ],
    etapes: [
      "Cuire les lentilles 15 minutes, ajouter le riz et le cumin, cuire 18 minutes.",
      "Faire dorer lentement les oignons émincés dans l'huile, 20 minutes.",
      "Servir le mélange couvert d'oignons.",
    ],
  },
  {
    id: "kefta-riz",
    nom: "Kefta de bœuf aux épices et riz",
    cuisine: "moyen-orient",
    base: 6, allergenes: [], groupes: GRANDS, vegetarien: false, four: false,
    prep: 20, cuisson: 25, congelable: true, conservation: { frigo: 3, congel: 3 },
    ingredients: [
      I("boeuf haché", 500, "g"), I("oignon", 1, "pièce"), I("persil", 1, "botte"),
      I("cumin", 1, "c. à café"), I("cannelle", 1, "c. à café"), I("riz", 300, "g"),
      I("tomates concassées", 1, "boîte"),
    ],
    etapes: [
      "Mélanger bœuf, oignon râpé, persil haché et épices, former des boulettes allongées.",
      "Les dorer à la poêle, ajouter les tomates et mijoter 15 minutes.",
      "Servir sur le riz cuit.",
    ],
  },
  {
    id: "shish-taouk",
    nom: "Shish taouk (poulet mariné au yaourt) et riz",
    cuisine: "moyen-orient",
    base: 6, allergenes: ["lactose"], groupes: GRANDS, vegetarien: false, four: true,
    prep: 15, cuisson: 30, congelable: true, conservation: { frigo: 3, congel: 3 },
    note: "Mariner le poulet plusieurs heures, ou la veille, pour plus de goût.",
    ingredients: [
      I("blanc de poulet", 700, "g"), I("yaourt nature", 20, "cl"), I("citron", 1, "pièce"),
      I("ail", 3, "gousses"), I("paprika", 2, "c. à café"), I("riz", 300, "g"),
    ],
    etapes: [
      "Mélanger yaourt, citron, ail et paprika, y enrober le poulet en cubes.",
      "Cuire 25 à 30 minutes à 200 °C sur une plaque.",
      "Servir avec le riz cuit.",
    ],
  },
  {
    id: "fattoush",
    nom: "Fattoush (salade libanaise au pain grillé)",
    cuisine: "moyen-orient",
    base: 4, allergenes: ["gluten"], groupes: GRANDS, vegetarien: true, four: false,
    prep: 20, cuisson: 5, congelable: false, conservation: { frigo: 1, congel: 0 },
    note: "Ajouter le pain grillé au dernier moment pour qu'il reste croustillant.",
    ingredients: [
      I("pain pita", 3, "pièces"), I("tomate", 4, "pièces"), I("concombre", 2, "pièces"),
      I("laitue", 1, "pièce"), I("citron", 2, "pièces"), I("huile d'olive", 4, "c. à soupe"),
    ],
    etapes: [
      "Faire dorer le pain pita coupé en morceaux à la poêle avec un peu d'huile.",
      "Couper tomates, concombre et laitue, assaisonner d'huile et de citron.",
      "Ajouter le pain au moment de servir.",
    ],
  },
  {
    id: "shorbat-adas",
    nom: "Shorbat adas (soupe de lentilles corail au citron)",
    cuisine: "moyen-orient",
    base: 6, allergenes: [], groupes: TOUS, vegetarien: true, four: false,
    prep: 10, cuisson: 25, congelable: true, conservation: { frigo: 4, congel: 3 },
    ingredients: [
      I("lentilles corail", 300, "g"), I("carotte", 2, "pièces"), I("oignon", 1, "pièce"),
      I("cumin", 2, "c. à café"), I("citron", 1, "pièce"), I("huile d'olive", 1, "c. à soupe"),
    ],
    etapes: [
      "Faire revenir oignon et carotte avec le cumin.",
      "Ajouter lentilles et 1,2 L d'eau, cuire 20 minutes, mixer.",
      "Ajouter le jus de citron au moment de servir.",
    ],
  },
];
