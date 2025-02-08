import { faker } from "@faker-js/faker";
import db from "..";
import { products } from "../schema/product";

const productFactory = async (cnt: number) => {
  const colors = ["red", "green", "blue", "yellow", "black", "white"];
  const pf = [];

  for (let i = 0; i < cnt; i++) {
    const pn = faker.commerce.productName();
    const pns = faker.helpers.slugify(pn) + "-" + faker.string.uuid();
    const sp = faker.commerce.price({ max: 10000, min: 100 });
    const salePrice = (parseFloat(sp) * 0.9).toFixed(2);
    const costPrice = (parseFloat(sp) * 0.85).toFixed(2);
    pf.push({
      name: pn,
      slug: pns,
      description: faker.commerce.productDescription(),
      price: sp,
      salePrice: salePrice,
      costPrice: costPrice,
      stockQuantity: faker.helpers.rangeToNumber({ max: 100, min: 10 }),
      lowStockThershold: Math.floor(Math.random() * 10),
      sku: faker.string.alphanumeric({ length: 10 }),
      manufacturer: faker.company.name(),
      barcode: faker.string.alphanumeric({ length: 10 }),
      weight: Math.floor(Math.random() * 10).toFixed(2),
      color: colors[Math.floor(Math.random() * colors.length)],

      rating: Math.floor(Math.random() * 5).toFixed(1),
      totalViews: Math.floor(Math.random() * 1000),
      totalSold: Math.floor(Math.random() * 1000),

      tags: faker.commerce.productMaterial(),
      metaTitle: pn,
      metaDescription: faker.commerce.productDescription(),
    });
  }
  console.log(`Created ${cnt} products`);
  await db.insert(products).values(pf);
};

export default productFactory;
