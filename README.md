# liri-node-app
### Overview
LIRI is a **L**anguage **I**nterpretation and **R**ecognition **I**nterface. LIRI a command line node app that takes in parameters and gives you back data. Specifically LIRI is designed to search for songs, concerts and movies.

### How LIRI Works
LIRI uses the following node package managers to process requests:
* DotEnv
  - This protects our API keys
* Node-Spotify-API
  - This package handles our search for song information
* Axios
  - This package handles our calls to both OMDB and Bands In Town APIs
* Moment
  - This package allows us to format time and date
  
### How to use LIRI
liri.js can take in the following commands:
**1. movie-this insert movie name here**
  - This command will use axios to query the OMDB API and return information on the movie that was entered. If you do not enter a movie LIRI will provide you with information for the movie Mr. Nobody.
**2. concert-this insert band/artist name here**
  - This command will use axios to query the Bands In town API and return information on upcoming shows for the artist that was entered. If you do not enter an artist LIRI will prompt you to complete the command. Moment converts the event dates to the MM/DD/YYYY format.
**3. spotify-this-song insert song name here**
  - This command will use Node-Spotify-API to retrieve data on the song that was entered from Spotify. If you do not enter a song name LIRI will return information for the song The Sign by Ace of Base.
**4. do-what-it-says**
  - This command will read from the random.txt file and perform the command that is present in that document.
LIRI logs each valid command entered and the corresponding results in the log.txt file.
