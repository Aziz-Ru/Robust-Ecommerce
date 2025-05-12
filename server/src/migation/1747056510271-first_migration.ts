import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1747056510271 implements MigrationInterface {
    name = 'FirstMigration1747056510271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "refreshToken" text, "accessToken" text, "expiresAt" integer, "tokenType" text, "idToken" text, "scope" character varying, "sessionState" text, "user_id" uuid, CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id"), CONSTRAINT "PK_32054f2625f6b8e31319d0e020b" PRIMARY KEY ("provider", "providerAccountId"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" character varying(50) NOT NULL, "session" character varying(255) NOT NULL, "user_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30e98e8746699fb9af235410af" ON "session" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "email" character varying(255) NOT NULL, "emailVerified" TIMESTAMP NOT NULL DEFAULT now(), "authStrategy" character varying(255) NOT NULL, "password" character varying(255), "image" character varying(255), "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "user_id_index" ON "user" ("id") `);
        await queryRunner.query(`CREATE INDEX "user_email_index" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "category" ("slug" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_cb73208f151aa71cdd78f662d70" PRIMARY KEY ("slug"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb73208f151aa71cdd78f662d7" ON "category" ("slug") `);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(255) NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "productId" uuid, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "rating" integer NOT NULL, "productId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON "review" ("id") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(5,2) NOT NULL, "costPrice" numeric(5,2), "stock" integer NOT NULL DEFAULT '1', "stockThreshold" integer NOT NULL DEFAULT '10', "isActive" boolean NOT NULL DEFAULT true, "totalSold" integer NOT NULL, "rating" numeric(2,2) NOT NULL DEFAULT '0', "totalReviews" integer NOT NULL DEFAULT '0', "discount" integer NOT NULL DEFAULT '0', "weight" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0806c755e0aca124e67c0cf6d7" ON "products" ("id") `);
        await queryRunner.query(`CREATE TABLE "product_size" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" character varying(3) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "productId" uuid, CONSTRAINT "PK_3210db31599e5c505183be05896" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_categories" ("productId" uuid NOT NULL, "categorySlug" character varying(255) NOT NULL, CONSTRAINT "PK_90e8b8b3543e92a1b261ccd3830" PRIMARY KEY ("productId", "categorySlug"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6156a79599e274ee9d83b1de13" ON "product_categories" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2f2212f1ce1465ffe7c690a5e" ON "product_categories" ("categorySlug") `);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_6156a79599e274ee9d83b1de139" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_f2f2212f1ce1465ffe7c690a5e1" FOREIGN KEY ("categorySlug") REFERENCES "category"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_f2f2212f1ce1465ffe7c690a5e1"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_6156a79599e274ee9d83b1de139"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2f2212f1ce1465ffe7c690a5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6156a79599e274ee9d83b1de13"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
        await queryRunner.query(`DROP TABLE "product_size"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0806c755e0aca124e67c0cf6d7"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e4299a343a81574217255c00c"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb73208f151aa71cdd78f662d7"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "public"."user_email_index"`);
        await queryRunner.query(`DROP INDEX "public"."user_id_index"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30e98e8746699fb9af235410af"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
