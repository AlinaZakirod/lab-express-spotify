const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');


// require spotify-web-api-node package here:

// Remember to insert your credentials here


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:

const clientId = '0c3b5956d52741caa9b64d9ab58b1dc8',
    clientSecret = '9450b0e6fdb248c4ba6e685e49cf998f';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })




// the routes go here:
app.get('/', (req,res,next) => {
  res.render('index');
})


spotifyApi.searchArtists('/artists', (req, res, next) => {
    Artist.find({ name: req.query.data.body.Artist })
      .then(data => { 
      console.log("The received data from the API: ", data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      })
      .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
})
   




app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
