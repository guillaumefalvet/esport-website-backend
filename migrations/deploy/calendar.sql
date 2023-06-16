-- Deploy victoryzone:get_calendar_home to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW get_calendar_home AS
(
  SELECT /*evenement a venir*/
  "calendar"."id",
  "calendar"."event_name",
  "calendar"."event_date",
  "calendar"."adversary_name_short",
  "calendar"."live_link",
  NULL AS "score",
  "calendar"."small_image"
  FROM
  "calendar"
  WHERE
  "calendar"."event_date" >= now()
  ORDER BY
  "calendar"."event_date"
  LIMIT 1
)
 UNION ALL
 (
SELECT /*evenement passer*/
  "calendar"."id",
  "calendar"."event_name",
  "calendar"."event_date",
  "calendar"."adversary_name_short",
  "calendar"."replay_link",
  "calendar"."score",
  "calendar"."small_image"
  FROM
  "calendar"
  WHERE
  "calendar"."event_date" < now()
  ORDER BY
  "calendar"."event_date" DESC
  LIMIT 1
 );

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
