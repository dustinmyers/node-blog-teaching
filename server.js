const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRoutes = require('./users/usersRoutes');
const tagsRoutes = require('./tags/tagsRoutes');
const postsRoutes = require('./posts/postsRoutes');

const server = express();

//// MIDDLEWARE
server.use(express.json());
server.use(cors());
server.use(helmet());

//// ROUTES
server.use('/api/users', usersRoutes);
server.use('/api/tags', tagsRoutes);
server.use('/api/posts', postsRoutes);

//// SERVER
const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
