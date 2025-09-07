"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const instance = new mongoose_1.Schema({
    /*
      document ID is set by default via MongoDB - the next line is deprecated!
      _id: mongoose.Schema.Types.ObjectId,
    */
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
});
// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = 'Account';
exports.default = (0, mongoose_1.model)(modelName, instance);
