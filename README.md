### MAIN BRANCH: HOW TO GET STARTED
1. Create a database and name it victoryzone:
  `createdb victoryzone`
2. do a first deployement with sqitch:
   -`sqitch deploy`
   ***note**: if you don't have sqitch installed, [go there](https://sqitch.org/download/)*
3. `npm run DBsetup` it will run execute multiple [npm script](package.json)
4. `npm run dev` or `npm run start`



### ARCHITECTURE OF THE BACKEND
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
package-lock.json
package.json
.env
.env example
sqitch.conf
sqitch.conf example

```
