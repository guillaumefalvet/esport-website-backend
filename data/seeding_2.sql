-- Seeding data for the "player" table
INSERT INTO "player" ("user_name", "first_name", "last_name", "description", "role", "small_image", "medium_image", "large_image", "statistics", "achievements", "youtube_link", "twitch_link", "twitter_link")
VALUES
  ('joueur1', 'Jean', 'Dupont', 'Description du joueur 1', 'Joueur professionnel', 'small_image_1.jpg', 'medium_image_1.jpg', 'large_image_1.jpg', 'Statistiques du joueur 1', 'Ses réalisations', 'https://youtube.com/joueur1', 'https://twitch.tv/joueur1', 'https://twitter.com/joueur1'),
  ('joueur2', 'Pierre', 'Martin', 'Description du joueur 2', 'Joueur semi-professionnel', 'small_image_2.jpg', 'medium_image_2.jpg', 'large_image_2.jpg', 'Statistiques du joueur 2', 'Ses réalisations', 'https://youtube.com/joueur2', 'https://twitch.tv/joueur2', 'https://twitter.com/joueur2');

-- Seeding data for the "permission" table
INSERT INTO "permission" ("name", "level")
VALUES
  ('Administrateur', 1),
  ('Utilisateur', 2);


-- Seeding data for the "user" table
INSERT INTO "user" ("user_name", "email", "password", "user_permission")
VALUES
  ('admin', 'john@example.com', '$2b$10$/by8W/BetZSETyF6OlSH4.CwX0szBcOMgENI1fLVcPYlK3x3crW7O', 1),
  ('utilisateur1', 'michael@example.com', '$2b$10$/by8W/BetZSETyF6OlSH4.CwX0szBcOMgENI1fLVcPYlK3x3crW7O', 2);
-- Seeding data for the "recruitment" table
INSERT INTO "recruitment" ("user_name", "email", "first_name", "last_name", "message", "external_link")
VALUES
  ('recrue1', 'recrue1@example.com', 'John', 'Doe', 'Message de recrutement 1', 'https://lienexterne1.com'),
  ('recrue2', 'recrue2@example.com', 'Jane', 'Smith', 'Message de recrutement 2', 'https://lienexterne2.com');

-- Seeding data for the "setup" table
INSERT INTO "setup" ("name", "external_link")
VALUES
  ('Configuration 1', 'https://lienexterne1.com'),
  ('Configuration 2', 'https://lienexterne2.com');

-- Seeding data for the "media" table
INSERT INTO "media" ("link", "is_active")
VALUES
  ('https://media1.com', true),
  ('https://media2.com', false);

-- Seeding data for the "article" table
INSERT INTO "article" ("slug", "title", "content", "author", "small_image", "medium_image", "large_image", "figcaption")
VALUES
  ('article-1', 'Titre de l''article 1', 'Contenu de l''article 1', 'Auteur 1', 'small_image_1.jpg', 'medium_image_1.jpg', 'large_image_1.jpg', 'Légende de l''image 1'),
  ('article-2', 'Titre de l''article 2', 'Contenu de l''article 2', 'Auteur 2', 'small_image_2.jpg', 'medium_image_2.jpg', 'large_image_2.jpg', 'Légende de l''image 2');

-- Seeding data for the "category" table
INSERT INTO "category" ("label")
VALUES
  ('Actualités'),
  ('Guides'),
  ('Conseils');

-- Seeding data for the "calendar" table
INSERT INTO "calendar" ("event_name", "event_date", "adversary_name", "adversary_name_short", "replay_link", "live_link", "score", "small_image", "medium_image", "large_image")
VALUES
  ('Match 1', '2023-06-15 18:00:00', 'Adversaire 1', 'Adv 1', 'https://replaylink1.com', 'https://livestream1.com', '2-1', 'small_image_1.jpg', 'medium_image_1.jpg', 'large_image_1.jpg'),
  ('Match 2', '2023-06-20 19:30:00', 'Adversaire 2', 'Adv 2', 'https://replaylink2.com', 'https://livestream2.com', '1-1', 'small_image_2.jpg', 'medium_image_2.jpg', 'large_image_2.jpg');

-- Seeding data for the "article_has_category" table
INSERT INTO "article_has_category" ("article_id", "category_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);

-- Seeding data for the "article_has_calendar" table
INSERT INTO "article_has_calendar" ("article_id", "calendar_id")
VALUES
  (1, 1),
  (2, 2);
INSERT INTO "player_has_media" ("player_id", "media_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2);

INSERT INTO "player_has_setup" ("player_id", "setup_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2);
