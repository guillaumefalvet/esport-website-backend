-- Revert victoryzone:domains from pg

BEGIN;
ALTER TABLE "user" ALTER COLUMN "email" TYPE TEXT;
ALTER TABLE "recruitment" ALTER COLUMN "email" TYPE TEXT;

DROP DOMAIN validate_email;

COMMIT;
