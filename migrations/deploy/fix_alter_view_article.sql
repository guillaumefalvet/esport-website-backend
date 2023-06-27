-- Deploy victoryzone:fix_alter_view_article to pg

BEGIN;
CREATE OR REPLACE VIEW article_categories_public AS
SELECT "article".id, "article".slug, concat(regexp_replace(article.content, '((\S+\s*){1,40})(.*)', '\1'), '...') AS content, "article".author, "article".image, "article".figcaption, "article".publication_date, "article".created_at, "article".updated_at,
    (SELECT CASE WHEN COUNT(category.id) = 0 THEN NULL
                 ELSE json_agg(json_build_object(
                         'id', category.id,
                         'label', category.label
                     ))
        END
    FROM article_has_category
    JOIN category ON article_has_category.category_id = category.id
    WHERE article_has_category.article_id = article.id
    ) AS categories, "article".title
FROM article
LEFT JOIN article_has_category ON article.id = article_has_category.article_id
WHERE article.publication_date <= now()
GROUP BY article.id
ORDER BY article.publication_date DESC;

COMMIT;
