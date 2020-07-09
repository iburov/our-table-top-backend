const router = require("express").Router();
let User = require("../models/user.model");
const paginatedResults = require("../utils/paginatedResults");

router.route("").get(paginatedResults(User), (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.json(res.paginatedResults);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
