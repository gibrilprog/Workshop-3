import { Response, Router } from "express";
import { books } from "../data/books";

const router = Router();

function todo(res: Response, exercise: string) {
  return res.status(501).json({
    message: `${exercise} à compléter`
  });
}

router.get("/", (req, res) => {
  const search = req.query.search?.toString().toLowerCase();
  void search;

  // Exercice 1 - Afficher tous les livres
  // _________

  // Exercice 4 - Rechercher des livres par titre
  // if (!search) {
  //   _________
  // }
  //
  // const filteredBooks = books.filter((book) =>
  //   _________
  // );
  //
  // _________;

  return todo(res, "Exercice 1 / Exercice 4");
});

router.get("/count", (_req, res) => {
  // Bonus - Retourner le nombre total de livres
  // _________

  return todo(res, "Bonus");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  void id;

  const book = books.find((book) =>
    // Exercice 2 - Remplacer la ligne temporaire par la condition attendue
    // _________
    Boolean(book) && false
  );

  if (!book) {
    // _________
    return todo(res, "Exercice 2");
  }

  // _________;
  return todo(res, "Exercice 2");
});

router.post("/", (req, res) => {
  void req;

  const newBook = {
    // Exercice 3 - Remplacer les valeurs temporaires par les donnees attendues
    id: "TODO",

    // _________
    title: "TODO",
    author: "TODO"
  };
  void newBook;

  // _________;

  // _________;
  return todo(res, "Exercice 3");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  void id;

  const index = books.findIndex((book) =>
    // Exercice 5 - Remplacer la ligne temporaire par la condition attendue
    // _________
    Boolean(book) && false
  );

  if (index === -1) {
    // _________
    return todo(res, "Exercice 5");
  }

  // _________

  // _________
  return todo(res, "Exercice 5");
});

export default router;
