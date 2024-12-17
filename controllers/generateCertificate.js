// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// // Fonction pour générer le certificat
// const generateCertificate = (studentName, quizTitle, score) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument();
//       const directoryPath = path.join(__dirname, "certificates");

//       // Assurez-vous que le répertoire existe
//       if (!fs.existsSync(directoryPath)) {
//         fs.mkdirSync(directoryPath);
//       }

//       const filePath = `${directoryPath}/${studentName.replace(/ /g, "_")}-${Date.now()}.pdf`;
//       const writeStream = fs.createWriteStream(filePath);

//       doc.pipe(writeStream);

//       // Contenu du certificat
//       doc.fontSize(20).text("Certificat de Réussite", { align: "center" });
//       doc.moveDown();
//       doc.fontSize(14).text(`Félicitations ${studentName}`, { align: "center" });
//       doc.text(`Vous avez complété avec succès le quiz : ${quizTitle}`, { align: "center" });
//       doc.text(`Votre score : ${score}%`, { align: "center" });
//       doc.moveDown();
//       doc.text("Ce certificat est délivré en reconnaissance de vos efforts.", { align: "center" });

//       // Finaliser le PDF
//       doc.end();

//       writeStream.on("finish", () => resolve(filePath));
//       writeStream.on("error", (error) => reject(error));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // Exemple : Utiliser la fonction pour tester
// generateCertificate("Jean Dupont", "Quiz Angular", 85)
//   .then((path) => console.log("Certificat généré :", path))
//   .catch((error) => console.error("Erreur lors de la génération du certificat", error));
