-- Deploy victoryzone:functions to pg

BEGIN;

CREATE FUNCTION insert_player(json_data json) RETURNS "player" AS $$
  INSERT INTO "player"("user_name", "first_name", "last_name", "description", "role", "image", "statistics", "achievements", "youtube_link", "twitch_link", "twitter_link")
    VALUES (
      (json_data->>'user_name')::text,
      (json_data->>'first_name')::text,
      (json_data->>'last_name')::text,
      (json_data->>'description')::text,
      (json_data->>'role')::text,
      (json_data->>'image')::text,
      (json_data->>'statistics')::text,
      (json_data->>'achievements')::text,
      (json_data->>'youtube_link')::text,
      (json_data->>'twitch_link')::text,
      (json_data->>'twitter_link')::text
    ) RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION update_player(json_data json) RETURNS "player" AS $$
  UPDATE "player" SET
    "user_name" = COALESCE((json_data->>'user_name')::text, "user_name"),
    "first_name" = COALESCE((json_data->>'first_name')::text, "first_name"),
    "last_name" = COALESCE((json_data->>'last_name')::text, "last_name"),
    "description" = COALESCE((json_data->>'description')::text, "description"),
    "role" = COALESCE((json_data->>'role')::text, "role"),
    "image" = COALESCE((json_data->>'image')::text, "image"),
    "statistics" = COALESCE((json_data->>'statistics')::text, "statistics"),
    "achievements" = COALESCE((json_data->>'achievements')::text, "achievements"),
    "youtube_link" = COALESCE((json_data->>'youtube_link')::text, "youtube_link"),
    "twitch_link" = COALESCE((json_data->>'twitch_link')::text, "twitch_link"),
    "twitter_link" = COALESCE((json_data->>'twitter_link')::text, "twitter_link"),
    "updated_at" = now()
  WHERE "id" = (json_data->>'id')::int
  RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION insert_permission(json_data json) RETURNS "permission" AS $$
  INSERT INTO "permission"("name", "level")
    VALUES (
      (json_data->>'name')::text,
      (json_data->>'level')::int
    ) RETURNING *;
  $$ LANGUAGE sql;

CREATE FUNCTION update_permission(json_data json) RETURNS "permission" AS $$
  UPDATE "permission" SET
    "name" = COALESCE((json_data->>'name')::text, "name"),
    "level" = COALESCE((json_data->>'level')::int, "level"),
    "updated_at" = now()
  WHERE "id" = (json_data->>'id')::int
  RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION insert_recruitment(json_data json) RETURNS "recruitment" AS $$
  INSERT INTO "recruitment"("user_name","email", "first_name", "last_name", "message", "external_link", "cv")
    VALUES (
      (json_data->>'user_name')::text,
      (json_data->>'email')::text,
      (json_data->>'first_name')::text,
      (json_data->>'last_name')::text,
      (json_data->>'message')::text,
      (json_data->>'external_link')::text,
      (json_data->>'cv')::text
    ) RETURNING *;
  $$ LANGUAGE sql;

CREATE FUNCTION insert_media(json_data json) RETURNS "media" AS $$
  INSERT INTO "media"("link", "is_active")
    VALUES (
      (json_data->>'link')::text,
      (json_data->>'is_active')::BOOLEAN
    ) RETURNING *;
  $$ LANGUAGE sql;

--article
CREATE FUNCTION insert_article(json_data json) RETURNS "article" AS $$
  INSERT INTO "article"("slug", "title", "content", "author_id", "image", "figcaption", "publication_date")
    VALUES(
      (json_data->>'slug')::text,
      (json_data->>'title')::text,
      (json_data->>'content')::text,
      (json_data->>'author_id')::int,
      (json_data->>'image')::text,
      (json_data->>'figcaption')::text,
      (json_data->>'publication_date')::TIMESTAMPTZ
    ) RETURNING *;
  $$ LANGUAGE sql;

  CREATE FUNCTION update_article(json_data json) RETURNS "article" AS $$
    UPDATE "article" SET
      "slug" = COALESCE((json_data->>'slug')::text, "slug"),
      "title" = COALESCE((json_data->>'title')::text, "title"),
      "content" = COALESCE((json_data->>'content')::text, "content"),
      "author_id" = COALESCE((json_data->>'author_id')::int, "author_id"),
      "image" = COALESCE((json_data->>'image')::text, "image"),
      "figcaption" = COALESCE((json_data->>'figcaption')::text, "figcaption"),
      "publication_date" = COALESCE((json_data->>'publication_date')::TIMESTAMPTZ, "publication_date"),
      "updated_at" = now()
    WHERE "id" = (json_data->>'id')::int
    RETURNING *;
  $$ LANGUAGE sql;
--calendar

CREATE FUNCTION insert_calendar(json_data json) RETURNS "calendar" AS $$
  INSERT INTO "calendar"("event_name", "event_date", "adversary_name", "adversary_name_short", "replay_link", "live_link", "score", "image")
    VALUES(
      (json_data->>'event_name')::text,
      (json_data->>'event_date')::TIMESTAMPTZ,
      (json_data->>'adversary_name')::text,
      (json_data->>'adversary_name_short')::text,
      (json_data->>'replay_link')::text,
      (json_data->>'live_link')::text,
      (json_data->>'score')::text,
      (json_data->>'image')::text
    ) RETURNING *;
  $$ LANGUAGE sql;

CREATE FUNCTION update_calendar(json_data json) RETURNS "calendar" AS $$
  UPDATE "calendar" SET
      "event_name" = COALESCE((json_data->>'event_name')::text, "event_name"),
      "event_date" = COALESCE((json_data->>'event_date')::TIMESTAMPTZ,"event_date"),
      "adversary_name" = COALESCE((json_data->>'adversary_name')::text,"adversary_name"),
      "adversary_name_short" = COALESCE((json_data->>'adversary_name_short')::text,"adversary_name_short"),
      "replay_link" = COALESCE((json_data->>'replay_link')::text,"replay_link"),
      "live_link" = COALESCE((json_data->>'live_link')::text,"live_link"),
      "score" = COALESCE((json_data->>'score')::text,"score"),
      "image" = COALESCE((json_data->>'image')::text,"image"),
      "updated_at" = now()
    WHERE "id" = (json_data->>'id')::int
    RETURNING *;
  $$ LANGUAGE sql;

   CREATE FUNCTION update_media(json_data json) RETURNS "media" AS $$
    UPDATE "media" SET
      "link" = COALESCE((json_data->>'link')::text, "link"),
      "is_active" = COALESCE((json_data->>'is_active')::BOOLEAN, "is_active"),
      "updated_at" = now()
    WHERE "id" = (json_data->>'id')::int
    RETURNING *;
  $$ LANGUAGE sql;


COMMIT;
