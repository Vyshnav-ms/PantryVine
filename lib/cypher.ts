import { runCypher, checkCognodbConnection } from "./cognodb";
import { RECIPES, INGREDIENTS, CUISINES, DIETS, CATEGORIES, RecipeData, IngredientData } from "./seed-data";

export interface RecipeQueryResult {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  image: string;
  instructions: string[];
  cuisine: string;
  diets: string[];
  category: string;
  ingredients: {
    id: string;
    name: string;
    quantity: string;
    unit: string;
    substitutions?: { id: string; name: string; note?: string }[];
  }[];
  matchPercentage?: number;
  matchedCount?: number;
  totalCount?: number;
  missingIngredients?: string[];
}

/**
  * In-memory helper to format raw seed recipe into standard result
  */
function formatSeedRecipe(recipe: RecipeData): RecipeQueryResult {
  const cuisine = CUISINES.find((c) => c.id === recipe.cuisineId)?.name || "Global";
  const category = CATEGORIES.find((cat) => cat.id === recipe.categoryId)?.name || "Main Course";
  const diets = recipe.dietIds
    .map((dId) => DIETS.find((d) => d.id === dId)?.name)
    .filter(Boolean) as string[];

  const formattedIngredients = recipe.ingredients.map((item) => {
    const ingObj = INGREDIENTS.find((i) => i.id === item.ingredientId);
    const subs = (ingObj?.substitutions || []).map((sub) => {
      const targetIng = INGREDIENTS.find((i) => i.id === sub.targetId);
      return {
        id: sub.targetId,
        name: targetIng?.name || sub.targetId,
        note: sub.note,
      };
    });

    return {
      id: item.ingredientId,
      name: ingObj?.name || item.ingredientId,
      quantity: item.quantity,
      unit: item.unit,
      substitutions: subs,
    };
  });

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    image: recipe.image,
    instructions: recipe.instructions,
    cuisine,
    diets,
    category,
    ingredients: formattedIngredients,
  };
}

/**
  * Find recipes based on user-provided ingredients using CognoDB Cypher query.
  * Falls back to in-memory graph matching if CognoDB is disconnected.
  */
