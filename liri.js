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
function logCommand(param) {
  fs.appendFile("log.txt", param, function (err) {
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
      var title = response.data.Title;
      var year = response.data.Year;
      var imdbRating = response.data.Ratings[0].Value;
      var rotRating = response.data.Ratings[1].Value;
      var country = response.data.Country;
      var language = response.data.Language;
      var plot = response.data.Plot;
      var actors = response.data.Actors;
      var movieInfo = `Title: ${title}\nYear: ${year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rotRating}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}`;
      console.log(movieInfo);
      logCommand(`Command: ${command} ${argument}\nResults:\n${movieInfo}\n`);
    })
    .catch(function (error) {
      console.log(error);
    })
};
// declaring function for axios concert data retrieval from bands in town and display results
function axiosGetConcert(argument) {
  logCommand(`Command: ${command} ${argument}\nResults:\n`);
  var bandsQueryUrl = `https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`;
  axios.get(bandsQueryUrl)
    .then(function (response) {
      console.log(`Upcoming ${argument} shows:`);
      for (var i = 0; i < response.data.length; i++) {
        var concertVenue = response.data[i].venue.name;
        var city = response.data[i].venue.city;
        var region = response.data[i].venue.region;
        var country = response.data[i].venue.country;
        var date = moment(response.data[i].datetime);
        var dateConverted = moment(date).format("MM/DD/YYYY");
        console.log(`${i + 1}. ${concertVenue}, ${city}, ${region}, ${country} on ${dateConverted}`);
        logCommand(`${concertVenue}, ${city}, ${region}, ${country} on ${dateConverted}\n`);
      };
    })
    .catch(function (error) {
      console.log(error);
    })
};
// declaring function for spotify data retrieval and display results
function spotifyThis(argument) {
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: 'track', query: argument, limit: 1 })
    .then(function (response) {
      var artist = response.tracks.items[0].artists[0].name;
      var songName = response.tracks.items[0].name;
      var album = response.tracks.items[0].album.name;
      var songUrl = response.tracks.items[0].external_urls.spotify;
      var spotifyInfo = `Artist: ${artist}\nSong: ${songName}\nAlbum: ${album}\nLink: ${songUrl}`;
      console.log(spotifyInfo);
      logCommand(`Command: ${command} ${argument}\nResults:\n${spotifyInfo}\n`);
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
  logCommand(`Command: ${command}\nPlease choose an artist and try again\n`);
  console.log("Please choose an artist and try again");
};
// setting conditions to run spotify function for the user's selected song or the sign
if (command === "spotify-this-song" && argument) {
  spotifyThis(argument);
} else if (command === "spotify-this-song" && !argument) {
  spotifyThis("the sign ace of base");
};
// setting condition to read random.txt and run the specified command and argument it contains
if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var inputArr = data.split(",");
    if (inputArr[0] === "spotify-this-song") {
      spotifyThis(inputArr[1]);
    } else if (inputArr[0] === "concert-this") {
      axiosGetConcert(inputArr[1]);
    } else if (inputArr[0] === "movie-this") {
      axiosGetMovie(inputArr[1]);
    }
  })
};