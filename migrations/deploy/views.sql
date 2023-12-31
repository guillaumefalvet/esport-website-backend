-- Deploy victoryzone:views to pg

BEGIN;

CREATE VIEW article_public_noconcat_view AS
SELECT "article".id, "article".slug, "article".title, article.content, concat("user".first_name, ' ',"user".last_name) AS author, "article".image, "article".figcaption, "article".publication_date, "article".created_at, "article".updated_at,
      (SELECT CASE WHEN COUNT(category.id) = 0 THEN NULL
                  ELSE json_agg(json_build_object(
                          'id', category.id,
                          'label', category.label
                      ))
          END
      FROM article_has_category
      JOIN category ON article_has_category.category_id = category.id
      WHERE article_has_category.article_id = article.id
      ) AS categories
  FROM article
  LEFT JOIN article_has_category ON article.id = article_has_category.article_id
  LEFT JOIN "user" ON "user".id = article.author_id
  WHERE article.publication_date <= now()
  ORDER BY article.publication_date DESC;
-- PUBLIC VIEW
CREATE VIEW article_public_view AS
  SELECT "article".id, "article".slug, "article".title, concat(regexp_replace(article.content, '((\S+\s*){1,40})(.*)', '\1'), '...') AS content, concat("user".first_name, ' ',"user".last_name) AS author, "article".image, "article".figcaption, "article".publication_date, "article".created_at, "article".updated_at,
      (SELECT CASE WHEN COUNT(category.id) = 0 THEN NULL
                  ELSE json_agg(json_build_object(
                          'id', category.id,
                          'label', category.label
                      ))
          END
      FROM article_has_category
      JOIN category ON article_has_category.category_id = category.id
      WHERE article_has_category.article_id = article.id
      ) AS categories
  FROM article
  LEFT JOIN article_has_category ON article.id = article_has_category.article_id
  LEFT JOIN "user" ON "user".id = article.author_id
  WHERE article.publication_date <= now()
  ORDER BY article.publication_date DESC;

-- PRIVATE VIEW
CREATE VIEW article_private_view AS
  SELECT "article".id, "article".slug, "article".title, concat(regexp_replace(article.content, '((\S+\s*){1,40})(.*)', '\1'), '...') AS content, concat("user".first_name, ' ',"user".last_name) AS author, "article".image, "article".figcaption,
  "article".publication_date, "article".created_at, "article".updated_at,
    (SELECT CASE WHEN COUNT(category.id) = 0 THEN NULL
                  ELSE json_agg(json_build_object(
                          'id', category.id,
                          'label', category.label
                      ))
        END
    FROM article_has_category
    JOIN category ON article_has_category.category_id = category.id
    WHERE article_has_category.article_id = article.id
    ) AS categories
  FROM article
  LEFT JOIN article_has_category ON article.id = article_has_category.article_id
  LEFT JOIN "user" ON "user".id = article.author_id
  ORDER BY article.publication_date DESC;
-- HOME VIEW
CREATE VIEW article_home_view AS
    SELECT "article"."id",
    "article"."slug",
    "article"."title",
    "article"."image",
    "article"."figcaption",
    "article"."publication_date",
    concat("user".first_name, ' ',"user".last_name) AS author,
    concat(regexp_replace(article.content, '((\S+\s*){1,14})(.*)', '\1'), '...') AS content,
        (SELECT CASE WHEN COUNT(category.id) = 0 THEN NULL
                    ELSE json_agg(json_build_object(
                            'id', category.id,
                            'label', category.label
                        ))
            END
        FROM article_has_category
        JOIN category ON article_has_category.category_id = category.id
        WHERE article_has_category.article_id = article.id
        ) AS categories
    FROM "article"
    LEFT JOIN article_has_category ON article.id = article_has_category.article_id
    LEFT JOIN "user" ON "user".id = article.author_id
    WHERE "article"."publication_date" <= now() ORDER BY "article"."publication_date" DESC limit 3;


CREATE VIEW player_view AS
SELECT player.*,
  (SELECT CASE WHEN COUNT(DISTINCT setup.id) = 0 THEN NULL
               ELSE json_agg(json_build_object(
                        'id', setup.id,
                        'name', setup.name,
                        'external_link', setup.external_link,
                        'created_at', setup.created_at,
                        'updated_at', setup.updated_at
                     ))
          END
   FROM setup
   JOIN player_has_setup ON player_has_setup.setup_id = setup.id
   WHERE player_has_setup.player_id = player.id
  ) AS setup,
  (SELECT json_agg(json_build_object(
            'id', media.id,
            'link', media.link,
            'is_active', media.is_active
          ))
   FROM media
   JOIN player_has_media ON player_has_media.media_id = media.id
   WHERE player_has_media.player_id = player.id AND media.is_active = true
  ) AS media_video,
  (SELECT json_agg(json_build_object(
            'id', media.id,
            'link', media.link,
            'is_active', media.is_active
          ))
   FROM media
   JOIN player_has_media ON player_has_media.media_id = media.id
   WHERE player_has_media.player_id = player.id AND media.is_active = false
  ) AS media_photo
FROM player
ORDER BY player.id;

CREATE VIEW player_home_view AS
  SELECT "player"."user_name", "player"."first_name","player"."last_name", "player"."role", "player"."image" FROM "player" ORDER BY "player"."id" DESC;


CREATE VIEW get_user_view AS
SELECT "user"."id", "user"."user_name", "user"."first_name", "user"."last_name", "user"."email", "user"."password", "user"."refresh_token", "permission"."name" AS permission_name, "permission"."level" AS permission_level ,"user"."created_at", "user"."updated_at" FROM "user" JOIN "permission" ON "permission"."id" = "user"."user_permission";


CREATE VIEW calendar_home_view AS
(
  SELECT
  json_build_object(
    'future_event', (SELECT json_agg(calendar_event) FROM (
      SELECT /*evenement a venir*/
        "calendar"."id",
        "calendar"."event_name",
        "calendar"."event_date",
        "calendar"."adversary_name",
        "calendar"."adversary_name_short",
        "calendar"."live_link",
        NULL AS "score",
        "calendar"."image"
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
        "calendar"."adversary_name",
        "calendar"."adversary_name_short",
        "calendar"."replay_link",
        "calendar"."score",
        "calendar"."image"
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

CREATE VIEW calendar_view AS
SELECT
  json_build_object(
    'future_event', (SELECT json_agg(calendar_event) FROM (
      SELECT
        "calendar"."id",
        "calendar"."event_name",
        "calendar"."event_date",
        "calendar"."adversary_name",
        "calendar"."adversary_name_short",
        "calendar"."live_link",
        NULL AS "score",
        "calendar"."image",
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
        "calendar"."adversary_name",
        "calendar"."adversary_name_short",
        "calendar"."replay_link",
        "calendar"."score",
        "calendar"."image",
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