export async function findRecipesByIngredients(userIngredients: string[]): Promise<{
  recipes: RecipeQueryResult[];
  source: "cognodb" | "fallback";
}> {
  const dbStatus = await checkCognodbConnection();

  if (dbStatus.isConnected) {
    try {
      const normalizedIngredients = userIngredients.map((i) => i.trim().toLowerCase());
      const query = `
        MATCH (r:Recipe)-[:CONTAINS]->(i:Ingredient)
        WITH r, collect(toLower(i.name)) AS reqNames, collect(i) AS reqIngredients
        WITH r, reqNames, reqIngredients,
             [name IN reqNames WHERE name IN $userIngredients] AS matchedNames
        WITH r, reqNames, reqIngredients, matchedNames,
             size(matchedNames) AS matchedCount,
             size(reqNames) AS totalCount
        WHERE matchedCount > 0
        WITH r, reqIngredients, matchedNames, matchedCount, totalCount,
             toInteger(round((toFloat(matchedCount) / totalCount) * 100)) AS matchPercentage,
             [ing IN reqIngredients WHERE NOT toLower(ing.name) IN $userIngredients | ing.name] AS missingIngredients
        MATCH (r)-[:BELONGS_TO]->(c:Cuisine)
        OPTIONAL MATCH (r)-[:SUITABLE_FOR]->(d:Diet)
        OPTIONAL MATCH (r)-[:HAS_CATEGORY]->(cat:Category)
        RETURN r, c.name AS cuisine, collect(DISTINCT d.name) AS diets, cat.name AS category,
               matchPercentage, matchedCount, totalCount, missingIngredients
        ORDER BY matchPercentage DESC, matchedCount DESC, r.name ASC
      `;

      const res = await runCypher(query, { userIngredients: normalizedIngredients });

      if (res && res.records.length > 0) {
        const recipes: RecipeQueryResult[] = res.records.map((record) => {
          const rProps = record.get("r").properties;
          const cuisine = record.get("cuisine");
          const diets = record.get("diets") || [];
          const category = record.get("category") || "Main Course";
          const matchPercentage = record.get("matchPercentage")?.toNumber
            ? record.get("matchPercentage").toNumber()
            : Number(record.get("matchPercentage"));
          const matchedCount = record.get("matchedCount")?.toNumber
            ? record.get("matchedCount").toNumber()
            : Number(record.get("matchedCount"));
          const totalCount = record.get("totalCount")?.toNumber
            ? record.get("totalCount").toNumber()
            : Number(record.get("totalCount"));
          const missingIngredients = record.get("missingIngredients") || [];

          // Find matching seed recipe for instructions/ingredients formatting fallback
          const seedRec = RECIPES.find((sr) => sr.id === rProps.id || sr.name.toLowerCase() === rProps.name.toLowerCase());
          const fullSeed = seedRec ? formatSeedRecipe(seedRec) : null;

          return {
            id: rProps.id,
            name: rProps.name,
            description: rProps.description,
            prepTime: rProps.prepTime?.toNumber ? rProps.prepTime.toNumber() : Number(rProps.prepTime || 20),
            cookTime: rProps.cookTime?.toNumber ? rProps.cookTime.toNumber() : Number(rProps.cookTime || 20),
            servings: rProps.servings?.toNumber ? rProps.servings.toNumber() : Number(rProps.servings || 4),
            difficulty: rProps.difficulty || "Medium",
            image: rProps.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
            instructions: rProps.instructions || fullSeed?.instructions || [],
            cuisine: cuisine || fullSeed?.cuisine || "Global",
            diets: diets.length ? diets : fullSeed?.diets || [],
            category: category || fullSeed?.category || "Main Course",
            ingredients: fullSeed?.ingredients || [],
            matchPercentage,
            matchedCount,
            totalCount,
            missingIngredients,
          };
        });

        return { recipes, source: "cognodb" };
      }
    } catch (err) {
      console.warn("CognoDB query failed, using in-memory graph fallback:", err);
    }
  }

  // In-memory Graph Fallback
  const lowerUserIngs = new Set(userIngredients.map((i) => i.trim().toLowerCase()));
  const matchedRecipes = RECIPES.map((recipe) => {
    const formatted = formatSeedRecipe(recipe);
    const requiredIngNames = formatted.ingredients.map((ing) => ing.name.toLowerCase());
    const matchedNames = requiredIngNames.filter((name) => lowerUserIngs.has(name));
    const matchedCount = matchedNames.length;
    const totalCount = requiredIngNames.length;

    if (matchedCount === 0) return null;

    const matchPercentage = Math.round((matchedCount / totalCount) * 100);
    const missingIngredients = formatted.ingredients
      .filter((ing) => !lowerUserIngs.has(ing.name.toLowerCase()))
      .map((ing) => ing.name);

    return {
      ...formatted,
      matchPercentage,
      matchedCount,
      totalCount,
      missingIngredients,
    };
  })
    .filter(Boolean)
    .sort((a, b) => (b!.matchPercentage || 0) - (a!.matchPercentage || 0)) as RecipeQueryResult[];

  return { recipes: matchedRecipes, source: "fallback" };
}

/**
  * Fetch a single recipe by ID with its graph connections
  */
