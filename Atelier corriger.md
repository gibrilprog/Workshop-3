# Workshop 3 - Express & TypeScript - Corrige

Version formateur avec les corrections.

Ne pas donner ce fichier aux eleves pendant l'atelier. La version eleve est le fichier `atelier`.

Le but est de comprendre le trajet d'une requete :

```txt
client -> route Express -> donnees -> reponse JSON
```

Vous allez completer une API de livres.

---

## Express en quelques mots

Express est un petit framework Node.js qui permet de creer un serveur web et de definir des routes.

Une route, c'est une combinaison entre :

- une methode HTTP, par exemple `GET`, `POST` ou `DELETE`
- une URL, par exemple `/books` ou `/books/2`
- une fonction qui recoit la requete et renvoie une reponse

Dans Express, on utilise souvent :

- `req` pour lire ce que le client envoie : parametres, query, body
- `res` pour renvoyer une reponse au client
- `res.json(...)` pour renvoyer du JSON
- `res.status(...)` pour choisir le code HTTP

TypeScript ajoute du typage par-dessus JavaScript. Ici, il sert surtout a rendre le code plus clair et a eviter certaines erreurs avant meme de lancer le serveur.

---

## Objectifs

A la fin de l'atelier, vous saurez :

- lancer un projet Express en TypeScript
- lire une route Express
- renvoyer du JSON
- utiliser un parametre d'URL
- lire un body JSON
- ajouter, chercher et supprimer une donnee en memoire

---

## Timing pour les différents exercices

```txt
00-05 min  Installation et lancement
05-12 min  Exercice 1 - Afficher tous les livres
12-22 min  Exercice 2 - Trouver un livre par id
22-32 min  Exercice 3 - Ajouter un livre
32-40 min  Exercice 4 - Rechercher par titre
40-45 min  Exercice 5 - Supprimer un livre
```

Ne restez pas bloques trop longtemps. Si une route ne marche pas, regardez avec votre voisin ou appelez nous.

---

## Pour Bien Commencer

Le projet est deja configure. Certaines routes renvoient temporairement :

```json
{
  "message": "Exercice ... à compléter"
}
```

C'est normal.

Votre mission est de remplacer les zones `_________` dans :

```txt
Pour Bien Commencer/src/routes/books.routes.ts
```

Les donnees sont stockees en memoire dans un tableau. Si vous redemarrez le serveur, les ajouts et suppressions sont perdus. C'est normal aussi.

### Fichiers concernes pendant l'atelier

| Fichier | Position | A quoi il sert |
| --- | --- | --- |
| `books.routes.ts` | `Pour Bien Commencer/src/routes/books.routes.ts` | Fichier principal a modifier. Tous les trous `_________` sont ici. |
| `books.ts` | `Pour Bien Commencer/src/data/books.ts` | Contient le tableau `books`, utilise par toutes les routes. |
| `book.ts` | `Pour Bien Commencer/src/types/book.ts` | Contient le type TypeScript d'un livre. |
| `server.ts` | `Pour Bien Commencer/src/server.ts` | Lance Express et branche les routes `/books`. |
| `package.json` | `Pour Bien Commencer/package.json` | Contient les commandes `npm install`, `npm run dev`, `npm run build`. |

Pendant les exercices, vous modifiez uniquement :

```txt
Pour Bien Commencer/src/routes/books.routes.ts
```

### Fichiers qui doivent etre presents avant de commencer le workshop

- `Atelier corriger`
- `atelier`
- `Pour Bien Commencer/.gitignore`
- `Pour Bien Commencer/package.json`
- `Pour Bien Commencer/package-lock.json`
- `Pour Bien Commencer/tsconfig.json`
- `Pour Bien Commencer/src/server.ts`
- `Pour Bien Commencer/src/types/book.ts`
- `Pour Bien Commencer/src/data/books.ts`
- `Pour Bien Commencer/src/routes/books.routes.ts`

Les dossiers suivants ne sont pas a fournir :

- `Pour Bien Commencer/node_modules/`, genere par `npm install`
- `Pour Bien Commencer/dist/`, genere par `npm run build`

Il ne doit pas y avoir de dossier `node_modules/` ou `dist/` a la racine de l'atelier. Ces dossiers sont generes uniquement dans `Pour Bien Commencer/` quand vous lancez les commandes.

---

## Structure du projet

```txt
.
├── Atelier corriger
├── atelier
└── Pour Bien Commencer/
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── data/
        │   └── books.ts
        ├── routes/
        │   └── books.routes.ts
        ├── types/
        │   └── book.ts
        └── server.ts
```

Ce que chaque fichier fait :

