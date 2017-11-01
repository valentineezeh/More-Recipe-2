// Import dependencies

import express from 'express';
import path from 'path';
import logger from 'morgan'
import bodyParser from 'body-parser';
import validator from 'express-validator';


// import routes
import api from './routes/api';

// create express app
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use('/api/v1', api);

app.use('/*', (req, res) => {
		res.end('Home page');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
});

// error handler
app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req
				.app
				.get('env') === 'development'
				? err
				: {};

		// render the error page
		res.status(err.status || 500);
		res.send('error');
});

export default app;
