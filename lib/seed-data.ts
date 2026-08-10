export interface RecipeData {
  id: string;
  name: string;
  description: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  image: string;
  instructions: string[];
  cuisineId: string;
  dietIds: string[];
  categoryId: string;
  ingredients: {
    ingredientId: string;
    quantity: string;
    unit: string;
    optional?: boolean;
  }[];
  similarRecipeIds?: string[];
}

export interface IngredientData {
  id: string;
  name: string;
  category: string;
  image?: string;
  substitutions?: {
    targetId: string;
    ratio?: string;
    note?: string;
  }[];
  pairsWith?: string[];
}

export interface CuisineData {
  id: string;
  name: string;
  description: string;
}

export interface DietData {
  id: string;
  name: string;
  description: string;
}

export interface CategoryData {
  id: string;
  name: string;
}

export const CUISINES: CuisineData[] = [
  { id: "cui-indian", name: "Indian", description: "Rich, aromatic spices, fragrant curries, and comforting breads." },
  { id: "cui-italian", name: "Italian", description: "Fresh herbs, rich tomato sauces, artisan pasta, and extra virgin olive oil." },
  { id: "cui-chinese", name: "Chinese", description: "Savor wok-hei, bold soy sauces, ginger, garlic, and balanced stir-fries." },
  { id: "cui-mexican", name: "Mexican", description: "Vibrant chilis, lime, avocado, corn tortillas, and fresh salsas." },
  { id: "cui-thai", name: "Thai", description: "Harmonious blend of sweet, sour, salty, and fiery chili spices." },
  { id: "cui-mediterranean", name: "Mediterranean", description: "Wholesome olive oil, fresh vegetables, lemon, feta, and legumes." },
  { id: "cui-american", name: "American", description: "Hearty comfort classics, grilled favorites, and savory soul food." },
  { id: "cui-korean", name: "Korean", description: "Fermented kimchi, savory sesame oil, bold gochujang, and rich broths." },
];

export const DIETS: DietData[] = [
  { id: "diet-veg", name: "Vegetarian", description: "Plant-based foods including dairy and legumes." },
  { id: "diet-vegan", name: "Vegan", description: "Strictly plant-based with zero animal products." },
  { id: "diet-nonveg", name: "Non-Vegetarian", description: "Includes meat, poultry, seafood, and eggs." },
  { id: "diet-gf", name: "Gluten-Free", description: "Free from wheat, barley, rye, and gluten proteins." },
  { id: "diet-df", name: "Dairy-Free", description: "Free from milk, butter, cheese, and cream." },
];

export const CATEGORIES: CategoryData[] = [
  { id: "cat-main", name: "Main Course" },
  { id: "cat-breakfast", name: "Breakfast" },
  { id: "cat-lunch", name: "Lunch" },
  { id: "cat-dinner", name: "Dinner" },
  { id: "cat-soup", name: "Soup" },
  { id: "cat-snack", name: "Snack" },
  { id: "cat-dessert", name: "Dessert" },
];