- `Pour Bien Commencer/src/server.ts` lance le serveur Express
- `Pour Bien Commencer/src/routes/books.routes.ts` contient les routes a completer
- `Pour Bien Commencer/src/data/books.ts` contient le tableau de livres
- `Pour Bien Commencer/src/types/book.ts` contient le type TypeScript d'un livre

---

## Installation

Depuis le dossier ou se trouve `atelier`, entrez dans le starter :

```bash
cd "Pour Bien Commencer"
```

Installez les dependances :

```bash
npm install
```

Puis lancez le serveur :

```bash
npm run dev
```

Le serveur demarre ici :

```txt
http://127.0.0.1:3000
```

Pour verifier que le serveur repond :

```bash
curl -s http://127.0.0.1:3000/
```

Vous devriez recevoir une reponse JSON.

Si vous voulez seulement verifier que TypeScript compile :

```bash
npm run build
```

Pour lancer la version compilee :

```bash
npm start
```

---

## Tester pendant l'atelier

Vous pouvez utiliser Bruno, Postman, votre navigateur, ou `curl`.

Liste des livres :

```bash
curl -s http://127.0.0.1:3000/books
```

Un livre par id :

```bash
curl -s http://127.0.0.1:3000/books/2
```

Recherche :

```bash
curl -s "http://127.0.0.1:3000/books?search=harry"
```

Ajouter un livre :

```bash
curl -s -X POST http://127.0.0.1:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin"}'
```

Supprimer un livre :

```bash
curl -i -X DELETE http://127.0.0.1:3000/books/1
```

Bonus :

```bash
curl -s http://127.0.0.1:3000/books/count
```

---

# Exercice 1 - Afficher tous les livres

Objectif : quand on appelle `GET /books`, l'API retourne tous les livres.

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.get("/")`.

Completez :

```ts
router.get("/", (req, res) => {

    _________

});
```

Resultat attendu :

```txt
GET /books
```

```json
[
  {
    "id": "1",
    "title": "Harry Potter",
    "author": "J.K. Rowling"
  }
]
```

Indice : Express sait renvoyer du JSON avec `res.json(...)`.

Correction :

```ts
router.get("/", (_req, res) => {
  res.json(books);
});
```

---

# Exercice 2 - Rechercher un livre par id

Objectif : quand on appelle `GET /books/2`, l'API retourne le livre qui a l'id `2`.

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.get("/:id")`.

Completez :

```ts
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const book = books.find((book) =>

        _________

    );

    if (!book) {

        return _________;

    }

    _________;

});
```

Resultat attendu :

```txt
GET /books/2
```

```json
{
  "id": "2",
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry"
}
```

Si le livre n'existe pas :

```json
{
  "message": "Book not found"
}
```

avec le code HTTP `404`.

Indices :

- `req.params.id` donne l'id dans l'URL
- `find` retourne le premier element qui correspond
- `res.status(404).json(...)` permet de renvoyer une erreur propre

Correction :

```ts
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  return res.json(book);
});
```

---

# Exercice 3 - Ajouter un livre

Objectif : quand on appelle `POST /books`, l'API ajoute un livre dans le tableau.

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.post("/")`.

Completez :

```ts
router.post("/", (req, res) => {

    const newBook = {

        id: _________,

        _________

    };

    _________;

    _________;

});
```

Requete :

```txt
POST /books
```

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

Resultat attendu :

```json
{
  "id": "...",
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

avec le code HTTP `201`.

Indices :

- les donnees envoyees par le client sont dans `req.body`
- un id peut etre genere simplement avec `Date.now().toString()`
- `books.push(...)` ajoute un element au tableau

Correction :

```ts
router.post("/", (req, res) => {
  const newBook = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author
  };

  books.push(newBook);

  return res.status(201).json(newBook);
});
```

---

# Exercice 4 - Rechercher des livres

Objectif : ajouter une recherche par titre avec `GET /books?search=harry`.

Si aucun mot-cle n'est donne, l'API doit retourner tous les livres.

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.get("/")`, la meme que l'exercice 1.

Completez la route `GET /books` :

```ts
router.get("/", (req, res) => {

    const search = req.query.search
        ?.toString()
        .toLowerCase();

    if (!search) {

        _________

    }

    const filteredBooks = books.filter((book) =>

        _________

    );

    _________;

});
```

Resultat attendu :

```txt
GET /books?search=harry
```

```json
[
  {
    "id": "1",
    "title": "Harry Potter",
    "author": "J.K. Rowling"
  }
]
```

Indices :

- `req.query.search` lit `?search=...`
- `toLowerCase()` evite les problemes de majuscules
- `includes(...)` permet de verifier si un texte contient un mot

Correction :

```ts
router.get("/", (req, res) => {
  const search = req.query.search?.toString().toLowerCase();

  if (!search) {
    return res.json(books);
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search)
  );

  return res.json(filteredBooks);
});
```

---

# Exercice 5 - Supprimer un livre

Objectif : quand on appelle `DELETE /books/1`, l'API supprime le livre qui a l'id `1`.

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.delete("/:id")`.

