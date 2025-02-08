import { sql } from "drizzle-orm";

export const getSortOrder = (sort: string | undefined) => {
  if (sort == "price-lh") {
    return sql`price asc`;
  } else if (sort == "price-hl") {
    return sql`price desc`;
  } else if (sort == "rating-hl") {
    return sql`avg_rating desc,price asc`;
  } else if (sort == "rating-lh") {
    return sql`avg_rating asc,price asc`;
  } else if (sort == "name-az") {
    return sql`name asc,price asc`;
  } else if (sort == "name-za") {
    return sql`name desc,price asc`;
  } else {
    return sql`avg_rating desc,price asc,created_at desc`;
  }
};

export const getPriceRange = (price: string) => {
  const [min, max] = price.split("-");
  if (!min || !max) {
    return sql`price between 0 and 100000`;
  }
  return sql`price between ${min} and ${max}`;
};
