-- Create Tables

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(80) NOT NULL DEFAULT '',
	"password" varchar(40) NOT NULL DEFAULT '',
	"admin" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "units" (
	"id" serial NOT NULL UNIQUE,
	"type" varchar(80) NOT NULL DEFAULT '',
	"fe" float8 NOT NULL DEFAULT 0,
	"affiliation" varchar(16) NOT NULL DEFAULT '',
	"country_code" varchar(8) NOT NULL DEFAULT 'us',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial NOT NULL UNIQUE,
	"country_code" varchar(8) NOT NULL UNIQUE,
	"name" varchar(50) NOT NULL DEFAULT '',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "equation_coefficients" (
	"id" serial NOT NULL UNIQUE,
	"blue_mission" varchar(40) NOT NULL DEFAULT '',
	"red_mission" varchar(40) NOT NULL DEFAULT '',
	"base" float8 DEFAULT 0,
	"exponent" float8 DEFAULT 0,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "red_forces" (
	"id" serial NOT NULL UNIQUE,
	"unit_id" int NOT NULL DEFAULT 0,
	"quantity" int NOT NULL DEFAULT '1',
	"strength" int NOT NULL DEFAULT '100',
	"user_id" int NOT NULL DEFAULT 0,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "blue_forces" (
	"id" serial NOT NULL UNIQUE,
	"unit_id" int NOT NULL DEFAULT '0',
	"quantity" int NOT NULL DEFAULT '1',
	"strength" int NOT NULL DEFAULT '100',
	"user_id" int NOT NULL DEFAULT '0',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "missions" (
	"id" serial NOT NULL UNIQUE,
	"blue_mission" varchar(40) NOT NULL DEFAULT 'meeting engagement',
	"red_mission" varchar(40) NOT NULL DEFAULT 'meeting engagement',
	"user_id" int NOT NULL DEFAULT '0',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "mission_types" (
	"id" serial NOT NULL UNIQUE,
	"mission" varchar(40) NOT NULL DEFAULT '',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "missions_equations" (
	"id" serial NOT NULL UNIQUE,
	"mission_id" int NOT NULL DEFAULT '0',
	"equation_id" int NOT NULL DEFAULT '0',
	PRIMARY KEY ("id")
);

-- Establish Relationships
ALTER TABLE "units" ADD CONSTRAINT "units_fk4" FOREIGN KEY ("country_code") REFERENCES "countries"("country_code");
ALTER TABLE "red_forces" ADD CONSTRAINT "red_forces_fk1" FOREIGN KEY ("unit_id") REFERENCES "units"("id");
ALTER TABLE "red_forces" ADD CONSTRAINT "red_forces_fk4" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "blue_forces" ADD CONSTRAINT "blue_forces_fk1" FOREIGN KEY ("unit_id") REFERENCES "units"("id");
ALTER TABLE "blue_forces" ADD CONSTRAINT "blue_forces_fk4" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "missions" ADD CONSTRAINT "missions_fk3" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "missions_equations" ADD CONSTRAINT "missions_equations_fk1" FOREIGN KEY ("mission_id") REFERENCES "missions"("id");
ALTER TABLE "missions_equations" ADD CONSTRAINT "missions_equations_fk2" FOREIGN KEY ("equation_id") REFERENCES "equation_coefficients"("id");

-- Remove Unnecessary Table "missions_equations"
DROP TABLE "missions_equations";

-- Redefine "missions" table
ALTER TABLE "missions" DROP COLUMN "blue_mission";
ALTER TABLE "missions" DROP COLUMN "red_mission";
ALTER TABLE "missions" ADD COLUMN "blue_mission_id" int;
ALTER TABLE "missions" ADD CONSTRAINT "fk_missions_1" FOREIGN KEY ("blue_mission_id") REFERENCES "mission_types"("id");
ALTER TABLE "missions" ADD COLUMN "red_mission_id" int;
ALTER TABLE "missions" ADD CONSTRAINT "fk_missions_2" FOREIGN KEY ("red_mission_id") REFERENCES "mission_types"("id");
ALTER TABLE "missions" ADD COLUMN "equation_id" int;
ALTER TABLE "missions" ADD CONSTRAINT "fk_missions_3" FOREIGN KEY ("equation_id") REFERENCES "equation_coefficients"("id");

-- import countries, equation_coefficients, mission_types, and units .csv files

-- fix users table, password field
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(80);

