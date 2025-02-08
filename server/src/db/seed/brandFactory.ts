import { faker } from "@faker-js/faker";
import db from "..";
import { brands } from "../schema";

const brandFactory = async (cnt: number) => {
  const bf = [];
  for (let i = 0; i < cnt; i++) {
    const cn = faker.company.name();
    const cns = faker.helpers.slugify(cn);
    bf.push({
      name: cn,
      slug: cns,
      description: faker.company.buzzPhrase(),
      imageUrl: faker.image.avatar(),
      websiteUrl: faker.internet.url(),
    });
  }
  await db.insert(brands).values(bf);
  console.log("Created brands");
  return;
};

export default brandFactory;
