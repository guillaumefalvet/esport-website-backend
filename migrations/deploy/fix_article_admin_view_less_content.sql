-- Deploy victoryzone:fix_article_admin_view_less_content to pg

BEGIN;
CREATE VIEW article_events_categories_private_v2 AS
SELECT "article".id, "article".slug, concat(regexp_replace(article.content, '((\S+\s*){1,40})(.*)', '\1'), '...') AS content, "article".author, "article".image, "article".figcaption, "article".publication_date, "article".created_at, "article".updated_at,
    (SELECT CASE WHEN COUNT(calendar.id) = 0 THEN NULL
                 ELSE json_agg(json_build_object(
                         'event_id', calendar.id,
                         'event_name', calendar.event_name,
                         'event_date', calendar.event_date,
                         'adversary_name', calendar.adversary_name,
                         'adversary_name_short', calendar.adversary_name_short,
                         'replay_link', calendar.replay_link,
                         'live_link', calendar.live_link,
                         'score', calendar.score,
                         'image', calendar.image,
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

COMMIT;
