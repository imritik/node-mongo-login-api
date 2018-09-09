const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Complain = require('./complain.model');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ipec:ipec2018@ds249092.mlab.com:49092/ipec";

// const 

// router.post("/campgrounds/:id/comments", middleware.isLoggedIn,
// async function insert(req, res) {
//     //lookup campground using id
//     User.findById(req.params.id, function(err, complain) {
//         if (err) {
//             console.log(err);
//             // res.redirect("/campgrounds");
//         } else {
//             //comment create
//             Complain.create(req.body.complain, function(err, complain) {
//                 if (err) {
//                     // req.flash("error", "Something went wrong!!");
//                     console.log(err);
//                 } else {
//                     //add username & id to comment
//                     complain.sender.id = req.user._id;
//                     complain.sender.username = req.user.username;
//                     //save comment
//                     complain.save();
//                     // campground.comments.push(comment);
//                     // campground.save();
//                     // req.flash("success", "Successfully added comment");
//                     // res.redirect("/campgrounds/" + campground._id);
//                 }
//             })


//         }
//     });
//     //create new comment
//     //connect new comment to campground
//     //redirect campground show page
// };
module.exports = {
    destroy,
    getAll,
    getById,
    update
};


//COMMENT DESTROY ROUTE
// router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, 

async function destroy(req, res) {
    Complain.findByIdAndRemove(req.params.complain_id, function(err, ) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            // res.redirect("/campgrounds/" + req.params.id);
        }
    });
};
async function getAll() {
    return await Complain.find();
}
async function getById(id) {
    return await Complain.findById(id).select('-hash');
}

async function update(id, userParam) {
    const complain = await Complain.find({ "category": "physical2" });


    // validate
    if (!complain) throw 'complain not found';
    // if (complain.sender !== userParam.sender && await Complain.findOne({ username: userParam.sender })) {
    //     throw 'Complain "' + userParam.sender + '" cannot be edited';
    // }

    // // hash password if it was entered
    // if (userParam.password) {
    //     userParam.hash = bcrypt.hashSync(userParam.password, 10);
    // }
    console.log(complain);


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ipec");
        var myquery = { category: id };
        console.log(id);
        var newvalues = { $set: { status: "Seen" } };
        dbo.collection("complains").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });

    });



    // complain.update({ "category": id }, {
    //         $set: {
    //             status: "Seen"
    //         }
    //     })
    //     // complain.update({ _id: id }, {
    //     //     $set: {
    //     //         "status": "Seen"
    //     //     }
    //     // })
    // complain.save();
    // console.log(complain);

    // // copy userParam properties to user
    // // Object.assign(complain, userParam);


    // // console.log("23");

}