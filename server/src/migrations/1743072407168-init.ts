import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743072407168 implements MigrationInterface {
    name = 'Init1743072407168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("slug" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_cb73208f151aa71cdd78f662d70" PRIMARY KEY ("slug"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb73208f151aa71cdd78f662d7" ON "category" ("slug") `);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(255) NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "productIdId" uuid, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_size_size_enum" AS ENUM('NONE', 'XS', 'S', 'M', 'L', 'XL', 'XXL')`);
        await queryRunner.query(`CREATE TABLE "product_size" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" "public"."product_size_size_enum" NOT NULL, "stock" integer NOT NULL DEFAULT '0', "productId" uuid, CONSTRAINT "PK_3210db31599e5c505183be05896" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(5,2) NOT NULL, "discount" integer NOT NULL, "costPrice" numeric(5,2), "stock" integer NOT NULL, "stockThreshold" integer NOT NULL, "image" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "totalSold" integer NOT NULL, "rating" numeric(2,2) NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON "product" ("id") `);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "rating" integer NOT NULL, "productIdId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON "review" ("id") `);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_4ed8b58756b12e530592aa273da" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_a4fc989d861b94068c72b13e42f" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_a4fc989d861b94068c72b13e42f"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_4ed8b58756b12e530592aa273da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e4299a343a81574217255c00c"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bebc9158e480b949565b4dc7a8"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_size"`);
        await queryRunner.query(`DROP TYPE "public"."product_size_size_enum"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb73208f151aa71cdd78f662d7"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
