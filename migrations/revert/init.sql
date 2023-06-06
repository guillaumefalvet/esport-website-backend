-- Revert victoryzone:init from pg

BEGIN;

-- Revert table "article_has_calendar"
DROP TABLE IF EXISTS "article_has_calendar";

-- Revert table "article_has_category"
DROP TABLE IF EXISTS "article_has_category";

-- Revert table "calendar"
DROP TABLE IF EXISTS "calendar";

-- Revert table "category"
DROP TABLE IF EXISTS "category";

-- Revert table "article"
DROP TABLE IF EXISTS "article";

-- Revert table "player_has_media"
DROP TABLE IF EXISTS "player_has_media";

-- Revert table "player_has_setup"
DROP TABLE IF EXISTS "player_has_setup";

-- Revert table "media"
DROP TABLE IF EXISTS "media";

-- Revert table "setup"
DROP TABLE IF EXISTS "setup";

-- Revert table "recruitment"
DROP TABLE IF EXISTS "recruitment";

-- Revert table "user"
DROP TABLE IF EXISTS "user";

-- Revert table "permission"
DROP TABLE IF EXISTS "permission";

-- Revert table "player"
DROP TABLE IF EXISTS "player";

COMMIT;
