const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const cohortsRouter = require('./routes/cohorts');

const app = express();

app.set('views');
app.set('view engine', 'ejs');
app.set('public');

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride((request, response) => {
    if(request.body && request.body._method) {
        return request.body._method;
    }
}));



// ==========================
// ↓↓↓↓↓↓↓↓  ROUTES  ↓↓↓↓↓↓↓↓
// ==========================

app.use('/cohorts', cohortsRouter);
app.use('/', indexRouter);

// ==========================
// ↓↓↓↓↓↓↓↓  SERVER  ↓↓↓↓↓↓↓↓
// ==========================

const PORT = 3000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
});

module.exports = app;

