import db from "..";
import { divisions } from "../schema/divisions";

db.insert(divisions).values([
  {
    name: "Dhaka",
    startingPostalCode: 1000,
    endingPostalCode: 2400,
  },
  {
    name: "Chattogram",
    startingPostalCode: 3400,
    endingPostalCode: 4800,
  },
  {
    name: "Khulna",
    startingPostalCode: 7000,
    endingPostalCode: 9500,
  },
  {
    name: "Rajshahi",
    startingPostalCode: 5800,
    endingPostalCode: 6800,
  },
  {
    name: "Barishal",
    startingPostalCode: 8200,
    endingPostalCode: 8800,
  },
  {
    name: "Sylhet",
    startingPostalCode: 3000,
    endingPostalCode: 3400,
  },
  {
    name: "Rangpur",
    startingPostalCode: 5000,
    endingPostalCode: 5800,
  },
  {
    name: "Mymensingh",
    startingPostalCode: 2000,
    endingPostalCode: 2500,
  },
]);
