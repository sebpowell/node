// Why is the below needed? Can't it come from app.js?
	var express = require('express'),
		router = express.Router(),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'), 
		methodOverride = require('method-override');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
		}
}))

// VPN Index Page – how do I make this the homepage?
router.route('/')
	.get(function(req, res) {
		mongoose.model("vpn").find({}, function (err, vpns) {
			res.format({
				html: function() {
					res.render('vpns/index', {
						"vpns": vpns
					});
				}
			});
		});
	})

	// WHy does POST need to be called at this stage – doesn't work to do router.post
	.post(function(req, res) {
		mongoose.model('vpn').create({
			name: req.body.name,
			price: req.body.price,
			windows: req.body.windows,
			mac: req.body.mac,
			website: "http://" + req.body.website
		}, 

		function (err, vpn) {	
			if (err) {
				res.send("There was a problem adding the information to the database.");
			} 
			else {
				console.log('Added ' + vpn.name + ' to the database');
				res.format({
					html: function(){
						res.location("vpns");
						res.redirect("/vpns");
					},
				});
			}
		})
	});

router.get('/new', function(req, res) {
	res.render('vpns/new');
});


// route middleware to validate :id
router.param('id', function(req, res, next, id) {
		console.log('validating ' + id + ' exists');
		//find the ID in the Database
		mongoose.model('vpn').findById(id, function (vpn) {
			// once validation is done save the new item in the req
			req.id = id;
			// go to the next thing
			next(); 
		});
	});


// Show VPN
router.route('/:id')
	.get(function(req, res) {
		mongoose.model('vpn').findById(req.id, function (err, vpn) {
			console.log('GET Retrieving ID: ' + vpn._id);
			res.format({
				html: function() {
					res.render('vpns/show', {
						"vpn": vpn, 
					});
				}
			});
		});
	});

// Edit VPN
router.route('/:id/edit')
	.get(function(req, res) {
		mongoose.model('vpn').findById(req.id, function (err, vpn) {
			res.format({
				html: function(){
					res.render('vpns/edit', {
						"vpn" : vpn
					});
				}
			});
		});
	});

// Delete VPN
router.delete('/:id/edit', function (req, res){
	mongoose.model('vpn').findById(req.id, function (err, vpn) {
		if (err) {
			return console.error(err);
		}

		else {
			vpn.remove(function (err, vpn) {
					if (err) {
						return console.error(err);
					}

					else {
						console.log('Deleted ' + vpn.name + " from the database");
						res.format({
							html: function(){
								res.redirect("/vpns");
							},
						});
					}
				});
			}
		});
	});

// This bit is needed, but what does it do? 
module.exports = router;