import type { Recipe, RecipeIngredient, Unit } from "./types";
import { L } from "./types";

const ing = (id: string, qty: number, unit: Unit, optional = false): RecipeIngredient => ({
  id,
  qty,
  unit,
  optional,
});

export const lunchboxAndSweets: Recipe[] = [
  {
    slug: "sandwich-tona",
    name: L("سندويتش التونة", "Sandwich au thon", "Tuna sandwich"),
    description: L(
      "سندويتش تونة بالزيتون والطماطم، كيدوز فـ8 دقائق للعلبة.",
      "Sandwich au thon, olives et tomate : prêt en 8 minutes pour la lunchbox.",
      "Tuna sandwich with olives and tomato — 8 minutes for the lunchbox."
    ),
    category: "lunchbox",
    tags: ["quick", "budget", "kid"],
    slots: ["lunchbox", "ftour"],
    art: "sandwich",
    prep: 8,
    cook: 0,
    servings: 4,
    cost: 24,
    difficulty: 1,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("bread", 4, "piece"),
      ing("tuna", 2, "piece"),
      ing("olives", 50, "g"),
      ing("tomato", 1, "piece"),
      ing("cheese", 40, "g", true),
    ],
    steps: [
      L(
        "صفّي التونة وخلّطها مع الزيتون المقطّع.",
        "Égouttez le thon et mélangez avec les olives coupées.",
        "Drain the tuna and mix with chopped olives."
      ),
      L(
        "حلّ الخبز، حط التونة، الطماطم والجبن.",
        "Ouvrez le pain, garnissez de thon, tomate et fromage.",
        "Open the bread, add tuna, tomato and cheese."
      ),
      L(
        "لفّ السندويتش مزيان وقطّعو نصين.",
        "Roulez bien le sandwich et coupez-le en deux.",
        "Wrap tightly and cut in half."
      ),
    ],
    equipment: [L("سكين", "Couteau", "Knife")],
    tips: [
      L(
        "لفّو بورق الألمنيوم باش ما يسيحش فالعلبة.",
        "Emballez dans du papier alu pour éviter qu'il ne s'écrase.",
        "Wrap in foil so it doesn't leak in the box."
      ),
    ],
    isNew: true,
  },
  {
    slug: "msemen-bel-jben-box",
    name: L("مسمن بالجبن للعلبة", "Msemen au fromage", "Cheese msemen"),
    description: L(
      "مسمن مطوي بالجبن، كيتاكل بارد ولا سخون وفالعلبة كيدوز مزيان.",
      "Msemen plié au fromage, bon froid ou chaud, parfait en lunchbox.",
      "Folded msemen with cheese — good cold or warm, perfect for lunchboxes."
    ),
    category: "lunchbox",
    tags: ["kid", "budget", "traditional"],
    slots: ["lunchbox", "ftour"],
    art: "msemen",
    prep: 10,
    cook: 5,
    servings: 4,
    cost: 15,
    difficulty: 1,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("flour", 300, "g"),
      ing("semolina", 100, "g"),
      ing("cheese", 120, "g"),
      ing("olive_oil", 2, "tbsp"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "حضّر عجين المسمن وخلّيه يرتاح 20 دقيقة.",
        "Préparez la pâte à msemen et laissez reposer 20 minutes.",
        "Make msemen dough and rest 20 minutes."
      ),
      L(
        "ورّق، حط الجبن، وطوي على شكل مربع.",
        "Étalez, ajoutez le fromage et pliez en carré.",
        "Roll out, add cheese and fold into a square."
      ),
      L(
        "طيبو فمقلاة جافة حتى يتحمّر، ولفّو فالعلبة.",
        "Cuisez à la poêle sèche jusqu'à dorure, puis emballez.",
        "Cook in a dry pan until golden, then wrap."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "قطّعو مثلثات صغيرة، كيتاكل بسهولة فالاستراحة.",
        "Coupez en petits triangles, plus facile à la récré.",
        "Cut into small triangles — easier at break time."
      ),
    ],
  },
  {
    slug: "riz-bel-djaj-box",
    name: L("ريز بالدجاج فـعلبة", "Riz au poulet en lunchbox", "Chicken rice box"),
    description: L(
      "ريز بالدجاج والخيزو، علبة كاملة كتشبع الدراري.",
      "Riz au poulet et carottes : une lunchbox complète et rassasiante.",
      "Chicken and carrot rice — a complete, filling lunchbox."
    ),
    category: "lunchbox",
    tags: ["kid", "quick"],
    slots: ["lunchbox"],
    art: "rice",
    prep: 10,
    cook: 20,
    servings: 4,
    cost: 30,
    difficulty: 1,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("rice", 300, "g"),
      ing("chicken", 300, "g"),
      ing("carrot", 2, "piece"),
      ing("onion", 1, "piece"),
      ing("turmeric", 1, "tsp"),
      ing("olive_oil", 2, "tbsp"),
    ],
    steps: [
      L(
        "قلي الدجاج المقطّع مع البصل 5 دقائق.",
        "Faites revenir le poulet en morceaux avec l'oignon 5 minutes.",
        "Sauté diced chicken with onion for 5 minutes."
      ),
      L(
        "زيد الخيزو، الريز، الخرقوم والماء، وغطّي 15 دقيقة.",
        "Ajoutez carottes, riz, curcuma et eau, couvrez 15 minutes.",
        "Add carrots, rice, turmeric and water, cover 15 minutes."
      ),
      L(
        "خلّي يبرد شوية قبل ما تعمّر العلبة.",
        "Laissez tiédir avant de remplir la boîte.",
        "Cool slightly before filling the box."
      ),
    ],
    equipment: [L("طنجرة", "Casserole", "Pot")],
    tips: [
      L(
        "زيد شوية خيار مقطّع فالعلبة باش تكون متوازنة.",
        "Ajoutez quelques rondelles de concombre pour équilibrer.",
        "Add cucumber slices to balance the box."
      ),
    ],
  },
  {
    slug: "salade-batata-box",
    name: L("سلطة بطاطا للعلبة", "Salade de pommes de terre", "Potato salad box"),
    description: L(
      "سلطة بطاطا بالبيض والزيتون، كتاكل باردة وكتدوز فالعلبة.",
      "Salade de pommes de terre, œuf et olives : se mange froide en lunchbox.",
      "Potato salad with egg and olives — eaten cold, made for lunchboxes."
    ),
    category: "lunchbox",
    tags: ["vegetarian", "budget", "quick"],
    slots: ["lunchbox", "cha"],
    art: "salad",
    prep: 10,
    cook: 15,
    servings: 4,
    cost: 22,
    difficulty: 1,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("potato", 4, "piece"),
      ing("eggs", 3, "piece"),
      ing("olives", 50, "g"),
      ing("tomato", 1, "piece"),
      ing("olive_oil", 3, "tbsp"),
      ing("lemon", 1, "piece"),
    ],
    steps: [
      L(
        "سلق البطاطا والبيض، وخلّيهم يبردو.",
        "Faites cuire pommes de terre et œufs, laissez refroidir.",
        "Boil potatoes and eggs, then cool."
      ),
      L(
        "قطّعهم مكعبات، زيد الزيتون والطماطم.",
        "Coupez en cubes, ajoutez olives et tomate.",
        "Cube them, add olives and tomato."
      ),
      L(
        "تبّل بزيت الزيتون والليمون والملح.",
        "Assaisonnez d'huile d'olive, citron et sel.",
        "Dress with olive oil, lemon and salt."
      ),
    ],
    equipment: [L("طنجرة", "Casserole", "Pot")],
    tips: [
      L(
        "زيد الملح فآخر لحظة باش البطاطا ما تطلقش الماء.",
        "Salez au dernier moment pour éviter que les pommes de terre rendent de l'eau.",
        "Salt at the last minute so the potatoes don't release water."
      ),
    ],
  },
  {
    slug: "cake-bel-yaourt",
    name: L("كيك بالياغورت", "Cake au yaourt", "Yogurt cake"),
    description: L(
      "كيك بالياغورت طري وحلو شوية، للفطور ولا للعلبة.",
      "Cake au yaourt moelleux et peu sucré, pour le goûter ou la lunchbox.",
      "Soft, lightly sweet yogurt cake — snack or lunchbox."
    ),
    category: "desserts",
    tags: ["kid", "budget"],
    slots: ["ftour", "lunchbox"],
    art: "cake",
    prep: 15,
    cook: 30,
    servings: 8,
    cost: 20,
    difficulty: 1,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("flour", 250, "g"),
      ing("yogurt", 1, "piece"),
      ing("eggs", 3, "piece"),
      ing("sugar", 120, "g"),
      ing("oil", 100, "ml"),
      ing("yeast", 1, "tbsp"),
      ing("lemon", 1, "piece"),
    ],
    steps: [
      L(
        "خفق البيض والسكر حتى يبيضّ الخليط.",
        "Battez œufs et sucre jusqu'à blanchiment.",
        "Whisk eggs and sugar until pale."
      ),
      L(
        "زيد الياغورت، الزيت، الطحين والخميرة، وخلّط بشوية.",
        "Ajoutez yaourt, huile, farine et levure, mélangez doucement.",
        "Add yogurt, oil, flour and baking powder, fold gently."
      ),
      L(
        "صبّ فمول مدهون وطيب 30 دقيقة فـ180 درجة.",
        "Versez dans un moule beurré et cuisez 30 minutes à 180 °C.",
        "Pour into a greased tin and bake 30 minutes at 180 °C."
      ),
      L(
        "خلّيه يبرد قبل ما تقطّعو.",
        "Laissez refroidir avant de couper.",
        "Cool before slicing."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven"), L("مول", "Moule", "Cake tin")],
    tips: [
      L(
        "دخّل عود خشب، إلا خرج نقي الكيك واجد.",
        "Plantez un cure-dent : s'il sort sec, le cake est cuit.",
        "Insert a skewer — if it comes out clean, it's done."
      ),
    ],
  },
  {
    slug: "ghriba",
    name: L("غريبة باللوز", "Ghriba aux amandes", "Almond ghriba"),
    description: L(
      "غريبة باللوز كتذوب فالفم، مع أتاي كتولّي حكاية.",
      "Ghriba aux amandes fondante, parfaite avec le thé.",
      "Melt-in-the-mouth almond ghriba — made for tea."
    ),
    category: "desserts",
    tags: ["traditional", "guests"],
    slots: ["ftour"],
    art: "cookie",
    prep: 15,
    cook: 20,
    servings: 10,
    cost: 35,
    difficulty: 2,
    spice: 0,
    ingredients: [
      ing("almonds", 250, "g"),
      ing("sugar", 150, "g"),
      ing("eggs", 2, "piece"),
      ing("flour", 100, "g"),
      ing("orange_blossom", 2, "tbsp"),
      ing("cinnamon", 1, "tsp"),
    ],
    steps: [
      L(
        "طحن اللوز مع السكر حتى يولّي بحال الرمل.",
        "Mixez les amandes avec le sucre jusqu'à texture sableuse.",
        "Blitz almonds with sugar to a sandy texture."
      ),
      L(
        "زيد البيض، ماء الزهر، القرفة والطحين، وخلّط.",
        "Ajoutez œufs, eau de fleur d'oranger, cannelle et farine.",
        "Add eggs, orange blossom, cinnamon and flour."
      ),
      L(
        "شكّل كويرات، غطّيهم بالسكر الناعم وحطّهم فصينية.",
        "Formez des boules, roulez dans le sucre glace et disposez.",
        "Roll balls, coat in icing sugar and arrange."
      ),
      L(
        "طيب 18 دقيقة فـ170 درجة.",
        "Cuisez 18 minutes à 170 °C.",
        "Bake 18 minutes at 170 °C."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven"), L("خلّاط", "Mixeur", "Blender")],
    tips: [
      L(
        "ما تحمّرهاش بزاف، خاصها تبقى فاتحة.",
        "Ne la dorez pas trop, elle doit rester claire.",
        "Don't over-brown — ghriba should stay pale."
      ),
    ],
  },
  {
    slug: "fekkas",
    name: L("فقاص", "Fekkas", "Fekkas"),
    description: L(
      "فقاص مقرمش باللوز والزبيب، حلوى الأتاي بلا منافس.",
      "Fekkas croquant aux amandes et raisins, le biscuit du thé.",
      "Crunchy fekkas with almonds and raisins — the tea biscuit."
    ),
    category: "desserts",
    tags: ["traditional", "budget"],
    slots: ["ftour"],
    art: "cookie",
    prep: 20,
    cook: 25,
    servings: 10,
    cost: 30,
    difficulty: 2,
    spice: 0,
    ingredients: [
      ing("flour", 500, "g"),
      ing("eggs", 3, "piece"),
      ing("sugar", 150, "g"),
      ing("oil", 100, "ml"),
      ing("almonds", 100, "g"),
      ing("raisins", 80, "g"),
      ing("sesame", 2, "tbsp"),
      ing("yeast", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّط الطحين، السكر، الخميرة، البيض والزيت حتى تعقد عجينة.",
        "Mélangez farine, sucre, levure, œufs et huile en pâte.",
        "Mix flour, sugar, yeast, eggs and oil into a dough."
      ),
      L(
        "زيد اللوز، الزبيب والجلجلان.",
        "Ajoutez amandes, raisins et sésame.",
        "Add almonds, raisins and sesame."
      ),
      L(
        "شكّل شرائط وطيبهم 20 دقيقة، من بعد قطّعهم.",
        "Formez des bâtons, cuisez 20 minutes, puis tranchez.",
        "Shape logs, bake 20 minutes, then slice."
      ),
      L(
        "عاود طيب الشرائح 10 دقائق حتى يقرمشو.",
        "Cuisez à nouveau les tranches 10 minutes pour les sécher.",
        "Bake the slices another 10 minutes to crisp."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven")],
    tips: [
      L(
        "خلّيهم يبردو مزيان، كيقرمشو أكثر.",
        "Laissez refroidir complètement, ils durcissent en refroidissant.",
        "Cool completely — they crisp up as they cool."
      ),
    ],
  },
  {
    slug: "chebakia",
    name: L("شباكية", "Chebakia", "Chebakia"),
    description: L(
      "شباكية بالعسل والجلجلان، حلوى رمضان اللي كتعطّر الدار.",
      "Chebakia au miel et sésame, la douceur du Ramadan.",
      "Honey and sesame chebakia — the Ramadan sweet."
    ),
    category: "desserts",
    tags: ["ramadan", "traditional", "guests"],
    slots: ["ftour"],
    art: "cookie",
    prep: 40,
    cook: 30,
    servings: 12,
    cost: 45,
    difficulty: 3,
    spice: 0,
    ingredients: [
      ing("flour", 500, "g"),
      ing("sesame", 100, "g"),
      ing("almonds", 100, "g"),
      ing("honey", 250, "g"),
      ing("cinnamon", 1, "tsp"),
      ing("orange_blossom", 2, "tbsp"),
      ing("oil", 500, "ml"),
      ing("yeast", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّط الطحين، الجلجلان المطحون، اللوز، القرفة والخميرة.",
        "Mélangez farine, sésame moulu, amandes, cannelle et levure.",
        "Mix flour, ground sesame, almonds, cinnamon and yeast."
      ),
      L(
        "زيد ماء الزهر والزيت، واعجن حتى تعقد عجينة قاسحة شوية.",
        "Ajoutez eau de fleur d'oranger et huile, pétrissez.",
        "Add orange blossom and oil, knead into a firm dough."
      ),
      L(
        "ورّق العجين، قطّع مربعات وطويها على شكل وردة.",
        "Étalez, coupez des carrés et pliez en rosace.",
        "Roll out, cut squares and fold into rosettes."
      ),
      L(
        "قليها فالزيت حتى تتحمّر، من بعد غطّيها بالعسل السخون.",
        "Fry until golden, then soak in warm honey.",
        "Fry until golden, then soak in warm honey."
      ),
      L(
        "رشّ الجلجلان فوقها وخلّيها تجفّ.",
        "Parsemez de sésame et laissez sécher.",
        "Sprinkle sesame and let dry."
      ),
    ],
    equipment: [L("مقلاة عميقة", "Friteuse", "Deep pan"), L("مصفاة", "Passoire", "Strainer")],
    tips: [
      L(
        "العسل خاصو يكون سخون، ماشي يغلي.",
        "Le miel doit être chaud, pas bouillant.",
        "Honey should be warm, not boiling."
      ),
    ],
    rotd: false,
  },
];
