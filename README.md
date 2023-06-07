## Le projet vise à créer une plateforme complète pour l'équipe d'eSport Victory Zone

Le projet comprendra les fonctionnalités suivantes :

1. **MVP**

   - Présenter l'équipe d'eSport : Le site doit fournir des informations détaillées sur l'équipe d'eSport, son objectif et sa mission.
   
   - Partager les actualités : Le site doit disposer d'une rubrique dédiée aux actualités de l'équipe d'eSport.
   
   - Présenter les membres de l'équipe : Le site doit inclure une section où les visiteurs peuvent en apprendre davantage sur les membres de l'équipe d'eSport.
   
   - Faciliter le recrutement : Le site doit inclure un espace dédié au recrutement de nouveaux talents.
   
   - Offrir un calendrier des événements : Le site doit inclure un calendrier des événements à venir.
   
   - Connexion Administrateur : Créer un bouton de connexion pour l’administrateur et permettre la gestion de contenus.
   
   - Créer une page “Politique de Cookie” pour expliquer la gestion des cookies et respecter la RGPD.

3. **Evolutions potentielles**

   - Promouvoir les partenaires et sponsors : Le site doit avoir une section dédiée aux partenaires et sponsors de l'équipe d'eSport.
   
   - Fournir du contenu multimédia : Le site doit offrir un espace où les visiteurs peuvent consulter des photos, des vidéos et des moments forts de l'équipe d'eSport.
   
   - Faciliter le contact et l'interaction : Le site doit fournir une page de contact où les visiteurs peuvent poser des questions.
   
   - Système de vote sur les articles : Les visiteurs doivent pouvoir signaler s’ils aiment ou non un article grâce à un système de vote (Like/Dislike ou autre).
   
   - Système de recherche pour trouver des articles : mettre en place une barre de recherche sur le header et en haut de la liste d’article pour permettre à l’utilisateur de cibler une information précise par mot clef.
   
   - Système de mailing de newsletter : créer un champ de formulaire pour enregistrer son adresse mail et recevoir les news de l’équipe et une alerte pour les tournois et lives.
   
   - Ajouter une page dédiée “About Us”.


```
- app
   - controllers
      articleController.js
      calendarController.js
      teamController.js
      loginController.js
      mediaController.js
      recruitmentController.js
      index.js
   - routers
      - api
         - article
            index.js
         - calendar
            index.js
         - team
            index.js
         - login
            index.js
         - media
            index.js
         - recruitment
         index.js
      -index.js
   - validations
      validate.js
      schemas.js
   - middlewares
      auth.js
      controllerHandler.js
      error.js
   - models
      dataMapper.js
      client.js
- data
   seeding.sql
- migrations
   -deploy
      init.sql
   -revert
   -verify
      init.sql
   sqitch.plan
index.js
article.http
team.http
calendar.http
homepage.http
recruitment.http
.editorconfig
.eslintrc.js
.gitgnore
README.md
package.json
.env
.env example
sqitch.conf
sqitch.conf example
- ....
```