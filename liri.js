// require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable
// var spotify = new Spotify(keys.spotify);

// axios & OMDB
var axios = require("axios");
var movieName = process.argv.slice(3).join(" ");
var omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
// For command movie-this '<movie name here>'
if (process.argv[2] === "movie-this" && movieName) {
    axios.get(omdbQueryUrl)
  .then(function (response) {
      console.log(JSON.stringify(response.data.Title, null, 2),
      JSON.stringify(response.data.Year, null, 2),
      JSON.stringify(response.data.Ratings[0].Value, null, 2),
      JSON.stringify(response.data.Ratings[1].Value, null, 2),
      JSON.stringify(response.data.Country, null, 2),
      JSON.stringify(response.data.Language, null, 2),
      JSON.stringify(response.data.Plot, null, 2),
      JSON.stringify(response.data.Actors, null, 2))
  })
  .catch(function (error) {
    console.log(error);
  });
} else if (process.argv[2] === "movie-this" && movieName === "") {
omdbQueryUrl = `http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy`;
axios.get(omdbQueryUrl)
.then(function (response) {
    console.log(JSON.stringify(response.data.Title, null, 2),
    JSON.stringify(response.data.Year, null, 2),
    JSON.stringify(response.data.Ratings[0].Value, null, 2),
    JSON.stringify(response.data.Ratings[1].Value, null, 2),
    JSON.stringify(response.data.Country, null, 2),
    JSON.stringify(response.data.Language, null, 2),
    JSON.stringify(response.data.Plot, null, 2),
    JSON.stringify(response.data.Actors, null, 2))
})
.catch(function (error) {
  console.log(error);
});
}
// respond with the following information in the terminal:
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// If user doesn't choose movie name give results for Mr. Nobody

// axios & Bands In Town & moment
// For the commandconcert-this '<artist name here>'
// respond with the following information in the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// Node-Spotify-API
// For the command spotify-this-song '<song name here>'
// respond with the following information in the terminal:
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If user doesn't choose song name give results for "The Sign" by Ace of Base

// fs node package
// For the command do-what-it-says the result should be:
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

// BONUS: log each of the commands made in the terminal to the log.txt file (append)
// If all works save and write markup with video etc to github and try to incorporate 
// inquirer to get the users input
