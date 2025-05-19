# Portfolio website
Aplikacija za generisanje CV-ja.


# odraditi:
    # + (odradjeno), - (nije odradjeno), (~) nije zavrseno
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
    # pokreni skriptu install-packages.sh     ( inicijalizacija node.js-a, instalacija paketa, kreiranje .env fajla)


## start project (run project in dev || build mode): 
    # npm run dev                  ( start server from src )
    # rs                           ( restart typescript server )
    # npm run build                ( build js project from typescript project )
    # npm run start                ( start js app server from dist )


# Project contains three apps:
    # front app    (UI): Prikazuju se podaci: portfolio, skills, education, experience, contact form... 
                         Kreirati pomocu HTML5, CSS3, Tailwind-a, React.js... 
                         Potrebno je kreirati vise UI-a. Svaki put kada korisnik otvori sajt prikazat ce se nasumicni UI,
    # backend app  (UI): Admin dashboard. 
                         Preko dashboard-a vrsit ce se CRUD za: portfolio, skills, education, experience, messages, kreiranje cv-a, cover letter-a....
    # rest api    (api): Kreiran u Express.js-u (Typescript, MongoDB (Mongoose), ...). 
                         Rest api za front (user), backend (admin) aplikacije i mobilne aplikacije
