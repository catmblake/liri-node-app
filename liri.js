// requiring all of the packages needed to run this program
require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

// declaring user inputs as global variables
var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

// declaring function to record user input in the log.txt file
function logCommand() {
  fs.appendFile("log.txt", command + " " + argument + "\n ", function (err) {
    if (err) {
      console.log(err);
    }
  })
};
// declaring function for axios movie data retrieval from omdb and display results
function axiosGetMovie(argument) {
  var omdbQueryUrl = `http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`;
  axios.get(omdbQueryUrl)
    .then(function (response) {
      var title = JSON.stringify(response.data.Title, null, 2);
      var year = JSON.stringify(response.data.Year, null, 2);
      var imdbRating = JSON.stringify(response.data.Ratings[0].Value, null, 2);
      var rotRating = JSON.stringify(response.data.Ratings[1].Value, null, 2);
      var country = JSON.stringify(response.data.Country, null, 2);
      var language = JSON.stringify(response.data.Language, null, 2);
      var plot = JSON.stringify(response.data.Plot, null, 2);
      var actors = JSON.stringify(response.data.Actors, null, 2);
      console.log(`Title: ${title}\nYear: ${year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rotRating}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}`);
      logCommand();
    })
    .catch(function (error) {
      console.log(error);
    })
};
// declaring function for axios concert data retrieval from bands in town and display results
function axiosGetConcert(argument) {
  var bandsQueryUrl = `https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`;
  axios.get(bandsQueryUrl)
    .then(function (response) {
      console.log(`Upcoming ${argument} shows:`);
      for (var i = 0; i < response.data.length; i++) {
        var concertVenue = response.data[i].venue.name;
        var city = response.data[i].venue.city;
        var region = response.data[i].venue.region;
        var country = response.data[i].venue.country;
        var date = moment(response.data[i].venue.datetime);
        var dateConverted = moment(date).format("MM/DD/YYYY")
        console.log(`${i+1}. ${concertVenue}, ${city}, ${region}, ${country} on ${dateConverted}`);
      };
      logCommand();
    })
    .catch(function (error) {
      console.log(error);
    })
};
// declaring function for spotify data retrieval and display results
function spotifyThis(command, argument) {
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: 'track', query: argument, limit: 1 })
    .then(function (response) {
      var artist = response.tracks.items[0].artists[0].name;
      var songName = response.tracks.items[0].name;
      var album = response.tracks.items[0].album.name;
      var songUrl = response.tracks.items[0].external_urls.spotify;
      console.log(`Artist: ${artist}\nSong: ${songName}\nAlbum: ${album}\nLink: ${songUrl}`);
      logCommand();
    })
    .catch(function (err) {
      console.log(err);
    })
};
// setting conditions to run get movie function for the user's selected movie or Mr. Nobody
if (command === "movie-this" && argument) {
  axiosGetMovie(argument);
} else if (command === "movie-this" && !argument) {
  axiosGetMovie("Mr Nobody");
};
// setting conditions to run get concert function for the user's selected artist
if (command === "concert-this" && argument) {
  axiosGetConcert(argument);
} else if (command === "concert-this" && !argument) {
  console.log("Please choose an artist");
};
// setting conditions to run spotify function for the user's selected song or the sign
if (command === "spotify-this-song" && argument) {
  spotifyThis(command, argument);
} else if (command === "spotify-this-song" && !argument) {
  spotifyThis(command, "the sign ace of base");
};
// setting condition read random.txt and run the specified command and argument it contains
if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var inputArr = data.split(",");
    if (inputArr[0] === "spotify-this-song") {
    spotifyThis(inputArr[0], inputArr[1]);
    } else if (inputArr[0] === "concert-this") {
      axiosGetConcert(inputArr[1]);
    } else if (inputArr[0] === "movie-this") {
      axiosGetMovie(inputArr[1]);
    }
  })
};