const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.use('/node_modules', express.static('node_modules'))



// /////////////////////////
// Design system
// /////////////////////////


// //////////////////////////////
// key versioned pages that need routes to always go to latest version
// //////////////////////////////

// These are needed so 
// - the footer links in the root pages (not in the version folders) like weeknotes and history put peopl in the right place
// - to avoind misteaks in writing links - when doing "/link" or "link" in versioned pages
// It makes he site more robust and less likely to break when changed

// index page is versioned - in folders beta/vx
// Always make default home route go to latest beta version of the design system
router.get('/', function (req, res) {
  res.redirect('/beta/v3/')
})

// advice page is versioned - in folders beta/vx
// Always make default advice route go to latest beta version of the advice page
router.get('/advice', function (req, res) {
  res.redirect('/beta/v3/advice')
})

// accessibilty ststement is versioned - in folders beta/vx
// Always make default advice route go to latest beta version of the advice page
router.get('/accessibility-statement', function (req, res) {
  res.redirect('/beta/v3/accessibility-statement')
})

// ///////////////////////
// end key versioned pages
// ///////////////////////


// weeknotes is not versioned, so lets make it easy for people to... 
// ... do href="weeknotes" from any version, or "/weeknotes" and redirect to static location
router.get('/weeknotes', function (req, res) {
  res.redirect('/beta/weeknotes/weeknotes')
})

router.get('/beta/v*/weeknotes', function (req, res) {
  res.redirect('/beta/weeknotes/weeknotes')
})


// history is not versioned, so lets make it easy for people to... 
// ... do href="history" from any version, or "/history" and redirect to static location
router.get('/history', function (req, res) {
  res.redirect('/beta/history/history')
})

router.get('/beta/v*/history', function (req, res) {
  res.redirect('/beta/history/history')
})




// ///// - this is old stuff, alongside other code not needed here - AP - 25 sept 2020 - all below can go ////////

// /////////////////////////
// three DJP journey
// /////////////////////////


// Set up the data needed for 3 DJP journey
router.get('/three-djp-loop/start-3-djp-journey.html', function (req, res) {
	req.session.data = {}

	req.session.data = {
	  "1":
	    {
	      "title-number": "DN100",
	      "abr": "ABR100",
	      "application-type": "Death of a joint proprietor"
	    },
	  "2":
	    {
	      "title-number": "DN200",
	      "abr": "ABR200",
	      "application-type": "Death of a joint proprietor"
	    },
	  "3": 
	    {
	      "title-number": "DN300",
	      "abr": "ABR300",
	      "application-type": "Death of a joint proprietor"
	    },
	  "current-application" : {},
	  "number-of-applications-available": "3",
	  "current-application-number": "0",
	}

  res.redirect('start-page')
})


// Set up the data needed for the current task
router.get('/three-djp-loop/task-page-data-setup-route.html', function (req, res) {

	// increment which application number we are on
	var applicationNumber = req.session.data['current-application-number']
	applicationNumber++
	req.session.data['current-application-number'] = applicationNumber

	// copy the the current application detials into the object called 'current-application'
	req.session.data['current-application'] = req.session.data[applicationNumber]

  res.redirect('task-page')
})


// /////////////////////////
// form validation example page
// /////////////////////////

router.post('/form-handler', function (req, res) {
  
  // serverside routing logic here

  // redirect to form complete page
	res.redirect('form-submitted')

})


// /////////////////////////
// session data set up / show example
// /////////////////////////

// Passing data into a page
router.get('/stored-data', function (req, res) {
	console.log(req.session.data)
  res.render('stored-data')
})


router.get('/docs/examples/pass-data/vehicle-registration-clean', function (req, res) {
	req.session.data = {}
  res.redirect('vehicle-registration')
})


router.get('/docs/examples/pass-data/vehicle-registration-car1', function (req, res) {
	req.session.data = {
  "vehicle-registration": "test-plate",
  "vehicle-type": "Car",
  "vehicle-features": [
    "Heated seats",
    "Radio"
  ]
}
  res.redirect('vehicle-registration')
})

router.get('/docs/examples/pass-data/vehicle-registration-car2', function (req, res) {
	req.session.data = {
  "vehicle-registration": "BO12 3XX",
  "vehicle-type": "Car",
  "vehicle-features": [
    "Heated seats",
    "GPS",
    "Radio"
  ]
}
  res.redirect('vehicle-registration')
})

router.get('/docs/examples/pass-data/vehicle-registration-lorry1', function (req, res) {
	req.session.data = {
  "vehicle-registration": "LR56 RRY",
  "vehicle-type": "Lorry",
  "vehicle-features": [
    "GPS",
    "Radio"
  ]
}
  res.redirect('vehicle-registration')
})


// //////////////////////////////
// this needs to be the last line in the file
// //////////////////////////////
module.exports = router
