-- SQLBook: Code
-- Seeding data for the "player" table
INSERT INTO "player" ("user_name", "first_name", "last_name", "description", "role", "image", "statistics", "achievements", "youtube_link", "twitch_link", "twitter_link")
VALUES
  ('theGardener', 'Ali', 'Hadj Cherif', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/public/team/player_ali.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/thegardener', 'https://twitch.tv/thegardener', 'https://twitter.com/thegardener'),
  ('fullStack_DPS', 'Manu', 'Chevalier', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/public/team/player_manu.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/fullstack_dps', 'https://twitch.tv/fullstack_dps', 'https://twitter.com/fullstack_dps'),
  ('error_sniper', 'Guillaume', 'Falvet', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/public/team/player_guillaume.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/error_sniper', 'https://twitch.tv/error_sniper', 'https://twitter.com/error_sniper'),
  ('reactLover', 'Axel', 'Martin', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/public/team/player_axel.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/reactlover', 'https://twitch.tv/reactlover', 'https://twitter.com/reactlover'),
  ('code_healer', 'Quentin', 'Joanon', 'Description du joueur 1', 'Joueur professionnel', 'https://projet-14-victory-zone-back-production.up.railway.app/public/team/player_quentin.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lorem, fringilla at tincidunt sed, tempus at dui. Morbi commodo.', 'Ses réalisations', 'https://youtube.com/code_healer', 'https://twitch.tv/code_healer', 'https://twitter.com/code_healer');

-- Seeding data for the "permission" table
INSERT INTO "permission" ("name", "level")
VALUES
  ('Administrateur', 1),
  ('Utilisateur', 2);


-- Seeding data for the "user" table
INSERT INTO "user" ("user_name", "first_name", "last_name", "email", "password", "user_permission")
VALUES
  ('quentin', 'Quentin', 'Joanon', 'john@example.com', '$2b$10$/by8W/BetZSETyF6OlSH4.CwX0szBcOMgENI1fLVcPYlK3x3crW7O', 1),
  -- mdp quentin: secret
  ('ali', 'Ali', ' Hadj Cherif', 'ali@ali.com', '$2a$10$TI1hJJD1Ns2XzWk0XShXaeQeu6ZxXig3K554a63x.18tFBKe8f6A.', 1),
  -- mdp ali: passwordali
  ('axel', 'Axel', 'Martin', 'axel@axel.com', '$2a$10$NFez/i/oG/GSgFPqfHYmQuDmJ7zgF/kbMhkMF50v7Rg7hfiyGzjlW', 1),
  -- mdp axel: passwordaxel
  ('manu', 'Manu', 'Chevalier', 'manu@manu.com', '$2a$10$FnUp1KOIuD0pbda3OdX0UOdxgXjXawRZDLigEtA.6CvTnRjT.5zpO', 1),
  -- mdp manu: passwordmanu
  ('guillaume', 'Guillaume', 'Falvet', 'gui@gui.com', '$2a$10$SPxaiJpYuBsz.rY2BRretOlTUeAv3Cazyx51aI1KVhNqmIB.3M.mi', 1),
  -- mdp gui: passwordgui
  ('brian', 'Where is', 'Brian', 'user@user.com', '$2a$10$5uL4rKX/J0/JXVkjTa979O9h8Ibvu11soBuK.XSd6gKAmv645dIAG', 2);
  -- mdp user: user

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
  ('https://www.youtube.com/embed/tK48_2MAE44', true),
  ('https://www.youtube.com/embed/Pskemt2JYJA', true),
  ('https://www.youtube.com/embed/hdsAtmX4-DE', true),
  ('https://www.youtube.com/embed/WUCfxK89oFU', true),
  ('https://www.youtube.com/embed/UZpYEKF5qBE', true),
  ('https://projet-14-victory-zone-back-production.up.railway.app/public/image/carousel-1.jpg', false),
  ('https://projet-14-victory-zone-back-production.up.railway.app/public/image/carousel-2.jpg', false),
  ('https://projet-14-victory-zone-back-production.up.railway.app/public/image/carousel-3.jpg', false);


INSERT INTO "article" ("slug", "title", "content", "author_id", "image", "figcaption", "publication_date")
VALUES
    ('exploring-the-world-of-video-games', 'Exploring the World of Video Games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1 , 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-1.webp', 'Image 1 caption', '2023-06-01 18:00:00.581139+02'),

    ('the-evolution-of-gaming-consoles', 'The Evolution of Gaming Consoles', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-2.webp', 'Image 2 caption', '2023-06-02 18:00:00.581139+02'),

    ('unleashing-the-power-of-online-multiplayer', 'Unleashing the Power of Online Multiplayer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-3.webp', 'Image 3 caption', '2023-06-03 18:00:00.581139+02'),

    ('mastering-speed-and-precision-in-first-person-shooters', 'Mastering Speed and Precision in First Person Shooters', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-4.webp', 'Image 4 caption', '2023-06-04 18:00:00.581139+02'),

    ('the-art-of-storytelling-in-video-games', 'The Art of Storytelling in Video Games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-5.webp', 'Image 5 caption', '2023-06-05 18:00:00.581139+02'),

    ('immersing-yourself-in-virtual-reality-gaming', 'Immersing Yourself in Virtual Reality Gaming', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-6.webp', 'Image 6 caption', '2023-06-05 18:00:00.581139+02'),

    ('the-impact-of-indie-games-on-the-gaming-industry', 'The Impact of Indie Games on the Gaming Industry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-7.webp', 'Image 7 caption', '2023-06-07 18:00:00.581139+02'),

    ('the-rise-of-esports-and-competitive-gaming', 'The Rise of eSports and Competitive Gaming', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-8.webp', 'Image 8 caption', '2023-06-08 18:00:00.581139+02'),

    ('the-evolution-of-open-world-games', 'The Evolution of Open World Games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-9.webp', 'Image 9 caption', '2023-06-09 18:00:00.581139+02'),

    ('exploring-the-history-of-retro-gaming', 'Exploring the History of Retro Gaming', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae bibendum diam, eget venenatis urna. Mauris eget nibh nec purus sollicitudin sagittis non sit amet ipsum. Donec nec laoreet mi, feugiat iaculis massa. Nunc ut purus elementum, molestie ligula a, gravida augue. Nullam eget eros hendrerit, auctor purus sit amet, finibus neque. Duis pulvinar nisl vitae libero pharetra, ut gravida mauris ullamcorper. Pellentesque ultricies ligula in pharetra accumsan. Nam ultricies purus nisi, in hendrerit elit luctus id. Praesent dignissim ac odio ac vestibulum. Curabitur lacus orci, gravida eu mi eu, ultrices convallis odio. Cras in erat id nunc mattis consequat sit amet non risus. Fusce sagittis nibh ornare suscipit vestibulum. Vestibulum ut ex quis justo rutrum mollis vel eget sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 1, 'https://projet-14-victory-zone-back-production.up.railway.app/public/article/article-10.webp', 'Image 10 caption', '2023-06-10 18:00:00.581139+02');

-- Seeding data for the "category" table
INSERT INTO "category" ("label")
VALUES
  ('Actualités'),
  ('Guides'),
  ('Évenement'),
  ('Conseils');




-- Seeding data for the "calendar" table
INSERT INTO "calendar" ("event_name", "event_date", "adversary_name", "adversary_name_short", "replay_link", "live_link", "score", "image")
VALUES
  ('Match 1', '2023-06-15 18:00:00', 'Fanatic', 'FNC', 'https://replaylink1.com', 'https://livestream1.com', '2-1', 'https://projet-14-victory-zone-back-production.up.railway.app/public/calendar/Fnatic-Logo-2020.webp'),
  ('Match 2', '2023-06-20 19:30:00', 'G2 Esports', 'G2', 'https://replaylink2.com', 'https://livestream2.com', '1-1', 'https://projet-14-victory-zone-back-production.up.railway.app/public/calendar/G2_Esports_1.webp'),
  ('World Series of Warzone 2023 | Stage 2 | EU Open', '2024-06-20 19:30:00', 'Karmine Corp', 'KKorp', 'https://replaylink2.com', 'https://livestream2.com', '', 'https://projet-14-victory-zone-back-production.up.railway.app/public/calendar/Karmine_Corp_logo_1.webp'),
  ('World Series of Warzone 2023 | Stage 3 | EU Open', '2024-06-20 19:30:00', 'Team Vitality', 'VLT', 'https://replaylink2.com', 'https://livestream2.com', '', 'https://projet-14-victory-zone-back-production.up.railway.app/public/calendar/Team_Vitality_2020-2021.webp');

-- Seeding data for the "article_has_category" table
INSERT INTO "article_has_category" ("article_id", "category_id")
VALUES
  (1, 1),
  (2, 2),
  (3, 1),
  (4, 3),
  (5, 3),
  (6, 3),
  (8, 3),
  (7, 2),
  (9, 1),
  (10, 2);

INSERT INTO "player_has_media" ("player_id", "media_id")
VALUES
  (1, 1),
  (1, 2),

  (2, 2),
  (2, 3),

  (3, 3),
  (3, 4),

  (4, 4),
  (4, 5),

  (5, 4),
  (5, 1);
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


