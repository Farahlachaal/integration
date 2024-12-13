const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  
  },
  password: {
    type: String,
    required: true,
   
  }, approved: {
    type: Boolean,
    default: false,
  }
  // role: {
  //   type: String,
  //   enum: ["admin", "user"], // Seuls ces deux rôles sont acceptés
  //   default: "user", // Par défaut, l'utilisateur est un utilisateur standard
  // },
});

module.exports = mongoose.model("User", userSchema);
