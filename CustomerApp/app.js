var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var app = express();

/*var logger = function(req, res, next) {
	console.log('Logging...');
	next();
	}

app.use(logger); */

//view engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
	
//need a place to put static resources (jquery, css)
//set static path
app.use(express.static(path.join(__dirname, 'public')));
	
var users = [
{
	id: 1,
	first_name: 'John',
	last_name: 'Doe',
	email: 'johndoe@gmail.com'
	
},
{
	id: 2,
	first_name: 'Natalie',
	last_name: 'Wiser',
	email: 'nataliewiser@gmail.com'
	
},
{
	id: 3,
	first_name: 'Jill',
	last_name: 'jackson',
	email: 'jilljackson@gmail.com'
	
},
{
	id: 4,
	first_name: 'Bob',
	last_name: 'Smith',
	email: 'bobsmith@gmail.com'
	
}
]
//we want to handle a get request.
app.get('/', function(req, res){
	var title = 'Customers';
	res.render('index', {
		title: 'Customers',
		users:  users
		});
	});
	
app.post('/users/add', [
	
	check('first_name').exists().withMessage('First name is required'),
	check('last_name').exists().withMessage('Last name is required'),
	check('email').isEmail().withMessage('must be an email') 
	], (req, res, next) => {
	
		var errors = validationResult(req); 
		
		if(!errors.isEmpty()){
			console.log('ERRORS');
		}
		else
		{
			var newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email
			}
			
			console.log('SUCCESS');
			console.log(newUser);
		}
	});

app.listen(3000, function(){
	console.log('Server started on port 3000');
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	