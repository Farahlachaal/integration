import React, { useState, useEffect } from "react";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editSkill, setEditSkill] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer les compétences
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/skills");
      setSkills(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des compétences", err);
      setError("Erreur lors de la récupération des compétences.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Ajouter une compétence
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/skills", {
        name: newSkill,
      });
      setSkills([...skills, response.data]);
      setNewSkill("");
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la création de la compétence", err);
      setError("Erreur lors de la création de la compétence.");
      setLoading(false);
    }
  };

  // Mettre à jour une compétence
  // Mettre à jour une compétence
const handleUpdateSkill = async (e) => {
    e.preventDefault();
    if (!editSkill) return;
  
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8000/skills/${editSkill._id}`,
        { name: editSkill.name }
      );
  
      // Recharge les compétences après une mise à jour réussie
      fetchSkills();
      setEditSkill(null);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la compétence", err);
      setError("Erreur lors de la mise à jour de la compétence.");
      setLoading(false);
    }
  };
  
  // Supprimer une compétence
  const handleDeleteSkill = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la suppression de la compétence", err);
      setError("Erreur lors de la suppression de la compétence.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Gestion des cours</h1>

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-6 shadow-md">
          <strong>Erreur : </strong> {error}
        </div>
      )}

      <form
        onSubmit={handleAddSkill}
        className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg mb-8"
      >
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Ajouter une nouvelle compétence"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition"
        >
          Ajouter
        </button>
      </form>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Liste des cours</h2>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <span className="text-lg font-medium">{skill.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => setEditSkill(skill)}
                className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editSkill && (
        <form onSubmit={handleUpdateSkill} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Modifier cours</h3>
          <input
            type="text"
            value={editSkill.name}
            onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Mettre à jour
            </button>
            <button
              type="button"
              onClick={() => setEditSkill(null)}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Skills;
