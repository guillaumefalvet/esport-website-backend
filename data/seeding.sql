-- Seeding pour la table "player"
INSERT INTO "player" ("user_name", "first_name", "last_name", "description", "role", "small_image", "medium_image", "large_image", "statistics", "achievements", "youtube_link", "twitch_link", "twitter_link") VALUES
('john_doe', 'John', 'Doe', 'Professional gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/johndoe', 'twitch.tv/johndoe', 'twitter.com/johndoe'),
('jane_smith', 'Jane', 'Smith', 'Casual gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/janesmith', 'twitch.tv/janesmith', 'twitter.com/janesmith'),
('alex_ross', 'Alex', 'Ross', 'Competitive gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/alexross', 'twitch.tv/alexross', 'twitter.com/alexross'),
('mike_johnson', 'Mike', 'Johnson', 'Streamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/mikejohnson', 'twitch.tv/mikejohnson', 'twitter.com/mikejohnson'),
('sarah_miller', 'Sarah', 'Miller', 'Amateur gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/sarahmiller', 'twitch.tv/sarahmiller', 'twitter.com/sarahmiller'),
('david_wilson', 'David', 'Wilson', 'Pro gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/davidwilson', 'twitch.tv/davidwilson', 'twitter.com/davidwilson'),
('emily_jones', 'Emily', 'Jones', 'Gaming enthusiast', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/emilyjones', 'twitch.tv/emilyjones', 'twitter.com/emilyjones'),
('peter_anderson', 'Peter', 'Anderson', 'Casual gamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/peteranderson', 'twitch.tv/peteranderson', 'twitter.com/peteranderson'),
('lisa_brown', 'Lisa', 'Brown', 'Pro streamer', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/lisabrown', 'twitch.tv/lisabrown', 'twitter.com/lisabrown'),
('michael_clark', 'Michael', 'Clark', 'Gaming expert', 'Player', 'small_image_url', 'medium_image_url', 'large_image_url', 'Some statistics', 'Some achievements', 'youtube.com/michaelclark', 'twitch.tv/michaelclark', 'twitter.com/michaelclark');

-- Seeding pour la table "permission"
INSERT INTO "permission" ("name", "level") VALUES
('admin', 1),
('moderator', 2),
('user', 3),
('guest', 4),
('subscriber', 5),
('editor', 6),
('contributor', 7),
('author', 8),
('manager', 9),
('developer', 10);

-- Seeding pour la table "user"
INSERT INTO "user" ("user_name", "email", "password", "user_permission") VALUES
('john_doe', 'john@example.com', 'password123', 3),
('jane_smith', 'jane@example.com', 'password123', 3),
('alex_ross', 'alex@example.com', 'password123', 3),
('mike_johnson', 'mike@example.com', 'password123', 3),
('sarah_miller', 'sarah@example.com', 'password123', 3),
('david_wilson', 'david@example.com', 'password123', 3),
('emily_jones', 'emily@example.com', 'password123', 3),
('peter_anderson', 'peter@example.com', 'password123', 3),
('lisa_brown', 'lisa@example.com', 'password123', 3),
('michael_clark', 'michael@example.com', 'password123', 3);

-- Seeding pour la table "recruitment"
INSERT INTO "recruitment" ("user_name", "email", "first_name", "last_name", "message", "external_link") VALUES
('john_doe', 'john@example.com', 'John', 'Doe', 'I am interested in joining the team.', 'external_link_url'),
('jane_smith', 'jane@example.com', 'Jane', 'Smith', 'I would love to be part of this community.', 'external_link_url'),
('alex_ross', 'alex@example.com', 'Alex', 'Ross', 'I have been following your progress for a while.', 'external_link_url'),
('mike_johnson', 'mike@example.com', 'Mike', 'Johnson', 'I believe I have the skills required for the team.', 'external_link_url'),
('sarah_miller', 'sarah@example.com', 'Sarah', 'Miller', 'I am passionate about gaming and would like to contribute.', 'external_link_url'),
('david_wilson', 'david@example.com', 'David', 'Wilson', 'I have experience in competitive gaming.', 'external_link_url'),
('emily_jones', 'emily@example.com', 'Emily', 'Jones', 'I would like to be part of the community events.', 'external_link_url'),
('peter_anderson', 'peter@example.com', 'Peter', 'Anderson', 'I have a strong interest in esports.', 'external_link_url'),
('lisa_brown', 'lisa@example.com', 'Lisa', 'Brown', 'I have a background in game development.', 'external_link_url'),
('michael_clark', 'michael@example.com', 'Michael', 'Clark', 'I am looking to collaborate with other gamers.', 'external_link_url');

-- Seeding pour la table "setup"
INSERT INTO "setup" ("name", "external_link") VALUES
('Setup 1', 'external_link_url'),
('Setup 2', 'external_link_url'),
('Setup 3', 'external_link_url'),
('Setup 4', 'external_link_url'),
('Setup 5', 'external_link_url'),
('Setup 6', 'external_link_url'),
('Setup 7', 'external_link_url'),
('Setup 8', 'external_link_url'),
('Setup 9', 'external_link_url'),
('Setup 10', 'external_link_url');

-- Seeding pour la table "media"
INSERT INTO "media" ("link", "is_active") VALUES
('media_link_1', true),
('media_link_2', true),
('media_link_3', true),
('media_link_4', true),
('media_link_5', true),
('media_link_6', true),
('media_link_7', true),
('media_link_8', true),
('media_link_9', true),
('media_link_10', true);

-- Seeding pour la table "player_has_setup"
INSERT INTO "player_has_setup" ("player_id", "setup_id") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Seeding pour la table "player_has_media"
INSERT INTO "player_has_media" ("player_id", "media_id") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Seeding pour la table "article"
INSERT INTO "article" ("slug", "title", "content", "author", "small_image", "medium_image", "large_image", "figcaption") VALUES
('article-1', 'Article 1', 'Content of Article 1', 'John Doe', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 1 caption'),
('article-2', 'Article 2', 'Content of Article 2', 'Jane Smith', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 2 caption'),
('article-3', 'Article 3', 'Content of Article 3', 'Alex Ross', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 3 caption'),
('article-4', 'Article 4', 'Content of Article 4', 'Mike Johnson', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 4 caption'),
('article-5', 'Article 5', 'Content of Article 5', 'Sarah Miller', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 5 caption'),
('article-6', 'Article 6', 'Content of Article 6', 'David Wilson', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 6 caption'),
('article-7', 'Article 7', 'Content of Article 7', 'Emily Jones', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 7 caption'),
('article-8', 'Article 8', 'Content of Article 8', 'Peter Anderson', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 8 caption'),
('article-9', 'Article 9', 'Content of Article 9', 'Lisa Brown', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 9 caption'),
('article-10', 'Article 10', 'Content of Article 10', 'Michael Clark', 'small_image_url', 'medium_image_url', 'large_image_url', 'Article 10 caption');

-- Seeding pour la table "category"
INSERT INTO "category" ("label") VALUES
('Category 1'),
('Category 2'),
('Category 3'),
('Category 4'),
('Category 5'),
('Category 6'),
('Category 7'),
('Category 8'),
('Category 9'),
('Category 10');

-- Seeding pour la table "article_has_category"
INSERT INTO "article_has_category" ("article_id", "category_id") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
INSERT INTO "calendar" ("event_name", "event_date", "adversary_name", "adversary_name_short", "replay_link", "live_link", "score", "small_image", "medium_image", "large_image")
VALUES
    ('Event 1', '2023-06-10 18:00:00', 'Team A', 'A', 'replay_link_1', 'live_link_1', '1-0', 'small_image_url_1', 'medium_image_url_1', 'large_image_url_1'),
    ('Event 2', '2023-06-12 20:00:00', 'Team B', 'B', 'replay_link_2', 'live_link_2', '2-2', 'small_image_url_2', 'medium_image_url_2', 'large_image_url_2'),
    ('Event 3', '2023-06-15 16:30:00', 'Team C', 'C', 'replay_link_3', 'live_link_3', '3-1', 'small_image_url_3', 'medium_image_url_3', 'large_image_url_3');

-- Seed data for table "article_has_calendar"
INSERT INTO "article_has_calendar" ("article_id", "calendar_id")
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
