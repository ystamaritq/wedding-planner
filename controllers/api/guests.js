const router = require('express').Router();
var db = require('../../models');

// get all guests **
router.get('/', function (req, res) {
  db.Guest.findAll({}).then(function (dbGuests) {
    res.json(dbGuests);
  });
});

// get guest by id **
router.get('/:id', function (req, res) {
  db.Guest.findOne({
    where: {
      id: req.params.id,
    },
  }).then(function (dbGuestById) {
    res.json(dbGuestById);
  });
});

// post a guest **
router.post('/', function (req, res) {
  db.Guest.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }).then(function (dbCreateGuest) {
    res.json(dbCreateGuest);
  });
});

// update guest by id
router.put('/:id', function (req, res) {
  db.Guest.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  ).then(function (dbUpdateGuestById) {
    res.json(dbUpdateGuestById);
  });
});

// delete user by id **
router.delete('/:id', function (req, res) {
  db.Guest.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbGuestDelete) {
    res.json(dbGuestDelete);
  });
});

module.exports = router;
