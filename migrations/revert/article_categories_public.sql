-- Revert victoryzone:article_categories_public from pg

BEGIN;

DROP VIEW article_categories_public;

COMMIT;
