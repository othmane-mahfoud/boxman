const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Order = require('./order')

const userSchema = new mongoose.Schema({
    fbId: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    // profileImageName: {
    //     type: String,
    //     default: "none"
    // },
    // profileImageData: {
    //     type: Buffer
    // },
    profileImageUrl: {
        type: String
    },
    status: {
        type: String
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

userSchema.pre("save", async function(next) {
    try {
        if(this.password !== ""){
          if (!this.isModified("password")) {
              return next();
          }
          let hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
          return next();
        }
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
