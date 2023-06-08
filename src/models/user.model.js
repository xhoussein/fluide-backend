let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
        email: { type: String, trim: true, lowercase: true },
        password: { type: String, trim: true, private: true },
        isVerified: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);