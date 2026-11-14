import type { Recipe, RecipeIngredient, Unit } from "./types";
import { L } from "./types";

const ing = (id: string, qty: number, unit: Unit, optional = false): RecipeIngredient => ({
  id,
  qty,
  unit,
  optional,
});

export const taginesAndCouscous: Recipe[] = [
  {
    slug: "tajine-kefta-bel-bid",
    name: L("طاجين الكفتة بالبيض", "Tajine kefta aux œufs", "Kefta tagine with eggs"),
    description: L(
      "كفتة فمرقة طماطم بالكمون، والبيض كيطيب فوقها فآخر لحظة.",
      "Kefta dans une sauce tomate au cumin, avec des œufs pochés au dernier moment.",
      "Kefta in a cumin tomato sauce, with eggs poached at the last minute."
    ),
    category: "tagine",
    tags: ["traditional", "kid", "quick"],
    slots: ["ghda", "cha"],
    art: "tagine",
    prep: 15,
    cook: 20,
    servings: 4,
    cost: 55,
    difficulty: 1,
    spice: 1,
    region: "national",
    ingredients: [
      ing("kefta", 500, "g"),
      ing("tomato", 4, "piece"),
      ing("onion", 1, "piece"),
      ing("garlic", 3, "piece"),
      ing("eggs", 4, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("coriander", 1, "bunch"),
      ing("olive_oil", 3, "tbsp"),
    ],
    steps: [
      L(
        "خلّط الكفتة مع الثوم، الكمون، الفلفلة والقصبر، وشكّل كويرات صغيرة.",
        "Mélangez la kefta avec ail, cumin, paprika et coriandre, puis formez des boulettes.",
        "Mix kefta with garlic, cumin, paprika and coriander, then shape small balls."
      ),
      L(
        "فرّق البصلة والطماطم فطاجين مع الزيت والتوابل.",
        "Étalez oignon et tomate dans le tajine avec l'huile et les épices.",
        "Spread onion and tomato in the tagine with oil and spices."
      ),
      L(
        "حطّي الكويرات فوق الصلصة، زيد نص كأس ماء وغطّي.",
        "Disposez les boulettes sur la sauce, ajoutez un demi-verre d'eau et couvrez.",
        "Lay the balls on the sauce, add half a glass of water and cover."
      ),
      L(
        "طيب 15 دقيقة، من بعد كسّر البيض فوقها وخلّي 5 دقائق.",
        "Cuisez 15 minutes, puis cassez les œufs dessus et laissez 5 minutes.",
        "Cook 15 minutes, then crack the eggs on top and cook 5 more."
      ),
      L(
        "قدّم الطاجين سخون مع الخبز.",
        "Servez le tajine chaud avec du pain.",
        "Serve hot with bread."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine")],
    tips: [
      L(
        "ما تحرّكش الكفتة بزاف باش ما تهربش.",
        "Ne remuez pas trop les boulettes pour qu'elles restent entières.",
        "Don't stir the meatballs too much or they'll break."
      ),
    ],
    rotd: true,
  },
  {
    slug: "tajine-djaj-bel-limoun",
    name: L("طاجين الدجاج بالليمون المصيّر", "Poulet au citron confit", "Chicken with preserved lemon"),
    description: L(
      "دجاج بالليمون المصيّر والزيتون، الطاجين اللي كيتدار للضياف.",
      "Poulet au citron confit et olives, le tajine des invités.",
      "Chicken with preserved lemon and olives — the guest-day tagine."
    ),
    category: "tagine",
    tags: ["traditional", "guests", "tangier"],
    slots: ["ghda"],
    art: "chicken",
    prep: 15,
    cook: 35,
    servings: 4,
    cost: 65,
    difficulty: 2,
    spice: 0,
    region: "tangier",
    ingredients: [
      ing("chicken", 1, "kg"),
      ing("onion", 2, "piece"),
      ing("garlic", 4, "piece"),
      ing("preserved_lemon", 1, "piece"),
      ing("olives", 100, "g"),
      ing("turmeric", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("coriander", 1, "bunch"),
      ing("saffron", 1, "pinch"),
    ],
    steps: [
      L(
        "خلّط الثوم، الخرقوم، الزعفران، الزيت والملح، ودهّن بيهم الدجاج.",
        "Mélangez ail, curcuma, safran, huile et sel, puis badigeonnez le poulet.",
        "Mix garlic, turmeric, saffron, oil and salt, then coat the chicken."
      ),
      L(
        "حطّي البصل المفروش فطاجين، وفوقو الدجاج.",
        "Étalez l'oignon dans le tajine et posez le poulet dessus.",
        "Spread the onion in the tagine and place the chicken on top."
      ),
      L(
        "زيد نص كأس ماء، غطّي وطيب 25 دقيقة على نار هادئة.",
        "Ajoutez un demi-verre d'eau, couvrez et cuisez 25 minutes à feu doux.",
        "Add half a glass of water, cover and cook 25 minutes on low."
      ),
      L(
        "زيد الليمون المصيّر والزيتون، وخلّي 10 دقائق.",
        "Ajoutez citron confit et olives, laissez 10 minutes.",
        "Add preserved lemon and olives, cook 10 minutes."
      ),
      L(
        "زيّن بالقصبر وقدّم مع الخبز ولا الريز.",
        "Garnissez de coriandre et servez avec pain ou riz.",
        "Garnish with coriander and serve with bread or rice."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine")],
    tips: [
      L(
        "الليمون المصيّر مالح، ذوق قبل ما تزيد الملح.",
        "Le citron confit est salé, goûtez avant d'ajouter du sel.",
        "Preserved lemon is salty — taste before adding salt."
      ),
    ],
  },
  {
    slug: "tajine-sardine-chermoula",
    name: L("طاجين السردين بالشرمولة", "Tajine de sardines à la chermoula", "Sardine tagine with chermoula"),
    description: L(
      "الحوت الرخيص ديال طنجة، بنين وسريع، كيدوز مع الخبز.",
      "Le poisson du quotidien à Tanger : économique, parfumé, à tremper dans le pain.",
      "Tangier's everyday fish — cheap, fragrant, made for bread."
    ),
    category: "fish",
    tags: ["tangier", "fish", "budget", "quick"],
    slots: ["ghda", "cha"],
    art: "fish",
    prep: 15,
    cook: 20,
    servings: 4,
    cost: 38,
    difficulty: 1,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("sardine", 1, "kg"),
      ing("tomato", 3, "piece"),
      ing("garlic", 3, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("preserved_lemon", 1, "piece", true),
      ing("olive_oil", 3, "tbsp"),
      ing("coriander", 1, "bunch"),
    ],
    steps: [
      L(
        "نقّي السردين وغسلو مزيان.",
        "Nettoyez et lavez soigneusement les sardines.",
        "Clean and rinse the sardines well."
      ),
      L(
        "خلّط الثوم، الكمون، الفلفلة، الزيت والليمون حتى تولّي بحال العجينة.",
        "Mélangez ail, cumin, paprika, huile et citron en pâte.",
        "Mix garlic, cumin, paprika, oil and lemon into a paste."
      ),
      L(
        "فرّق الطماطم فطاجين، وفوقها السردين والشرموالة.",
        "Étalez les tomates dans le tajine, puis sardines et chermoula.",
        "Layer tomatoes in the tagine, then sardines and chermoula."
      ),
      L(
        "زيد شوية ماء، غطّي وطيب 15 دقيقة على نار متوسطة.",
        "Ajoutez un peu d'eau, couvrez et cuisez 15 minutes à feu moyen.",
        "Add a splash of water, cover and cook 15 minutes on medium."
      ),
      L(
        "زيّن بالقصبر وقدّم مع الخبز.",
        "Garnissez de coriandre et servez avec du pain.",
        "Garnish with coriander and serve with bread."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine")],
    tips: [
      L(
        "السردين ما كيحتاجش وقت طويل، إلا طاب بزاف كيتفتّت.",
        "Les sardines cuisent vite, trop cuites elles se défont.",
        "Sardines cook fast — overcooking makes them fall apart."
      ),
    ],
    rotd: true,
  },
  {
    slug: "sardine-mchermla",
    name: L("سردين مچرمة", "Sardines mchermel", "Sardines mchermel"),
    description: L(
      "سردين متبّل بالشرمولة ومقلي، مقرمش وبنين.",
      "Sardines marinées à la chermoula puis frites : croustillantes et parfumées.",
      "Sardines marinated in chermoula then fried — crisp and fragrant."
    ),
    category: "fish",
    tags: ["tangier", "fish", "quick"],
    slots: ["ghda", "cha"],
    art: "fish",
    prep: 20,
    cook: 10,
    servings: 4,
    cost: 35,
    difficulty: 1,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("sardine", 1, "kg"),
      ing("garlic", 4, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("coriander", 1, "bunch"),
      ing("flour", 100, "g"),
      ing("oil", 200, "ml"),
      ing("lemon", 1, "piece"),
    ],
    steps: [
      L(
        "خلّط الثوم، الكمون، الفلفلة، القصبر وزيت الزيتون.",
        "Mélangez ail, cumin, paprika, coriandre et huile d'olive.",
        "Mix garlic, cumin, paprika, coriander and olive oil."
      ),
      L(
        "دهّن السردين بالشرمولة وخلّيه 30 دقيقة.",
        "Badigeonnez les sardines de chermoula et laissez 30 minutes.",
        "Coat the sardines in chermoula and rest 30 minutes."
      ),
      L(
        "دوز السردين فالطحين وقليه فالزيت السخون.",
        "Passez les sardines dans la farine et faites-les frire.",
        "Dust in flour and fry in hot oil."
      ),
      L(
        "قدّمو مع الليمون والسلطة.",
        "Servez avec citron et salade.",
        "Serve with lemon and salad."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Frying pan")],
    tips: [
      L(
        "جفّف السردين قبل ما تدوزو فالطحين باش ما يتلصقش.",
        "Séchez les sardines avant la farine pour éviter qu'elles collent.",
        "Dry the sardines before flouring so they don't stick."
      ),
    ],
  },
  {
    slug: "couscous-bel-khodra",
    name: L("كسكس بالخضرة", "Couscous aux légumes", "Vegetable couscous"),
    description: L(
      "كسكس الجمعة بالخضرة والحمص، الطبق اللي كيجمع العائلة.",
      "Le couscous du vendredi aux légumes et pois chiches, qui rassemble la famille.",
      "Friday couscous with vegetables and chickpeas — the family table."
    ),
    category: "couscous",
    tags: ["friday", "traditional", "vegetarian"],
    slots: ["ghda"],
    art: "couscous",
    prep: 25,
    cook: 50,
    servings: 6,
    cost: 55,
    difficulty: 2,
    spice: 0,
    region: "national",
    ingredients: [
      ing("semolina", 500, "g"),
      ing("carrot", 4, "piece"),
      ing("zucchini", 2, "piece"),
      ing("potato", 2, "piece"),
      ing("tomato", 3, "piece"),
      ing("onion", 1, "piece"),
      ing("chickpeas", 150, "g"),
      ing("turmeric", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
    ],
    steps: [
      L(
        "بلّل السميدة بالماء والملح وفرّكها، من بعد بخّرها 20 دقيقة.",
        "Humidifiez la semoule avec eau et sel, puis faites-la cuire à la vapeur 20 minutes.",
        "Moisten the semolina with water and salt, then steam for 20 minutes."
      ),
      L(
        "قلي البصل والطماطم والتوابل فقاع الكسكس.",
        "Faites revenir oignon, tomate et épices dans la base du couscoussier.",
        "Sauté onion, tomato and spices in the couscoussier base."
      ),
      L(
        "زيد الخضرة، الحمص والماء، وخلّي المرقة تطيب 30 دقيقة.",
        "Ajoutez légumes, pois chiches et eau, laissez mijoter 30 minutes.",
        "Add vegetables, chickpeas and water, simmer 30 minutes."
      ),
      L(
        "بخّر السميدة مرة أخرى فوق المرقة 15 دقيقة.",
        "Steam the semolina again over the broth for 15 minutes.",
        "Steam the semolina again over the broth for 15 minutes."
      ),
      L(
        "حطّي السميدة فطبق، زيد المرقة والخضرة فوقها.",
        "Dressez la semoule, arrosez de bouillon et disposez les légumes.",
        "Plate the semolina, ladle broth and arrange vegetables."
      ),
    ],
    equipment: [L("كسكاس", "Couscoussier", "Couscoussier")],
    tips: [
      L(
        "كل مرة تبخّر السميدة، فرّقها بيديك باش ما تتكتّلش.",
        "Entre deux vapeurs, séparez les grains à la main.",
        "Between steamings, rub the grains to keep them loose."
      ),
    ],
  },
  {
    slug: "couscous-bel-djaj",
    name: L("كسكس بالدجاج", "Couscous au poulet", "Chicken couscous"),
    description: L(
      "كسكس بالدجاج والزبيب والبصل، للجمعة ولا للضياف.",
      "Couscous au poulet, raisins et oignons confits : vendredi ou invités.",
      "Chicken couscous with raisins and onions — Friday or guests."
    ),
    category: "couscous",
    tags: ["friday", "traditional", "guests"],
    slots: ["ghda"],
    art: "couscous",
    prep: 25,
    cook: 60,
    servings: 6,
    cost: 85,
    difficulty: 2,
    spice: 0,
    region: "national",
    ingredients: [
      ing("semolina", 500, "g"),
      ing("chicken", 1, "kg"),
      ing("onion", 3, "piece"),
      ing("carrot", 4, "piece"),
      ing("zucchini", 2, "piece"),
      ing("chickpeas", 150, "g"),
      ing("raisins", 100, "g"),
      ing("turmeric", 1, "tsp"),
      ing("cinnamon", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
    ],
    steps: [
      L(
        "بخّر السميدة 20 دقيقة وفرّكها.",
        "Faites cuire la semoule à la vapeur 20 minutes.",
        "Steam the semolina for 20 minutes."
      ),
      L(
        "قلي البصل، زيد الدجاج والتوابل، وغطّي 20 دقيقة.",
        "Faites revenir l'oignon, ajoutez le poulet et les épices, couvrez 20 minutes.",
        "Sauté onion, add chicken and spices, cover for 20 minutes."
      ),
      L(
        "زيد الخضرة والحمص والماء، وطيب 30 دقيقة.",
        "Ajoutez légumes, pois chiches et eau, cuisez 30 minutes.",
        "Add vegetables, chickpeas and water, cook 30 minutes."
      ),
      L(
        "قلي الزبيب مع شوية قرفة وبصل محمّر.",
        "Faites sauter les raisins avec cannelle et oignon caramélisé.",
        "Sauté raisins with cinnamon and caramelised onion."
      ),
      L(
        "قدّم الكسكس بالدجاج والمرقة والزبيب فوقو.",
        "Servez le couscous avec poulet, bouillon et raisins.",
        "Serve with chicken, broth and raisins."
      ),
    ],
    equipment: [L("كسكاس", "Couscoussier", "Couscoussier")],
    tips: [
      L(
        "البصل المحمّر كيعطي حلاوة طبيعية، ما تحتاجش سكر بزاف.",
        "L'oignon caramélisé donne une douceur naturelle, inutile d'ajouter du sucre.",
        "Caramelised onion gives natural sweetness — no extra sugar needed."
      ),
    ],
  },
  {
    slug: "rfissa",
    name: L("رفيسة", "Rfissa", "Rfissa"),
    description: L(
      "رفيسة بالدجاج والعدس والمسمن، طبق كبير للعائلة والضياف.",
      "Rfissa au poulet, lentilles et msemen : le grand plat de famille.",
      "Rfissa with chicken, lentils and msemen — the big family dish."
    ),
    category: "meat",
    tags: ["traditional", "guests"],
    slots: ["ghda"],
    art: "chicken",
    prep: 20,
    cook: 80,
    servings: 6,
    cost: 95,
    difficulty: 3,
    spice: 1,
    ingredients: [
      ing("chicken", 1, "kg"),
      ing("lentils", 200, "g"),
      ing("onion", 3, "piece"),
      ing("flour", 500, "g"),
      ing("semolina", 200, "g"),
      ing("turmeric", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
    ],
    steps: [
      L(
        "حضّر عجين المسمن وقطّعو شرائط رقيقة.",
        "Préparez la pâte à msemen et coupez-la en fines lanières.",
        "Make msemen dough and cut it into thin strips."
      ),
      L(
        "قلي البصل مع التوابل، زيد الدجاج وغطّي 30 دقيقة.",
        "Faites revenir l'oignon aux épices, ajoutez le poulet, couvrez 30 minutes.",
        "Sauté onion with spices, add chicken, cover 30 minutes."
      ),
      L(
        "زيد العدس والماء وخلّي 30 دقيقة حتى يعقد.",
        "Ajoutez lentilles et eau, laissez 30 minutes.",
        "Add lentils and water, cook 30 minutes."
      ),
      L(
        "بخّر شرائط المسمن 10 دقائق.",
        "Faites cuire les lanières à la vapeur 10 minutes.",
        "Steam the strips for 10 minutes."
      ),
      L(
        "حطّ المسمن فطبق، زيد المرقة والدجاج والعدس فوقو.",
        "Dressez les lanières, arrosez de sauce et ajoutez poulet et lentilles.",
        "Layer the strips, pour the sauce and top with chicken and lentils."
      ),
    ],
    equipment: [L("كسكاس", "Couscoussier", "Couscoussier"), L("طنجرة", "Cocotte", "Pot")],
    tips: [
      L(
        "الرفيسة كتحتاج صبر، خليها على نار هادئة.",
        "La rfissa demande de la patience, gardez le feu doux.",
        "Rfissa needs patience — keep the heat low."
      ),
    ],
  },
  {
    slug: "couscous-tfaya",
    name: L("كسكس تفاية", "Couscous tfaya", "Couscous tfaya"),
    description: L(
      "كسكس بالبصل المحمّر والزبيب والقرفة، حلو ومالح فحال ما كنديرو.",
      "Couscous à l'oignon confit, raisins et cannelle : sucré-salé comme on l'aime.",
      "Couscous with caramelised onion, raisins and cinnamon — sweet and savoury."
    ),
    category: "couscous",
    tags: ["friday", "traditional", "vegetarian"],
    slots: ["ghda"],
    art: "couscous",
    prep: 20,
    cook: 50,
    servings: 6,
    cost: 60,
    difficulty: 2,
    spice: 0,
    ingredients: [
      ing("semolina", 500, "g"),
      ing("onion", 5, "piece"),
      ing("raisins", 150, "g"),
      ing("chickpeas", 150, "g"),
      ing("cinnamon", 1, "tsp"),
      ing("honey", 2, "tbsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("almonds", 50, "g"),
    ],
    steps: [
      L(
        "بخّر السميدة مرتين مع الفرك بينهما.",
        "Cuisez la semoule à la vapeur deux fois en la séparant entre les deux.",
        "Steam the semolina twice, fluffing between rounds."
      ),
      L(
        "قلي البصل على نار هادئة 25 دقيقة حتى يتحمّر.",
        "Faites confire l'oignon 25 minutes à feu doux.",
        "Slow-caramelise the onions for 25 minutes."
      ),
      L(
        "زيد الزبيب، القرفة، العسل والحمص، وخلّي 10 دقائق.",
        "Ajoutez raisins, cannelle, miel et pois chiches, laissez 10 minutes.",
        "Add raisins, cinnamon, honey and chickpeas, cook 10 minutes."
      ),
      L(
        "حمّر اللوز وفرّقو فوق الكسكس.",
        "Faites dorer les amandes et parsemez.",
        "Toast the almonds and scatter over."
      ),
    ],
    equipment: [L("كسكاس", "Couscoussier", "Couscoussier")],
    tips: [
      L(
        "البصل خاصو وقت، ما تستعجلش عليه.",
        "L'oignon demande du temps, ne le bousculez pas.",
        "The onions need time — don't rush them."
      ),
    ],
  },
];
