-- Deploy victoryzone:update_media to pg

BEGIN;
 CREATE FUNCTION update_media(json_data json) RETURNS "media" AS $$
    UPDATE "media" SET
      "link" = COALESCE((json_data->>'link')::text, "link"),
      "is_active" = COALESCE((json_data->>'is_active')::BOOLEAN, "is_active"),
      "updated_at" = now()
    WHERE "id" = (json_data->>'id')::int
    RETURNING *;
  $$ LANGUAGE sql;


COMMIT;
