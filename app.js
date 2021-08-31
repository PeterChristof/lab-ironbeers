const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //Promises are Javascript Objects that might have or not a value in the near future
  res.render("index");
  });
  //.catch(error=> {
//  console(error);
//  });


//Traditional Way to consume promises
//app.get("/beers", (req, res) => {
 // punkAPI.getBeers().then(beers => {
 //   console.log(beers);
 //   res.render('beers', {beers});
//});
//});

//More modern way to consume promises
app.get("/beers", async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', {beers});
});

app.get("/random-beers", async (req, res) => {
 punkAPI.getRandom().then(response => {
 console.log(response);
 res.render('random-beers', {response});
})
.catch(error => console.log(error));
});

  
app.listen(3000, () => console.log('🏃‍ on port 3000'));
