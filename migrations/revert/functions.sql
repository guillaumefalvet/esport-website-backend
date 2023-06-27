-- Revert victoryzone:functions from pg

BEGIN;

DROP FUNCTION public.insert_player;
DROP FUNCTION public.update_player;
DROP FUNCTION public.insert_permission;
DROP FUNCTION public.update_permission;
DROP FUNCTION public.insert_recruitment;
DROP FUNCTION public.insert_media;
DROP FUNCTION public.insert_article;
DROP FUNCTION public.update_article;
DROP FUNCTION public.insert_calendar;
DROP FUNCTION public.update_calendar;
DROP FUNCTION public.update_media;

COMMIT;
