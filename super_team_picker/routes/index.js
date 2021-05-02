const express = require('express');
const db = require('../db/client');

const router = express.Router();
const cohortsRouter = require('./cohorts');

router.get('/', (request, response) => {
    response.redirect('cohorts');
});


// router.get('/', (request, response, next) => {
//     db.select('*').from('cohorts').orderBy('create_at', 'DESC') // might be orderByf
//         .then(cohorts => {
//             response.render('./cohorts/index', {cohorts})
//         })
//         .catch(err => {
//             next(err)
//         })
// });

module.exports = router;



