CREATE DOMAIN validate_email AS TEXT
CHECK (VALUE ~ '(^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$)');
ALTER TABLE "user" ALTER COLUMN "email" TYPE "validate_email";

ALTER TABLE "recruitment" ALTER COLUMN "email" TYPE "validate_email";
