import type { Recipe, RecipeIngredient, Unit } from "./types";
import { L } from "./types";

const ing = (id: string, qty: number, unit: Unit, optional = false): RecipeIngredient => ({
  id,
  qty,
  unit,
  optional,
});

/**
 * Household staples: the big dishes a Moroccan family cooks for the whole
 * table — Friday couscous, lamb with prunes, cheap white sauce, lunchbox
 * chicken, and a tray of briouats for tea.
 */
export const familyClassics: Recipe[] = [
  {
    slug: "tajine-lahm-bel-barkok",
    name: L(
      "طاجين اللحم بالبرقوق واللوز",
      "Agneau aux pruneaux et amandes",
      "Lamb tagine with prunes and almonds"
    ),
    description: L(
      "طاجين الأعراس: لحم طايب بشوية بشوية، والبرقوق كيعطي حلاوة خفيفة مع القرفة.",
      "Le tajine des grandes occasions : agneau fondant, pruneaux confits et une pointe de cannelle.",
      "The celebration tagine: slow lamb, sticky prunes and a whisper of cinnamon."
    ),
    category: "meat",
    tags: ["traditional", "guests"],
    slots: ["ghda"],
    art: "tagine",
    prep: 20,
    cook: 90,
    servings: 6,
    cost: 145,
    difficulty: 3,
    spice: 0,
    region: "national",
    ingredients: [
      ing("lamb", 1500, "g"),
      ing("onion", 3, "piece"),
      ing("garlic", 4, "piece"),
      ing("prunes", 250, "g"),
      ing("almonds", 100, "g"),
      ing("honey", 2, "tbsp"),
      ing("cinnamon", 2, "tsp"),
      ing("saffron", 1, "pinch"),
      ing("butter", 30, "g"),
      ing("coriander", 1, "bunch"),
      ing("olive_oil", 3, "tbsp"),
      ing("water", 500, "ml"),
    ],
    steps: [
      L(
        "خلّط الثوم المدقوق، الخرقوم، الزعفران، الملح والفلفل، ودهّن بيهم قطع اللحم.",
        "Mélangez ail écrasé, curcuma, safran, sel et poivre, puis enduisez la viande.",
        "Mix crushed garlic, turmeric, saffron, salt and pepper, then rub the lamb with it."
      ),
      L(
        "حطّي البصل مفروش فقاع الطاجين، وفوقو اللحم، وزيد الزيت ونص كأس ماء.",
        "Étalez l'oignon au fond du tajine, posez la viande, ajoutez l'huile et un demi-verre d'eau.",
        "Spread the onion over the tagine base, add the lamb, oil and half a glass of water."
      ),
      L(
        "غطّي وخلّي على نار هادية ساعة تقريباً، حتى يطيب اللحم ويبقى المرق قليل.",
        "Couvrez et laissez à feu doux environ une heure, jusqu'à ce que la viande soit tendre.",
        "Cover and cook gently for about an hour, until the meat is tender and the sauce reduced."
      ),
      L(
        "نقّي البرقوق، طيّبو 10 دقائق فماء مع القرفة والعسل، ومن بعد ضيفو للطاجين.",
        "Faites pocher les pruneaux 10 minutes dans l'eau avec cannelle et miel, puis ajoutez-les au tajine.",
        "Poach the prunes for 10 minutes in water with cinnamon and honey, then add them to the tagine."
      ),
      L(
        "حمّص اللوز فزبدة، رشّو فوق الطاجين مع القصبر، وقدّمو سخون.",
        "Faites dorer les amandes au beurre, parsemez sur le tajine avec la coriandre et servez chaud.",
        "Fry the almonds in butter, scatter over the tagine with coriander and serve hot."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine"), L("مقلاة", "Poêle", "Frying pan")],
    tips: [
      L(
        "لحم الغنم كيحتاج وقت — ما تزيدش النار باش يطيب بسرعة، غير غادي يقسح.",
        "L'agneau demande du temps : ne montez pas le feu, il durcirait.",
        "Lamb needs time — raising the heat only makes it tough."
      ),
      L(
        "إذا بغيتي المرق كثر، زيدي شوية ماء سخون قبل ما تحطّي البرقوق.",
        "Si vous voulez plus de sauce, ajoutez un peu d'eau chaude avant les pruneaux.",
        "If you want more sauce, add a little hot water before the prunes."
      ),
    ],
    isNew: true,
  },
  {
    slug: "couscous-seb3a-khdra",
    name: L(
      "كسكس سبع خضاري",
      "Couscous aux sept légumes",
      "Seven-vegetable couscous"
    ),
    description: L(
      "كسكس الجمعة بلا لحم: سبع خضاري، حمص، ومرق بالزعفران. كافي للدار كاملة.",
      "Le couscous du vendredi sans viande : sept légumes, pois chiches et bouillon safrané.",
      "Friday couscous without meat: seven vegetables, chickpeas and saffron broth."
    ),
    category: "couscous",
    tags: ["traditional", "friday", "vegetarian", "budget"],
    slots: ["ghda"],
    art: "couscous",
    prep: 25,
    cook: 75,
    servings: 6,
    cost: 42,
    difficulty: 2,
    spice: 0,
    region: "national",
    ingredients: [
      ing("semolina", 1000, "g"),
      ing("onion", 2, "piece"),
      ing("tomato", 3, "piece"),
      ing("carrot", 3, "piece"),
      ing("zucchini", 2, "piece"),
      ing("turnip", 2, "piece"),
      ing("pumpkin", 300, "g"),
      ing("cabbage", 0.25, "piece"),
      ing("chickpeas", 200, "g"),
      ing("tomato_paste", 2, "tbsp"),
      ing("olive_oil", 4, "tbsp"),
      ing("turmeric", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("coriander", 1, "bunch"),
      ing("water", 1, "l"),
    ],
    steps: [
      L(
        "غسّل السميدة وبلّها بشوية زيت وماء، وخلّيها ترتاح 10 دقائق.",
        "Humidifiez la semoule avec un peu d'huile et d'eau, laissez reposer 10 minutes.",
        "Dampen the semolina with a little oil and water and let it rest 10 minutes."
      ),
      L(
        "حطّي البصل، الطماطم، المعجون، الزيت والتوابل فقاع الكسكاس وزيد لتر ماء.",
        "Mettez oignon, tomate, concentré, huile et épices dans le bas du couscoussier avec un litre d'eau.",
        "Put onion, tomato, paste, oil and spices in the couscoussier base with a litre of water."
      ),
      L(
        "بخّر السميدة مرة أولى 20 دقيقة، من بعد فرّقها بالزيت والماء وعاود بخّرها.",
        "Steam the semolina a first time for 20 minutes, then rub with oil and water and steam again.",
        "Steam the semolina once for 20 minutes, rub with oil and water, then steam again."
      ),
      L(
        "زيد الخضاري فالمعقب: الخيزو واللفت والقرع أولاً، وبعد 15 دقيقة القرعة والكرنب والحمص.",
        "Ajoutez les légumes dans l'ordre : carottes et navets d'abord, puis courgettes, chou et pois chiches.",
        "Add the vegetables in order: carrots and turnips first, then zucchini, cabbage and chickpeas."
      ),
      L(
        "بخّر 20 دقيقة أخيرة، وجمع الكسكس فطبق كبير مع المرق والخضرة.",
        "Steam a final 20 minutes, then mound the couscous on a platter with broth and vegetables.",
        "Steam a final 20 minutes, then mound the couscous on a platter with broth and vegetables."
      ),
    ],
    equipment: [
      L("كسكاس", "Couscoussier", "Couscoussier"),
      L("طبق كبير", "Grand plat", "Large platter"),
    ],
    tips: [
      L(
        "السر فالبخار ثلاث مرات — هكذا الكسكس كيتفرّق وما كيتلزقش.",
        "Le secret est de cuire à la vapeur trois fois : le couscous reste léger.",
        "The secret is three steamings — that keeps the couscous light and separate."
      ),
      L(
        "الخضاري كتطيب بزاف بسرعة، حطّيها حسب الصلابة.",
        "Ajoutez les légumes selon leur fermeté pour qu'ils cuisent ensemble.",
        "Add vegetables by firmness so they all finish at the same time."
      ),
    ],
    isNew: true,
  },
  {
    slug: "mar9a-bida-bel-hmoss",
    name: L(
      "مرقة بيضا بالحمص والدجاج",
      "Marqa blanche au poulet et pois chiches",
      "White chicken and chickpea stew"
    ),
    description: L(
      "المرقة البيضا اللي كتدفّي الدار فليام الباردة، رخيصة وكتشبع.",
      "La marqa blanche qui réchauffe la maison : douce, économique et rassasiante.",
      "The pale, gentle stew that warms the house — cheap and filling."
    ),
    category: "chicken",
    tags: ["traditional", "budget", "kid"],
    slots: ["ghda", "cha"],
    art: "chicken",
    prep: 15,
    cook: 45,
    servings: 6,
    cost: 48,
    difficulty: 1,
    spice: 0,
    region: "national",
    ingredients: [
      ing("chicken", 800, "g"),
      ing("onion", 2, "piece"),
      ing("chickpeas", 200, "g"),
      ing("flour", 1, "tbsp"),
      ing("butter", 20, "g"),
      ing("turmeric", 1, "tsp"),
      ing("pepper", 1, "tsp"),
      ing("lemon", 1, "piece"),
      ing("coriander", 1, "bunch"),
      ing("olive_oil", 2, "tbsp"),
      ing("water", 800, "ml"),
    ],
    steps: [
      L(
        "حطّي الدجاج مع البصل المفروم، الزيت، الخرقوم والفلفل فطنجرة.",
        "Mettez le poulet avec l'oignon haché, l'huile, le curcuma et le poivre dans une cocotte.",
        "Put the chicken in a pot with chopped onion, oil, turmeric and pepper."
      ),
      L(
        "خلّي 5 دقائق حتى يشدّ البصل الطعم، وزيد الماء والحمص المغسول.",
        "Laissez 5 minutes, puis ajoutez l'eau et les pois chiches rincés.",
        "Cook 5 minutes, then add water and rinsed chickpeas."
      ),
      L(
        "غطّي وطيب 30 دقيقة على نار متوسطة.",
        "Couvrez et cuisez 30 minutes à feu moyen.",
        "Cover and simmer 30 minutes over medium heat."
      ),
      L(
        "دوب الزبدة مع الطحين فمقلاة صغيرة، وزيدها للمرق مع التحريك باش ما يتكتّلش.",
        "Faites un roux avec le beurre et la farine, puis versez dans la sauce en remuant.",
        "Make a roux with butter and flour, then whisk it into the sauce."
      ),
      L(
        "طيب 8 دقائق حتى تتخنّ، وزيد القصبر وعصير الليمون قبل ما تطفّي.",
        "Cuisez 8 minutes pour épaissir, puis ajoutez coriandre et jus de citron.",
        "Cook 8 minutes to thicken, then stir in coriander and lemon juice."
      ),
    ],
    equipment: [L("طنجرة", "Cocotte", "Pot"), L("مقلاة صغيرة", "Petite poêle", "Small pan")],
    tips: [
      L(
        "الطحين خاصو يكون مذوّب مزيان — زيد الماء شوية بشوية.",
        "Délayez bien la farine et versez l'eau petit à petit.",
        "Whisk the flour smooth and add liquid gradually."
      ),
      L(
        "قدميها مع الخبز ولا الريز الأبيض.",
        "Servez avec du pain ou du riz blanc.",
        "Serve with bread or plain rice."
      ),
    ],
    isNew: true,
  },
  {
    slug: "tajine-jelbana-bel-lahm",
    name: L(
      "طاجين الجلبانة باللحم",
      "Tajine de petits pois à l'agneau",
      "Lamb and pea tagine"
    ),
    description: L(
      "الجلبانة فصلها فالفصل، مع لحم غنمي ومرقة حمرا خفيفة.",
      "Les petits pois de saison, mijotés avec de l'agneau et une sauce tomate légère.",
      "Seasonal green peas slow-cooked with lamb in a light tomato sauce."
    ),
    category: "meat",
    tags: ["traditional", "budget"],
    slots: ["ghda", "cha"],
    art: "tagine",
    prep: 15,
    cook: 45,
    servings: 5,
    cost: 78,
    difficulty: 2,
    spice: 0,
    region: "national",
    ingredients: [
      ing("lamb", 700, "g"),
      ing("peas", 500, "g"),
      ing("onion", 2, "piece"),
      ing("garlic", 3, "piece"),
      ing("tomato", 2, "piece"),
      ing("tomato_paste", 1, "tbsp"),
      ing("turmeric", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("coriander", 1, "bunch"),
      ing("olive_oil", 3, "tbsp"),
      ing("water", 400, "ml"),
    ],
    steps: [
      L(
        "سخّن الزيت وحمّر فيه اللحم مع البصل والثوم.",
        "Chauffez l'huile et faites dorer la viande avec oignon et ail.",
        "Heat the oil and brown the lamb with onion and garlic."
      ),
      L(
        "زيد الطماطم المحكوكة، المعجون والتوابل، وخلّي 5 دقائق.",
        "Ajoutez tomates râpées, concentré et épices, puis laissez 5 minutes.",
        "Add grated tomato, paste and spices, then cook 5 minutes."
      ),
      L(
        "زيد الماء، غطّي وطيب 25 دقيقة حتى يرقّ اللحم.",
        "Ajoutez l'eau, couvrez et cuisez 25 minutes jusqu'à ce que la viande s'attendrisse.",
        "Add water, cover and cook 25 minutes until the lamb softens."
      ),
      L(
        "ضيف الجلبانة وطيب 12 دقيقة بلا غطا باش يبقى المرق.",
        "Ajoutez les petits pois et cuisez 12 minutes à découvert.",
        "Add the peas and cook uncovered for 12 minutes."
      ),
      L(
        "رشّ القصبر وقدّم مع الخبز السخون.",
        "Parsemez de coriandre et servez avec du pain chaud.",
        "Scatter coriander and serve with warm bread."
      ),
    ],
    equipment: [L("طاجين", "Tajine", "Tagine")],
    tips: [
      L(
        "إذا كانت الجلبانة مجمّدة، زيدها آخر 6 دقائق فقط.",
        "Si les petits pois sont surgelés, ajoutez-les seulement 6 minutes avant la fin.",
        "If the peas are frozen, add them only 6 minutes before the end."
      ),
    ],
    isNew: true,
  },
  {
    slug: "batata-bel-zeitoun",
    name: L(
      "بطاطا بالزيتون والليمون المصيّر",
      "Pommes de terre aux olives",
      "Potatoes with olives and preserved lemon"
    ),
    description: L(
      "طبق نباتي رخيص كيتدار فآخر الشهر، بطاطا بالزيتون والكمون.",
      "Un plat végétarien économique de fin de mois : pommes de terre, olives et cumin.",
      "A cheap vegetarian end-of-month dish: potatoes, olives and cumin."
    ),
    category: "vegetables",
    tags: ["vegetarian", "budget", "quick", "traditional"],
    slots: ["ghda", "cha"],
    art: "veg",
    prep: 10,
    cook: 25,
    servings: 4,
    cost: 16,
    difficulty: 1,
    spice: 1,
    region: "national",
    ingredients: [
      ing("potato", 800, "g"),
      ing("onion", 1, "piece"),
      ing("garlic", 3, "piece"),
      ing("tomato", 2, "piece"),
      ing("olives", 80, "g"),
      ing("preserved_lemon", 0.5, "piece"),
      ing("cumin", 1, "tsp"),
      ing("paprika", 1, "tsp"),
      ing("olive_oil", 3, "tbsp"),
      ing("coriander", 0.5, "bunch"),
      ing("water", 200, "ml"),
    ],
    steps: [
      L(
        "قطّع البطاطا طروف متوسطة وقشّرها.",
        "Coupez les pommes de terre en quartiers et épluchez-les.",
        "Cut the potatoes into wedges and peel them."
      ),
      L(
        "فرّق البصل والثوم فمقلاة كبيرة مع الزيت حتى يذبلو.",
        "Faites revenir oignon et ail dans une grande poêle avec l'huile.",
        "Soften onion and garlic in a large pan with oil."
      ),
      L(
        "زيد الطماطم، الكمون، الفلفلة والبطاطا، وخلّط مزيان.",
        "Ajoutez tomates, cumin, paprika et pommes de terre, puis mélangez.",
        "Add tomatoes, cumin, paprika and potatoes, then toss well."
      ),
      L(
        "زيد الماء، غطّي وطيب 18 دقيقة حتى تطرى البطاطا.",
        "Ajoutez l'eau, couvrez et cuisez 18 minutes jusqu'à ce qu'elles soient tendres.",
        "Add the water, cover and cook 18 minutes until tender."
      ),
      L(
        "زيد الزيتون والليمون المصيّر مقطّع، وطيب 5 دقائق، ومن بعد رشّ القصبر.",
        "Ajoutez olives et citron confit, cuisez 5 minutes, puis parsemez de coriandre.",
        "Add olives and sliced preserved lemon, cook 5 minutes, then scatter coriander."
      ),
    ],
    equipment: [L("مقلاة كبيرة", "Grande poêle", "Large pan")],
    tips: [
      L(
        "ما تملّحش بزاف — الزيتون والليمون المصيّر فيهم الملح.",
        "Salez peu : olives et citron confit sont déjà salés.",
        "Go easy on salt — olives and preserved lemon are already salty."
      ),
    ],
    isNew: true,
  },
  {
    slug: "poulet-panee-box",
    name: L(
      "لانشبوكس الدجاج باني",
      "Lunchbox poulet pané",
      "Breaded chicken lunchbox"
    ),
    description: L(
      "الدجاج باني اللي كيبقى طري حتى للغدا، مع خيزو وطماطم فالعلبة.",
      "Poulet pané qui reste tendre jusqu'au déjeuner, avec carotte et tomate.",
      "Breaded chicken that stays tender until lunch, packed with carrot and tomato."
    ),
    category: "lunchbox",
    tags: ["kid", "quick"],
    slots: ["cha", "lunchbox"],
    art: "lunchbox",
    prep: 15,
    cook: 15,
    servings: 4,
    cost: 42,
    difficulty: 1,
    spice: 0,
    region: "national",
    lunchbox: true,
    ingredients: [
      ing("chicken", 600, "g"),
      ing("flour", 100, "g"),
      ing("eggs", 2, "piece"),
      ing("bread", 4, "piece"),
      ing("paprika", 1, "tsp"),
      ing("pepper", 0.5, "tsp"),
      ing("carrot", 1, "piece"),
      ing("tomato", 1, "piece"),
      ing("lemon", 0.5, "piece"),
      ing("oil", 500, "ml"),
    ],
    steps: [
      L(
        "قطّع الدجاج شرائح طويلة، وملّحهم بالفلفلة والفلفل وعصير الليمون.",
        "Coupez le poulet en lanières, assaisonnez avec paprika, poivre et citron.",
        "Cut the chicken into strips and season with paprika, pepper and lemon."
      ),
      L(
        "مرّر الشرائح فالطحين، من بعد فالبيض المخفوق، ومن بعد فالخبز المطحون.",
        "Passez les lanières dans la farine, puis l'œuf battu, puis la chapelure.",
        "Coat the strips in flour, then beaten egg, then breadcrumbs."
      ),
      L(
        "حمّي الزيت وحمّر الدجاج 3 دقائق من كل جهة حتى يولي ذهبي.",
        "Chauffez l'huile et faites dorer 3 minutes de chaque côté.",
        "Heat the oil and fry 3 minutes per side until golden."
      ),
      L(
        "حطّ الدجاج فوق ورق مطبخ باش يخرج الزيت الزايد.",
        "Égouttez sur papier absorbant.",
        "Drain on kitchen paper."
      ),
      L(
        "عمّر العلبة: دجاج، خيزو مقطّع رقيق، وطماطم. خزّنها فالفرّيجو حتى الصباح.",
        "Remplissez la boîte : poulet, carotte en bâtonnets et tomate. Gardez au frais.",
        "Fill the box with chicken, carrot sticks and tomato. Keep chilled."
      ),
    ],
    equipment: [L("مقلاة عميقة", "Friteuse", "Deep pan"), L("علبة غدا", "Boîte repas", "Lunchbox")],
    tips: [
      L(
        "الخبز المطحون داري كافي — ما تحتاجش اللي كيتشرى.",
        "De la chapelure maison suffit, pas besoin d'en acheter.",
        "Homemade breadcrumbs are enough — no need to buy any."
      ),
      L(
        "إذا بغيتيه سخون، سخّنو 40 ثانية فالميكرووند قبل ما يخرجو الدراري.",
        "Pour le réchauffer, 40 secondes au micro-ondes suffisent.",
        "To warm it, 40 seconds in the microwave is enough."
      ),
    ],
    isNew: true,
  },
  {
    slug: "briouat-bel-loz",
    name: L(
      "بريوات باللوز والعسل",
      "Briouats aux amandes et miel",
      "Almond and honey briouats"
    ),
    description: L(
      "مثلثات ورقة باللوز والعسل، للعصرية ولا لشهر رمضان.",
      "Triangles de brick aux amandes et miel, pour le goûter ou le Ramadan.",
      "Almond and honey brick triangles, for tea time or Ramadan."
    ),
    category: "desserts",
    tags: ["traditional", "guests", "ramadan"],
    slots: ["ftour", "cha"],
    art: "cookie",
    prep: 30,
    cook: 20,
    servings: 6,
    cost: 55,
    difficulty: 2,
    spice: 0,
    region: "national",
    ingredients: [
      ing("almonds", 250, "g"),
      ing("pastry", 12, "piece"),
      ing("honey", 150, "g"),
      ing("sesame", 2, "tbsp"),
      ing("cinnamon", 1, "tsp"),
      ing("orange_blossom", 1, "tbsp"),
      ing("sugar", 2, "tbsp"),
      ing("eggs", 1, "piece"),
      ing("oil", 500, "ml"),
    ],
    steps: [
      L(
        "حمّص اللوز، خليه يبرد، ومن بعد اطحنو خشين مع السكر والقرفة.",
        "Grillez les amandes, laissez refroidir, puis mixez grossièrement avec sucre et cannelle.",
        "Toast the almonds, cool, then pulse coarsely with sugar and cinnamon."
      ),
      L(
        "زيد ماء الزهر والبيض حتى تحصل على خليط كيتشكّل.",
        "Ajoutez eau de fleur d'oranger et œuf jusqu'à obtenir une pâte qui se tient.",
        "Add orange blossom water and egg until the mixture holds together."
      ),
      L(
        "قطّع ورقة البسطيلة شرائح، حطّ كمية من الحشوة وطوي على شكل مثلث.",
        "Coupez les feuilles de brick en bandes, déposez la farce et pliez en triangle.",
        "Cut the brick sheets into strips, add filling and fold into triangles."
      ),
      L(
        "حمّي الزيت وحمّرهم 2 دقائق من كل جهة، ومن بعد حطّهم فوق ورق مطبخ.",
        "Faites frire 2 minutes de chaque côté, puis égouttez.",
        "Fry 2 minutes per side, then drain."
      ),
      L(
        "دوب العسل مع شوية ماء الزهر، غطّس فيه البريوات ورشّ الجلجلان.",
        "Réchauffez le miel avec un peu d'eau de fleur d'oranger, trempez-y les briouats et saupoudrez de sésame.",
        "Warm the honey with a little orange blossom water, dip the briouats and sprinkle with sesame."
      ),
    ],
    equipment: [
      L("مقلاة عميقة", "Friteuse", "Deep pan"),
      L("مطحنة", "Mixeur", "Food processor"),
    ],
    tips: [
      L(
        "غطّي ورقة البسطيلة بثوب رطب باش ما تنشفش.",
        "Couvrez les feuilles de brick d'un torchon humide pour qu'elles ne sèchent pas.",
        "Keep the brick sheets under a damp cloth so they don't dry out."
      ),
      L(
        "البريوات كيتخزّنو 5 أيام فقيمة محكمة.",
        "Les briouats se gardent 5 jours dans une boîte hermétique.",
        "The briouats keep for 5 days in an airtight tin."
      ),
    ],
    isNew: true,
  },
];