export const INGREDIENTS: IngredientData[] = [
  // Aromatics & Vegetables
  { id: "ing-tomato", name: "Tomato", category: "Vegetables", pairsWith: ["ing-onion", "ing-garlic", "ing-basil"] },
  { id: "ing-onion", name: "Onion", category: "Vegetables", pairsWith: ["ing-garlic", "ing-tomato", "ing-ginger"] },
  { id: "ing-garlic", name: "Garlic", category: "Vegetables", pairsWith: ["ing-onion", "ing-ginger", "ing-olive-oil"] },
  { id: "ing-ginger", name: "Ginger", category: "Vegetables", pairsWith: ["ing-garlic", "ing-chili", "ing-soy-sauce"] },
  { id: "ing-potato", name: "Potato", category: "Vegetables", pairsWith: ["ing-onion", "ing-butter", "ing-garam-masala"] },
  { id: "ing-spinach", name: "Spinach", category: "Vegetables", pairsWith: ["ing-paneer", "ing-garlic", "ing-heavy-cream"] },
  { id: "ing-bell-pepper", name: "Bell Pepper", category: "Vegetables", pairsWith: ["ing-onion", "ing-chicken", "ing-olive-oil"] },
  { id: "ing-carrot", name: "Carrot", category: "Vegetables", pairsWith: ["ing-onion", "ing-peas", "ing-soy-sauce"] },
  { id: "ing-mushroom", name: "Mushroom", category: "Vegetables", substitutions: [{ targetId: "ing-tofu", note: "Great umami substitute" }], pairsWith: ["ing-garlic", "ing-butter", "ing-thyme"] },
  { id: "ing-cucumber", name: "Cucumber", category: "Vegetables", pairsWith: ["ing-yogurt", "ing-tomato", "ing-lemon-juice"] },
  { id: "ing-avocado", name: "Avocado", category: "Vegetables", pairsWith: ["ing-lime-juice", "ing-cilantro", "ing-onion"] },
  { id: "ing-eggplant", name: "Eggplant", category: "Vegetables", pairsWith: ["ing-tomato", "ing-garlic", "ing-olive-oil"] },
  { id: "ing-zucchini", name: "Zucchini", category: "Vegetables", pairsWith: ["ing-tomato", "ing-garlic", "ing-olive-oil"] },
  { id: "ing-chili", name: "Chili Pepper", category: "Vegetables", pairsWith: ["ing-garlic", "ing-ginger", "ing-lime-juice"] },
  { id: "ing-basil", name: "Basil", category: "Herbs", pairsWith: ["ing-tomato", "ing-mozzarella", "ing-olive-oil"] },
  { id: "ing-cilantro", name: "Cilantro", category: "Herbs", pairsWith: ["ing-lime-juice", "ing-onion", "ing-avocado"] },
  { id: "ing-thyme", name: "Thyme", category: "Herbs", pairsWith: ["ing-mushroom", "ing-butter", "ing-garlic"] },
  { id: "ing-mint", name: "Mint", category: "Herbs", pairsWith: ["ing-yogurt", "ing-lemon-juice", "ing-cucumber"] },
  { id: "ing-peas", name: "Green Peas", category: "Vegetables", pairsWith: ["ing-paneer", "ing-potato", "ing-onion"] },

  // Proteins
  { id: "ing-chicken", name: "Chicken", category: "Proteins", substitutions: [{ targetId: "ing-tofu", note: "Plant-based protein alternative" }, { targetId: "ing-paneer", note: "Vegetarian dairy substitute" }, { targetId: "ing-mushroom", note: "Meaty texture alternative" }], pairsWith: ["ing-garlic", "ing-ginger", "ing-onion"] },
  { id: "ing-beef", name: "Beef", category: "Proteins", substitutions: [{ targetId: "ing-mushroom", note: "Rich savory alternative" }], pairsWith: ["ing-onion", "ing-garlic", "ing-black-pepper"] },
  { id: "ing-pork", name: "Pork", category: "Proteins", pairsWith: ["ing-soy-sauce", "ing-ginger", "ing-garlic"] },
  { id: "ing-tofu", name: "Tofu", category: "Proteins", substitutions: [{ targetId: "ing-paneer", note: "Dairy protein option" }, { targetId: "ing-chicken", note: "Meat option" }], pairsWith: ["ing-soy-sauce", "ing-sesame-oil", "ing-ginger"] },
  { id: "ing-paneer", name: "Paneer", category: "Proteins", substitutions: [{ targetId: "ing-tofu", note: "Vegan protein substitute" }, { targetId: "ing-chicken", note: "Meat alternative" }], pairsWith: ["ing-butter", "ing-heavy-cream", "ing-spinach"] },
  { id: "ing-shrimp", name: "Shrimp", category: "Proteins", pairsWith: ["ing-garlic", "ing-lemon-juice", "ing-butter"] },
  { id: "ing-salmon", name: "Salmon", category: "Proteins", pairsWith: ["ing-lemon-juice", "ing-thyme", "ing-olive-oil"] },
  { id: "ing-eggs", name: "Eggs", category: "Proteins", pairsWith: ["ing-butter", "ing-black-pepper", "ing-tomato"] },
  { id: "ing-chickpeas", name: "Chickpeas", category: "Proteins", pairsWith: ["ing-tahini", "ing-lemon-juice", "ing-garlic"] },
  { id: "ing-black-beans", name: "Black Beans", category: "Proteins", pairsWith: ["ing-cumin", "ing-onion", "ing-garlic"] },
  { id: "ing-kidney-beans", name: "Kidney Beans", category: "Proteins", pairsWith: ["ing-tomato", "ing-onion", "ing-garam-masala"] },
  { id: "ing-lentils", name: "Lentils", category: "Proteins", pairsWith: ["ing-turmeric", "ing-cumin", "ing-garlic"] },

  // Dairy & Fats
  { id: "ing-butter", name: "Butter", category: "Dairy & Fats", substitutions: [{ targetId: "ing-ghee", ratio: "1:1", note: "Clarified butter, high smoke point" }, { targetId: "ing-olive-oil", ratio: "3:4", note: "Healthy plant-based oil substitute" }, { targetId: "ing-coconut-oil", ratio: "1:1", note: "Vegan baking/cooking fat alternative" }], pairsWith: ["ing-garlic", "ing-heavy-cream", "ing-paneer"] },
  { id: "ing-ghee", name: "Ghee", category: "Dairy & Fats", substitutions: [{ targetId: "ing-butter", ratio: "1:1", note: "Standard butter alternative" }, { targetId: "ing-vegetable-oil", ratio: "1:1", note: "Neutral oil option" }], pairsWith: ["ing-garam-masala", "ing-basmati-rice", "ing-cumin"] },
  { id: "ing-heavy-cream", name: "Heavy Cream", category: "Dairy & Fats", substitutions: [{ targetId: "ing-coconut-milk", ratio: "1:1", note: "Dairy-free creamy alternative" }, { targetId: "ing-yogurt", ratio: "1:1", note: "Tangy lower-fat option" }], pairsWith: ["ing-butter", "ing-tomato", "ing-garlic"] },
  { id: "ing-yogurt", name: "Yogurt", category: "Dairy & Fats", substitutions: [{ targetId: "ing-heavy-cream", note: "For rich curries" }], pairsWith: ["ing-cucumber", "ing-mint", "ing-garam-masala"] },
  { id: "ing-mozzarella", name: "Mozzarella", category: "Dairy & Fats", pairsWith: ["ing-tomato", "ing-basil", "ing-olive-oil"] },
  { id: "ing-parmesan", name: "Parmesan Cheese", category: "Dairy & Fats", pairsWith: ["ing-spaghetti", "ing-garlic", "ing-olive-oil"] },
  { id: "ing-cheddar", name: "Cheddar Cheese", category: "Dairy & Fats", pairsWith: ["ing-bread", "ing-butter", "ing-beef"] },
  { id: "ing-feta", name: "Feta Cheese", category: "Dairy & Fats", pairsWith: ["ing-cucumber", "ing-tomato", "ing-olive-oil"] },
  { id: "ing-coconut-milk", name: "Coconut Milk", category: "Dairy & Fats", substitutions: [{ targetId: "ing-heavy-cream", note: "Dairy counterpart for creamy curries" }], pairsWith: ["ing-curry-paste", "ing-lime-juice", "ing-cilantro"] },

  // Grains & Starches
  { id: "ing-basmati-rice", name: "Basmati Rice", category: "Grains & Starches", pairsWith: ["ing-ghee", "ing-cumin", "ing-garam-masala"] },
  { id: "ing-jasmine-rice", name: "Jasmine Rice", category: "Grains & Starches", pairsWith: ["ing-coconut-milk", "ing-soy-sauce", "ing-sesame-oil"] },
  { id: "ing-spaghetti", name: "Spaghetti", category: "Grains & Starches", pairsWith: ["ing-tomato", "ing-parmesan", "ing-garlic"] },
  { id: "ing-penne", name: "Penne Pasta", category: "Grains & Starches", pairsWith: ["ing-tomato", "ing-chili", "ing-garlic"] },
  { id: "ing-rice-noodles", name: "Rice Noodles", category: "Grains & Starches", substitutions: [{ targetId: "ing-spaghetti", note: "Pasta alternative for noodle stir-fry" }], pairsWith: ["ing-soy-sauce", "ing-lime-juice", "ing-peanuts"] },
  { id: "ing-flour", name: "All-Purpose Flour", category: "Grains & Starches", pairsWith: ["ing-butter", "ing-sugar", "ing-eggs"] },
  { id: "ing-corn-tortilla", name: "Corn Tortilla", category: "Grains & Starches", pairsWith: ["ing-chicken", "ing-avocado", "ing-lime-juice"] },
  { id: "ing-bread", name: "Bread", category: "Grains & Starches", pairsWith: ["ing-butter", "ing-cheddar", "ing-eggs"] },
  { id: "ing-pita-bread", name: "Pita Bread", category: "Grains & Starches", pairsWith: ["ing-chickpeas", "ing-tahini", "ing-cucumber"] },

  // Condiments, Oils & Spices
  { id: "ing-olive-oil", name: "Extra Virgin Olive Oil", category: "Oils & Sauces", substitutions: [{ targetId: "ing-butter", note: "Rich cooking fat" }], pairsWith: ["ing-garlic", "ing-tomato", "ing-lemon-juice"] },
  { id: "ing-vegetable-oil", name: "Vegetable Oil", category: "Oils & Sauces", substitutions: [{ targetId: "ing-ghee", note: "Rich aromatic cooking fat" }], pairsWith: ["ing-onion", "ing-garlic"] },
  { id: "ing-sesame-oil", name: "Sesame Oil", category: "Oils & Sauces", pairsWith: ["ing-soy-sauce", "ing-ginger", "ing-garlic"] },
  { id: "ing-soy-sauce", name: "Soy Sauce", category: "Oils & Sauces", pairsWith: ["ing-sesame-oil", "ing-ginger", "ing-garlic"] },
  { id: "ing-fish-sauce", name: "Fish Sauce", category: "Oils & Sauces", pairsWith: ["ing-lime-juice", "ing-chili", "ing-sugar"] },
  { id: "ing-tomato-paste", name: "Tomato Paste", category: "Oils & Sauces", pairsWith: ["ing-garlic", "ing-onion", "ing-olive-oil"] },
  { id: "ing-garam-masala", name: "Garam Masala", category: "Spices", pairsWith: ["ing-cumin", "ing-turmeric", "ing-ginger"] },
  { id: "ing-cumin", name: "Cumin", category: "Spices", pairsWith: ["ing-turmeric", "ing-coriander", "ing-garam-masala"] },
  { id: "ing-turmeric", name: "Turmeric", category: "Spices", pairsWith: ["ing-cumin", "ing-ginger", "ing-garlic"] },
  { id: "ing-paprika", name: "Smoked Paprika", category: "Spices", pairsWith: ["ing-garlic", "ing-olive-oil", "ing-cumin"] },
  { id: "ing-black-pepper", name: "Black Pepper", category: "Spices", pairsWith: ["ing-salt", "ing-olive-oil", "ing-butter"] },
  { id: "ing-salt", name: "Salt", category: "Spices" },
  { id: "ing-lemon-juice", name: "Lemon Juice", category: "Condiments", pairsWith: ["ing-olive-oil", "ing-garlic", "ing-chickpeas"] },
  { id: "ing-lime-juice", name: "Lime Juice", category: "Condiments", pairsWith: ["ing-cilantro", "ing-avocado", "ing-chili"] },
  { id: "ing-honey", name: "Honey", category: "Condiments", substitutions: [{ targetId: "ing-sugar", ratio: "3:4", note: "Granulated sweetener option" }], pairsWith: ["ing-lemon-juice", "ing-soy-sauce", "ing-mustard"] },
  { id: "ing-sugar", name: "Sugar", category: "Condiments", substitutions: [{ targetId: "ing-honey", ratio: "1:1", note: "Liquid natural sweetener" }] },
  { id: "ing-curry-paste", name: "Thai Green Curry Paste", category: "Condiments", pairsWith: ["ing-coconut-milk", "ing-chicken", "ing-bamboo"] },
  { id: "ing-tahini", name: "Tahini", category: "Condiments", pairsWith: ["ing-chickpeas", "ing-lemon-juice", "ing-garlic"] },
  { id: "ing-gochujang", name: "Gochujang Paste", category: "Condiments", pairsWith: ["ing-sesame-oil", "ing-soy-sauce", "ing-garlic"] },
  { id: "ing-peanuts", name: "Peanuts", category: "Nuts & Seeds", pairsWith: ["ing-rice-noodles", "ing-lime-juice", "ing-soy-sauce"] },
];

