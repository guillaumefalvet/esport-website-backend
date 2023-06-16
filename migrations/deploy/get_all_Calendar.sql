-- Deploy victoryzone:get_all_Calendar to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW get_all_calendar AS
SELECT
  "calendar"."id",
  "calendar"."event_name",
  "calendar"."event_date",
  "calendar"."adversary_name_short",
  "calendar"."replay_link",
  "calendar"."live_link",
  CASE
    WHEN "calendar"."event_date" < NOW() THEN "calendar"."score"
    ELSE NULL
  END AS "score",
  "calendar"."small_image",
  "calendar"."medium_image",
  "calendar"."large_image",
  "calendar"."publication_date",
  "calendar"."created_at",
  "calendar"."updated_at"
FROM "calendar"
ORDER BY
  CASE
    WHEN "calendar"."event_date" >= NOW() THEN 0
    ELSE 1
  END,
  "calendar"."event_date" DESC;


COMMIT;
