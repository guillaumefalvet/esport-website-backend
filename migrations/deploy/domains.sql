-- Deploy victoryzone:domains to pg
BEGIN;

CREATE DOMAIN validate_email AS TEXT
CHECK (VALUE ~ '(^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$)');
DROP VIEW get_user_view;
ALTER TABLE "user" ALTER COLUMN "email" TYPE "validate_email";

ALTER TABLE "recruitment" ALTER COLUMN "email" TYPE "validate_email";
CREATE VIEW get_user_view AS
SELECT "user"."id", "user"."user_name", "user"."email", "user"."password", "user"."refresh_token", "permission"."name" AS permission_name, "permission"."level" AS permission_level ,"user"."created_at", "user"."updated_at" FROM "user" JOIN "permission" ON "permission"."id" = "user"."user_permission";

COMMIT;
