-- Revert victoryzone:update_media from pg

BEGIN;


DROP FUNCTION public.update_media(json_data json) CASCADE;

COMMIT;
