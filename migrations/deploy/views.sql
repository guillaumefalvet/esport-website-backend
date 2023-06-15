-- Deploy victoryzone:views to pg

BEGIN;
CREATE VIEW article_events_categories_public AS
SELECT article.*,
    (SELECT CASE WHEN COUNT(calendar.id) = 0 THEN NULL
                 ELSE json_agg(json_build_object(
                         'event_name', calendar.event_name,
                         'event_date', calendar.event_date,
                         'adversary_name', calendar.adversary_name,
                         'adversary_name_short', calendar.adversary_name_short,
                         'replay_link', calendar.replay_link,
                         'live_link', calendar.live_link,
                         'score', calendar.score,
                         'small_image', calendar.small_image,
                         'medium_image', calendar.medium_image,
                         'large_image', calendar.large_image,
                         'publication_date', calendar.publication_date,
                         'created_at', calendar.created_at,
                         'updated_at', calendar.updated_at
                     ))
        END
    FROM article_has_calendar
    JOIN calendar ON article_has_calendar.calendar_id = calendar.id
    WHERE article_has_calendar.article_id = article.id AND calendar.publication_date <= now()
    ) AS events,
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
LEFT JOIN article_has_calendar ON article.id = article_has_calendar.article_id
LEFT JOIN article_has_category ON article.id = article_has_category.article_id
WHERE article.publication_date <= now()
GROUP BY article.id
ORDER BY article.publication_date DESC;

CREATE VIEW article_events_categories_private AS
SELECT article.*,
    (SELECT CASE WHEN COUNT(calendar.id) = 0 THEN NULL
                 ELSE json_agg(json_build_object(
                         'event_name', calendar.event_name,
                         'event_date', calendar.event_date,
                         'adversary_name', calendar.adversary_name,
                         'adversary_name_short', calendar.adversary_name_short,
                         'replay_link', calendar.replay_link,
                         'live_link', calendar.live_link,
                         'score', calendar.score,
                         'small_image', calendar.small_image,
                         'medium_image', calendar.medium_image,
                         'large_image', calendar.large_image,
                         'publication_date', calendar.publication_date,
                         'created_at', calendar.created_at,
                         'updated_at', calendar.updated_at
                     ))
        END
    FROM article_has_calendar
    JOIN calendar ON article_has_calendar.calendar_id = calendar.id
    WHERE article_has_calendar.article_id = article.id
    ) AS events,
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
LEFT JOIN article_has_calendar ON article.id = article_has_calendar.article_id
LEFT JOIN article_has_category ON article.id = article_has_category.article_id
GROUP BY article.id
ORDER BY article.publication_date DESC;


CREATE VIEW player_view AS
SELECT
  player.*,
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
            'is_video', media.is_active
          ))
   FROM media
   JOIN player_has_media ON player_has_media.media_id = media.id
   WHERE player_has_media.player_id = player.id AND media.is_active = true
  ) AS media_video,
  (SELECT json_agg(json_build_object(
            'id', media.id,
            'link', media.link,
            'is_video', media.is_active
          ))
   FROM media
   JOIN player_has_media ON player_has_media.media_id = media.id
   WHERE player_has_media.player_id = player.id AND media.is_active = false
  ) AS media_photo
FROM player
ORDER BY player.id;



CREATE VIEW last_article AS
SELECT "article"."slug", "article"."title", "article"."small_image" FROM article WHERE publication_date <= now() ORDER BY article.id DESC limit 3;

CREATE VIEW get_user_view AS
SELECT "user"."id", "user"."user_name", "user"."email", "user"."password", "user"."refresh_token", "permission"."name" AS permission_name, "permission"."level" AS permission_level ,"user"."created_at", "user"."updated_at" FROM "user" JOIN "permission" ON "permission"."id" = "user"."user_permission";

COMMIT;