export const RECIPES: RecipeData[] = [
  // INDIAN RECIPES
  {
    id: "rec-butter-chicken",
    name: "Butter Chicken (Murgh Makhani)",
    description: "Tender chicken pieces simmered in a velvety, spiced tomato, butter, and cream sauce.",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-nonveg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "500", unit: "g" },
      { ingredientId: "ing-butter", quantity: "50", unit: "g" },
      { ingredientId: "ing-tomato", quantity: "4", unit: "medium" },
      { ingredientId: "ing-onion", quantity: "2", unit: "medium" },
      { ingredientId: "ing-garlic", quantity: "6", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp grated" },
      { ingredientId: "ing-heavy-cream", quantity: "100", unit: "ml" },
      { ingredientId: "ing-garam-masala", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-turmeric", quantity: "1/2", unit: "tsp" },
      { ingredientId: "ing-chili", quantity: "1", unit: "tsp powdered" },
    ],
    instructions: [
      "Marinate chicken with yogurt, ginger, garlic, turmeric, and garam masala for 30 minutes.",
      "Heat half the butter in a pan and sear chicken pieces until lightly browned. Set aside.",
      "In the same pan, saute chopped onions, garlic, and ginger until translucent.",
      "Add pureed tomatoes, chili powder, and cook down until oil separates from the gravy.",
      "Blend gravy into a smooth silk paste, return to pan, and stir in heavy cream and remaining butter.",
      "Simmer seared chicken in the creamy tomato gravy for 15 minutes. Garnish with fresh cilantro."
    ],
    similarRecipeIds: ["rec-chicken-tikka-masala", "rec-paneer-butter-masala", "rec-chicken-curry"]
  },
  {
    id: "rec-chicken-tikka-masala",
    name: "Chicken Tikka Masala",
    description: "Roasted marinated chicken chunks served in a rich, spicy, orange-hued tomato curry sauce.",
    prepTime: 25,
    cookTime: 35,
    servings: 4,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-nonveg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "600", unit: "g" },
      { ingredientId: "ing-yogurt", quantity: "1/2", unit: "cup" },
      { ingredientId: "ing-tomato", quantity: "3", unit: "large" },
      { ingredientId: "ing-onion", quantity: "2", unit: "large" },
      { ingredientId: "ing-garlic", quantity: "5", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "1.5", unit: "tsp" },
      { ingredientId: "ing-heavy-cream", quantity: "80", unit: "ml" },
      { ingredientId: "ing-ghee", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Combine chicken with yogurt, lemon juice, garlic, ginger, and spices. Marinate 1 hour.",
      "Broil or grill chicken pieces at high heat until charred at edges.",
      "Melt ghee in a large pot, fry onions until golden brown, then add garlic and ginger.",
      "Pour in tomato puree and spices, simmer until sauce thickens.",
      "Stir in cream and grilled chicken chunks. Simmer for 10 minutes until flavors combine."
    ],
    similarRecipeIds: ["rec-butter-chicken", "rec-paneer-butter-masala"]
  },
  {
    id: "rec-paneer-butter-masala",
    name: "Paneer Butter Masala",
    description: "Soft Indian cottage cheese cubes cooked in a rich, creamy, mildly sweet tomato cashew gravy.",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-paneer", quantity: "350", unit: "g" },
      { ingredientId: "ing-butter", quantity: "40", unit: "g" },
      { ingredientId: "ing-tomato", quantity: "4", unit: "medium" },
      { ingredientId: "ing-onion", quantity: "1", unit: "large" },
      { ingredientId: "ing-garlic", quantity: "4", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-heavy-cream", quantity: "3", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-turmeric", quantity: "1/2", unit: "tsp" },
    ],
    instructions: [
      "Saute onions, tomatoes, garlic, ginger, and cashews in butter until soft.",
      "Puree the cooked mixture into a silk-smooth paste.",
      "Heat butter in pan, add pureed gravy, spices, and salt.",
      "Add fresh paneer cubes and simmer gently for 5 minutes.",
      "Finish with heavy cream, fenugreek leaves, and fresh cilantro."
    ],
    similarRecipeIds: ["rec-butter-chicken", "rec-palak-paneer"]
  },
  {
    id: "rec-palak-paneer",
    name: "Palak Paneer",
    description: "Cubes of paneer cheese folded into a vibrant green, spiced spinach gravy.",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-paneer", quantity: "300", unit: "g" },
      { ingredientId: "ing-spinach", quantity: "400", unit: "g fresh" },
      { ingredientId: "ing-onion", quantity: "1", unit: "medium" },
      { ingredientId: "ing-tomato", quantity: "1", unit: "medium" },
      { ingredientId: "ing-garlic", quantity: "5", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-ghee", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "1/2", unit: "tsp" },
      { ingredientId: "ing-heavy-cream", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Blanch spinach leaves in boiling water for 2 minutes, then plunge into ice water.",
      "Blend blanched spinach into a fine emerald puree.",
      "Heat ghee in a pan, sauté garlic, ginger, chopped onions, and tomato.",
      "Pour in spinach puree, add spices, and bring to a gentle simmer.",
      "Add paneer cubes and cook for 3-4 minutes. Drizzle with heavy cream."
    ],
    similarRecipeIds: ["rec-paneer-butter-masala", "rec-dal-tadka"]
  },
  {
    id: "rec-chole-masala",
    name: "Chole Masala (Chickpea Curry)",
    description: "Hearty North Indian chickpea curry simmered with spicy onion-tomato gravy and warm spices.",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-veg", "diet-vegan", "diet-gf", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chickpeas", quantity: "2", unit: "cans (400g each)" },
      { ingredientId: "ing-onion", quantity: "2", unit: "finely chopped" },
      { ingredientId: "ing-tomato", quantity: "3", unit: "pureed" },
      { ingredientId: "ing-garlic", quantity: "4", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "1.5", unit: "tsp" },
      { ingredientId: "ing-cumin", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-turmeric", quantity: "1/2", unit: "tsp" },
      { ingredientId: "ing-vegetable-oil", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Heat oil in a heavy pot, add cumin seeds until they crackle.",
      "Add onions and fry until golden brown, then add minced garlic and ginger.",
      "Stir in tomato puree, turmeric, cumin powder, and chole spices.",
      "Add chickpeas with 1 cup water, cover and simmer for 20 minutes.",
      "Gently mash some chickpeas to thicken gravy. Garnish with lemon juice and cilantro."
    ],
    similarRecipeIds: ["rec-rajma-curry", "rec-dal-tadka"]
  },
  {
    id: "rec-rajma-curry",
    name: "Rajma Masala",
    description: "Comforting red kidney bean curry cooked in a fragrant onion-tomato-garlic reduction.",
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-veg", "diet-vegan", "diet-gf", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-kidney-beans", quantity: "2", unit: "cans" },
      { ingredientId: "ing-onion", quantity: "2", unit: "medium" },
      { ingredientId: "ing-tomato", quantity: "3", unit: "medium" },
      { ingredientId: "ing-garlic", quantity: "5", unit: "cloves" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-cumin", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-ghee", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Heat ghee in a pot, add cumin seeds, chopped onions, and brown thoroughly.",
      "Mix in garlic-ginger paste, tomato puree, turmeric, chili, and salt.",
      "Cook masala until oil separates from the sides.",
      "Add cooked kidney beans and simmer for 20 minutes until thick and creamy.",
      "Serve hot with fragrant steamed basmati rice."
    ],
    similarRecipeIds: ["rec-chole-masala", "rec-dal-tadka"]
  },
  {
    id: "rec-chicken-biryani",
    name: "Hyderabadi Chicken Biryani",
    description: "Layered basmati rice dish cooked with marinated spiced chicken, fried onions, ghee, and saffron.",
    prepTime: 35,
    cookTime: 45,
    servings: 6,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-nonveg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "800", unit: "g bone-in" },
      { ingredientId: "ing-basmati-rice", quantity: "3", unit: "cups" },
      { ingredientId: "ing-yogurt", quantity: "1", unit: "cup" },
      { ingredientId: "ing-onion", quantity: "3", unit: "large sliced" },
      { ingredientId: "ing-ghee", quantity: "4", unit: "tbsp" },
      { ingredientId: "ing-garlic", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-garam-masala", quantity: "2", unit: "tsp" },
      { ingredientId: "ing-mint", quantity: "1/2", unit: "cup" },
      { ingredientId: "ing-cilantro", quantity: "1/2", unit: "cup" },
    ],
    instructions: [
      "Marinate chicken in yogurt, spices, mint, cilantro, garlic, and ginger for 2 hours.",
      "Deep-fry sliced onions in ghee until crispy and golden-brown.",
      "Parboil basmati rice with whole spices until 70% cooked.",
      "Layer marinated chicken at the bottom of a heavy pot, top with parboiled rice, fried onions, and ghee.",
      "Seal lid tightly and cook on high heat for 10 min, then low heat (Dum) for 25 min."
    ],
    similarRecipeIds: ["rec-butter-chicken", "rec-chicken-curry"]
  },
  {
    id: "rec-dal-tadka",
    name: "Yellow Dal Tadka",
    description: "Creamy yellow lentils tempered with ghee, cumin, garlic, chili, and fresh tomatoes.",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-indian",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-lentils", quantity: "1", unit: "cup yellow lentils" },
      { ingredientId: "ing-tomato", quantity: "1", unit: "medium" },
      { ingredientId: "ing-onion", quantity: "1", unit: "medium" },
      { ingredientId: "ing-garlic", quantity: "6", unit: "cloves sliced" },
      { ingredientId: "ing-ghee", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-cumin", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-turmeric", quantity: "1/2", unit: "tsp" },
      { ingredientId: "ing-chili", quantity: "2", unit: "whole red" },
    ],
    instructions: [
      "Pressure cook lentils with turmeric, salt, and water until soft and creamy.",
      "Heat ghee in a small pan for the temper (Tadka). Add cumin, whole red chilis, and sliced garlic.",
      "Sauté chopped onions and tomatoes until soft.",
      "Pour cooked lentils into the pan, simmer for 5 minutes.",
      "Pour the piping hot garlic ghee tempering over the dal right before serving."
    ],
    similarRecipeIds: ["rec-chole-masala", "rec-rajma-curry"]
  },

  // ITALIAN RECIPES
  {
    id: "rec-margherita-pizza",
    name: "Classic Pizza Margherita",
    description: "Traditional Neapolitan pizza topped with fresh tomato sauce, creamy mozzarella, and basil leaves.",
    prepTime: 20,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-veg"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-flour", quantity: "250", unit: "g pizza flour" },
      { ingredientId: "ing-tomato", quantity: "3", unit: "San Marzano tomatoes" },
      { ingredientId: "ing-mozzarella", quantity: "150", unit: "g fresh" },
      { ingredientId: "ing-basil", quantity: "8", unit: "fresh leaves" },
      { ingredientId: "ing-olive-oil", quantity: "2", unit: "tbsp EVOO" },
      { ingredientId: "ing-garlic", quantity: "1", unit: "clove minced" },
      { ingredientId: "ing-salt", quantity: "1/2", unit: "tsp" },
    ],
    instructions: [
      "Stretch pizza dough into a 10-inch thin round base.",
      "Crush tomatoes with minced garlic, salt, and olive oil for fresh raw sauce.",
      "Spread sauce evenly over dough, leave 1/2 inch crust margin.",
      "Tear fresh mozzarella ball over pizza.",
      "Bake in a preheated high heat oven (500°F/260°C) on stone for 8-10 minutes.",
      "Top with fresh basil leaves and a drizzle of extra virgin olive oil."
    ],
    similarRecipeIds: ["rec-pasta-arrabbiata", "rec-caprese-salad"]
  },
  {
    id: "rec-pasta-arrabbiata",
    name: "Penne Pasta Arrabbiata",
    description: "Fiery Roman pasta tossed in a spicy garlic and chili tomato sauce with olive oil.",
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1621996346565-e3def616403c?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-veg", "diet-vegan", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-penne", quantity: "300", unit: "g" },
      { ingredientId: "ing-tomato", quantity: "400", unit: "g crushed" },
      { ingredientId: "ing-garlic", quantity: "4", unit: "cloves sliced" },
      { ingredientId: "ing-chili", quantity: "1.5", unit: "tsp crushed red pepper" },
      { ingredientId: "ing-olive-oil", quantity: "3", unit: "tbsp EVOO" },
      { ingredientId: "ing-basil", quantity: "5", unit: "leaves" },
      { ingredientId: "ing-parmesan", quantity: "30", unit: "g grated" },
    ],
    instructions: [
      "Boil penne in salted water until al dente.",
      "Heat olive oil in a wide skillet, gently fry sliced garlic and chili flakes until fragrant.",
      "Pour in crushed tomatoes, season with salt, and simmer for 10 minutes.",
      "Toss drained penne directly into sauce with 2 tbsp pasta cooking water.",
      "Garnish with basil and parmesan cheese."
    ],
    similarRecipeIds: ["rec-margherita-pizza", "rec-spaghetti-carbonara"]
  },
  {
    id: "rec-spaghetti-carbonara",
    name: "Spaghetti alla Carbonara",
    description: "Classic Roman pasta with egg yolks, sharp parmesan, crispy pork, and black pepper.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-nonveg"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-spaghetti", quantity: "250", unit: "g" },
      { ingredientId: "ing-pork", quantity: "100", unit: "g pancetta or guanciale" },
      { ingredientId: "ing-eggs", quantity: "3", unit: "large yolks + 1 whole" },
      { ingredientId: "ing-parmesan", quantity: "60", unit: "g finely grated" },
      { ingredientId: "ing-black-pepper", quantity: "1", unit: "tbsp coarsely cracked" },
    ],
    instructions: [
      "Crisp pancetta strips in a skillet over medium heat until golden.",
      "Whisk egg yolks, whole egg, grated parmesan, and black pepper in a bowl.",
      "Cook spaghetti until al dente, reserve 1/2 cup starchy pasta water.",
      "Combine hot pasta with crisp pancetta in skillet off the heat.",
      "Pour egg-cheese mixture quickly into hot pasta, tossing vigorously to create a glossy emulsion."
    ],
    similarRecipeIds: ["rec-pasta-arrabbiata", "rec-pasta-alfredo"]
  },
  {
    id: "rec-pasta-alfredo",
    name: "Fettuccine Alfredo",
    description: "Rich fettuccine pasta coated in an indulgent melted butter and parmesan cream sauce.",
    prepTime: 10,
    cookTime: 12,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-veg"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-spaghetti", quantity: "300", unit: "g fettuccine" },
      { ingredientId: "ing-butter", quantity: "60", unit: "g unsalted" },
      { ingredientId: "ing-heavy-cream", quantity: "150", unit: "ml" },
      { ingredientId: "ing-parmesan", quantity: "80", unit: "g freshly grated" },
      { ingredientId: "ing-garlic", quantity: "2", unit: "cloves minced" },
      { ingredientId: "ing-black-pepper", quantity: "1/2", unit: "tsp" },
    ],
    instructions: [
      "Cook pasta in salted water until al dente.",
      "Melt butter in a skillet over low heat, add minced garlic and heavy cream.",
      "Simmer cream gently for 3 minutes.",
      "Add hot pasta into cream, turn off heat, and gradually fold in grated parmesan until silky smooth.",
      "Season with cracked black pepper and serve immediately."
    ],
    similarRecipeIds: ["rec-spaghetti-carbonara", "rec-mushroom-risotto"]
  },
  {
    id: "rec-mushroom-risotto",
    name: "Creamy Wild Mushroom Risotto",
    description: "Arborio rice slow-cooked with sautéed wild mushrooms, white wine, garlic, butter, and parmesan.",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-mushroom", quantity: "300", unit: "g cremini & shiitake" },
      { ingredientId: "ing-butter", quantity: "50", unit: "g" },
      { ingredientId: "ing-onion", quantity: "1", unit: "finely diced" },
      { ingredientId: "ing-garlic", quantity: "3", unit: "cloves" },
      { ingredientId: "ing-parmesan", quantity: "50", unit: "g" },
      { ingredientId: "ing-olive-oil", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-thyme", quantity: "2", unit: "sprigs" },
    ],
    instructions: [
      "Sauté sliced mushrooms in olive oil until golden brown. Set half aside for garnish.",
      "Melt butter in saucepan, sweat diced onion and garlic until translucent.",
      "Add arborio rice, toast for 2 minutes until translucent at edges.",
      "Add warm vegetable broth one ladle at a time, stirring constantly until absorbed.",
      "Stir in mushrooms, butter, thyme, and parmesan cheese until velvety."
    ],
    similarRecipeIds: ["rec-pasta-alfredo", "rec-minestrone-soup"]
  },
  {
    id: "rec-caprese-salad",
    name: "Classic Caprese Salad",
    description: "Refreshing salad of ripe sliced tomatoes, fresh mozzarella, aromatic basil, and olive oil.",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-italian",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-snack",
    ingredients: [
      { ingredientId: "ing-tomato", quantity: "3", unit: "large vine ripe" },
      { ingredientId: "ing-mozzarella", quantity: "200", unit: "g fresh bufala" },
      { ingredientId: "ing-basil", quantity: "10", unit: "fresh leaves" },
      { ingredientId: "ing-olive-oil", quantity: "2", unit: "tbsp EVOO" },
      { ingredientId: "ing-black-pepper", quantity: "1/4", unit: "tsp ground" },
    ],
    instructions: [
      "Slice ripe tomatoes and fresh mozzarella into 1/4-inch thick rounds.",
      "Alternate slices of tomato, mozzarella, and basil leaves on a serving platter.",
      "Drizzle generously with high quality extra virgin olive oil.",
      "Season with flaky sea salt and cracked black pepper."
    ],
    similarRecipeIds: ["rec-greek-salad", "rec-margherita-pizza"]
  },

  // CHINESE RECIPES
  {
    id: "rec-kung-pao-chicken",
    name: "Kung Pao Chicken",
    description: "Classic Sichuan stir-fried chicken with crunchy peanuts, chili peppers, garlic, and ginger.",
    prepTime: 20,
    cookTime: 10,
    servings: 3,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-chinese",
    dietIds: ["diet-nonveg", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "400", unit: "g cubed" },
      { ingredientId: "ing-peanuts", quantity: "1/2", unit: "cup roasted" },
      { ingredientId: "ing-chili", quantity: "6", unit: "dried red chilis" },
      { ingredientId: "ing-garlic", quantity: "4", unit: "cloves sliced" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tbsp minced" },
      { ingredientId: "ing-soy-sauce", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-sesame-oil", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-bell-pepper", quantity: "1", unit: "medium" },
    ],
    instructions: [
      "Marinate chicken cubes with soy sauce, cornstarch, and sesame oil.",
      "Heat wok over high heat, fry dried chilis, garlic, and ginger until fragrant.",
      "Add marinated chicken and stir-fry vigorously for 4 minutes until seared.",
      "Add bell pepper, peanuts, soy sauce, and sugar.",
      "Toss stir-fry until chicken is thoroughly cooked and glossy."
    ],
    similarRecipeIds: ["rec-fried-rice", "rec-hakka-noodles"]
  },
  {
    id: "rec-fried-rice",
    name: "Yangzhou Egg Fried Rice",
    description: "Fragrant jasmine rice stir-fried in a wok with scrambled eggs, green peas, carrots, and soy sauce.",
    prepTime: 10,
    cookTime: 10,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-chinese",
    dietIds: ["diet-veg", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-jasmine-rice", quantity: "3", unit: "cups day-old cooked" },
      { ingredientId: "ing-eggs", quantity: "3", unit: "whisked" },
      { ingredientId: "ing-peas", quantity: "1/2", unit: "cup" },
      { ingredientId: "ing-carrot", quantity: "1/2", unit: "cup diced" },
      { ingredientId: "ing-garlic", quantity: "2", unit: "cloves minced" },
      { ingredientId: "ing-soy-sauce", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-sesame-oil", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-vegetable-oil", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Heat vegetable oil in wok, scramble eggs lightly and break into small curd. Set aside.",
      "Add garlic, diced carrots, and green peas to hot wok and stir-fry for 2 minutes.",
      "Add cold day-old jasmine rice, breaking up clumps with spatula.",
      "Drizzle light soy sauce and sesame oil over rice, toss on high heat.",
      "Fold scrambled eggs back in and serve piping hot."
    ],
    similarRecipeIds: ["rec-hakka-noodles", "rec-kung-pao-chicken"]
  },
  {
    id: "rec-hakka-noodles",
    name: "Vegetable Hakka Noodles",
    description: "Indo-Chinese style noodle stir-fry with crunchy cabbage, bell peppers, soy sauce, and garlic.",
    prepTime: 15,
    cookTime: 10,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-chinese",
    dietIds: ["diet-veg", "diet-vegan", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-rice-noodles", quantity: "250", unit: "g" },
      { ingredientId: "ing-bell-pepper", quantity: "1", unit: "julienned" },
      { ingredientId: "ing-carrot", quantity: "1", unit: "julienned" },
      { ingredientId: "ing-onion", quantity: "1", unit: "sliced" },
      { ingredientId: "ing-garlic", quantity: "4", unit: "cloves minced" },
      { ingredientId: "ing-ginger", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-soy-sauce", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-sesame-oil", quantity: "1", unit: "tbsp" },
    ],
    instructions: [
      "Boil noodles until just tender, drain, and toss with a drop of oil.",
      "Heat oil in wok over smokey high heat.",
      "Stir-fry garlic, ginger, sliced onion, bell peppers, and carrots for 2 minutes.",
      "Add boiled noodles, soy sauce, vinegar, and sesame oil.",
      "Toss rapidly on high heat using tongs until veggies stay crisp and noodles are seasoned."
    ],
    similarRecipeIds: ["rec-fried-rice", "rec-pad-thai"]
  },

  // MEXICAN RECIPES
  {
    id: "rec-chicken-tacos",
    name: "Street Chicken Tacos",
    description: "Juicy citrus-chili marinated chicken served in soft corn tortillas with fresh guacamole and lime.",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-mexican",
    dietIds: ["diet-nonveg", "diet-gf", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "500", unit: "g thighs" },
      { ingredientId: "ing-corn-tortilla", quantity: "8", unit: "small tortillas" },
      { ingredientId: "ing-avocado", quantity: "2", unit: "ripe" },
      { ingredientId: "ing-lime-juice", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-onion", quantity: "1", unit: "finely diced" },
      { ingredientId: "ing-cilantro", quantity: "1/2", unit: "cup chopped" },
      { ingredientId: "ing-garlic", quantity: "3", unit: "cloves" },
      { ingredientId: "ing-cumin", quantity: "1", unit: "tsp" },
    ],
    instructions: [
      "Marinate chicken thighs in lime juice, garlic, cumin, chili powder, and olive oil.",
      "Sear chicken on a hot skillet for 6 minutes per side until charred and cooked.",
      "Dice chicken into small bite-sized taco pieces.",
      "Warm corn tortillas on dry skillet.",
      "Fill tortillas with diced chicken, fresh guacamole, chopped onion, cilantro, and lime squeeze."
    ],
    similarRecipeIds: ["rec-guacamole", "rec-quesadilla"]
  },
  {
    id: "rec-guacamole",
    name: "Authentic Fresh Guacamole",
    description: "Creamy mashed avocados combined with fresh lime, cilantro, diced onion, tomato, and sea salt.",
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-mexican",
    dietIds: ["diet-veg", "diet-vegan", "diet-gf", "diet-df"],
    categoryId: "cat-snack",
    ingredients: [
      { ingredientId: "ing-avocado", quantity: "3", unit: "ripe Hass avocados" },
      { ingredientId: "ing-lime-juice", quantity: "2", unit: "tbsp fresh" },
      { ingredientId: "ing-onion", quantity: "1/4", unit: "cup finely diced red onion" },
      { ingredientId: "ing-tomato", quantity: "1", unit: "diced medium" },
      { ingredientId: "ing-cilantro", quantity: "3", unit: "tbsp chopped" },
      { ingredientId: "ing-chili", quantity: "1", unit: "jalapeno seeded and minced" },
      { ingredientId: "ing-salt", quantity: "1/2", unit: "tsp" },
    ],
    instructions: [
      "Halve avocados, remove pit, and scoop flesh into molcajete or glass bowl.",
      "Mash avocados coarse with fork, leaving chunky texture.",
      "Fold in fresh lime juice, diced onion, tomato, minced jalapeno, and chopped cilantro.",
      "Season with sea salt to taste and serve with warm corn tortilla chips."
    ],
    similarRecipeIds: ["rec-chicken-tacos", "rec-quesadilla"]
  },
  {
    id: "rec-quesadilla",
    name: "Cheesy Chicken & Pepper Quesadilla",
    description: "Crispy grilled tortilla loaded with melted cheddar, seasoned chicken, onions, and bell peppers.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-mexican",
    dietIds: ["diet-nonveg"],
    categoryId: "cat-lunch",
    ingredients: [
      { ingredientId: "ing-corn-tortilla", quantity: "4", unit: "flour or corn tortillas" },
      { ingredientId: "ing-chicken", quantity: "200", unit: "g shredded cooked" },
      { ingredientId: "ing-cheddar", quantity: "1.5", unit: "cups shredded" },
      { ingredientId: "ing-bell-pepper", quantity: "1/2", unit: "sliced" },
      { ingredientId: "ing-onion", quantity: "1/2", unit: "sliced" },
      { ingredientId: "ing-butter", quantity: "1", unit: "tbsp" },
    ],
    instructions: [
      "Saute bell peppers and onions until soft.",
      "Butter one side of tortilla, lay flat on skillet.",
      "Spread cheddar cheese, chicken, sautéed veggies, and top with more cheese.",
      "Fold tortilla over or top with second tortilla.",
      "Grill on medium heat for 3-4 minutes per side until golden brown and melted."
    ],
    similarRecipeIds: ["rec-chicken-tacos", "rec-guacamole"]
  },

  // THAI RECIPES
  {
    id: "rec-pad-thai",
    name: "Classic Chicken Pad Thai",
    description: "Iconic Thai stir-fried rice noodles with chicken, eggs, peanuts, bean sprouts, and lime.",
    prepTime: 20,
    cookTime: 15,
    servings: 3,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-thai",
    dietIds: ["diet-nonveg", "diet-df", "diet-gf"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-rice-noodles", quantity: "200", unit: "g flat rice noodles" },
      { ingredientId: "ing-chicken", quantity: "250", unit: "g sliced" },
      { ingredientId: "ing-eggs", quantity: "2", unit: "whisked" },
      { ingredientId: "ing-peanuts", quantity: "1/3", unit: "cup crushed" },
      { ingredientId: "ing-fish-sauce", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-lime-juice", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-sugar", quantity: "1.5", unit: "tbsp palm sugar" },
      { ingredientId: "ing-garlic", quantity: "3", unit: "cloves" },
    ],
    instructions: [
      "Soak rice noodles in warm water for 25 minutes until pliable.",
      "Whisk fish sauce, lime juice, tamarind, and sugar for Pad Thai sauce.",
      "Stir-fry chicken and garlic in wok until cooked. Push to side, scramble eggs.",
      "Add soaked noodles and Pad Thai sauce, toss quickly until sauce is absorbed.",
      "Serve with crushed peanuts, fresh lime wedge, and bean sprouts."
    ],
    similarRecipeIds: ["rec-thai-green-curry", "rec-hakka-noodles"]
  },
  {
    id: "rec-thai-green-curry",
    name: "Thai Green Chicken Curry",
    description: "Fragrant coconut curry with tender chicken, Thai green curry paste, bamboo, and fresh basil.",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-thai",
    dietIds: ["diet-nonveg", "diet-gf", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-chicken", quantity: "500", unit: "g sliced" },
      { ingredientId: "ing-coconut-milk", quantity: "400", unit: "ml" },
      { ingredientId: "ing-curry-paste", quantity: "3", unit: "tbsp green curry paste" },
      { ingredientId: "ing-fish-sauce", quantity: "1.5", unit: "tbsp" },
      { ingredientId: "ing-basil", quantity: "1/2", unit: "cup Thai basil" },
      { ingredientId: "ing-zucchini", quantity: "1", unit: "sliced" },
      { ingredientId: "ing-bell-pepper", quantity: "1", unit: "sliced" },
      { ingredientId: "ing-sugar", quantity: "1", unit: "tsp" },
    ],
    instructions: [
      "Fry green curry paste in 1/2 cup of thick coconut milk until oil renders out.",
      "Add sliced chicken breast, stirring to coat in paste for 3 minutes.",
      "Pour in remaining coconut milk, zucchini, and bell peppers.",
      "Season with fish sauce and sugar. Simmer gently for 10 minutes.",
      "Stir in fresh Thai basil leaves right before serving with jasmine rice."
    ],
    similarRecipeIds: ["rec-pad-thai", "rec-butter-chicken"]
  },

  // MEDITERRANEAN RECIPES
  {
    id: "rec-greek-salad",
    name: "Traditional Greek Village Salad",
    description: "Crisp cucumbers, juicy tomatoes, kalamata olives, red onion, and block of feta sprinkled with oregano.",
    prepTime: 12,
    cookTime: 0,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-mediterranean",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-lunch",
    ingredients: [
      { ingredientId: "ing-cucumber", quantity: "2", unit: "large sliced" },
      { ingredientId: "ing-tomato", quantity: "3", unit: "ripe wedge cut" },
      { ingredientId: "ing-onion", quantity: "1/2", unit: "red onion thinly sliced" },
      { ingredientId: "ing-feta", quantity: "150", unit: "g thick block" },
      { ingredientId: "ing-olive-oil", quantity: "3", unit: "tbsp EVOO" },
      { ingredientId: "ing-lemon-juice", quantity: "1", unit: "tbsp" },
    ],
    instructions: [
      "Combine thick cucumber slices, tomato wedges, and red onion in a salad bowl.",
      "Top with a whole slab of creamy feta cheese.",
      "Drizzle heavily with extra virgin olive oil and fresh lemon juice.",
      "Dust with wild dried oregano and sea salt flakes."
    ],
    similarRecipeIds: ["rec-caprese-salad", "rec-shakshuka"]
  },
  {
    id: "rec-shakshuka",
    name: "Middle Eastern Shakshuka",
    description: "Poached eggs nestled in a warm, spiced tomato, red pepper, onion, and garlic stew.",
    prepTime: 10,
    cookTime: 20,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-mediterranean",
    dietIds: ["diet-veg", "diet-gf", "diet-df"],
    categoryId: "cat-breakfast",
    ingredients: [
      { ingredientId: "ing-eggs", quantity: "4", unit: "large" },
      { ingredientId: "ing-tomato", quantity: "400", unit: "g crushed canned" },
      { ingredientId: "ing-bell-pepper", quantity: "1", unit: "diced red" },
      { ingredientId: "ing-onion", quantity: "1", unit: "diced" },
      { ingredientId: "ing-garlic", quantity: "3", unit: "cloves minced" },
      { ingredientId: "ing-cumin", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-paprika", quantity: "1", unit: "tsp" },
      { ingredientId: "ing-olive-oil", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-cilantro", quantity: "2", unit: "tbsp garnish" },
    ],
    instructions: [
      "Heat olive oil in cast iron skillet, sauté onions, bell pepper, and garlic until soft.",
      "Add cumin, paprika, chili, and crushed tomatoes. Simmer sauce for 10 minutes.",
      "Make 4 small wells in the bubbling sauce and crack eggs gently into each.",
      "Cover skillet and cook on low heat for 5-8 minutes until whites are set and yolks run runny.",
      "Garnish with fresh cilantro and serve warm with pita bread."
    ],
    similarRecipeIds: ["rec-greek-salad", "rec-chole-masala"]
  },

  // AMERICAN RECIPES
  {
    id: "rec-cheeseburger",
    name: "Classic American Cheeseburger",
    description: "Juicy grilled beef patty topped with melted cheddar, crisp lettuce, tomato, and special sauce.",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-american",
    dietIds: ["diet-nonveg"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-beef", quantity: "350", unit: "g ground chuck" },
      { ingredientId: "ing-cheddar", quantity: "2", unit: "slices" },
      { ingredientId: "ing-bread", quantity: "2", unit: "brioche buns" },
      { ingredientId: "ing-tomato", quantity: "1", unit: "sliced" },
      { ingredientId: "ing-onion", quantity: "1/2", unit: "sliced" },
      { ingredientId: "ing-butter", quantity: "1", unit: "tbsp" },
      { ingredientId: "ing-black-pepper", quantity: "1/2", unit: "tsp" },
    ],
    instructions: [
      "Form beef into two loose 175g patties. Season generously with salt and black pepper.",
      "Butter buns and toast on flat top skillet.",
      "Sear beef patties on hot cast iron skillet for 3 minutes until dark crust forms.",
      "Flip patties, immediately top with cheddar slice, and cover pan to melt cheese.",
      "Assemble toasted bun, patty, tomato slice, onion rings, and serve immediately."
    ],
    similarRecipeIds: ["rec-tomato-soup", "rec-quesadilla"]
  },
  {
    id: "rec-tomato-soup",
    name: "Roasted Tomato & Garlic Soup",
    description: "Silky, soul-soothing soup made from roasted tomatoes, garlic, fresh basil, and cream.",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-american",
    dietIds: ["diet-veg", "diet-gf"],
    categoryId: "cat-soup",
    ingredients: [
      { ingredientId: "ing-tomato", quantity: "1", unit: "kg plum tomatoes" },
      { ingredientId: "ing-garlic", quantity: "1", unit: "whole head roasted" },
      { ingredientId: "ing-onion", quantity: "1", unit: "yellow onion" },
      { ingredientId: "ing-olive-oil", quantity: "3", unit: "tbsp" },
      { ingredientId: "ing-heavy-cream", quantity: "60", unit: "ml" },
      { ingredientId: "ing-basil", quantity: "6", unit: "leaves" },
      { ingredientId: "ing-butter", quantity: "1", unit: "tbsp" },
    ],
    instructions: [
      "Toss halved tomatoes, sliced onion, and garlic head in olive oil, salt, and pepper.",
      "Roast at 400°F (200°C) for 35 minutes until caramelized.",
      "Squeeze roasted garlic out of skins into pot with roasted tomatoes and broth.",
      "Blend smooth using immersion blender.",
      "Stir in heavy cream and butter, season, and serve hot with grilled cheese."
    ],
    similarRecipeIds: ["rec-cheeseburger", "rec-minestrone-soup"]
  },

  // KOREAN RECIPES
  {
    id: "rec-bibimbap",
    name: "Korean Beef & Vegetable Bibimbap",
    description: "Vibrant Korean rice bowl topped with seasoned vegetables, beef, fried egg, and spicy gochujang sauce.",
    prepTime: 25,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    cuisineId: "cui-korean",
    dietIds: ["diet-nonveg", "diet-df"],
    categoryId: "cat-main",
    ingredients: [
      { ingredientId: "ing-jasmine-rice", quantity: "2", unit: "cups cooked" },
      { ingredientId: "ing-beef", quantity: "150", unit: "g thinly sliced" },
      { ingredientId: "ing-spinach", quantity: "100", unit: "g blanched" },
      { ingredientId: "ing-carrot", quantity: "1", unit: "julienned" },
      { ingredientId: "ing-mushroom", quantity: "100", unit: "g shiitake" },
      { ingredientId: "ing-eggs", quantity: "2", unit: "sunny side up" },
      { ingredientId: "ing-gochujang", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-sesame-oil", quantity: "2", unit: "tbsp" },
      { ingredientId: "ing-soy-sauce", quantity: "1", unit: "tbsp" },
    ],
    instructions: [
      "Sauté seasoned beef, carrots, spinach, and mushrooms individually with sesame oil.",
      "Place warm rice in bowl or hot stone bowl (Dolsot).",
      "Arrange sautéed vegetables and beef in colorful spokes over rice.",
      "Top with sunny side up fried egg in center.",
      "Serve with gochujang sesame sauce, mix thoroughly before eating."
    ],
    similarRecipeIds: ["rec-fried-rice", "rec-kung-pao-chicken"]
  }
];
