import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Récupération de la liste des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`http://localhost:8000/users/${id}`, newData);
      alert("Utilisateur mis à jour avec succès !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      alert("Utilisateur supprimé avec succès !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const token = localStorage.getItem('token'); 

  const handleApprove = async (id, approved) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/${id}`,
        { approved },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      alert(approved ? "Utilisateur approuvé !" : "Utilisateur non approuvé.");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'approbation", error);
    }
  };
  

  return (
    <div className="container">
      {/* CSS directement inclus */}
      <style>{`
        .container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 10px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .table th,
        .table td {
          padding: 10px;
          text-align: center;
        }

        .table th {
          background-color: #4caf50;
          color: white;
        }

        .table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .table tr:hover {
          background-color: #ddd;
        }

        .button {
          padding: 5px 10px;
          margin: 5px;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 5px;
        }

        .button.approve {
          background-color: 
          
          
          #4caf50;
        }

        .button.deny {
          background-color: #f44336;
        }

        .button.edit {
          background-color: #2196f3;
        }

        .button.delete {
          background-color: #f44336;
        }
      `}</style>

      <h1>Gestion des Utilisateurs</h1>
      <table className="table">
        <thead>
          <tr>
        
            <th>Email</th>
            <th>Approuvé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                {user.approved ? (
                  <span style={{ color: "green" }}>Oui</span>
                ) : (
                  <span style={{ color: "red" }}>Non</span>
                )}
              </td>
              <td>
                <button
                  className="button approve"
                  onClick={() =>
                    handleApprove(user._id, !user.approved)
                  }
                >
                  {user.approved ? "Désapprouver" : "Approuver"}
                </button>
                {/* <button
                  className="button edit"
                  onClick={() =>
                    handleUpdate(user._id, { name: prompt("Nouveau nom :") })
                  }
                >
                  Modifier
                </button> */}
                <button
                  className="button delete"
                  onClick={() =>
                    handleDelete(user._id)
                  }
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
