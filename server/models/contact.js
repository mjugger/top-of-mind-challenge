const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  email: String,
  type: String,
  address: String,
  number: String,
  numbertype: String,
  leadscore: String,
  yearsknown: String,
  relation: String
});
Contact = Mongoose.model('Contact', contactSchema);
module.exports = Contact;
