/*this file is for providing User schema (the structure of data 
that will be fetched or posted to user's query)*/

var mongoose = require('mongoose')

//A schema is a JSON object that defines the the structure and contents of your data.
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var userSchema = new Schema({
    name: {
        type: String,
        require: true //mandatory
    },
    password: {
        type: String,
        require: true //mandatory
    }

})

//encrypting the password and sending to database
//Whenever user tries to save the data we trigger this function
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }

})

//comparing passwords
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err) //callback
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('reg_users', userSchema)