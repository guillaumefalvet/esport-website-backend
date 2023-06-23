-- Revert victoryzone:player_home_view from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW player_home_view;

COMMIT;
