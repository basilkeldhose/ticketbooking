const express = require("express")
var router = express.Router()
var ObjectId = require("mongoose").Types.ObjectId
var { User } = require("../models/user.model")

router.post("/", (req, res) => {
    var user = new User({
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        phone: req.body.phone
    })
    user.save((err, doc) => {
        if (!err) {
            res.send(doc)
            console.log("user data saved")
        }
        else {
            console.log("error to save user" + JSON.stringify(err, undefined, 2))
        }
    })

})


router.get("/", (req, res) => {
    User.find((err, doc) => {
        if (!err) {
            res.send(doc)
            console.log("sucessfully retrive user data")
        }
        else {
            console.log("error to retrive user data" + JSON.stringify(err, undefined, 2))
        }
    })
})
// router.get("/:id",(req,res)=>{
//     if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send("no user record with this userid")
// User.findOne({})(req.params.id, (err, doc) => {
//     if (!err) {
//         res.send(doc)
//     }
//     else {
//         console.log("error in retrive user" + JSON.stringify(err.undefined, 2))
//     }
// })
// })



router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("no user record with this userid")

    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log("error in retrive user" + JSON.stringify(err.undefined, 2))
        }
    })
})



router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("no user record with this userid")
    var user = {
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        phone: req.body.phone
    }
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
            console.log("booking update sucessful")
        }
        else {
            console.log("error in user update" + JSON.stringify(err, undefined, 2))
        }
    })
})




router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("no user record with this userid")

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
            console.log("clancel booking sucessful")
        }
        else {
            console.log("error in user delete" + JSON.stringify(err, undefined, 2))
        }
    })
})

var count=User.count()
router.get("/count",(err,doc)=>{
    if(!err && count<10){
       JSON.parse(res.send(doc))
    }
    else{
        console.log("Booking full")
    }
})
   
 


module.exports = router