-- Deploy victoryzone:get_calendar_home to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW get_calendar_home AS
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
)
 UNION ALL
 (
  SELECT
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
 );

COMMIT;
