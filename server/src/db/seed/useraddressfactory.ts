import { faker } from "@faker-js/faker";
import db from "..";
import { userAddresses, users } from "../schema";

const userAddressFactory = async (count: number) => {
  try {
    const userIds = await db.select({ id: users.id }).from(users);
    // console.log(userIds);
    const fakeUserAddresses = [];
    for (let i = 0; i < count; i++) {
      const fUserAddress = {
        address: faker.location.streetAddress() as string,
        division: faker.location.state() as string,
        district: faker.location.city() as string,
        upzilla: faker.location.city() as string,
        country: faker.helpers.arrayElement(["BANGLADESH"]),
        postalCode: faker.location.zipCode() as string,
        isDefault: faker.datatype.boolean(),
        userId: faker.helpers.arrayElement(userIds).id,
      };
      fakeUserAddresses.push(fUserAddress);
    }

    await db.insert(userAddresses).values(fakeUserAddresses);
    console.log("UserAddresses seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding userAddresses: ", error);
    process.exit(1);
  }
};

export default userAddressFactory;
