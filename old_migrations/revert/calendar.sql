-- Revert victoryzone:get_calendar_home from pg

BEGIN;

-- XXX Add DDLs here.

DROP VIEW "get_calendar_home";

DROP VIEW "get_all_calendar";

COMMIT;
