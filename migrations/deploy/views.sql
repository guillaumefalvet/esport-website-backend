-- Deploy victoryzone:views to pg

BEGIN;
CREATE VIEW article_events_categories AS
SELECT article.*,
    json_agg(json_build_object(
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
    )) AS events,
    (SELECT json_agg(json_build_object(
        'id' ,category.id,
        'label', category.label
    )) AS categories
    FROM article_has_category
    JOIN category ON article_has_category.category_id = category.id
    WHERE article_has_category.article_id = article.id
    ) AS categories
FROM article
JOIN article_has_calendar ON article.id = article_has_calendar.article_id
JOIN calendar ON article_has_calendar.calendar_id = calendar.id
GROUP BY article.id;

CREATE VIEW player_view AS
SELECT
  player.*,
  array_agg(json_build_object(
    'id', setup.id,
    'name', setup.name,
    'external_link', setup.external_link,
    'created_at', setup.created_at,
    'updated_at', setup.updated_at
  )) AS setup,
  array_agg(json_build_object(
    'id', media.id,
    'link', media.link,
    'is_video', media.is_active
  )) FILTER (WHERE media.is_active = true) AS media_video,
  array_agg(json_build_object(
    'id', media.id,
    'link', media.link,
    'is_video', media.is_active
  )) FILTER (WHERE media.is_active = false) AS media_photo
FROM player
LEFT JOIN player_has_setup ON player.id = player_has_setup.player_id
LEFT JOIN setup ON player_has_setup.setup_id = setup.id
LEFT JOIN player_has_media ON player.id = player_has_media.player_id
LEFT JOIN media ON player_has_media.media_id = media.id
GROUP BY player.id
ORDER BY player.id;

CREATE VIEW last_article AS
SELECT "article"."slug", "article"."title", "article"."small_image" FROM article WHERE publication_date <= now() ORDER BY article.id DESC limit 3;



COMMIT;
