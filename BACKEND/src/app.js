import express from "express";

// Sécurité
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Routes
import categoryRoutes from "./routes/category.routes.js";
import montreRoutes from "./routes/montre.routes.js";
import userRoutes from "./routes/auth.routes.js";
import commandesRouter from "./routes/commande.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Gestion des erreurs
const app = express();
app.use(helmet());
app.use(
  cors({
    // origin: "http://localhost:5173", 
    // origin: "https://darrigade.alwaysdata.net",
    origin: ["http://localhost:5173", "https://cheerful-pika-4908ba.netlify.app"],
    credentials: true,
  }),
);
app.use(cookieParser());

// On bloque 15 minutes si des gens envoie des choses sans requête ( idéal contre la force brute)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

// On limite les requêtes en json pour éviter d'avoir des fuites
app.use(express.json({ limit: "10kb" }));

// Utilisation des routes
app.use("/api/categories", categoryRoutes);
app.use("/api/montres", montreRoutes);
app.use("/api/users", userRoutes);
app.use("/api/commandes", commandesRouter);

app.use((req, res) => {
  res.status(404).json({ error: `page non trouvée` });
});

app.use(errorHandler);

export default app;
