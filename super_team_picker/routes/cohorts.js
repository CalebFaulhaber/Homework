const express = require('express');
const db = require('../db/client');

const router = express.Router();

router.get('/', (request, response, next) => {
    db.select('*')
        .from('cohorts')
        .orderBy('created_at', 'DESC')
        .then(cohorts => {
            console.log(`cohorts in routes/cohorts > get "/":${cohorts.toString()}`)
            console.log(`this many cohorts: ${cohorts.length}`)
            response.render('./cohorts/index', { cohorts: cohorts })
        })
        .catch(err => {
            next(err)
        });
});

router.post('/', (request, response) => {
    const { name, members, logoUrl } = request.body
    db.insert({ name, members, logoUrl })
        .into('cohorts')
        .returning('*')
        .then((args) => {
            console.log(request.body);
            response.redirect('/cohorts');
        })
        .catch(err => {
            response.send(err);
        });
});

router.get('/new', (request, response) => {
    console.log('forms page');
    response.render('./cohorts/new');
});

router.get('/:id', (request, response) => {
    console.log('show page');
    const id = request.params['id'];

    db.select('*')
        .from('cohorts')
        .where({ id: id })
        .first()
        .then(cohort => {
            response.render('./cohorts/show', { cohort: cohort })
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', (request, response) => {
    console.log('delete cohort');
    const id = request.params['id'];

    db('cohorts')
        .where({ id: id })
        .del()
        .then(() => {
            console.log('Delete knex search')
            response.redirect('/cohorts');
        })
        .catch((err) => {
            console.log(`Delete, error: \"${err}\"`)
            next(err)
        })
})

router.get('/:id/edit', (request, response) => {
    const id = request.params['id'];

    db('cohorts')
        .where({ id: id })
        .first()
        .then((cohort => {
            console.log(`Edit get, cohort: \"${cohort}`)
            response.render('./cohorts/edit', { cohort: cohort });
        }))
        .catch(err => {
            console.log(`Edit get, error: \"${err}\"`)
            response.send(err);
        });
})

router.put('/:id', (request, response) => {
    // const { name, members, logoUrl, id} = request.body;
    const updateCohorts = {
        logoUrl: request.body.logoUrl,
        name: request.body.name,
        members: request.body.members
    };
    const id = request.params.id;
    console.log(updateCohorts)
    console.log(id)
    db('cohorts')
    .where({ id: id })
    .update(updateCohorts)
    .then(() => {
        console.log(`/:id edit, request.body: \"${request.body}\"`);
        response.redirect(`/cohorts/${id}`)
    })
    .catch(err => {
        console.log(`Edit put, error: \"${err}\"`);
        response.send(err);
    });
});












module.exports = router;


