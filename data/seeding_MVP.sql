-- Seeding data for the "player" table
INSERT INTO "player" ("user_name", "first_name", "last_name", "description", "role", "image", "statistics", "achievements", "youtube_link", "twitch_link", "twitter_link")
VALUES
  ('theGardener', 'Ali', 'Hadj Cherif', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/image/player_ali.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/thegardener', 'https://twitch.tv/thegardener', 'https://twitter.com/thegardener'),
  ('fullStack_DPS', 'Manu', 'Chevalier', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/image/player_manu.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/fullstack_dps', 'https://twitch.tv/fullstack_dps', 'https://twitter.com/fullstack_dps'),
  ('error_sniper', 'Guillaume', 'Falvet', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/image/player_guillaume.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/error_sniper', 'https://twitch.tv/error_sniper', 'https://twitter.com/error_sniper'),
  ('reactLover', 'Axel', 'Martin', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/image/player_axel.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/reactlover', 'https://twitch.tv/reactlover', 'https://twitter.com/reactlover'),
  ('code_healer', 'Quentin', 'Joanon', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/image/player_quentin.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/code_healer', 'https://twitch.tv/code_healer', 'https://twitter.com/code_healer');

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
--keyboard
  ('Corsair K70 RGB', 'https://www.corsair.com/keyboards/k70-rgb'),
  ('Razer BlackWidow Elite', 'https://www.razer.com/keyboards/blackwidow-elite'),
  ('Logitech G Pro', 'https://www.logitechg.com/keyboards/g-pro'),
  ('SteelSeries Apex Pro', 'https://steelseries.com/keyboards/apex-pro'),
  ('HyperX Alloy Elite 2', 'https://www.hyperxgaming.com/keyboards/alloy-elite-2'),
--headset
  ('HyperX Cloud II', 'https://www.hyperxgaming.com/headsets/cloud-ii'),
  ('SteelSeries Arctis Pro', 'https://steelseries.com/headsets/arctis-pro'),
  ('Astro A40 TR', 'https://www.astrogaming.com/headsets/A40-TR-gen-4'),
  ('Razer Kraken X', 'https://www.razer.com/gaming-audio/razer-kraken-x'),
  ('Logitech G Pro X', 'https://www.logitechg.com/headsets/g-pro-x'),
--mouse
  ('Logitech G502 Hero', 'https://www.logitechg.com/mice/g502-hero'),
  ('Razer DeathAdder Elite', 'https://www.razer.com/mice/deathadder-elite'),
  ('SteelSeries Rival 600', 'https://steelseries.com/mice/rival-600'),
  ('Corsair Ironclaw RGB', 'https://www.corsair.com/mice/ironclaw-rgb'),
  ('HyperX Pulsefire Surge', 'https://www.hyperxgaming.com/mice/pulsefire-surge');


-- Seeding data for the "media" table
INSERT INTO "media" ("link", "is_active")
VALUES
  ('https://media1.com', true),
  ('https://media2.com', false);

-- Seeding data for the "article" table
INSERT INTO "article" ("slug", "title", "content", "author", "image", "figcaption", "publication_date")
VALUES
  ('article-1', 'Titre de l''article 1', 'Contenu de l''article 1', 'Auteur 1', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 1', '2023-06-14 18:00:00'),
  ('article-2', 'Titre de l''article-2', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-3', 'Titre de l''article 3', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-4', 'Titre de l''article-4', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-5', 'Titre de l''article 5', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-6', 'Titre de l''article 6', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-7', 'Titre de l''article 7', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-8', 'Titre de l''article 8', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-9', 'Titre de l''article 9', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-10', 'Titre de l''article 10', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-11', 'Titre de l''article 11', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-12', 'Titre de l''article 12', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-13', 'Titre de l''article 13', 'Contenu de l''article 2', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2023-06-14 18:00:00'),
  ('article-14', 'Titre de l''article 14', 'Future', 'Auteur 2', 'https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp', 'Légende de l''image 2', '2024-06-14 18:00:00');

-- Seeding data for the "category" table
INSERT INTO "category" ("label")
VALUES
  ('Actualités'),
  ('Guides'),
  ('Conseils');

-- Seeding data for the "calendar" table
INSERT INTO "calendar" ("event_name", "event_date", "adversary_name", "adversary_name_short", "replay_link", "live_link", "score", "image", "publication_date")
VALUES
  ('Match 1', '2023-06-15 18:00:00', 'Adversaire 1', 'Adv 1', 'https://replaylink1.com', 'https://livestream1.com', '2-1', 'image_1.jpg', '2023-06-14 18:00:00'),
  ('Match du mois prochain', '2023-06-20 19:30:00', 'the futute is now', 'future is now', 'https://replaylink2.com', 'https://livestream2.com', '', 'image_2.jpg', '2024-07-15 18:00:00'),
  ('Match 2', '2023-06-20 19:30:00', 'Adversaire 2', 'Adv 2', 'https://replaylink2.com', 'https://livestream2.com', '1-1', 'image_2.jpg', '2023-06-14 18:00:00');

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
  (3, 2),
  (2, 3);
INSERT INTO "player_has_media" ("player_id", "media_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2);
INSERT INTO "player_has_setup" ("player_id", "setup_id")
VALUES
  -- Seeding data for the "player_has_setup" table (keyboard)
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  -- Seeding data for the "player_has_setup" table (headset)
  (1, 6),
  (2, 7),
  (3, 8),
  (4, 9),
  (5, 10),
  -- Seeding data for the "player_has_setup" table (mouse)
  (1, 11),
  (2, 12),
  (3, 13),
  (4, 14),
  (5, 15);


