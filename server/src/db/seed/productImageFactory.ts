import { faker } from "@faker-js/faker";
import db from "..";
import { productImages, products } from "../schema/product";

const productImageFactory = async (cnt: number) => {
  const PI = [];
  const productIds = await db.select({ id: products.id }).from(products);
  for (let i = 0; i < cnt; i++) {
    const product_id =
      productIds[Math.floor(Math.random() * productIds.length)].id;
    PI.push({
      productId: product_id,
      imageUrl: faker.image.urlLoremFlickr(),
      altText: faker.lorem.word(),
      isPrimary: Math.random() > 0.5,
    });
  }
  await db.insert(productImages).values(PI);
  console.log(`Created ${cnt} product images`);
};
export default productImageFactory;
