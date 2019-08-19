/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

require('dotenv').config();

const express = require('express');

const db = require('./data/helpers/actionModel')
const projects = require('./data/helpers/projectModel')

const server = express();

const port = process.env.PORT || 4000;

//middleware
server.use(express.json());

//request handlers
server.get('/', (req,res) => {
    res.send("I'm working!");
})


//actions
server.get('/api/actions', (req, res) => {
    db.get()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The actions information could not be retrieved.'
        })
    })
});

server.post('/api/actions', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the user to the database'
        })
    })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedUser => {
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user could not be removed'
        })
    })
})

server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be modified.'
        })
    })
})



//projects
server.get('/api/projects/:id' , (req, res) => {
    const { id } = req.params;
    projects.getProjectActions(id)
    .then(found => {
        if (found) {
            res.json(found);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be retrieved.'
        })
    })
})

server.get('/api/projects', (req, res) => {
    projects.get()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The projects information could not be retrieved.'
        })
    })
});

server.post('/api/projects', (req, res) => {
    const newUser = req.body;
    projects.insert(newUser)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the user to the database'
        })
    })
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.remove(id)
    .then(deletedUser => {
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user could not be removed'
        })
    })
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    projects.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be modified.'
        })
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});