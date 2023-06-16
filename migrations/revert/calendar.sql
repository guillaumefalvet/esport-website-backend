-- Revert victoryzone:get_calendar_home from pg

BEGIN;

-- XXX Add DDLs here.

DROP IF EXISTS "get_calendar_home";

DROP IF EXISTS "get_all_calendar";

COMMIT;
