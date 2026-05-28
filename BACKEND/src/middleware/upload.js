// Gérer l'envoie des médias de façon valide et sécurisée

import multer from "multer"; // Gestion des médias

const storage = multer.diskStorage({}); // Créer un stockage sur le serveur

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Format de l'image invalide", false));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // limiter a 5 méga pour les images
