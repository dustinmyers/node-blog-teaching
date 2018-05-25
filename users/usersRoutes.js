const express = require('express');
const db = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {  // GET all users
  db.get()
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500);
      console.error(err);
    })
});

router.get('/:id', (req, res) => {  // GET user by id
  db.get(req.params.id)
    .then(response => {
      console.log(response);
      if (response) {
        res.json(response);
      } else {
        res.status(400);
        res.json({ error: `No user found with id: ${req.params.id}` });
      }
    })
    .catch(err => {
      res.status(500);
      console.error(err);
    })
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(response => {
      res.send(response);
    }).catch(err => {
    res.status(500);
    console.error(err);
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  const userInformation = req.body;

  db.insert(userInformation)
    .then(response => {
      res.status(201);
      res.json(response);
    }).catch(err => {
      res.status(500);
      console.error(err);
  })
});


router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(response => {
      if (response === 1) {
        db.get(req.params.id).then(updatedUser => {
          res.json(updatedUser);
        })
      } else {
        res.status(500);
        res.json({ error: `user with id ${id} was not updated` });
      }
    }).catch(err => {
      res.status(500);
      console.error(err);
    })
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(response => {
      res.json(response)
    }).catch(err => {
    res.status(500);
    console.error(err);
  });
});


module.exports = router;
