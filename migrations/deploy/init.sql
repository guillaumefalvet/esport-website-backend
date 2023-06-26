-- Deploy victoryzone:init to pg

BEGIN;

-- table "player"
CREATE TABLE "player"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_name" TEXT NOT NULL UNIQUE,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "role" TEXT,
  "image" TEXT NOT NULL,
  "statistics" TEXT,
  "achievements" TEXT,
  "youtube_link" TEXT,
  "twitch_link" TEXT,
  "twitter_link" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);
-- table "user"
CREATE TABLE "permission" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "level" INT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table "user"
CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_name" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "user_permission" INT NOT NULL REFERENCES "permission"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table recruitment
CREATE TABLE "recruitment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_name" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "external_link" TEXT,
    "cv" TEXT NOT NULL,
    "is_reviewed" BOOLEAN NOT NULL DEFAULT false,
    "is_accepted" BOOLEAN,
    "reviewer_comment" TEXT,
    "reviewer_comment_private" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table setup
CREATE TABLE "setup" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "external_link" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table setup
CREATE TABLE "media" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "link" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table relationel entre player et setup
CREATE TABLE "player_has_setup" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "player_id" INT NOT NULL REFERENCES "player"("id") ON DELETE CASCADE,
    "setup_id" INT NOT NULL REFERENCES "setup"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table relationel entre player et media
CREATE TABLE "player_has_media" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "player_id" INT NOT NULL REFERENCES "player"("id") ON DELETE CASCADE,
    "media_id" INT NOT NULL REFERENCES "media"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- table article
CREATE TABLE "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "figcaption" TEXT,
    "publication_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table category
CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table calendar
CREATE TABLE "calendar" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "event_name" TEXT NOT NULL,
    "event_date" TIMESTAMPTZ NOT NULL,
    "adversary_name" TEXT NOT NULL,
    "adversary_name_short" TEXT NOT NULL,
    "replay_link" TEXT,
    "live_link" TEXT,
    "score" TEXT,
    "image" TEXT NOT NULL,
    "publication_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table relationel entre article et category
CREATE TABLE "article_has_category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" INT NOT NULL REFERENCES "article"("id") ON DELETE CASCADE,
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
-- table relationel entre article et calendar
CREATE TABLE "article_has_calendar"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" INT NOT NULL REFERENCES "article"("id") ON DELETE CASCADE,
    "calendar_id" INT NOT NULL REFERENCES "calendar"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
