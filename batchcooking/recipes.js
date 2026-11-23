// Base de recettes de batch cooking.
// base : nombre de portions pour adulte produites par la recette de référence.
// allergenes : clés utilisées pour filtrer selon les intolérances du foyer.
// groupes : tranches d'âge pour lesquelles la recette convient.
//   'bebe' (0-3 ans), 'enfant' (3-12 ans), 'ado' (13-17 ans), 'adulte' (18+)
// ingredients : { nom, qte, unite } pour la recette de référence (base portions).

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

const GROUPES = {
  bebe: "Bébé (0-3 ans)",
  enfant: "Enfant (3-12 ans)",
  ado: "Ado (13-17 ans)",
  adulte: "Adulte (18+)",
};

// Coefficient de portion par tranche d'âge (1 = adulte).
const FACTEUR_PORTION = { bebe: 0.4, enfant: 0.7, ado: 1, adulte: 1 };

const TOUS_GROUPES = ["bebe", "enfant", "ado", "adulte"];

const RECETTES = [
  {
    id: "chili-sin-carne",
    nom: "Chili sin carne aux haricots rouges",
    base: 6,
    allergenes: [],
    groupes: ["enfant", "ado", "adulte"],
    congelable: true,
    ingredients: [
      { nom: "haricots rouges en conserve", qte: 2, unite: "boîtes" },
      { nom: "tomates concassées", qte: 2, unite: "boîtes" },
      { nom: "oignon", qte: 2, unite: "pièces" },
      { nom: "ail", qte: 2, unite: "gousses" },
      { nom: "poivron", qte: 1, unite: "pièce" },
      { nom: "maïs", qte: 1, unite: "boîte" },
      { nom: "cumin", qte: 1, unite: "c. à café" },
      { nom: "huile d'olive", qte: 2, unite: "c. à soupe" },
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
    base: 6,
    allergenes: ["gluten", "lactose", "oeufs"],
    groupes: ["enfant", "ado", "adulte"],
    congelable: true,
    ingredients: [
      { nom: "pâtes", qte: 500, unite: "g" },
      { nom: "courgette", qte: 3, unite: "pièces" },
      { nom: "oignon", qte: 1, unite: "pièce" },
      { nom: "oeufs", qte: 2, unite: "pièces" },
      { nom: "crème fraîche", qte: 20, unite: "cl" },
      { nom: "fromage râpé", qte: 100, unite: "g" },
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
    base: 6,
    allergenes: [],
    groupes: ["bebe", "enfant", "ado", "adulte"],
    congelable: true,
    ingredients: [
      { nom: "riz", qte: 300, unite: "g" },
      { nom: "blanc de poulet", qte: 500, unite: "g" },
      { nom: "carotte", qte: 3, unite: "pièces" },
      { nom: "courgette", qte: 2, unite: "pièces" },
      { nom: "huile d'olive", qte: 1, unite: "c. à soupe" },
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
    base: 6,
    allergenes: [],
    groupes: ["bebe", "enfant", "ado", "adulte"],
    congelable: true,
    ingredients: [
      { nom: "lentilles corail", qte: 300, unite: "g" },
      { nom: "tomates concassées", qte: 1, unite: "boîte" },
      { nom: "oignon", qte: 1, unite: "pièce" },
      { nom: "carotte", qte: 2, unite: "pièces" },
      { nom: "lait de coco", qte: 20, unite: "cl" },
      { nom: "curcuma", qte: 1, unite: "c. à café" },
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
    base: 4,
    allergenes: ["poisson"],
    groupes: ["enfant", "ado", "adulte"],
    congelable: false,
    ingredients: [
      { nom: "pavé de saumon", qte: 4, unite: "pièces" },
      { nom: "pommes de terre", qte: 800, unite: "g" },
      { nom: "courgette", qte: 2, unite: "pièces" },
      { nom: "huile d'olive", qte: 2, unite: "c. à soupe" },
      { nom: "citron", qte: 1, unite: "pièce" },
    ],
    etapes: [
      "Couper les légumes, les arroser d'huile et les rôtir 25 minutes à 200 °C.",
      "Ajouter le saumon citronné et poursuivre 12 minutes.",
    ],
  },
  {
    id: "soupe-potiron",
    nom: "Velouté de potiron",
    base: 6,
    allergenes: ["lactose"],
    groupes: ["bebe", "enfant", "ado", "adulte"],
    congelable: true,
    ingredients: [
      { nom: "potiron", qte: 1, unite: "kg" },
      { nom: "pomme de terre", qte: 2, unite: "pièces" },
      { nom: "oignon", qte: 1, unite: "pièce" },
      { nom: "fromage frais", qte: 100, unite: "g" },
    ],
    etapes: [
      "Faire cuire potiron, pomme de terre et oignon dans 1,2 L d'eau 25 minutes.",
      "Mixer, ajouter le fromage frais. Pour les bébés, utiliser le bouillon sans le fromage.",
    ],
  },
  {
    id: "omelette-four-legumes",
    nom: "Frittata aux légumes",
    base: 4,
    allergenes: ["oeufs", "lactose"],
    groupes: ["enfant", "ado", "adulte"],
    congelable: false,
    ingredients: [
      { nom: "oeufs", qte: 8, unite: "pièces" },
      { nom: "poivron", qte: 1, unite: "pièce" },
      { nom: "épinards", qte: 200, unite: "g" },
      { nom: "oignon", qte: 1, unite: "pièce" },
      { nom: "fromage râpé", qte: 60, unite: "g" },
    ],
    etapes: [
      "Faire revenir oignon, poivron et épinards.",
      "Battre les œufs avec le fromage, verser sur les légumes et cuire à couvert 10 minutes.",
    ],
  },
];
