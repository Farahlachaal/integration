const CertificateModel = require("../models/Certificate.js");
const QuizModel = require("../models/Quiz.js");

const mongoose = require('mongoose');



// const getQuiz = async (req, res) => {
//     const { quizId } = req.params;
//     try {
//       const quiz = await Quiz.findById(quizId); // ou la méthode utilisée pour récupérer le quiz
//       if (!quiz) {
//         return res.status(404).json({ message: "Quiz non trouvé" });
//       }
//       res.status(200).json(quiz);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du quiz :", error);
//       res.status(500).json({ message: "Erreur serveur" });
//     }
//   };
  

  
  const getAll = async (req, res) => {
    try {
      const data = await QuizModel.find();
      res.status(200).send(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des compétences:", err);
      res.status(500).send({
        error: "Erreur lors de la récupération des compétences",
        details: err.message,
      });
    }
  };
  


  const submitQuiz = async (req, res) => {
    try {
      const { studentId, quizId, answers } = req.body;
  
      // Validation de studentId et quizId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).send({ message: "ID étudiant invalide." });
      }
      if (!mongoose.Types.ObjectId.isValid(quizId)) {
        return res.status(400).send({ message: "ID du quiz invalide." });
      }
  
      // Récupérer le quiz
      const quiz = await QuizModel.findById(quizId);
      if (!quiz) {
        return res.status(404).send({ message: "Quiz introuvable." });
      }
  
      // Calcul du score
      let score = 0;
      quiz.questions.forEach((q, index) => {
        if (answers[index] && q.correctAnswer === answers[index]) {
          score += 1;
        }
      });
  
      const percentage = (score / quiz.questions.length) * 100;
  
      // Génération du certificat
      if (percentage >= quiz.passingScore) {
        const certificate = new CertificateModel({
          
        
          studentId,
          quizId,
          score: percentage,
          date: new Date(),
        });
        await certificate.save();
        return res.status(201).send({
          message: "Quiz réussi ! Certificat généré.",
          
          certificate,
          score,
          percentage,
        });
      }
  
      // Réponse pour un score insuffisant
      res.status(200).send({
        message: "Quiz terminé. Score insuffisant pour obtenir un certificat.",
        score,
        percentage,
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du quiz :", error);
      res.status(500).send({
        message: "Erreur serveur.",
        error: error.message,
      });
    }
  };

module.exports = {  submitQuiz,getAll };