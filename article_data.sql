--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.article (id, slug, title, content, author, image, figcaption, publication_date, created_at, updated_at) FROM stdin;
1	exploring-the-world-of-video-games	Exploring the World of Video Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	John Doe	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 1 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
2	the-evolution-of-gaming-consoles	The Evolution of Gaming Consoles	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Jane Smith	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 2 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
3	unleashing-the-power-of-online-multiplayer	Unleashing the Power of Online Multiplayer	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Alex Johnson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 3 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
4	mastering-speed-and-precision-in-first-person-shooters	Mastering Speed and Precision in First Person Shooters	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Emily Thompson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 4 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
5	the-art-of-storytelling-in-video-games	The Art of Storytelling in Video Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Michael Davis	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 5 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
9	the-evolution-of-open-world-games	The Evolution of Open World Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Robert Martin	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 9 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
6	immersing-yourself-in-virtual-reality-gaming	Immersing Yourself in Virtual Reality Gaming	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Sarah Anderson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 6 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
7	the-impact-of-indie-games-on-the-gaming-industry	The Impact of Indie Games on the Gaming Industry	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	David Wilson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 7 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
8	the-rise-of-esports-and-competitive-gaming	The Rise of eSports and Competitive Gaming	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Jennifer Lee	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 8 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
10	exploring-the-history-of-retro-gaming	Exploring the History of Retro Gaming	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Jessica Thompson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 10 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
11	the-art-of-game-design-and-user-experience	The Art of Game Design and User Experience	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Matthew White	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 11 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
12	the-impact-of-virtual-reality-on-medical-training	The Impact of Virtual Reality on Medical Training	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Sophia Roberts	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 12 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
13	the-role-of-music-in-video-games	The Role of Music in Video Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Daniel Evans	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 13 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
14	the-evolution-of-mobile-gaming	The Evolution of Mobile Gaming	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Olivia Thompson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 14 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
15	exploring-the-world-of-virtual-reality-arcades	Exploring the World of Virtual Reality Arcades	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Andrew Johnson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 15 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
16	the-impact-of-video-games-on-cognitive-abilities	The Impact of Video Games on Cognitive Abilities	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Sophie Anderson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 16 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
17	the-evolution-of-multiplayer-online-battle-arena-games	The Evolution of Multiplayer Online Battle Arena Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Michael Roberts	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 17 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
18	the-power-of-player-choice-in-role-playing-games	The Power of Player Choice in Role-Playing Games	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Emma Davis	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 18 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
19	the-influence-of-video-games-on-popular-culture	The Influence of Video Games on Popular Culture	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	James Wilson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 19 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
20	the-future-of-virtual-reality-gaming	The Future of Virtual Reality Gaming	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Michael Johnson	https://projet-14-victory-zone-back-production.up.railway.app/image/carousel-3.webp	Image 20 caption	2023-06-21 15:42:33.278649+02	2023-06-21 15:41:18.188199+02	\N
\.


--
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.article_id_seq', 20, true);


--
-- PostgreSQL database dump complete
--

