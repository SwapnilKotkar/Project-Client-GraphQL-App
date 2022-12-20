const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.models.CLIENTS || mongoose.model("CLIENTS", clientSchema);