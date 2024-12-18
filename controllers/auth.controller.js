const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Charge les variables d'environnement depuis .env

// Fonction d'inscription
const register = async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ message: 'Email et mot de passe sont requis' });
    }
  
    try {
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).send({ message: 'Utilisateur déjà existant' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
  
      res.status(201).send({ message: 'Compte créé, en attente d\'approbation par l\'administrateur' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
  };
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ message: 'Email et mot de passe requis' });
    }
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(401).send({ message: 'Identifiants invalides' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Mot de passe incorrect' });
      }
  
      // Vérification si l'utilisateur est un administrateur
      if (user.role === 'admin') {
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.SECRET,
          { expiresIn: '1h' }
        );
  
        return res.status(200).send({ token, user });
      }
  
      // Vérification de l'approbation pour les utilisateurs normaux
      if (!user.approved) {
        return res.status(403).send({ message: 'Compte non approuvé par l\'administrateur' });
      }
  
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).send({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
  };
  
  
module.exports = {login, register} ;