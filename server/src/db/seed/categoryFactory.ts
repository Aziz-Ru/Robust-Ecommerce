import { faker } from "@faker-js/faker";
import db from "..";
import { category } from "../schema/category";

const categoryFactory = async (cnt: number) => {
  try {
    const fakeCategories = [];

    for (let i = 0; i < cnt; i++) {
      const n = faker.food.meat();
      const s = faker.helpers.slugify(n);

      const fc = {
        name: n,
        slug: s,
        description: faker.commerce.productDescription(),
        iconUrl: faker.image.avatar(),
        avgRating: Math.floor(Math.random() * 5).toFixed(1),
        metaTitle: n,
        metaDescription: faker.commerce.productDescription(),
      };
      fakeCategories.push(fc);
    }
    await db.insert(category).values(fakeCategories);
    console.log("Categories seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories: ", error);
    process.exit(1);
  }
};

export default categoryFactory;
