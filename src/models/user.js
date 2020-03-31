const mongoose = require('mongoose'),
    bcrypt = require('mongoose-bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        trim: true,
        index: true,
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    email: {
        trim: true,
        index: true,
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        bcrypt: true,
        required: true,
    },
    firstname: {
        type: String,
        lowercase: true,
    },
    lastname: {
        type: String,
        lowercase: true,
    },
    sexe: {
        type: String,
        default: 'Homme',
        enum: ['Homme', 'Femme']
    },
    avatar: {
        trim: true,
        default: '',
        type: String,
    },
    active: {
        default: true,
        type: Boolean,
    }
}, {
    collection: 'users'
});

UserSchema.plugin(bcrypt);

UserSchema.index({
    email: 1,
    username: 1,
})

module.exports = exports = mongoose.model('Users', UserSchema);