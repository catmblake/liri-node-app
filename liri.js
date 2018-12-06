require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable
var spotify = new Spotify(keys.spotify);

// axios & OMDB
// For command movie-this '<movie name here>'
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