Completez :

```ts
router.delete("/:id", (req, res) => {

    const index = books.findIndex((book) =>

        _________

    );

    if (index === -1) {

        _________

    }

    _________

    _________

});
```

Resultat attendu :

```txt
DELETE /books/1
```

Retour :

```txt
204 No Content
```

Si le livre n'existe pas :

```json
{
  "message": "Book not found"
}
```

Indices :

- `findIndex` retourne la position de l'element
- si rien n'est trouve, `findIndex` retourne `-1`
- `splice(index, 1)` supprime un element du tableau
- un `204` ne renvoie pas de JSON

Correction :

```ts
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books.splice(index, 1);

  return res.status(204).send();
});
```

---

# Bonus - Compter les livres

Si vous avez termine, ajoutez :

```txt
GET /books/count
```

Fichier concerne : `Pour Bien Commencer/src/routes/books.routes.ts`

Position a retrouver : la route `router.get("/count")`.

Resultat attendu :

```json
{
  "count": 12
}
```

Indice : un tableau a une propriete `length`.

Correction :

```ts
router.get("/count", (_req, res) => {
  return res.json({
    count: books.length
  });
});
```

Attention : la route `/count` doit etre placee avant la route `/:id`, sinon Express risque de comprendre `count` comme un id.

---

## Fin de l'atelier

Quand tout fonctionne, verifiez rapidement :

```bash
npm run build
```

Puis testez au moins :

```bash
curl -s http://127.0.0.1:3000/books
curl -s http://127.0.0.1:3000/books/2
curl -s "http://127.0.0.1:3000/books?search=harry"
```

Si ces trois routes fonctionnent, vous avez compris le coeur de l'atelier.

---

## Annexe formateur - commandes utilisees

Cette partie sert a garder une trace de la mise en place. Elle n'est pas necessaire pour faire l'atelier.

Commandes d'inspection :

```bash
pwd
ls
ls -l
ls -la
ls -la 'Pour Bien Commencer'
git status --short
file atelier
find . -maxdepth 2 -print
find . -maxdepth 3 -print
find . -maxdepth 2 -type d -name dist -o -name node_modules
rg --files
rg --files -g '!node_modules' -g '!dist'
rg --files -g 'README*' -g '!node_modules'
rg -n "src/|package.json|tsconfig|\\.gitignore|npm install|npm run|npm start|Structure du projet|Fichiers" atelier
rg -n "src/|package.json|tsconfig|\\.gitignore|npm install|npm run|npm start|mkdir -p|sed -n|mv |cd \"Pour" atelier
sed -n '1,220p' atelier
sed -n '1,260p' atelier
sed -n '221,440p' atelier
sed -n '35,140p' atelier
sed -n '1,220p' 'Pour Bien Commencer/package.json'
sed -n '1,220p' 'Pour Bien Commencer/src/routes/books.routes.ts'
sed -n '1,220p' 'Pour Bien Commencer/src/data/books.ts'
sed -n '1,180p' 'Pour Bien Commencer/src/server.ts'
sed -n '1,360p' README.md
lsof -nP -iTCP:3000 -sTCP:LISTEN
ps -p 64985 -o pid,ppid,command
du -sh dist node_modules 'Pour Bien Commencer/dist' 'Pour Bien Commencer/node_modules'
```

Commandes de creation, installation et verification :

```bash
mkdir -p src/data src/routes src/types
mv .gitignore package.json package-lock.json tsconfig.json src 'Pour Bien Commencer'/
mv Atelier atelier
cp atelier 'Atelier corriger'
cd "Pour Bien Commencer"
node --version
npm --version
npm install
npm run build
npm run dev
npm start
curl -s http://localhost:3000/
curl -s http://localhost:3000/books
curl -s http://127.0.0.1:3000/
curl -s http://127.0.0.1:3000/books
kill 64985
```

Le PID `64985` correspondait a un ancien serveur local de preparation. Sur une autre machine, le PID sera different.

Commande de nettoyage utilisee a la racine de l'atelier pour supprimer des dossiers generes au mauvais endroit :

```bash
rm -rf dist node_modules
```
