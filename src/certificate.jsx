import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CertificateComponent = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/certificate/${id}`);
        console.log("Certificat récupéré :", response.data);

        if (response?.data) {
          setCertificate(response.data);
        } else {
          setError("Aucune donnée trouvée pour cet ID.");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Erreur lors de la récupération du certificat."
        );
        console.error("Erreur :", error);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleDownload = async () => {
    const certificateElement = document.getElementById("certificate-content");

    if (!certificateElement) return;

    const canvas = await html2canvas(certificateElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 270);
    pdf.save("certificat.pdf");
  };

  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;
  if (!certificate) return <p>Chargement du certificat...</p>;

  return (
    <div style={styles.container}>
      {/* Section principale avec le certificat */}
      <div style={styles.certificate} id="certificate-content">
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Certificat d'achèvement</h1>
          <p style={styles.subtitle}>
            Ce certificat est délivré à l'étudiant suivant pour ses performances exceptionnelles
          </p>
        </div>

        <div style={styles.content}>
          <p style={styles.studentInfo}>
            <strong>Étudiant ID : </strong>{certificate.studentId}
          </p>
          <p style={styles.score}>
            <strong>Score : </strong>{certificate.score}%
          </p>
          <p style={styles.date}>
            <strong>Date : </strong>{new Date(certificate.date).toLocaleDateString()}
          </p>
        </div>

        <div style={styles.signatureContainer}>
          <div style={styles.signatureLine}></div>
          <p style={styles.signatureText}>Signature autorisée</p>
        </div>
      </div>

      {/* Bouton Télécharger centré en dessous */}
      <div style={styles.buttonContainer}>
        <button style={styles.downloadButton} onClick={handleDownload}>
          Télécharger le certificat
        </button>
      </div>
    </div>
  );
};

export default CertificateComponent;

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Times New Roman", Times, serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e6f7ff',
  },
  certificate: {
    width: '700px',
    padding: '20px',
    border: '5px solid #333',
    borderRadius: '10px',
    boxShadow: '4px 4px 8px rgba(0,0,0,0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '10px',
  },
  title: {
    fontSize: '32px',
    margin: '5px 0',
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
  },
  content: {
    margin: '20px 0',
    lineHeight: '1.8',
  },
  studentInfo: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  score: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  date: {
    fontSize: '16px',
    color: '#555',
  },
  signatureContainer: {
    marginTop: '50px',
    padding: '10px',
  },
  signatureLine: {
    borderTop: '2px solid #333',
    width: '250px',
    margin: '0 auto',
    marginBottom: '5px',
  },
  signatureText: {
    fontSize: '14px',
    color: '#555',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
  },
};
