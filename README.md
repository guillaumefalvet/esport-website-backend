### HOW TO GET STARTED
1. Create a database and name it victoryzone:
  `createdb victoryzone`
2. do a first deployement with sqitch:
   -`sqitch deploy`
   ***note**: if you don't have sqitch installed, [go there](https://sqitch.org/download/)*
3. `npm run DBsetup` it will run execute multiple [npm script](package.json)
4. `npm run dev` or `npm run start`



### ARCHITECTURE OF THE BACKEND
```
projet-14-victory-zone-back/
┣ app/
┃ ┣ controllers/
┃ ┃ ┣ articleController.js
┃ ┃ ┣ authController.js
┃ ┃ ┗ recruitmentController.js
┃ ┣ middlewares/
┃ ┃ ┣ authHandler.js
┃ ┃ ┣ controllerHandler.js
┃ ┃ ┗ errorHandler.js
┃ ┣ models/
┃ ┃ ┣ clients.js
┃ ┃ ┗ dataMapper.js
┃ ┣ routers/
┃ ┃ ┣ api/
┃ ┃ ┃ ┣ articleRouter.js
┃ ┃ ┃ ┣ authRouter.js
┃ ┃ ┃ ┣ calendarRouter.js
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┣ mediaRouter.js
┃ ┃ ┃ ┣ recruitmentRouter.js
┃ ┃ ┃ ┗ teamRouter.js
┃ ┃ ┗ index.js
┃ ┣ services/
┃ ┃ ┗ recruitMailing.js
┃ ┗ validations/
┃   ┣ schemas/
┃ ┃ ┃ ┣ article-schema.js
┃ ┃ ┃ ┣ login-schema.js
┃ ┃ ┃ ┣ recruitment-schema.js
┃ ┃ ┃ ┗ team-schema.js
┃   ┗ validate.js
┣ data/
┃ ┣ seeding.sql
┃ ┗ seeding_2.sql
┣ migrations/
┃ ┣ deploy/
┃ ┃ ┣ domains.sql
┃ ┃ ┣ functions.sql
┃ ┃ ┣ init.sql
┃ ┃ ┗ views.sql
┃ ┣ revert/
┃ ┃ ┣ domains.sql
┃ ┃ ┣ functions.sql
┃ ┃ ┣ init.sql
┃ ┃ ┗ views.sql
┃ ┣ verify/
┃ ┃ ┣ domains.sql
┃ ┃ ┣ functions.sql
┃ ┃ ┣ init.sql
┃ ┃ ┗ views.sql
┃ ┗ sqitch.plan
┣ test sql/
┃ ┗ dataMapper_test.js
┣ test.http/
┃ ┣ calendar.http
┃ ┣ image.http
┃ ┣ login.http
┃ ┣ recruitment.http
┃ ┗ team.http
┣ .editorconfig
┣ .env
┣ .env example
┣ .eslintrc.js
┣ .gitignore
┣ README.md
┣ index.js
┣ package-lock.json
┣ package.json
┣ sqitch.conf
┗ sqitch.conf example
```
