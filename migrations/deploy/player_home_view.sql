-- Deploy victoryzone:player_home_view to pg

BEGIN;

CREATE VIEW player_home_view AS
SELECT "player"."user_name", "player"."first_name","player"."last_name", "player"."role", "player"."image" FROM "player" ORDER BY "player"."id" DESC;

COMMIT;
