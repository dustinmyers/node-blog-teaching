const express = require('express');
const db = require('../data/helpers/postDb');

const router = express.Router();

//// GET
router.get('/', (req, res) => {
  db.get()
    .then(response => {
      if (req.query.userId) {
        console.log(response.filter(v => v.userId === parseInt(req.query.userId)));
        res.json(response.filter(v => v.userId === parseInt(req.query.userId)));
      } else {
        res.json(response);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: 'post not found' });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
});

router.get('/:id/tags', (req, res) => {
  db.getPostTags(req.params.id)
    .then(response => {
      res.send(response);
    }).catch(err => {
    res.status(500);
    console.error(err);
  })
});


//// POST
router.post('/', (req, res) => {
  const userInformation = req.body;

  db
    .insert(userInformation)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.json({ error: err });
      console.log(err);
    });
});

//// PUT
router.put('/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(posts => {
          res.status(200).json(posts[0]);
        });
      } else {
        res.status(404).json({ msg: 'post not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
      console.error(err);
    });
});

//// DELETE
router.delete('/', function(req, res) {
  const { id } = req.query;
  let user;
  db.get(id)
    .then(foundUser => {
      user = { ...foundUser[0] };

      db.remove(id).then(() => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
});

module.exports = router;
