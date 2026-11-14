import type { Recipe, RecipeIngredient, Unit } from "./types";
import { L } from "./types";

const ing = (id: string, qty: number, unit: Unit, optional = false): RecipeIngredient => ({
  id,
  qty,
  unit,
  optional,
});

export const breakfastAndLegumes: Recipe[] = [
  {
    slug: "msemen-bel-asal",
    name: L("مسمن بالعسل", "Msemen au miel", "Msemen with honey"),
    description: L(
      "مسمن مورّق سخون بالعسل، فطور المغاربة اللي ما كيتعوّضش.",
      "Msemen feuilleté, chaud et nappé de miel : le petit-déjeuner marocain par excellence.",
      "Flaky msemen, warm and drizzled with honey — the Moroccan breakfast classic."
    ),
    category: "breakfast",
    tags: ["traditional", "kid"],
    slots: ["ftour"],
    art: "msemen",
    prep: 20,
    cook: 10,
    servings: 4,
    cost: 15,
    difficulty: 2,
    spice: 0,
    ingredients: [
      ing("flour", 500, "g"),
      ing("semolina", 250, "g"),
      ing("oil", 6, "tbsp"),
      ing("honey", 4, "tbsp"),
      ing("salt", 1, "tsp"),
      ing("water", 300, "ml"),
    ],
    steps: [
      L(
        "خلّط الطحين، السميدة والملح، وزيد الماء شوية بشوية حتى تعقد العجين.",
        "Mélangez farine, semoule et sel, puis ajoutez l'eau petit à petit jusqu'à obtenir une pâte souple.",
        "Mix flour, semolina and salt, then add water gradually until the dough is soft."
      ),
      L(
        "قسّم العجين لكويرات صغيرة، دهّنهم بالزيت وخلّيهم يرتاحو 20 دقيقة.",
        "Divisez la pâte en petites boules, huilez-les et laissez reposer 20 minutes.",
        "Divide the dough into small balls, oil them and rest for 20 minutes."
      ),
      L(
        "ورّق كل كورة على طاولة مدهونة، وطويها على شكل مربع.",
        "Étalez chaque boule sur un plan huilé, puis pliez-la en carré.",
        "Roll each ball on an oiled surface, then fold it into a square."
      ),
      L(
        "سخّن المقلاة وطيب المسمن حتى يتحمّر من الجهتين.",
        "Chauffez la poêle et cuisez les msemen jusqu'à ce qu'ils soient dorés des deux côtés.",
        "Heat the pan and cook the msemen until golden on both sides."
      ),
      L(
        "قدّمو سخون بالعسل وأتاي بالنعنع.",
        "Servez chaud avec du miel et un thé à la menthe.",
        "Serve warm with honey and mint tea."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Frying pan"), L("طاولة العمل", "Plan de travail", "Work surface")],
    tips: [
      L(
        "خلي العجين يرتاح مزيان، هكذا كيتورّق بسهولة.",
        "Laissez bien reposer la pâte, elle s'étalera plus facilement.",
        "Let the dough rest well so it rolls out easily."
      ),
    ],
    rotd: true,
  },
  {
    slug: "harcha-bel-jben",
    name: L("حرشة بالجبن", "Harcha au fromage", "Harcha with cheese"),
    description: L(
      "حرشة السميدة الطرية بالجبن، سريعة وكتعجب الدراري.",
      "Harcha moelleuse à la semoule et au fromage, rapide et adorée des enfants.",
      "Soft semolina harcha with cheese — quick and kid-approved."
    ),
    category: "breakfast",
    tags: ["traditional", "kid", "quick"],
    slots: ["ftour", "lunchbox"],
    art: "harcha",
    prep: 10,
    cook: 15,
    servings: 4,
    cost: 15,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("semolina", 500, "g"),
      ing("butter", 100, "g"),
      ing("milk", 200, "ml"),
      ing("cheese", 150, "g"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّط السميدة والملح، وزيد الزبدة الذايبة وفرّكها بين يديك.",
        "Mélangez la semoule et le sel, ajoutez le beurre fondu et sablez du bout des doigts.",
        "Mix semolina and salt, add melted butter and rub it in with your fingertips."
      ),
      L(
        "زيد الحليب شوية بشوية حتى تعقد عجينة طرية.",
        "Ajoutez le lait petit à petit jusqu'à obtenir une pâte souple.",
        "Add milk gradually until the dough comes together softly."
      ),
      L(
        "شكّل أقراص رقيقة وطبّقهم فمقلاة سخونة.",
        "Formez des galettes fines et cuisez-les dans une poêle chaude.",
        "Shape thin rounds and cook them in a hot pan."
      ),
      L(
        "قلّبهم حتى يتحمّرو، وزيد الجبن فوقهم قبل ما تسالي.",
        "Retournez-les jusqu'à coloration, puis ajoutez le fromage avant de terminer.",
        "Flip until golden, then add the cheese just before finishing."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Frying pan")],
    tips: [
      L(
        "إذا بغيتي حرشة أطرى، زيدي شوية حليب سخون.",
        "Pour une harcha plus moelleuse, ajoutez un peu de lait chaud.",
        "For a softer harcha, add a splash of warm milk."
      ),
    ],
  },
  {
    slug: "baghrir",
    name: L("بغرير", "Baghrir", "Baghrir"),
    description: L(
      "بغرير مليان ثقوب، كيتشرب العسل والزبدة، فطور خفيف وبنين.",
      "Baghrir aux mille trous, imbibé de miel et de beurre : léger et délicieux.",
      "Thousand-hole baghrir, soaked in honey and butter — light and delicious."
    ),
    category: "breakfast",
    tags: ["traditional", "kid"],
    slots: ["ftour"],
    art: "baghrir",
    prep: 15,
    cook: 15,
    servings: 4,
    cost: 12,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("flour", 250, "g"),
      ing("semolina", 250, "g"),
      ing("yeast", 1, "tsp"),
      ing("milk", 400, "ml"),
      ing("honey", 3, "tbsp"),
      ing("butter", 50, "g"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّط الطحين، السميدة، الخميرة والملح مع الحليب حتى تحصل على خليط سائل.",
        "Mixez farine, semoule, levure et sel avec le lait pour obtenir une pâte liquide.",
        "Blend flour, semolina, yeast and salt with the milk into a liquid batter."
      ),
      L(
        "خلّي الخليط يرتاح 30 دقيقة حتى يبانو الفقاعات.",
        "Laissez reposer 30 minutes, jusqu'à ce que des bulles apparaissent.",
        "Rest for 30 minutes until bubbles form."
      ),
      L(
        "طيب أقراص فمقلاة سخونة بلا ما تقلّب غير من الفوق.",
        "Cuisez des galettes dans une poêle chaude sans les retourner, juste en surface.",
        "Cook rounds in a hot pan without flipping, only the top sets."
      ),
      L(
        "قدّمهم بالعسل والزبدة الذايبة.",
        "Servez avec miel et beurre fondu.",
        "Serve with honey and melted butter."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Frying pan"), L("خلّاط", "Mixeur", "Blender")],
    tips: [
      L(
        "المقلاة خاصها تكون سخونة بزاف باش تطلع الثقوب.",
        "La poêle doit être bien chaude pour que les trous se forment.",
        "The pan must be very hot for the holes to form."
      ),
    ],
  },
  {
    slug: "sfenj",
    name: L("سفنج طنجاوي", "Sfenj tangérois", "Tangier sfenj"),
    description: L(
      "سفنج مقرمش من برّا وطري من الداخل، أحسن حاجة فالصباح.",
      "Sfenj croustillant dehors, moelleux dedans : le meilleur du matin.",
      "Crispy outside, airy inside — the best morning treat."
    ),
    category: "breakfast",
    tags: ["traditional", "tangier"],
    slots: ["ftour"],
    art: "sfenj",
    prep: 20,
    cook: 20,
    servings: 4,
    cost: 12,
    difficulty: 2,
    spice: 0,
    region: "tangier",
    ingredients: [
      ing("flour", 500, "g"),
      ing("yeast", 1, "tbsp"),
      ing("water", 350, "ml"),
      ing("oil", 1, "l"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّط الطحين، الخميرة، الملح والماء حتى تعقد عجينة طرية.",
        "Mélangez farine, levure, sel et eau jusqu'à obtenir une pâte souple.",
        "Mix flour, yeast, salt and water into a soft dough."
      ),
      L(
        "غطّيها وخلّيها تخمّر ساعة حتى توجد.",
        "Couvrez et laissez lever une heure.",
        "Cover and let rise for one hour."
      ),
      L(
        "سخّن الزيت، وخود كويرة عجين، ثقبها من الوسط ومدّها.",
        "Chauffez l'huile, prenez une boule, trouez-la au centre et étirez-la.",
        "Heat the oil, take a ball, pierce the centre and stretch it."
      ),
      L(
        "قلي السفنج حتى يتحمّر، وقطّرو من الزيت.",
        "Faites frire jusqu'à coloration, puis égouttez.",
        "Fry until golden, then drain."
      ),
      L(
        "قدّمو سخون مع أتاي.",
        "Servez chaud avec le thé.",
        "Serve hot with tea."
      ),
    ],
    equipment: [L("مقلاة عميقة", "Friteuse", "Deep pan"), L("ورق مطبخ", "Papier absorbant", "Kitchen paper")],
    tips: [
      L(
        "العجين خاصو يكون طري، ماشي قاسح.",
        "La pâte doit être molle, pas ferme.",
        "The dough should be soft, not firm."
      ),
    ],
  },
  {
    slug: "bid-bel-tmatem",
    name: L("بيض بالطماطم", "Œufs à la tomate", "Eggs with tomato"),
    description: L(
      "بيض مطبوخ فطماطم طرية بالكمون، عشا سريع ولا فطور دافي.",
      "Œufs mijotés dans une tomate fraîche au cumin : dîner rapide ou petit-déj chaud.",
      "Eggs simmered in fresh tomato and cumin — a fast dinner or warm breakfast."
    ),
    category: "breakfast",
    tags: ["quick", "budget", "vegetarian", "kid"],
    slots: ["ftour", "cha"],
    art: "eggs",
    prep: 5,
    cook: 12,
    servings: 4,
    cost: 18,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("eggs", 4, "piece"),
      ing("tomato", 3, "piece"),
      ing("onion", 1, "piece"),
      ing("garlic", 2, "piece"),
      ing("cumin", 1, "tsp"),
      ing("oil", 2, "tbsp"),
      ing("bread", 1, "piece"),
    ],
    steps: [
      L(
        "قلي البصلة والثوم فزيت حتى يذبالو.",
        "Faites revenir oignon et ail dans l'huile.",
        "Sauté onion and garlic in oil until soft."
      ),
      L(
        "زيد الطماطم المفروشة والكمون، وخلّيها تطيب 8 دقائق.",
        "Ajoutez les tomates râpées et le cumin, laissez cuire 8 minutes.",
        "Add grated tomatoes and cumin, cook for 8 minutes."
      ),
      L(
        "كسّر البيض فوق الصلصة، غطّي وخلّي 4 دقائق.",
        "Cassez les œufs sur la sauce, couvrez et laissez 4 minutes.",
        "Crack the eggs over the sauce, cover and cook 4 minutes."
      ),
      L(
        "قدّم مع الخبز السخون.",
        "Servez avec du pain chaud.",
        "Serve with warm bread."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Frying pan")],
    tips: [
      L(
        "إذا بغيتي الصفار طري، ما تغطّيش بزاف.",
        "Pour un jaune coulant, ne couvrez pas trop longtemps.",
        "For runny yolks, don't cover for too long."
      ),
    ],
    rotd: true,
  },
  {
    slug: "atay-bel-na3na3",
    name: L("أتاي بالنعنع", "Thé à la menthe", "Mint tea"),
    description: L(
      "أتاي مغربي بالنعنع، كيجمع الدار وكيبرد القلب.",
      "Le thé marocain à la menthe, qui rassemble la maison.",
      "Moroccan mint tea — the one that brings everyone to the table."
    ),
    category: "breakfast",
    tags: ["traditional"],
    slots: ["ftour", "cha"],
    art: "tea",
    prep: 5,
    cook: 10,
    servings: 4,
    cost: 8,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("tea", 2, "tbsp"),
      ing("mint", 1, "bunch"),
      ing("sugar", 4, "tbsp"),
      ing("water", 1, "l"),
    ],
    steps: [
      L(
        "غلي الماء فبراد، وزيد أتاي وخلّيه يغلي 2 دقائق.",
        "Faites bouillir l'eau dans une théière, ajoutez le thé et laissez 2 minutes.",
        "Boil water in a teapot, add tea and simmer for 2 minutes."
      ),
      L(
        "زيد النعنع والسكر، وخلّي 3 دقائق أخرى.",
        "Ajoutez la menthe et le sucre, laissez encore 3 minutes.",
        "Add mint and sugar, steep for another 3 minutes."
      ),
      L(
        "صبّ من علو باش يتكوّن الرغوة، وعاود هاد العملية جوج مرات.",
        "Versez de haut pour créer la mousse, répétez deux fois.",
        "Pour from a height to build the foam, repeat twice."
      ),
    ],
    equipment: [L("براد", "Théière", "Teapot"), L("كيسان", "Verres", "Glasses")],
    tips: [
      L(
        "ما تخليش النعنع يغلي بزاف، كيمرّ.",
        "Ne laissez pas la menthe trop bouillir, elle devient amère.",
        "Don't over-boil the mint or it turns bitter."
      ),
    ],
  },
  {
    slug: "loubia",
    name: L("لوبيا بالخضرة", "Loubia", "Loubia"),
    description: L(
      "لوبيا بيضاء فمرقة بالطماطم والكمون، ماكلة الأسبوع اللي كتسدّ.",
      "Haricots blancs mijotés à la tomate et au cumin : le plat de la semaine.",
      "White beans simmered in tomato and cumin — the weekday filler."
    ),
    category: "legumes",
    tags: ["budget", "vegetarian", "traditional"],
    slots: ["ghda", "cha"],
    art: "legumes",
    prep: 15,
    cook: 45,
    servings: 4,
    cost: 25,
    difficulty: 1,
    spice: 1,
    ingredients: [
      ing("white_beans", 500, "g"),
      ing("tomato", 3, "piece"),
      ing("onion", 1, "piece"),
      ing("garlic", 3, "piece"),
      ing("tomato_paste", 2, "tbsp"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
      ing("coriander", 1, "bunch"),
    ],
    steps: [
      L(
        "خلّي اللوبيا فالماء ليلة كاملة ولا استعمل المعلّبة.",
        "Faites tremper les haricots toute la nuit, ou utilisez des conserves.",
        "Soak the beans overnight, or use canned ones."
      ),
      L(
        "قلي البصلة، الثوم والطماطم فزيت الزيتون 5 دقائق.",
        "Faites revenir oignon, ail et tomate à l'huile d'olive 5 minutes.",
        "Sauté onion, garlic and tomato in olive oil for 5 minutes."
      ),
      L(
        "زيد اللوبيا، المعجون، التوابل والماء وغطّي.",
        "Ajoutez les haricots, le concentré, les épices et l'eau, puis couvrez.",
        "Add beans, tomato paste, spices and water, then cover."
      ),
      L(
        "خلّيها تطيب 40 دقيقة حتى تعقد المرقة.",
        "Laissez mijoter 40 minutes jusqu'à ce que la sauce épaississe.",
        "Simmer for 40 minutes until the sauce thickens."
      ),
      L(
        "زيد القصبر وقدّم مع الخبز.",
        "Ajoutez la coriandre et servez avec du pain.",
        "Finish with coriander and serve with bread."
      ),
    ],
    equipment: [L("طنجرة", "Cocotte", "Pot")],
    tips: [
      L(
        "إذا استعملتي المعلّبة، نقّصي وقت الطياب للنصف.",
        "Avec des conserves, réduisez le temps de cuisson de moitié.",
        "With canned beans, halve the cooking time."
      ),
    ],
    rotd: true,
  },
  {
    slug: "bissara",
    name: L("بيصارة", "Bissara", "Bissara"),
    description: L(
      "بيصارة طنجاوية سخونة بالزيت والكمون، فطور الشتاء بلا منازع.",
      "Bissara tangéroise, chaude, à l'huile d'olive et au cumin : le petit-déj d'hiver.",
      "Tangier bissara, hot with olive oil and cumin — the winter breakfast."
    ),
    category: "legumes",
    tags: ["budget", "vegetarian", "tangier", "traditional"],
    slots: ["ftour", "cha"],
    art: "soup",
    prep: 10,
    cook: 50,
    servings: 4,
    cost: 18,
    difficulty: 1,
    spice: 0,
    region: "tangier",
    ingredients: [
      ing("broad_beans", 500, "g"),
      ing("garlic", 4, "piece"),
      ing("cumin", 1, "tbsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("paprika", 1, "tsp"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "خلّي الفول فالماء ليلة كاملة.",
        "Faites tremper les fèves toute la nuit.",
        "Soak the broad beans overnight."
      ),
      L(
        "طيبهم مع الثوم فماء حتى يذوبو مزيان.",
        "Cuisez-les avec l'ail dans l'eau jusqu'à ce qu'ils fondent.",
        "Boil with garlic until completely soft."
      ),
      L(
        "خلّط الكل بالخلّاط حتى تعقد بحال الكريمة.",
        "Mixez jusqu'à obtenir une texture crémeuse.",
        "Blend until creamy."
      ),
      L(
        "قدّمها فبول، وزيد زيت الزيتون، الكمون والفلفلة.",
        "Servez dans un bol avec huile d'olive, cumin et paprika.",
        "Serve in a bowl with olive oil, cumin and paprika."
      ),
    ],
    equipment: [L("طنجرة", "Cocotte", "Pot"), L("خلّاط", "Mixeur", "Blender")],
    tips: [
      L(
        "زيد شوية ماء سخون إلا بغيتيها خفيفة.",
        "Ajoutez un peu d'eau chaude pour une texture plus légère.",
        "Add hot water for a lighter texture."
      ),
    ],
  },
  {
    slug: "harira",
    name: L("حريرة", "Harira", "Harira"),
    description: L(
      "حريرة بالعدس والحمص والشعرية، سخونة وكتدفّي الدار.",
      "Harira aux lentilles, pois chiches et vermicelles : chaude et réconfortante.",
      "Harira with lentils, chickpeas and vermicelli — warming and comforting."
    ),
    category: "legumes",
    tags: ["traditional", "ramadan", "budget"],
    slots: ["ftour", "cha"],
    art: "soup",
    prep: 20,
    cook: 40,
    servings: 6,
    cost: 32,
    difficulty: 2,
    spice: 0,
    ingredients: [
      ing("lentils", 150, "g"),
      ing("chickpeas", 100, "g"),
      ing("tomato", 3, "piece"),
      ing("onion", 1, "piece"),
      ing("vermicelli", 100, "g"),
      ing("tomato_paste", 2, "tbsp"),
      ing("coriander", 1, "bunch"),
      ing("parsley", 1, "bunch"),
      ing("turmeric", 1, "tsp"),
      ing("cinnamon", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
      ing("flour", 1, "tbsp"),
    ],
    steps: [
      L(
        "قلي البصلة والطماطم والتوابل فزيت الزيتون.",
        "Faites revenir oignon, tomate et épices à l'huile d'olive.",
        "Sauté onion, tomato and spices in olive oil."
      ),
      L(
        "زيد العدس، الحمص والماء، وخلّي 25 دقيقة.",
        "Ajoutez lentilles, pois chiches et eau, laissez 25 minutes.",
        "Add lentils, chickpeas and water, cook 25 minutes."
      ),
      L(
        "زيد الشعرية والمعجون، وخلّي 10 دقائق.",
        "Ajoutez vermicelles et concentré, laissez 10 minutes.",
        "Add vermicelli and tomato paste, cook 10 minutes."
      ),
      L(
        "خلّط الطحين بشوية ماء وزيدو باش تعقد الحريرة.",
        "Délayez la farine dans un peu d'eau et versez pour épaissir.",
        "Mix flour with a little water and stir in to thicken."
      ),
      L(
        "زيد القصبر والمعدنوس وقدّمها سخونة.",
        "Ajoutez coriandre et persil, servez bien chaud.",
        "Add coriander and parsley, serve hot."
      ),
    ],
    equipment: [L("طنجرة", "Cocotte", "Pot"), L("خلّاط يدوي", "Fouet", "Whisk")],
    tips: [
      L(
        "فوقت رمضان، حضّرها قبل بساعة وخلّيها على نار هادئة.",
        "Pendant le Ramadan, préparez-la une heure avant et laissez à feu doux.",
        "During Ramadan, make it an hour ahead and keep it on low heat."
      ),
    ],
    rotd: true,
  },
  {
    slug: "ades",
    name: L("عدس بالخضرة", "Lentilles mijotées", "Lentil stew"),
    description: L(
      "عدس بالبصلة والطماطم، رخيص ومغذّي وكتطيبه فربع ساعة تحضير.",
      "Lentilles à l'oignon et à la tomate : économique, nourrissant, prêt en 15 min de préparation.",
      "Lentils with onion and tomato — cheap, nourishing, 15 minutes of prep."
    ),
    category: "legumes",
    tags: ["budget", "vegetarian"],
    slots: ["ghda", "cha"],
    art: "legumes",
    prep: 10,
    cook: 35,
    servings: 4,
    cost: 20,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("lentils", 400, "g"),
      ing("onion", 1, "piece"),
      ing("tomato", 2, "piece"),
      ing("garlic", 3, "piece"),
      ing("turmeric", 1, "tsp"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
    ],
    steps: [
      L(
        "قلي البصلة والثوم حتى يذبالو.",
        "Faites revenir l'oignon et l'ail.",
        "Sauté onion and garlic until soft."
      ),
      L(
        "زيد الطماطم والتوابل، وخلّي 5 دقائق.",
        "Ajoutez tomate et épices, laissez 5 minutes.",
        "Add tomato and spices, cook 5 minutes."
      ),
      L(
        "زيد العدس والماء وغطّي، وخلّي 30 دقيقة.",
        "Ajoutez lentilles et eau, couvrez et laissez 30 minutes.",
        "Add lentils and water, cover and cook 30 minutes."
      ),
      L(
        "قدّم مع الخبز ولا فوق الريز.",
        "Servez avec du pain ou sur du riz.",
        "Serve with bread or over rice."
      ),
    ],
    equipment: [L("طنجرة", "Cocotte", "Pot")],
    tips: [
      L(
        "ما تملّحش بزاف فالبداية، العدس كيتقشّر.",
        "Ne salez pas trop au début, les lentilles durcissent.",
        "Don't salt too early or the lentils toughen."
      ),
    ],
  },
  {
    slug: "mchouia",
    name: L("سلطة مشوية", "Salade mchouia", "Grilled salad"),
    description: L(
      "فلفلة وطماطم مشوية بالثوم والكمون، سلطة كتكمّل أي ماكلة.",
      "Poivrons et tomates grillés, ail et cumin : la salade qui accompagne tout.",
      "Grilled peppers and tomatoes with garlic and cumin — the salad that goes with everything."
    ),
    category: "salads",
    tags: ["quick", "budget", "vegetarian"],
    slots: ["ghda", "cha"],
    art: "salad",
    prep: 10,
    cook: 10,
    servings: 4,
    cost: 14,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("pepper", 4, "piece"),
      ing("tomato", 4, "piece"),
      ing("garlic", 2, "piece"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
    ],
    steps: [
      L(
        "شوي الفلفلة والطماطم فوق النار ولا فالفرّان حتى يتحمّرو.",
        "Grillez poivrons et tomates au feu ou au four jusqu'à ce qu'ils noircissent.",
        "Grill peppers and tomatoes over flame or in the oven until charred."
      ),
      L(
        "غطّيهم 5 دقائق، من بعد نقّيهم من القشرة.",
        "Couvrez 5 minutes, puis pelez-les.",
        "Cover for 5 minutes, then peel."
      ),
      L(
        "فرّقهم بالثوم، الكمون، زيت الزيتون والملح.",
        "Écrasez avec ail, cumin, huile d'olive et sel.",
        "Crush with garlic, cumin, olive oil and salt."
      ),
      L(
        "قدّمها باردة ولا سخونة مع الخبز.",
        "Servez froide ou tiède avec du pain.",
        "Serve cold or warm with bread."
      ),
    ],
    equipment: [L("شواية", "Grill", "Grill"), L("فرّان", "Four", "Oven")],
    tips: [
      L(
        "نقّي القشرة مزيان باش ما تكونش مرّة.",
        "Pelez bien pour éviter l'amertume.",
        "Peel well to avoid bitterness."
      ),
    ],
  },
  {
    slug: "zaalouk",
    name: L("زعلوك", "Zaalouk", "Zaalouk"),
    description: L(
      "زعلوك البينجان بالطماطم، كيدوز مع الخبز ولا كطبق جانبي.",
      "Zaalouk d'aubergines à la tomate, parfait avec du pain ou en accompagnement.",
      "Eggplant and tomato zaalouk — great with bread or as a side."
    ),
    category: "salads",
    tags: ["vegetarian", "budget", "traditional"],
    slots: ["ghda", "cha"],
    art: "salad",
    prep: 10,
    cook: 20,
    servings: 4,
    cost: 18,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("eggplant", 3, "piece"),
      ing("tomato", 4, "piece"),
      ing("garlic", 3, "piece"),
      ing("paprika", 1, "tsp"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("coriander", 1, "bunch"),
    ],
    steps: [
      L(
        "قطّع البينجان وطيبو فالماء ولا بالبخار 10 دقائق.",
        "Coupez les aubergines et cuisez-les à l'eau ou à la vapeur 10 minutes.",
        "Chop the eggplant and cook in water or steam for 10 minutes."
      ),
      L(
        "قلي الثوم والطماطم فزيت الزيتون حتى تعقد.",
        "Faites revenir ail et tomate à l'huile d'olive jusqu'à réduction.",
        "Sauté garlic and tomato in olive oil until thick."
      ),
      L(
        "زيد البينجان والتوابل، وهرّس الكل.",
        "Ajoutez l'aubergine et les épices, écrasez le tout.",
        "Add eggplant and spices, mash everything together."
      ),
      L(
        "خلّي 5 دقائق، زيد القصبر وقدّم.",
        "Laissez 5 minutes, ajoutez la coriandre et servez.",
        "Cook 5 minutes, add coriander and serve."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "زيد شوية ليمون فالنهاية باش يطلع الطعم.",
        "Un peu de citron à la fin réveille le goût.",
        "A squeeze of lemon at the end lifts the flavour."
      ),
    ],
  },
  {
    slug: "taktouka",
    name: L("تكتوكة", "Taktouka", "Taktouka"),
    description: L(
      "تكتوكة بالفلفلة والطماطم، سلطة مغربية كتجي مع كل شي.",
      "Taktouka de poivrons et tomates, la salade marocaine passe-partout.",
      "Pepper and tomato taktouka — the Moroccan side that fits everything."
    ),
    category: "salads",
    tags: ["vegetarian", "budget", "traditional"],
    slots: ["ghda", "cha"],
    art: "salad",
    prep: 10,
    cook: 15,
    servings: 4,
    cost: 16,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("pepper", 3, "piece"),
      ing("tomato", 4, "piece"),
      ing("garlic", 2, "piece"),
      ing("paprika", 1, "tsp"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
    ],
    steps: [
      L(
        "قطّع الفلفلة والطماطم قطع صغيرة.",
        "Coupez poivrons et tomates en petits dés.",
        "Dice the peppers and tomatoes."
      ),
      L(
        "قلي الثوم فزيت الزيتون، زيد الفلفلة وخلّي 5 دقائق.",
        "Faites revenir l'ail, ajoutez les poivrons et laissez 5 minutes.",
        "Sauté garlic, add peppers and cook 5 minutes."
      ),
      L(
        "زيد الطماطم والتوابل، وخلّي 10 دقائق حتى تعقد.",
        "Ajoutez tomates et épices, laissez 10 minutes jusqu'à réduction.",
        "Add tomatoes and spices, cook 10 minutes until thick."
      ),
      L(
        "قدّمها باردة ولا سخونة.",
        "Servez froide ou tiède.",
        "Serve cold or warm."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "ما تهرسش بزاف، خاصها تبقى خشينة.",
        "Ne mixez pas trop, elle doit rester rustique.",
        "Don't over-mash — keep it rustic."
      ),
    ],
  },
  {
    slug: "batata-mchermla",
    name: L("بطاطا مچرمة", "Batata mchermla", "Batata mchermla"),
    description: L(
      "بطاطا بالشرمولة والزيتون، طبق رخيص وبنين بلا لحمة.",
      "Pommes de terre à la chermoula et olives : économique et savoureux.",
      "Potatoes in chermoula with olives — cheap, hearty, meat-free."
    ),
    category: "vegetables",
    tags: ["budget", "vegetarian", "quick"],
    slots: ["ghda", "cha"],
    art: "veg",
    prep: 10,
    cook: 20,
    servings: 4,
    cost: 20,
    difficulty: 1,
    spice: 1,
    ingredients: [
      ing("potato", 6, "piece"),
      ing("garlic", 3, "piece"),
      ing("paprika", 1, "tsp"),
      ing("cumin", 1, "tsp"),
      ing("preserved_lemon", 1, "piece"),
      ing("olives", 100, "g"),
      ing("olive_oil", 4, "tbsp"),
      ing("coriander", 1, "bunch"),
    ],
    steps: [
      L(
        "قطّع البطاطا طوابع وطيبها فالماء 10 دقائق.",
        "Coupez les pommes de terre en rondelles et cuisez 10 minutes à l'eau.",
        "Slice the potatoes and parboil for 10 minutes."
      ),
      L(
        "خلّط الثوم، الفلفلة، الكمون، الليمون المصيّر والزيت.",
        "Mélangez ail, paprika, cumin, citron confit et huile.",
        "Mix garlic, paprika, cumin, preserved lemon and oil."
      ),
      L(
        "حطّي البطاطا فطاجين، زيد الشرمولة والزيتون.",
        "Disposez les pommes de terre dans un tajine, ajoutez chermoula et olives.",
        "Arrange potatoes in a tagine, add chermoula and olives."
      ),
      L(
        "غطّي وطيب 15 دقيقة على نار هادئة.",
        "Couvrez et cuisez 15 minutes à feu doux.",
        "Cover and cook 15 minutes on low heat."
      ),
      L(
        "زيّن بالقصبر وقدّم مع الخبز.",
        "Garnissez de coriandre et servez avec du pain.",
        "Garnish with coriander and serve with bread."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine"), L("طنجرة", "Cocotte", "Pot")],
    tips: [
      L(
        "ما تطيّبهاش بزاف، خاصها تبقى محافظة على شكلها.",
        "Ne la cuisez pas trop, elle doit garder sa forme.",
        "Don't overcook — the slices should hold their shape."
      ),
    ],
  },
];
