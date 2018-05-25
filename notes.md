# Node-blog solution
##### Fork and clone
`git clone git@github.com:LambdaSchool/Node-Blog.git` <br /><br />

##### Initialize npm and install dependencies
Run `npm init` <br />
`yarn add *` dependencies <br />
`yarn add --dev *` dev-dependencies <br />
Configure start script <br /> <br />

##### server.js
Import express and start a server using `.listen()`;
Setup third-party middleware <br /> <br />

##### Routes
Create routes directories for users, posts, and tags <br /> <br />

###### usersRoutes.js
Import express <br />
Import db from `'../data/helpers/userDb';` <br />
Create router object using `express.Router()` <br /> <br />


`router.get()`
```js
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

router.get('/:id', (req, res) => { 
  db.get(req.params.id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
      console.error(err);
    });
});
```
<br />

`router.create()`

```js
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
```
<br />

`router.put()`

```js
router.put('/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(users => {
          res.status(200).json(users[0]);
        });
      } else {
        res.status(404).json({ msg: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
      console.error(err);
    });
});
```
<br />

`router.delete()`

```js
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
```

Repeat for `posts` and `tags`. <br /><br />

###### Enhance userRoutes.js
Retrieve a list of posts for a user:
```js
router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(response => {
      res.send(response);
    }).catch(err => {
    res.status(500);
    console.error(err);
  })
});
```
<br /> <br />

###### Enhance postsRoutes.js
Retrieve a list of posts for a user:
```js
router.get('/:id/tags', (req, res) => {
  db.getPostTags(req.params.id)
    .then(response => {
      res.send(response);
    }).catch(err => {
    res.status(500);
    console.error(err);
  })
});
```
<br /> <br />

##### Client application
Use create-react-app to create an application inside the root folder, name it client. <br /> <br />
From root run:  <br />
`npx create-react-app client` <br />
`cd client` <br />
`yarn add axios` <br />
