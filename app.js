const express = require("express");
const mongoose = require("./mongo");  // Assurez-vous que la connexion MongoDB est bien établie
const cors = require("cors");
const multipart = require('connect-multiparty');
const uploadMiddleware = multipart({ uploadDir: './uploads' });
const certificateController = require("./controllers/certificate.controller.js");
const skillsController = require("./controllers/skills.controller");
const userController = require("./controllers/user.controller");
const authController = require('./controllers/auth.controller');
const { authMiddleware } = require('./middlewares/auth');
const quizController = require("./controllers/quiz.controller");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route GET pour la page d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API !");
});

// Routes pour les compétences
app.get("/skills", skillsController.getAll);
app.post("/skills", skillsController.create);
app.put("/skills/:id", skillsController.update);
app.delete("/skills/:id", skillsController.remove);

// Routes utilisateurs
app.get('/users', userController.getAll);
app.post('/create_user', uploadMiddleware, userController.create);
app.put('/users/:id', [authMiddleware, uploadMiddleware],userController.update);
app.delete('/users/:id', userController.remove);
app.put('/users/:id', userController.approveUser);

// Routes authentification
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
// app.post("/generate-certificate",authMiddleware, certificateController.generate);

app.get("/certificate/:id",certificateController.generate);


app.get("/quiz", quizController.getAll);




app.post("/quiz/submit", quizController.submitQuiz);
// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error("Erreur:", err);
    if (err.response) {
        res.status(err.response.status || 500).json({
            message: err.response.data?.message || "Erreur serveur. Veuillez réessayer plus tard."
        });
    } else {
        res.status(500).json({
            message: "Erreur interne du serveur. Veuillez réessayer plus tard."
        });
    }
});




// Démarrage du serveur
app.listen(8000, () => {
    console.log("Serveur démarré sur le port 8000");
});