export async function getRecipeById(recipeId: string): Promise<RecipeQueryResult | null> {
  const dbStatus = await checkCognodbConnection();

  if (dbStatus.isConnected) {
    try {
      const query = `
        MATCH (r:Recipe {id: $recipeId})
        MATCH (r)-[:BELONGS_TO]->(c:Cuisine)
        OPTIONAL MATCH (r)-[:SUITABLE_FOR]->(d:Diet)
        OPTIONAL MATCH (r)-[:HAS_CATEGORY]->(cat:Category)
        OPTIONAL MATCH (r)-[rel:CONTAINS]->(i:Ingredient)
        OPTIONAL MATCH (i)-[sub:SUBSTITUTES]->(alt:Ingredient)
        RETURN r, c.name AS cuisine, collect(DISTINCT d.name) AS diets, cat.name AS category,
               collect(DISTINCT {
                 id: i.id,
                 name: i.name,
                 quantity: rel.quantity,
                 unit: rel.unit,
                 altId: alt.id,
                 altName: alt.name,
                 subNote: sub.note
               }) AS ingredients
      `;

      const res = await runCypher(query, { recipeId });
      if (res && res.records.length > 0) {
        const record = res.records[0];
        const rProps = record.get("r").properties;
        const cuisine = record.get("cuisine");
        const diets = record.get("diets") || [];
        const category = record.get("category") || "Main Course";
        const rawIngs = record.get("ingredients") || [];

        const seedRec = RECIPES.find((sr) => sr.id === recipeId);
        const fullSeed = seedRec ? formatSeedRecipe(seedRec) : null;

        return {
          id: rProps.id,
          name: rProps.name,
          description: rProps.description,
          prepTime: rProps.prepTime?.toNumber ? rProps.prepTime.toNumber() : Number(rProps.prepTime || 20),
          cookTime: rProps.cookTime?.toNumber ? rProps.cookTime.toNumber() : Number(rProps.cookTime || 20),
          servings: rProps.servings?.toNumber ? rProps.servings.toNumber() : Number(rProps.servings || 4),
          difficulty: rProps.difficulty || "Medium",
          image: rProps.image || fullSeed?.image || "",
          instructions: rProps.instructions || fullSeed?.instructions || [],
          cuisine: cuisine || fullSeed?.cuisine || "Global",
          diets: diets.length ? diets : fullSeed?.diets || [],
          category: category || fullSeed?.category || "Main Course",
          ingredients: fullSeed?.ingredients || [],
        };
      }
    } catch (err) {
      console.warn("CognoDB getRecipeById failed, trying seed data:", err);
    }
  }

  const seedRec = RECIPES.find((r) => r.id === recipeId);
  return seedRec ? formatSeedRecipe(seedRec) : null;
}

/**
  * Find similar recipes via shared ingredients graph traversal:
  * Recipe -> CONTAINS -> Ingredient <- CONTAINS -> Related Recipe
  */
export async function getSimilarRecipes(recipeId: string): Promise<RecipeQueryResult[]> {
  const dbStatus = await checkCognodbConnection();

  if (dbStatus.isConnected) {
    try {
      const query = `
        MATCH (r:Recipe {id: $recipeId})
        MATCH (r)-[:CONTAINS]->(i:Ingredient)<-[:CONTAINS]-(related:Recipe)
        WHERE related.id <> $recipeId
        WITH related, count(i) AS sharedCount, collect(i.name) AS sharedIngredients
        MATCH (related)-[:BELONGS_TO]->(c:Cuisine)
        OPTIONAL MATCH (related)-[:SUITABLE_FOR]->(d:Diet)
        RETURN related, c.name AS cuisine, collect(DISTINCT d.name) AS diets, sharedCount, sharedIngredients
        ORDER BY sharedCount DESC, related.name ASC
        LIMIT 6
      `;

      const res = await runCypher(query, { recipeId });
      if (res && res.records.length > 0) {
        return res.records.map((rec) => {
          const relProps = rec.get("related").properties;
          const cuisine = rec.get("cuisine");
          const diets = rec.get("diets") || [];
          const seedRec = RECIPES.find((sr) => sr.id === relProps.id);
          const fullSeed = seedRec ? formatSeedRecipe(seedRec) : null;

          return {
            id: relProps.id,
            name: relProps.name,
            description: relProps.description,
            prepTime: relProps.prepTime?.toNumber ? relProps.prepTime.toNumber() : Number(relProps.prepTime || 20),
            cookTime: relProps.cookTime?.toNumber ? relProps.cookTime.toNumber() : Number(relProps.cookTime || 20),
            servings: relProps.servings?.toNumber ? relProps.servings.toNumber() : Number(relProps.servings || 4),
            difficulty: relProps.difficulty || "Medium",
            image: relProps.image || fullSeed?.image || "",
            instructions: relProps.instructions || fullSeed?.instructions || [],
            cuisine: cuisine || fullSeed?.cuisine || "Global",
            diets: diets.length ? diets : fullSeed?.diets || [],
            category: fullSeed?.category || "Main Course",
            ingredients: fullSeed?.ingredients || [],
          };
        });
      }
    } catch (err) {
      console.warn("CognoDB getSimilarRecipes failed:", err);
    }
  }

  // In-memory fallback
  const targetRec = RECIPES.find((r) => r.id === recipeId);
  if (!targetRec) return [];

  const targetIngIds = new Set(targetRec.ingredients.map((i) => i.ingredientId));
  const scored = RECIPES.filter((r) => r.id !== recipeId)
    .map((r) => {
      const shared = r.ingredients.filter((i) => targetIngIds.has(i.ingredientId)).length;
      return { recipe: formatSeedRecipe(r), shared };
    })
    .filter((item) => item.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 6)
    .map((item) => item.recipe);

  return scored;
}

