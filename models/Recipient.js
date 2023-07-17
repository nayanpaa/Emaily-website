const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false}
});

//since this is a subdocument collection we are exporting it
//therefore we don't have to import it to index
module.exports = recipientSchema;