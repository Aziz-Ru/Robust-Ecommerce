CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"street_address_1" varchar(255) NOT NULL,
	"street_address_2" varchar(255),
	"postal_code" integer NOT NULL,
	"city" varchar,
	"division" varchar,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" serial NOT NULL,
	"last_signed_in_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone DEFAULT now(),
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "role_permission" (
	"role_id" serial NOT NULL,
	"permission_id" uuid
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cart_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"status" varchar(50) DEFAULT 'active',
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category_product" (
	"category_id" varchar NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"slug" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"image_url" varchar(512),
	"avg_rating" numeric(2, 1) DEFAULT '0.0',
	"meta_title" varchar(255),
	"meta_description" text,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "districts" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"division" varchar,
	"starting_postal_code" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "divisions" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"starting_postal_code" integer NOT NULL,
	"ending_postal_code" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid,
	"image_url" varchar(511) NOT NULL,
	"alt_text" varchar(255) DEFAULT 'alt_text',
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "product_sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid,
	"size" varchar NOT NULL,
	"is_available" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"sale_price" numeric NOT NULL,
	"cost_price" numeric NOT NULL,
	"stock_quantity" integer NOT NULL,
	"low_stock_thershold" integer DEFAULT 5 NOT NULL,
	"sku" varchar(55) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"barcode" varchar(255),
	"weight" numeric(8, 2),
	"color" varchar(100),
	"dimension" varchar(100),
	"is_active" boolean DEFAULT true,
	"is_featured" boolean DEFAULT false,
	"is_back_order_allowed" boolean DEFAULT false,
	"is_free_shipping" boolean DEFAULT false,
	"avg_rating" numeric(2, 1) DEFAULT '0.0',
	"total_views" integer DEFAULT 0,
	"total_sold" integer DEFAULT 0,
	"tags" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"review" text NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone_verified" boolean DEFAULT false,
	"confirmation_code" varchar(255) NOT NULL,
	"confirmation_code_sent_at" timestamp (6) with time zone NOT NULL,
	"confirmed_at" timestamp (6) with time zone,
	"is_activated" boolean DEFAULT false,
	"platform" varchar DEFAULT 'WEB',
	"last_signed_in_at" timestamp,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_city_districts_name_fk" FOREIGN KEY ("city") REFERENCES "public"."districts"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_division_divisions_name_fk" FOREIGN KEY ("division") REFERENCES "public"."divisions"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_role_role_id_fk" FOREIGN KEY ("role") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_category_id_category_slug_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "districts" ADD CONSTRAINT "districts_division_divisions_name_fk" FOREIGN KEY ("division") REFERENCES "public"."divisions"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;