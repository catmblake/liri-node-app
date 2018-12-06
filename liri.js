require("dotenv").config();
var keys = require('./keys.js')
var fs = require("fs")
// Add the code required to import the keys.js file and store it in a variable
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
// axios & OMDB
var movieName = process.argv.slice(3).join(" ");
var omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
// For command movie-this '<movie name here>'
var command = process.argv[2];
if (command === "movie-this" && movieName) {
    axios.get(omdbQueryUrl)
  .then(function (response) {
    movieThisResults(response);
  })
  .catch(function (error) {
    console.log(error);
  });
} else if (command === "movie-this" && movieName === "") {
omdbQueryUrl = `http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy`;
axios.get(omdbQueryUrl)
.then(function (response) {
    movieThisResults(response);
})
.catch(function (error) {
  console.log(error);
});
}
function movieThisResults(response){
    var title = JSON.stringify(response.data.Title, null, 2);
      var year = JSON.stringify(response.data.Year, null, 2);
      var imdbRating = JSON.stringify(response.data.Ratings[0].Value, null, 2);
      var rotRating = JSON.stringify(response.data.Ratings[1].Value, null, 2);
      var country = JSON.stringify(response.data.Country, null, 2);
      var language = JSON.stringify(response.data.Language, null, 2);
      var plot = JSON.stringify(response.data.Plot, null, 2);
      var actors = JSON.stringify(response.data.Actors, null, 2);
      console.log(`Title: ${title}\nYear: ${year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rotRating}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}`);
      fs.appendFile("log.txt", command + " " + movieName +", ", function(err){
        if (err) {
          console.log(err);
        }
        else {
          console.log("content added");
        }
      })
    };
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
var band = process.argv.slice(3).join(" ");
var bandsQueryUrl = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;
// For the command concert-this '<artist name here>'
if (command === "concert-this" && band) {
    axios.get(bandsQueryUrl)
  .then(function (response) {
      for (var i=0; i <response.data.length ; i++){
      var concertVenue = response.data[i].venue.name;
      var city = response.data[i].venue.city;
      var country = response.data[i].venue.country;
      var date = moment(response.data[i].venue.datetime);
      var dateConverted = moment(date).format("MM/DD/YYYY")
        // console.log(date);
    console.log(`Concert Venue: ${concertVenue},\n Location: ${city}, ${country}\n Event Date: ${dateConverted}`);
  };
})
  .catch(function (error) {
    console.log(error);
  });
} else if (command === "concert-this" && band === "") {
  console.log("Please choose an artist");
};

// respond with the following information in the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// Node-Spotify-API
var spotify = new Spotify(keys.spotify);
var song = process.argv.slice(3).join(" ");
if (command === "spotify-this-song" && song) {
spotify
  .search({ type: 'track', query: song, limit: 1 })
  .then(function(response) {
    spotifyThisResults(response);
  })
  .catch(function(err) {
    console.log(err);
  });
} else if (command === "spotify-this-song" && song === "") {
  spotify
  .search({ type: 'track', query: "the sign ace of base", limit: 1 })
  .then(function(response) {
    spotifyThisResults(response);
  })
  .catch(function(err) {
    console.log(err);
  });
};
function spotifyThisResults(response){
  var artist = response.tracks.items[0].artists[0].name;
  var songName = response.tracks.items[0].name;
  var album = response.tracks.items[0].album.name;
  var songUrl = response.tracks.items[0].external_urls.spotify;
  console.log(`Artist: ${artist}\nSong: ${songName}\nAlbum: ${album}\nLink: ${songUrl}`);
}
// For the command spotify-this-song '<song name here>'
// respond with the following information in the terminal:
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If user doesn't choose song name give results for "The Sign" by Ace of Base

if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
var inputArr = data.split(",")
console.log(inputArr); 
command = inputArr[0];
var argument = inputArr[1];
console.log(command + " " + argument);
  })
};
// fs node package
// For the command do-what-it-says the result should be:
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

// BONUS: log each of the commands made in the terminal to the log.txt file (append)
// If all works save and write markup with video etc to github and try to incorporate 
// inquirer to get the users input
