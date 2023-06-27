-- Revert victoryzone:fix_alter_view_article_home from pg

BEGIN;

CREATE OR REPLACE VIEW get_article_home AS
    SELECT "article"."id",
    "article"."slug",
    "article"."title",
    "article"."image",
    "article"."figcaption",
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
        ) AS categories, "article"."publication_date", "article"."author"
    FROM "article"
    LEFT JOIN article_has_category ON article.id = article_has_category.article_id
    WHERE "article"."publication_date" <= now() ORDER BY "article"."publication_date" DESC limit 3;
COMMIT;
