#!/bin/bash

# Provjera da li je npm instaliran
if ! command -v npm &> /dev/null
then
    echo "Greška: npm nije pronađen. Instaliraj Node.js i npm pa pokušaj ponovo."
    exit 1
fi

# inicijalizacija novog Node.js projekta
echo "Inicijalizacija novog Node.js projekta"
npm init

# Lista paketa za instalaciju
PAKETI=(
    -D typescript             # ( install typescript )
    ts-node                   # ( install typescript execution )
    express                   # ( install express framework )
    @types/express            # ( install type definition for express )
    nodemon                   # ( install nodemon tools )
    @types/nodemon            # ( install type definition for nodemon )
    dotenv                    # ( install zero-dependency module that loads environment )
    jsonwebtoken              # ( install json web token package )
    @types/jsonwebtoken       # ( install type definition for json webtoken )
    mongoose                  # ( install mongoose (MongoDB) orm )
    joi                       # ( install json validation package )
    bcryptjs                  # ( install encryption package )
    -D @types/bcryptjs        # ( install type definition for encryption package )
    morgan                    # ( install HTTP logger package )
    @types/morgan             # ( install type definition for logger package )
    colors                    # ( install colors package for console logs )
    multer                    # ( install package for uploading files )
    @types/multer             # ( install type definition for multer package )
)

# Instalacija paketa
echo "Instaliram sledeće npm pakete globalno: ${PAKETI[*]}"

for paket in "${PAKETI[@]}"
do
  echo "Instaliram $paket..."
  npm install "$paket"
done

echo "Svi paketi su uspješno instalirani!"

# Kreiranje .env fajl sa sledećim sadržajem
cat <<EOF > .env
NODE_ENV=development
HOST=
PORT=
MONGO_URI=
JWT_SECRET=
EOF

echo ".env fajl je uspješno kreiran."