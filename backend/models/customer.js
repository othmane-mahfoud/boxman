var mongoose = require('mongoose')
var bcrypt   = require('bcrypt')

var customerSchema = new mongoose.Schema({
    fbId: {
        type: String
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    addresses: [
        {
            type: String
        }
    ],
    role: {
        type: String,
        default: "customer"
    }
})

customerSchema.pre("save", async function(next) {
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

customerSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

var Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer