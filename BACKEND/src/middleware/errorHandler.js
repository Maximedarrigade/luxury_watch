// Centraliser les erreurs grace au middleware errorHandler

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "zodError") {
    return res
      .status(400)
      .json({ message: "Erreur lors de la validation", details: err.errors });
  }

  res.status(500).json({ error: err.message || "Erreur serveur" });
};
