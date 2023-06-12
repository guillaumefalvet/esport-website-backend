-- Deploy victoryzone:refreshtoken to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN "refresh_token" TEXT;

COMMIT;
