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
app.get('/home', (req,res,next) => {
  res.render('index');
})

app.get('/artists' , (req, res, next) => {
  //console.log('This is the name' , req.query)

  spotifyApi.searchArtists(req.query.artist)
  .then(data => {
   // console.log(data.body.artists.items);
    res.render('artists', {data: data.body.artists.items})
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
})

app.get('/albums/:id', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.id)
  .then(data => {
    console.log("album id is:", data.body.items[0].id)
    res.render('albums', {albums: data.body.items})
  })
  .catch(err =>{
    console.log("The error while searching albums occurred: ", err);
  })
})

app.get('/tracks/:albumId', (req, res, next) => {
  
  spotifyApi
  .getAlbumTracks(req.params.albumId)
  .then(data => {
    console.log("show me tracks: ", data.body)
    res.render('tracks', {tracks: data.body.items})
  })
  .catch(err => console.log("error displaying tracks", err))
})


// app.get('/home' , (req, res, next) => {
//   console.log('This is the name' , req.query)
//   spotifyApi.searchArtists(req.query.artist)

//   .then(data => {
//     console.log("The received data from the API: ", data);
//     res.render('artists', {data})
//   })
//   .catch(err => {
//     console.log("The error while searching artists occurred: ", err);
//   })
// })



app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
