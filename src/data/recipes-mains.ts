import type { Recipe, RecipeIngredient, Unit } from "./types";
import { L } from "./types";

const ing = (id: string, qty: number, unit: Unit, optional = false): RecipeIngredient => ({
  id,
  qty,
  unit,
  optional,
});

export const mainsAndQuick: Recipe[] = [
  {
    slug: "djaj-mhamer",
    name: L("دجاج محمر فالفرّان", "Poulet rôti au four", "Roast chicken"),
    description: L(
      "دجاج محمر بالثوم والفلفلة، جلده مقرمش ولحمه طري.",
      "Poulet rôti à l'ail et au paprika, peau croustillante et chair tendre.",
      "Roast chicken with garlic and paprika — crisp skin, tender meat."
    ),
    category: "chicken",
    tags: ["guests", "traditional"],
    slots: ["ghda"],
    art: "chicken",
    prep: 15,
    cook: 55,
    servings: 4,
    cost: 65,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("chicken", 1, "kg"),
      ing("garlic", 5, "piece"),
      ing("paprika", 1, "tsp"),
      ing("turmeric", 1, "tsp"),
      ing("butter", 50, "g"),
      ing("lemon", 1, "piece"),
      ing("potato", 4, "piece"),
    ],
    steps: [
      L(
        "خلّط الثوم، الفلفلة، الخرقوم، الزبدة وعصير الليمون.",
        "Mélangez ail, paprika, curcuma, beurre et jus de citron.",
        "Mix garlic, paprika, turmeric, butter and lemon juice."
      ),
      L(
        "دهّن الدجاج مزيان من الداخل والخارج.",
        "Badigeonnez le poulet à l'intérieur et à l'extérieur.",
        "Rub the chicken inside and out."
      ),
      L(
        "حطّو فصينية مع البطاطا، وزيد نص كأس ماء.",
        "Placez-le sur un plat avec les pommes de terre et un demi-verre d'eau.",
        "Put it in a tray with potatoes and half a glass of water."
      ),
      L(
        "طيب ففرّان 200 درجة لمدة 50 دقيقة، ودهّنو بالمرقة من وقت لوقت.",
        "Cuisez 50 minutes à 200 °C en arrosant régulièrement.",
        "Roast at 200 °C for 50 minutes, basting occasionally."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven"), L("صينية", "Plat", "Roasting tray")],
    tips: [
      L(
        "غطّي الدجاج بنص الطياب باش ما ينشفش.",
        "Couvrez à mi-cuisson pour qu'il ne sèche pas.",
        "Cover halfway so it doesn't dry out."
      ),
    ],
  },
  {
    slug: "smak-meqli",
    name: L("سمك مقلي", "Poisson frit", "Fried fish"),
    description: L(
      "سمك طري مقلي بالطحين والكمون، مع سلطة وليمون.",
      "Poisson tendre frit, farine et cumin, avec salade et citron.",
      "Tender fish fried in flour and cumin, with salad and lemon."
    ),
    category: "fish",
    tags: ["tangier", "fish", "quick"],
    slots: ["ghda", "cha"],
    art: "fish",
    prep: 10,
    cook: 15,
    servings: 4,
    cost: 60,
    difficulty: 1,
    spice: 0,
    region: "tangier",
    ingredients: [
      ing("white_fish", 1, "kg"),
      ing("flour", 150, "g"),
      ing("cumin", 1, "tsp"),
      ing("lemon", 2, "piece"),
      ing("oil", 300, "ml"),
      ing("salt", 1, "tsp"),
    ],
    steps: [
      L(
        "نقّي السمك، غسلو وجفّفو مزيان.",
        "Nettoyez, lavez et séchez le poisson.",
        "Clean, rinse and dry the fish."
      ),
      L(
        "خلّط الطحين، الملح والكمون، ودوز السمك فيه.",
        "Mélangez farine, sel et cumin, puis farinez le poisson.",
        "Mix flour, salt and cumin, then coat the fish."
      ),
      L(
        "قليه فالزيت السخون حتى يتحمّر من الجهتين.",
        "Faites frire dans l'huile chaude jusqu'à coloration des deux côtés.",
        "Fry in hot oil until golden on both sides."
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
        "الزيت خاصو يكون سخون بزاف، إلا كان بارد السمك كيتشرب الزيت.",
        "L'huile doit être bien chaude, sinon le poisson absorbe l'huile.",
        "Oil must be very hot or the fish absorbs it."
      ),
    ],
  },
  {
    slug: "dorada-fel-for",
    name: L("دورادة فالفرّان", "Dorade au four", "Baked sea bream"),
    description: L(
      "دورادة كاملة فالفرّان بالشرمولة والبطاطا، طبق ويكاند.",
      "Dorade entière au four, chermoula et pommes de terre : plat du week-end.",
      "Whole sea bream baked with chermoula and potatoes — weekend food."
    ),
    category: "fish",
    tags: ["tangier", "fish", "guests"],
    slots: ["ghda"],
    art: "fish",
    prep: 15,
    cook: 35,
    servings: 4,
    cost: 70,
    difficulty: 1,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("white_fish", 1, "kg"),
      ing("potato", 4, "piece"),
      ing("tomato", 3, "piece"),
      ing("garlic", 4, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("lemon", 1, "piece"),
    ],
    steps: [
      L(
        "خلّط الثوم، الكمون، الفلفلة، الزيت والليمون.",
        "Mélangez ail, cumin, paprika, huile et citron.",
        "Mix garlic, cumin, paprika, oil and lemon."
      ),
      L(
        "دهّن السمك بالشرمولة من الداخل والخارج.",
        "Badigeonnez le poisson de chermoula dedans et dehors.",
        "Coat the fish inside and out with chermoula."
      ),
      L(
        "فرّق البطاطا والطماطم فصينية، وحطّ السمك فوقهم.",
        "Disposez pommes de terre et tomates, posez le poisson dessus.",
        "Arrange potatoes and tomatoes, place the fish on top."
      ),
      L(
        "زيد شوية ماء وطيب 30 دقيقة فـ190 درجة.",
        "Ajoutez un peu d'eau et cuisez 30 minutes à 190 °C.",
        "Add a little water and bake 30 minutes at 190 °C."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven"), L("صينية", "Plat", "Tray")],
    tips: [
      L(
        "غطّي الصينية بورق ألمنيوم فالنص الأول باش ما ينشفش.",
        "Couvrez d'aluminium la première moitié de cuisson.",
        "Cover with foil for the first half of baking."
      ),
    ],
  },
  {
    slug: "pastilla-bel-hout",
    name: L("بسطيلة بالحوت", "Pastilla au poisson", "Fish pastilla"),
    description: L(
      "بسطيلة طنجاوية بالحوت والشعرية، للضياف والمناسبات.",
      "La pastilla au poisson de Tanger, vermicelles et épices : pour les grandes occasions.",
      "Tangier fish pastilla with vermicelli and spice — for special occasions."
    ),
    category: "fish",
    tags: ["tangier", "fish", "guests"],
    slots: ["ghda"],
    art: "fish",
    prep: 40,
    cook: 40,
    servings: 6,
    cost: 110,
    difficulty: 3,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("white_fish", 800, "g"),
      ing("pastry", 10, "piece"),
      ing("vermicelli", 150, "g"),
      ing("onion", 2, "piece"),
      ing("tomato", 2, "piece"),
      ing("coriander", 1, "bunch"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("lemon", 1, "piece"),
      ing("butter", 80, "g"),
    ],
    steps: [
      L(
        "قلي البصل والطماطم، زيد الحوت والتوابل وخلّي 15 دقيقة.",
        "Faites revenir oignon et tomate, ajoutez poisson et épices, 15 minutes.",
        "Sauté onion and tomato, add fish and spices, cook 15 minutes."
      ),
      L(
        "طيب الشعرية وخلّطها مع خليط الحوت والقصبر.",
        "Cuisez les vermicelles et mélangez avec le poisson et la coriandre.",
        "Cook vermicelli and mix with the fish and coriander."
      ),
      L(
        "دهّن ورق البسطيلة بالزبدة، وفرّق الطبقات فصينية.",
        "Beurrez les feuilles et superposez-les dans un plat.",
        "Butter the sheets and layer them in a dish."
      ),
      L(
        "حطّ الحشوة، غطّي بورق آخر ودهّن الوجه.",
        "Ajoutez la farce, couvrez d'autres feuilles et beurrez le dessus.",
        "Add the filling, cover with more sheets and butter the top."
      ),
      L(
        "طيبها فـ190 درجة 30 دقيقة حتى تتحمّر.",
        "Cuisez 30 minutes à 190 °C jusqu'à dorure.",
        "Bake 30 minutes at 190 °C until golden."
      ),
    ],
    equipment: [L("فرّان", "Four", "Oven"), L("صينية", "Plat", "Dish")],
    tips: [
      L(
        "صفّي الحشوة مزيان باش البسطيلة ما تولّيش طرية بزاف.",
        "Égouttez bien la farce pour éviter une pâte détrempée.",
        "Drain the filling well so the pastry stays crisp."
      ),
    ],
  },
  {
    slug: "makarona-bel-tmatem",
    name: L("مكرونة بالطماطم", "Pâtes à la tomate", "Tomato pasta"),
    description: L(
      "مكرونة بصلصة طماطم بسيطة، عشا سريع والدراري كيحبوها.",
      "Pâtes à la sauce tomate simple : dîner rapide adoré des enfants.",
      "Simple tomato pasta — a fast dinner kids love."
    ),
    category: "pasta_rice",
    tags: ["quick", "budget", "kid", "vegetarian"],
    slots: ["cha", "ghda", "lunchbox"],
    art: "pasta",
    prep: 5,
    cook: 15,
    servings: 4,
    cost: 22,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("pasta", 400, "g"),
      ing("tomato", 4, "piece"),
      ing("onion", 1, "piece"),
      ing("garlic", 3, "piece"),
      ing("tomato_paste", 1, "tbsp"),
      ing("olive_oil", 3, "tbsp"),
      ing("cheese", 50, "g", true),
    ],
    steps: [
      L(
        "قلي البصل والثوم فزيت الزيتون.",
        "Faites revenir oignon et ail à l'huile d'olive.",
        "Sauté onion and garlic in olive oil."
      ),
      L(
        "زيد الطماطم المفروشة والمعجون، وخلّي 10 دقائق.",
        "Ajoutez tomates râpées et concentré, laissez 10 minutes.",
        "Add grated tomatoes and paste, cook 10 minutes."
      ),
      L(
        "طيب المكرونة فماء مملّح وصفّيها.",
        "Cuisez les pâtes dans l'eau salée et égouttez.",
        "Boil pasta in salted water and drain."
      ),
      L(
        "خلّط المكرونة بالصلصة، وزيد الجبن فوقها.",
        "Mélangez pâtes et sauce, ajoutez le fromage.",
        "Toss pasta with sauce and top with cheese."
      ),
    ],
    equipment: [L("طنجرة", "Casserole", "Pot"), L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "خلي شوية من ماء المكرونة، كيعاون الصلصة تلصق.",
        "Gardez un peu d'eau de cuisson, elle lie la sauce.",
        "Keep a little pasta water — it helps the sauce cling."
      ),
    ],
  },
  {
    slug: "riz-bel-khodra",
    name: L("ريز بالخضرة", "Riz aux légumes", "Vegetable rice"),
    description: L(
      "ريز بالخيزو والبازاليا، طبق خفيف وسريع.",
      "Riz aux carottes et petits pois, léger et rapide.",
      "Rice with carrots and peas — light and quick."
    ),
    category: "pasta_rice",
    tags: ["quick", "budget", "kid", "vegetarian"],
    slots: ["ghda", "cha", "lunchbox"],
    art: "rice",
    prep: 10,
    cook: 20,
    servings: 4,
    cost: 25,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("rice", 400, "g"),
      ing("carrot", 3, "piece"),
      ing("zucchini", 1, "piece"),
      ing("onion", 1, "piece"),
      ing("turmeric", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
    ],
    steps: [
      L(
        "قلي البصل والخيزو والقرعة قطع صغيرة 5 دقائق.",
        "Faites revenir oignon, carottes et courgettes en dés 5 minutes.",
        "Sauté onion, carrots and zucchini, diced, for 5 minutes."
      ),
      L(
        "زيد الريز والخرقوم وخلّط مزيان.",
        "Ajoutez le riz et le curcuma, mélangez.",
        "Add rice and turmeric, stir well."
      ),
      L(
        "زيد الماء السخون (ضعف الريز) وغطّي 15 دقيقة.",
        "Ajoutez l'eau chaude (2× le riz) et couvrez 15 minutes.",
        "Add hot water (2× the rice) and cover for 15 minutes."
      ),
      L(
        "خلّي 5 دقائق بلا ما تحرّك، من بعد فرّق بالفرشيطة.",
        "Laissez 5 minutes sans remuer, puis égrenez à la fourchette.",
        "Rest 5 minutes untouched, then fluff with a fork."
      ),
    ],
    equipment: [L("طنجرة", "Casserole", "Pot")],
    tips: [
      L(
        "ما تحرّكش الريز بزاف باش ما يتلصقش.",
        "Ne remuez pas trop le riz pour éviter qu'il colle.",
        "Don't stir the rice too much or it goes sticky."
      ),
    ],
  },
  {
    slug: "chakchouka",
    name: L("شكشوكة", "Chakchouka", "Chakchouka"),
    description: L(
      "شكشوكة بالفلفلة والطماطم والبيض، عشا سريع بلا لحمة.",
      "Chakchouka de poivrons, tomates et œufs : dîner rapide sans viande.",
      "Pepper, tomato and egg chakchouka — a fast meat-free dinner."
    ),
    category: "vegetables",
    tags: ["quick", "budget", "vegetarian", "kid"],
    slots: ["cha", "ftour"],
    art: "eggs",
    prep: 5,
    cook: 15,
    servings: 4,
    cost: 25,
    difficulty: 1,
    spice: 1,
    ingredients: [
      ing("pepper", 2, "piece"),
      ing("tomato", 4, "piece"),
      ing("onion", 1, "piece"),
      ing("eggs", 4, "piece"),
      ing("garlic", 2, "piece"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
    ],
    steps: [
      L(
        "قلي البصل، الثوم والفلفلة 5 دقائق.",
        "Faites revenir oignon, ail et poivrons 5 minutes.",
        "Sauté onion, garlic and peppers for 5 minutes."
      ),
      L(
        "زيد الطماطم والفلفلة الحمراء، وخلّي 8 دقائق.",
        "Ajoutez tomates et paprika, laissez 8 minutes.",
        "Add tomatoes and paprika, cook 8 minutes."
      ),
      L(
        "كسّر البيض فوق الخليط، غطّي وخلّي 4 دقائق.",
        "Cassez les œufs, couvrez et laissez 4 minutes.",
        "Crack the eggs on top, cover and cook 4 minutes."
      ),
      L(
        "قدّم مباشرة مع الخبز.",
        "Servez aussitôt avec du pain.",
        "Serve immediately with bread."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "ما تغطّيش بزاف إلا بغيتي الصفار طري.",
        "Ne couvrez pas trop si vous aimez les jaunes coulants.",
        "Don't cover long if you like runny yolks."
      ),
    ],
  },
  {
    slug: "omelette-bel-jben",
    name: L("أومليت بالجبن", "Omelette au fromage", "Cheese omelette"),
    description: L(
      "أومليت طرية بالجبن، أسرع فطور ولا عشا.",
      "Omelette fondante au fromage, le petit-déj ou dîner le plus rapide.",
      "Soft cheese omelette — the fastest breakfast or dinner."
    ),
    category: "breakfast",
    tags: ["quick", "budget", "kid", "vegetarian"],
    slots: ["ftour", "cha", "lunchbox"],
    art: "eggs",
    prep: 3,
    cook: 7,
    servings: 4,
    cost: 20,
    difficulty: 1,
    spice: 0,
    ingredients: [
      ing("eggs", 6, "piece"),
      ing("cheese", 100, "g"),
      ing("butter", 20, "g"),
      ing("parsley", 1, "bunch", true),
    ],
    steps: [
      L(
        "خفق البيض بالملح والفلفل.",
        "Battez les œufs avec sel et poivre.",
        "Whisk eggs with salt and pepper."
      ),
      L(
        "ذوّب الزبدة فمقلاة على نار هادئة.",
        "Faites fondre le beurre dans une poêle à feu doux.",
        "Melt butter in a pan over low heat."
      ),
      L(
        "صبّ البيض، زيد الجبن والمعدنوس، وطوي الأومليت.",
        "Versez les œufs, ajoutez fromage et persil, pliez l'omelette.",
        "Pour the eggs, add cheese and parsley, fold the omelette."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "نار هادئة كتعطي أومليت طرية بلا ما تحرق.",
        "Feu doux pour une omelette moelleuse sans brûler.",
        "Low heat keeps it soft without burning."
      ),
    ],
  },
  {
    slug: "kebda-mchermla",
    name: L("كبدة مچرمة", "Foie mchermel", "Liver mchermel"),
    description: L(
      "كبدة بالثوم والكمون والليمون، طبق طنجاوي سريع.",
      "Foie à l'ail, cumin et citron : un plat tangérois rapide.",
      "Liver with garlic, cumin and lemon — a quick Tangier classic."
    ),
    category: "meat",
    tags: ["tangier", "quick"],
    slots: ["ghda", "cha"],
    art: "tagine",
    prep: 10,
    cook: 15,
    servings: 4,
    cost: 45,
    difficulty: 1,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("lamb", 500, "g"),
      ing("garlic", 4, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("preserved_lemon", 1, "piece"),
      ing("olive_oil", 3, "tbsp"),
      ing("coriander", 1, "bunch"),
    ],
    steps: [
      L(
        "قطّع الكبدة قطع صغيرة وغسلها مزيان.",
        "Coupez le foie en petits morceaux et lavez-le.",
        "Cut the liver into small pieces and rinse."
      ),
      L(
        "قلي الثوم فزيت الزيتون، زيد الكبدة والتوابل.",
        "Faites revenir l'ail, ajoutez le foie et les épices.",
        "Sauté garlic, add liver and spices."
      ),
      L(
        "خلّي 10 دقائق على نار متوسطة، وحرّك من وقت لوقت.",
        "Cuisez 10 minutes à feu moyen en remuant.",
        "Cook 10 minutes on medium, stirring occasionally."
      ),
      L(
        "زيد الليمون المصيّر والقصبر، وقدّم مع الخبز.",
        "Ajoutez citron confit et coriandre, servez avec du pain.",
        "Add preserved lemon and coriander, serve with bread."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "الكبدة ما خاصهاش تطيب بزاف، كتولّي قاسحة.",
        "Le foie ne doit pas trop cuire, il durcit.",
        "Don't overcook liver or it turns rubbery."
      ),
    ],
  },
  {
    slug: "krevettes-bel-toum",
    name: L("قمرون بالثوم", "Crevettes à l'ail", "Garlic shrimp"),
    description: L(
      "قمرون بالثوم والزبدة والليمون، طبق ضياف فـ15 دقيقة.",
      "Crevettes à l'ail, beurre et citron : un plat d'invités en 15 minutes.",
      "Garlic butter shrimp with lemon — a 15-minute guest dish."
    ),
    category: "fish",
    tags: ["guests", "quick", "fish"],
    slots: ["ghda", "cha"],
    art: "shrimp",
    prep: 10,
    cook: 10,
    servings: 4,
    cost: 90,
    difficulty: 1,
    spice: 1,
    region: "tangier",
    ingredients: [
      ing("shrimp", 700, "g"),
      ing("garlic", 6, "piece"),
      ing("butter", 50, "g"),
      ing("olive_oil", 2, "tbsp"),
      ing("lemon", 1, "piece"),
      ing("parsley", 1, "bunch"),
    ],
    steps: [
      L(
        "نقّي القمرون وغسلو وجفّفو.",
        "Nettoyez, lavez et séchez les crevettes.",
        "Clean, rinse and dry the shrimp."
      ),
      L(
        "ذوّب الزبدة مع الزيت، زيد الثوم وخلّي دقيقة.",
        "Faites fondre beurre et huile, ajoutez l'ail une minute.",
        "Melt butter and oil, add garlic for a minute."
      ),
      L(
        "زيد القمرون وطيبو 4 دقائق من كل جهة.",
        "Ajoutez les crevettes et cuisez 4 minutes par côté.",
        "Add shrimp and cook 4 minutes per side."
      ),
      L(
        "زيد الليمون والمعدنوس، وقدّم سخون.",
        "Ajoutez citron et persil, servez chaud.",
        "Add lemon and parsley, serve hot."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "القمرون كيطيب بسرعة، إلا زدتي الوقت كيولّي قاسح.",
        "Les crevettes cuisent vite, trop cuites elles deviennent caoutchouteuses.",
        "Shrimp cook fast — overcooking makes them rubbery."
      ),
    ],
  },
  {
    slug: "batbout-bel-kefta",
    name: L("بطبوط بالكفتة", "Batbout à la kefta", "Batbout with kefta"),
    description: L(
      "بطبوط محشّي بالكفتة والجبن، سندويتش مغربي سخون.",
      "Batbout farci à la kefta et au fromage : le sandwich marocain chaud.",
      "Batbout stuffed with kefta and cheese — the warm Moroccan sandwich."
    ),
    category: "lunchbox",
    tags: ["kid", "budget"],
    slots: ["lunchbox", "cha"],
    art: "sandwich",
    prep: 20,
    cook: 15,
    servings: 4,
    cost: 25,
    difficulty: 2,
    spice: 0,
    lunchbox: true,
    ingredients: [
      ing("flour", 400, "g"),
      ing("semolina", 100, "g"),
      ing("yeast", 1, "tsp"),
      ing("kefta", 300, "g"),
      ing("onion", 1, "piece"),
      ing("cheese", 80, "g"),
      ing("cumin", 1, "tsp"),
      ing("olive_oil", 2, "tbsp"),
    ],
    steps: [
      L(
        "خلّط الطحين، السميدة، الخميرة والماء، وخلّي العجين يرتاح ساعة.",
        "Mélangez farine, semoule, levure et eau, laissez lever une heure.",
        "Mix flour, semolina, yeast and water, rest for an hour."
      ),
      L(
        "قلي الكفتة مع البصل والكمون 10 دقائق.",
        "Faites revenir la kefta avec oignon et cumin 10 minutes.",
        "Cook kefta with onion and cumin for 10 minutes."
      ),
      L(
        "شكّل أقراص بطبوط وطيبهم فمقلاة جافة.",
        "Formez des galettes et cuisez-les dans une poêle sèche.",
        "Shape rounds and cook in a dry pan."
      ),
      L(
        "حلّ البطبوط، حشيه بالكفتة والجبن، وقدّمو سخون.",
        "Ouvrez le batbout, garnissez de kefta et fromage, servez chaud.",
        "Open the batbout, fill with kefta and cheese, serve warm."
      ),
    ],
    equipment: [L("مقلاة", "Poêle", "Pan")],
    tips: [
      L(
        "للعلبة: خلّي الجبن فوق الكفتة باش يذوب ويشد الحشوة.",
        "Pour la lunchbox : mettez le fromage sur la kefta pour lier.",
        "For lunchboxes, cheese over the kefta helps bind it."
      ),
    ],
  },
];
