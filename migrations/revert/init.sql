-- Revert victoryzone:init from pg

BEGIN;

-- Revert table "article_has_category"
DROP TABLE "article_has_category";

-- Revert table "calendar"
DROP TABLE "calendar";

-- Revert table "category"
DROP TABLE "category";

-- Revert table "article"
DROP TABLE "article";

-- Revert table "player_has_media"
DROP TABLE "player_has_media";

-- Revert table "player_has_setup"
DROP TABLE "player_has_setup";

-- Revert table "media"
DROP TABLE "media";

-- Revert table "setup"
DROP TABLE "setup";

-- Revert table "recruitment"
DROP TABLE "recruitment";

-- Revert table "user"
DROP TABLE "user";

-- Revert table "permission"
DROP TABLE "permission";

-- Revert table "player"
DROP TABLE "player";

COMMIT;
