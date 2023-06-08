-- Revert victoryzone:views from pg

BEGIN;
BEGIN;
DROP VIEW IF EXISTS article_events_categories;
DROP VIEW IF EXISTS player_view;

-- XXX Add any other necessary revert operations here.

COMMIT;

-- XXX Add DDLs here.

COMMIT;
