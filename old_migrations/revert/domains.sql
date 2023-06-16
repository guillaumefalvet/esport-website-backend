-- Revert victoryzone:domains from pg

BEGIN;
DROP VIEW get_user_view;
ALTER TABLE "user" ALTER COLUMN "email" TYPE TEXT;
CREATE VIEW get_user_view AS
SELECT "user"."id", "user"."user_name", "user"."email", "user"."password", "user"."refresh_token", "permission"."name" AS permission_name, "permission"."level" AS permission_level ,"user"."created_at", "user"."updated_at" FROM "user" JOIN "permission" ON "permission"."id" = "user"."user_permission";
ALTER TABLE "recruitment" ALTER COLUMN "email" TYPE TEXT;

DROP DOMAIN validate_email;

COMMIT;

