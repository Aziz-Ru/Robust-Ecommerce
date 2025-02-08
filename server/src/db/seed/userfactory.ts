import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import db from "../index";
import { users } from "../schema";

//gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),

const userFactory = async (count: number) => {
  try {
    const fakeusers = [];
    for (let i = 0; i < count; i++) {
      const fuser = {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        emailVerified: faker.datatype.boolean(),
        confirmationCode: faker.string.numeric({ length: 6 }),
        confirmationCodeSentAt: faker.date.recent(),
        confirmedAt: faker.date.recent(),
        isActivated: faker.datatype.boolean(),
        deviceId: faker.internet.mac(),
        platform: faker.helpers.arrayElement(["WEB", "ANDROID", "IOS"]),
        lastSignedInAt: faker.date.recent(),
      };
      fakeusers.push(fuser);
    }

    await db.insert(users).values(fakeusers);
    console.log("Users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users: ", error);
    process.exit(1);
  }
};

export default userFactory;
