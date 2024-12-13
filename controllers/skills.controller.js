const SkillModel = require('../models/skills.model');

// Récupérer toutes les compétences
const getAll = async (req, res) => {
  try {
    const data = await SkillModel.find();
    res.status(200).send(data);
  } catch (err) {
    console.error("Erreur lors de la récupération des compétences:", err);
    res.status(500).send({
      error: "Erreur lors de la récupération des compétences",
      details: err.message,
    });
  }
};

// Créer une nouvelle compétence
const create = async (req, res) => {
  const skill = new SkillModel(req.body);

  try {
    const savedSkill = await skill.save();
    res.status(201).send(savedSkill);
  } catch (err) {
    console.error("Erreur lors de la création de la compétence:", err);
    res.status(400).send({
      error: "Erreur lors de la création de la compétence",
      details: err.message,
    });
  }
};

// Mettre à jour une compétence existante
const update = async (req, res) => {
  try {
    const result = await SkillModel.updateOne({ _id: req.params.id }, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Compétence mise à jour avec succès" });
    } else {
      res.status(404).send({ error: "Compétence non trouvée ou aucune modification" });
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la compétence:", err);
    res.status(400).send({
      error: "Erreur lors de la mise à jour de la compétence",
      details: err.message,
    });
  }
};

// Supprimer une compétence
const remove = async (req, res) => {
  try {
    const result = await SkillModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Compétence supprimée avec succès" });
    } else {
      res.status(404).send({ error: "Compétence non trouvée" });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression de la compétence:", err);
    res.status(400).send({
      error: "Erreur lors de la suppression de la compétence",
      details: err.message,
    });
  }
};

module.exports = { getAll, create, update, remove };
