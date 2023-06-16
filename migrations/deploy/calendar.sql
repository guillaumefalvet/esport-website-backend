-- Deploy victoryzone:get_calendar_home to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW get_calendar_home AS
(
  SELECT
  json_build_object(
    'future_event', (SELECT json_agg(calendar_event) FROM (
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
    ) AS calendar_event),
    'past_event', (SELECT json_agg(calendar_event) FROM (
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
    ) AS calendar_event)
  ) AS "data"
);

 CREATE VIEW get_all_calendar AS
SELECT
  json_build_object(
    'future_event', (SELECT json_agg(calendar_event) FROM (
      SELECT
        "calendar"."id",
        "calendar"."event_name",
        "calendar"."event_date",
        "calendar"."adversary_name_short",
        "calendar"."live_link",
        NULL AS "score",
        "calendar"."small_image",
        "calendar"."medium_image",
        "calendar"."large_image",
        "calendar"."publication_date",
        "calendar"."created_at",
        "calendar"."updated_at"
      FROM
        "calendar"
      WHERE
        "calendar"."event_date" >= now()
      ORDER BY
        "calendar"."event_date"
    ) AS calendar_event),
    'past_event', (SELECT json_agg(calendar_event) FROM (
      SELECT
        "calendar"."id",
        "calendar"."event_name",
        "calendar"."event_date",
        "calendar"."adversary_name_short",
        "calendar"."replay_link",
        "calendar"."score",
        "calendar"."small_image",
        "calendar"."medium_image",
        "calendar"."large_image",
        "calendar"."publication_date",
        "calendar"."created_at",
        "calendar"."updated_at"
      FROM
        "calendar"
      WHERE
        "calendar"."event_date" < now()
      ORDER BY
        "calendar"."event_date" DESC
    ) AS calendar_event)
  ) AS "data";

COMMIT;
