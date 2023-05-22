const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    name:  { required: true, type: 'string', unique: true},
});

module.exports = mongoose.model('Interest', interestSchema);