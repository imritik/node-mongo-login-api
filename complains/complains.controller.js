const express = require('express');
const router = express.Router();
// const userService = require('./users/user.service');
// const complainService = require('./complain.service');
const db = require('_helpers/db');
const User = db.User;
const Complain = require('./complain.model');
const complainService = require('./complain.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/insert', insert);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;



function insert(req, res) {
    //lookup campground using id
    User.findById(req.params.id, function(err, complain) {
        if (err) {
            console.log(err);
            // res.redirect("/campgrounds");
        } else {
            //comment create
            Complain.create(req.body, function(err, complain) {
                if (err) {
                    // req.flash("error", "Something went wrong!!");
                    console.log(err);
                    console.log("wrong");
                } else {
                    console.log("inserted");
                    // console.log(req.body);
                    // console.log(req.body['sender']);

                    //add username & id to comment
                    complain.sender.id = req.body.sender._id;
                    complain.sender.username = req.body['sender'];
                    complain.receiver.username = req.body['receiver'];
                    complain.category = req.body['category'];
                    complain.status = req.body['status'];
                    console.log(complain.sender.username);
                    // console.log("inserted1");
                    //save comment
                    complain.save();
                    console.log(complain);
                    console.log("inserted");
                    res.send("hi there");
                    // res.sendStatus(200);
                    // campground.comments.push(comment);
                    // campground.save();
                    // req.flash("success", "Successfully added comment");
                    // res.redirect("/campgrounds/" + campground._id);
                }
            })


        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
};


function getAll(req, res, next) {
    complainService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    complainService.getById(req.body._id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    complainService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    complainService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function destroy(req, res) {
    Complain.findByIdAndRemove(req.params.complain_id, function(err, ) {
        if (err) {
            res.redirect("back");
        } else {
            // req.flash("success", "Comment deleted");
            // res.redirect("/campgrounds/" + req.params.id);
            res.send("complain deleted");
        }
    });
};