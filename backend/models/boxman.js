var mongoose = require('mongoose')
var bcrypt   = require('bcrypt')


var boxmanSchema = new mongoose.Schema({
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
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "boxman"
    },
    currentLocation: [],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

boxmanSchema.pre("save", async function(next) {
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

boxmanSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

boxmanSchema.index({ currentLocation: "2dsphere" });

var Boxman = mongoose.model('Boxman', boxmanSchema)

module.exports = Boxman