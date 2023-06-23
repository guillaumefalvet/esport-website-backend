### HOW TO GET STARTED
1. Create a psql user and psql database

   user:`victoryzone` => `CREATE ROLE victoryzone WITH LOGIN PASSWORD 'victoryzone;'`

   database: `victoryzone` => `CREATE DATABASE victoryzone OWNER victoryzone;`

2. create a file `sqitch.conf` and copy the content of `sqitch.conf example` (MAKE SURE TO UNCOMMENT `target = db:pg:victoryzone` by removing the `#`).

3. Do a first deployement with sqitch:
   -`sqitch deploy`
   ***note**: if you don't have sqitch installed, [go there](https://sqitch.org/download/)*

4. `npm run DBsetup` it will run execute multiple [npm script](package.json)

5. `npm i` to install the dependencies.

6. create a file `.env` and copy the content of `.env example`.


7. `npm run dev` or `npm run start`.

### TYPICAL PATCH / POST REQUEST
[link](https://www.tldraw.com/r/v2D9rhIZWkk2TkVAMoco_32?viewport=-570%2C-956%2C4476%2C3586&page=page%3A1VJK9HJJQwed-H5qkpveL)

![](./shapes.png)

### ARCHITECTURE OF THE BACKEND
```
projet-14-victory-zone-back/
┣ app/
┃ ┣ controllers/
┃ ┃ ┣ CoreController.js
┃ ┃ ┣ ∞Controller.js
┃ ┣ middlewares/
┃ ┃ ┣ authHandler.js
┃ ┃ ┣ controllerHandler.js
┃ ┃ ┗ errorHandler.js
┃ ┣ models/
┃ ┃ ┣ clients.js
┃ ┃ ┗ dataMapper.js
┃ ┣ routers/
┃ ┃ ┣ api/
┃ ┃ ┃ ┣ ∞Router.js
┃ ┃ ┃ ┣ index.js
┃ ┃ ┗ index.js
┃ ┣ services/
┃ ┃ ┣ mailingService/
┃ ┃ ┃ ┗ templeteRecruitement.js
┃ ┃ ┣ corsService.js
┃ ┃ ┣ swaggerService.js
┃ ┃ ┗ uploadService.js
┃ ┗ validations/
┃ ┃ ┣ schemas/
┃ ┃ ┃ ┣ ∞-schema.js
┃ ┃ ┗ validate.js
┣ data/
┃ ┗ seeding_MVP.sql
┣ migrations/
┃ ┣ deploy/
┃ ┃ ┣ init.sql
┃ ┃ ┗ ∞.sql
┃ ┣ revert/
┃ ┃ ┣ init.sql
┃ ┃ ┗ ∞.sql
┃ ┣ verify/
┃ ┃ ┣ init.sql
┃ ┃ ┗ ∞.sql
┃ ┗ sqitch.plan
┣ private/
┃ ┗ pdf/
┃   ┗ ∞.pdf
┣ public/
┃ ┗ image/
┃   ┗ ∞.webp
┣ test sql/
┃ ┗ dataMapper_test.js
┣ test.http/
┃ ┗ ∞.http
┣ .editorconfig
┣ .env
┣ .env example
┣ .eslintrc.js
┣ .gitignore
┣ README.md
┣ article_data.sql
┣ index.js
┣ package-lock.json
┣ package.json
┣ sqitch.conf
┗ sqitch.conf example
```
