const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide name']
    },
    address: {
        type: String,
        required: [true, 'Please provide address']
    },
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User',UserSchema);