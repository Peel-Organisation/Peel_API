const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Interest', interestSchema);