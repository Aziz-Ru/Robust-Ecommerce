// const res = await db.query.divisions.findFirst({
//     where: eq(divisions.name, "Rangpur"),
//     with: {
//       districts: true,
//     },
//   });
//   const req: any = await db
//     .select({
//       division: divisions, // Select all division columns
//       districts:
//         sql`COALESCE(json_agg(districts.*) FILTER (WHERE districts.name IS NOT NULL), '[]'::json)`.as(
//           "districts"
//         ),
//     })
//     .from(divisions)
//     .leftJoin(districts, eq(districts.division, divisions.name))
//     .where(eq(divisions.name, "Dhaka"))
//     .groupBy(divisions.name);
