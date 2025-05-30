# Portfolio website


## About:
Aplikacija za generisanje CV-ja.

### rest api (backend app): Kreiran u Express.js-u (Typescript, MongoDB (Mongoose), ...). 
    '''
    Rest api za front (user / admin) web i mobilne aplikacije
    '''
### frontend applications
    - user-frontend app:
        https://github.com/VucinicVaso/resumeBuilderUser
        '''
        Prikazuju se podaci: portfolio, skills, education, experience, contact form... 
        Kreiran pomocu HTML5, CSS3, Bootstrap-a, React.js... 
        Potrebno je kreirati vise UI-a. 
        Svaki put kada korisnik otvori sajt prikazat ce se nasumicni UI,
        '''
    - admin-frontend app: Admin dashboard. 
        '''
        Kreirati pomocu HTML5, CSS3, Bootstrap-a, React.js... 
        Preko dashboard-a vrsit ce se CRUD za: portfolio, skills, education, experience,        messages, kreiranje cv-a, cover letter-a....
        '''


## HOW-TO: 
    # pokreni skriptu install-packages.sh ( inicijalizacija node.js-a, instalacija paketa, kreiranje .env fajla)
    # npm run dev                         ( start server from src )
    # rs                                  ( restart typescript server )
    # npm run build                       ( build js project from typescript project )
    # npm run start                       ( start js app server from dist )


## TO-DO:
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