/**
  * Ingredient Explorer details: Used in recipes, substitutions, pairings, cuisines
  */
export async function getIngredientDetails(ingredientIdOrName: string) {
  const seedIng = INGREDIENTS.find(
    (i) => i.id === ingredientIdOrName || i.name.toLowerCase() === ingredientIdOrName.toLowerCase()
  );

  const ingId = seedIng ? seedIng.id : ingredientIdOrName;
  const ingName = seedIng ? seedIng.name : ingredientIdOrName;

  // Find recipes using this ingredient
  const recipesUsing = RECIPES.filter((r) => r.ingredients.some((i) => i.ingredientId === ingId)).map(formatSeedRecipe);

  // Find cuisines associated with recipes using this ingredient
  const cuisineSet = new Set(recipesUsing.map((r) => r.cuisine));
  const cuisines = Array.from(cuisineSet);

  // Find substitutions
  const substitutions = (seedIng?.substitutions || []).map((sub) => {
    const targetObj = INGREDIENTS.find((i) => i.id === sub.targetId);
    const targetUsage = RECIPES.filter((r) => r.ingredients.some((i) => i.ingredientId === sub.targetId)).length;
    return {
      id: sub.targetId,
      name: targetObj?.name || sub.targetId,
      ratio: sub.ratio || "1:1",
      note: sub.note || "Direct substitute",
      usageCount: targetUsage,
    };
  });

  // Find pairing ingredients
  const pairings = (seedIng?.pairsWith || []).map((pId) => {
    const pObj = INGREDIENTS.find((i) => i.id === pId);
    return {
      id: pId,
      name: pObj?.name || pId,
      category: pObj?.category || "General",
    };
  });

  return {
    ingredient: {
      id: ingId,
      name: ingName,
      category: seedIng?.category || "General",
    },
    recipes: recipesUsing,
    cuisines,
    substitutions,
    pairings,
  };
}

/**
  * Export complete graph topology for Graph Visualizer (/explore)
  */
export async function getGraphTopology() {
  const nodes: { id: string; label: string; type: "recipe" | "ingredient" | "cuisine" | "diet" | "category"; sublabel?: string }[] = [];
  const edges: { id: string; source: string; target: string; label: string }[] = [];

  const addedNodes = new Set<string>();

  // Add Cuisines
  CUISINES.forEach((c) => {
    nodes.push({ id: c.id, label: c.name, type: "cuisine" });
    addedNodes.add(c.id);
  });

  // Add Diets
  DIETS.forEach((d) => {
    nodes.push({ id: d.id, label: d.name, type: "diet" });
    addedNodes.add(d.id);
  });

  // Add Ingredients
  INGREDIENTS.slice(0, 45).forEach((ing) => {
    nodes.push({ id: ing.id, label: ing.name, type: "ingredient", sublabel: ing.category });
    addedNodes.add(ing.id);

    // Substitutions
    (ing.substitutions || []).forEach((sub) => {
      edges.push({
        id: `edge-${ing.id}-sub-${sub.targetId}`,
        source: ing.id,
        target: sub.targetId,
        label: "SUBSTITUTES",
      });
    });
  });

  // Add Recipes & Connections
  RECIPES.slice(0, 20).forEach((rec) => {
    nodes.push({ id: rec.id, label: rec.name, type: "recipe", sublabel: `${rec.prepTime + rec.cookTime}m` });
    addedNodes.add(rec.id);

    // Cuisine edge
    if (rec.cuisineId) {
      edges.push({
        id: `edge-${rec.id}-cui-${rec.cuisineId}`,
        source: rec.id,
        target: rec.cuisineId,
        label: "BELONGS_TO",
      });
    }

    // Diet edges
    rec.dietIds.forEach((dId) => {
      edges.push({
        id: `edge-${rec.id}-diet-${dId}`,
        source: rec.id,
        target: dId,
        label: "SUITABLE_FOR",
      });
    });

    // Ingredient edges
    rec.ingredients.forEach((ing) => {
      if (addedNodes.has(ing.ingredientId)) {
        edges.push({
          id: `edge-${rec.id}-contains-${ing.ingredientId}`,
          source: rec.id,
          target: ing.ingredientId,
          label: "CONTAINS",
        });
      }
    });
  });

  return { nodes, edges };
}
