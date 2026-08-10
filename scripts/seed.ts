import "dotenv/config";
import path from "path";
import dotenv from "dotenv";

// Load .env.local if present
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getCognodbDriver, closeCognodbDriver } from "../lib/cognodb";
import { CUISINES, DIETS, CATEGORIES, INGREDIENTS, RECIPES } from "../lib/seed-data";

async function seedDatabase() {
  console.log("🌱 Starting FoodGraph CognoDB Seeding Process...");
  console.log(`📡 COGNODB_URI: ${process.env.COGNODB_URI || "Not set"}`);

  const driver = getCognodbDriver();
  if (!driver) {
    console.error("❌ Could not create CognoDB driver. Please ensure COGNODB_URI and COGNODB_PASSWORD are set in your environment.");
    process.exit(1);
  }

  const session = driver.session();

  try {
    console.log("1. Creating Constraints & Indexes (if supported)...");
    const constraintQueries = [
      "CREATE CONSTRAINT recipe_id_unique IF NOT EXISTS FOR (r:Recipe) REQUIRE r.id IS UNIQUE",
      "CREATE CONSTRAINT ingredient_id_unique IF NOT EXISTS FOR (i:Ingredient) REQUIRE i.id IS UNIQUE",
      "CREATE CONSTRAINT cuisine_id_unique IF NOT EXISTS FOR (c:Cuisine) REQUIRE c.id IS UNIQUE",
      "CREATE CONSTRAINT diet_id_unique IF NOT EXISTS FOR (d:Diet) REQUIRE d.id IS UNIQUE",
      "CREATE CONSTRAINT category_id_unique IF NOT EXISTS FOR (cat:Category) REQUIRE cat.id IS UNIQUE",
    ];

    for (const q of constraintQueries) {
      try {
        await session.run(q);
      } catch (err: any) {
        // Ignore if constraint exists or unsupported syntax
      }
    }

    console.log("2. Merging Cuisines...");
    for (const cuisine of CUISINES) {
      await session.run(
        `
        MERGE (c:Cuisine {id: $id})
        SET c.name = $name, c.description = $description
        `,
        cuisine
      );
    }
    console.log(`   ✅ Seeded ${CUISINES.length} Cuisines.`);

    console.log("3. Merging Diets...");
    for (const diet of DIETS) {
      await session.run(
        `
        MERGE (d:Diet {id: $id})
        SET d.name = $name, d.description = $description
        `,
        diet
      );
    }
    console.log(`   ✅ Seeded ${DIETS.length} Diets.`);

    console.log("4. Merging Categories...");
    for (const cat of CATEGORIES) {
      await session.run(
        `
        MERGE (c:Category {id: $id})
        SET c.name = $name
        `,
        cat
      );
    }
    console.log(`   ✅ Seeded ${CATEGORIES.length} Categories.`);

    console.log("5. Merging Ingredients & Substitutions...");
    for (const ing of INGREDIENTS) {
      await session.run(
        `
        MERGE (i:Ingredient {id: $id})
        SET i.name = $name, i.category = $category
        `,
        { id: ing.id, name: ing.name, category: ing.category }
      );
    }

    for (const ing of INGREDIENTS) {
      if (ing.substitutions) {
        for (const sub of ing.substitutions) {
          await session.run(
            `
            MATCH (i:Ingredient {id: $sourceId})
            MATCH (target:Ingredient {id: $targetId})
            MERGE (i)-[r:SUBSTITUTES]->(target)
            SET r.ratio = $ratio, r.note = $note
            `,
            {
              sourceId: ing.id,
              targetId: sub.targetId,
              ratio: sub.ratio || "1:1",
              note: sub.note || "Alternative substitute",
            }
          );
        }
      }

      if (ing.pairsWith) {
        for (const pairId of ing.pairsWith) {
          await session.run(
            `
            MATCH (i:Ingredient {id: $sourceId})
            MATCH (pair:Ingredient {id: $pairId})
            MERGE (i)-[:PAIRS_WITH]->(pair)
            `,
            { sourceId: ing.id, pairId }
          );
        }
      }
    }
    console.log(`   ✅ Seeded ${INGREDIENTS.length} Ingredients with Substitutions & Pairings.`);

    console.log("6. Merging Recipes & Relationships...");
    for (const rec of RECIPES) {
      await session.run(
        `
        MERGE (r:Recipe {id: $id})
        SET r.name = $name,
            r.description = $description,
            r.prepTime = $prepTime,
            r.cookTime = $cookTime,
            r.servings = $servings,
            r.difficulty = $difficulty,
            r.image = $image,
            r.instructions = $instructions
        `,
        {
          id: rec.id,
          name: rec.name,
          description: rec.description,
          prepTime: rec.prepTime,
          cookTime: rec.cookTime,
          servings: rec.servings,
          difficulty: rec.difficulty,
          image: rec.image,
          instructions: rec.instructions,
        }
      );

      if (rec.cuisineId) {
        await session.run(
          `
          MATCH (r:Recipe {id: $recipeId})
          MATCH (c:Cuisine {id: $cuisineId})
          MERGE (r)-[:BELONGS_TO]->(c)
          `,
          { recipeId: rec.id, cuisineId: rec.cuisineId }
        );
      }

      if (rec.categoryId) {
        await session.run(
          `
          MATCH (r:Recipe {id: $recipeId})
          MATCH (c:Category {id: $categoryId})
          MERGE (r)-[:HAS_CATEGORY]->(c)
          `,
          { recipeId: rec.id, categoryId: rec.categoryId }
        );
      }

      for (const dId of rec.dietIds) {
        await session.run(
          `
          MATCH (r:Recipe {id: $recipeId})
          MATCH (d:Diet {id: $dietId})
          MERGE (r)-[:SUITABLE_FOR]->(d)
          `,
          { recipeId: rec.id, dietId: dId }
        );
      }

      for (const ingItem of rec.ingredients) {
        await session.run(
          `
          MATCH (r:Recipe {id: $recipeId})
          MATCH (i:Ingredient {id: $ingredientId})
          MERGE (r)-[rel:CONTAINS]->(i)
          SET rel.quantity = $quantity, rel.unit = $unit, rel.optional = $optional
          `,
          {
            recipeId: rec.id,
            ingredientId: ingItem.ingredientId,
            quantity: ingItem.quantity,
            unit: ingItem.unit,
            optional: ingItem.optional || false,
          }
        );
      }
    }
    console.log(`   ✅ Seeded ${RECIPES.length} Recipes with CONTAINS, BELONGS_TO, SUITABLE_FOR & HAS_CATEGORY relationships.`);

    console.log("7. Merging SIMILAR_TO Recipe Relationships...");
    for (const rec of RECIPES) {
      if (rec.similarRecipeIds) {
        for (const simId of rec.similarRecipeIds) {
          await session.run(
            `
            MATCH (r1:Recipe {id: $r1Id})
            MATCH (r2:Recipe {id: $r2Id})
            MERGE (r1)-[:SIMILAR_TO]->(r2)
            `,
            { r1Id: rec.id, r2Id: simId }
          );
        }
      }
    }
    console.log("   ✅ Seeded SIMILAR_TO recipe relationships.");

    console.log("🎉 Seed Process Complete! FoodGraph CognoDB Graph is fully populated.");
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
  } finally {
    await session.close();
    await closeCognodbDriver();
  }
}

seedDatabase();
