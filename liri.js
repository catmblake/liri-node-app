// requiring all of the packages needed to run this program
require("dotenv").config();
var keys = require('./keys.js')
var fs = require("fs")
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

// declaring user inputs as global variables
var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

// declaring the function to record user input in the log.txt file
function logCommand() {
  fs.appendFile("log.txt", command + " " + argument + ", ", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("content added");
    }
  })
}
// declaring function for axios movie data retrieval
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
    });
}
function axiosGetConcert() {
  var bandsQueryUrl = `https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`;
  axios.get(bandsQueryUrl)
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        var concertVenue = response.data[i].venue.name;
        var city = response.data[i].venue.city;
        var country = response.data[i].venue.country;
        var date = moment(response.data[i].venue.datetime);
        var dateConverted = moment(date).format("MM/DD/YYYY")
        console.log(`Concert Venue: ${concertVenue},\nLocation: ${city}, ${country}\nEvent Date: ${dateConverted}`);
      };
      logCommand();
    })
    .catch(function (error) {
      console.log(error);
    });
}
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
    });
}

if (command === "movie-this" && argument) {
  axiosGetMovie(argument);
} else if (command === "movie-this" && !argument) {
  axiosGetMovie("Mr Nobody");
}

if (command === "concert-this" && argument) {
  axiosGetConcert();
} else if (command === "concert-this" && !argument) {
  console.log("Please choose an artist");
};

if (command === "spotify-this-song" && argument) {
  spotifyThis(command, argument);
} else if (command === "spotify-this-song" && !argument) {
  spotifyThis(command, "the sign ace of base");
};

if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var inputArr = data.split(",")
    spotifyThis(inputArr[0], inputArr[1]);
  })
};

// BONUS: log each of the commands made in the terminal to the log.txt file (append)
// If all works save and write markup with video etc to github and try to incorporate 
// inquirer to get the users input
