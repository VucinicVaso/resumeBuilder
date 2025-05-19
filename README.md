# Portfolio website
Aplikacija za generisanje CV-ja.

# odraditi:
    # (~) za restApi:
        # (+) registration: user registration/login
        # (+) user:         update (profile, password, avatar), delete, getAll, getById,
        # (+) education:    create, update, delete, getAll, getOneById
        # (+) experience:   create, update, delete, getAll, getOneById
        # (+) skills:       create, update, delete, getAll, getOneById
        # (+) portfolio:    create, update, delete, getAll, getOneById
        # (+) messages:     create, update, delete, getAll, getOneById
        # (?) cv:           create, update, delete, getAll, getOneById
        # (-) cover-letter: upload, download, delete, getAll, getOneById
    # (-) kreirati UI front (user)
    # (-) kreirati UI backend (admin-dashboard)
    # (-) kreirati mobilnu aplikaciju (user)


# create project:
    # npm install -g ts-node                  ( install if not installed )
    # mkdir naziv_projekta                    ( create project folder )
    # cd naziv_projekta                       ( locate folder )
# install js/ts packages in naziv_projekta:
    # npm init                                ( init npm )
    # npm install -D typescript               ( install typescript )
    # npm i ts-node                           ( install typescript execution )
    # npm i express                           ( install express framework )
    # npm i @types/express                    ( install type definition for express )
    # npm i nodemon                           ( install nodemon tools )
    # npm i @types/nodemon                    ( install type definition for nodemon )
    # npm i dotenv                            ( install zero-dependency module that loads environment )
    # npm i jsonwebtoken                      ( install json web token package )
    # npm i @types/jsonwebtoken               ( install type definition for json webtoken )
    # npm i mongoose                          ( install mongoose (MongoDB) orm )
    # npm i joi                               ( install json validation package )
    # npm i bcryptjs                          ( install encryption package )
    # npm i -D @types/bcryptjs                ( install type definition for encryption package )
    # npm i morgan                            ( install HTTP logger package )
    # npm i @types/morgan                     ( install type definition for logger package )
    # npm i colors                            ( install colors package for console logs )
    # npm i multer                            ( install package for uploading files )
    # npm i @types/multer                     ( install type definition for multer package )
    # .env                                    ( create .env file for dotenv lib )      


## start project (run project in dev || build mode): 
    # npm run dev                  ( start server from src )
    # rs                           ( restart typescript server )
    # npm run build                ( build js project from typescript project )
    # npm run start                ( start js app server from dist )


# Project contains three apps:
    # front app    (UI): Prikazuju se podaci: portfolio, skills, education, experience, contact form... 
                         Kreirati pomocu HTML5, CSS3, Tailwind-a, React.js... 
                         Potrebno je kreirati vise UI-a. Svaki put kada korisnik otvori sajt prikazat ce se nasumicni UI,
    # backend app  (UI): Kreirati sa Flutter-om || React.js-om, 
                         Dizajn kao admin dashboard. 
                         Preko dashboard-a vrsit ce se CRUD za: portfolio, skills, education, experience, messages, kreiranje cv-a, cover letter-a....
    # rest api    (api): Kreiran u Express.js-u (Typescript, MongoDB (Mongoose), ...). 
                         Rest api za front (user), backend (admin) aplikacije i mobilne aplikacije
