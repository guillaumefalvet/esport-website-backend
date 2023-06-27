-- Revert victoryzone:fix_article_admin_view_less_content from pg

BEGIN;

DROP VIEW article_events_categories_private_v2;

COMMIT;
