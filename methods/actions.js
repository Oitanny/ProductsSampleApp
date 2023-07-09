var User = require('../models/user')
var Product = require('../models/product')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    //for adding the user
    addNew: function (req, res) {
        //if fields not filled
        if ((!req.body.name) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
            res.json({ success: false, msg: req.body.name })
            res.json({ success: false, msg: req.body.password })
        }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    // res.json({success:true, msg: 'Successfully saved'})
                    res.redirect('homepage')
                    //res.status(201).render("homepage")
                }
            })
        }
    },

    //authenticating the user
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name //finding match for username
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {

                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },

    //from the recieved authentication token we display user name
    getinfo: function (req, res) {
        /*Bearer Token: A security token with the property that any party in possession of the token 
        (a “bearer”) can use the token in any way that any other party in possession of it can.  */
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1] //gets the token
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'Hello ' + decodedtoken.name })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },
    addProduct: function (req, res) {
        //if fields not filled
        if ((!req.body.ProductID) || (!req.body.Name) || (!req.body.Price)) {
            res.json({ success: false, msg: 'Enter all fields' })
            res.json({ success: false, msg: req.body.Name })
            res.json({ success: false, msg: req.body.ProductID })
            res.json({ success: false, msg: req.body.Price })
        }
        else {
            console.log(req.body);

            var isFeat = req.body.Featured === "true" ? true : false;
            var newProduct = Product({
                ProductID: req.body.ProductID,
                Name: req.body.Name,
                Price: req.body.Price,
                Featured: isFeat,
                Rating: parseFloat(req.body.Rating),
                Company: req.body.Company,
            },
                {
                    timestamps: true
                }
            );
            newUser.save(function (err, newProduct) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save product' })
                }
                else {
                    // res.json({success:true, msg: 'Successfully saved'})
                    res.render(200, 'hompage')
                    //res.status(201).render("homepage")
                }
            })
        }
    },

}
module.exports = functions