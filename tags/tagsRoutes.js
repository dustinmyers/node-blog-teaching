const express = require('express');
const db = require('../data/helpers/tagDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

//// GET
router.get('/', (req, res) => {
  db.get()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
});

router.get('/:id/posts', (req, res) => {
  let posts;
  postDb.get()
    .then(foundPosts => {
      posts = foundPosts;
      db.get(req.params.id)
        .then(response => {
          res.json(posts.filter(v => v.text.includes(response.tag)));
        })
        .catch(err => {
          res.status(500).json({ error: err });
          console.error(err);
        });
    });
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(tags => {
      if (tags.length === 0) {
        res.status(404).json({ message: 'tag not found' });
      } else {
        res.json(tags[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
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
        db.get(id).then(tags => {
          res.status(200).json(tags[0]);
        });
      } else {
        res.status(404).json({ msg: 'tag not found' });
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