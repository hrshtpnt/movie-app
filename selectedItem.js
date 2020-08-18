const entryNumber = location.search.substring(1);
const Http = new XMLHttpRequest();
let response = {};
let videoResponse = {};
const apiKey = ""; // add the api key here -- without this key the authentication will not work.
const videoLink =
  "https://api.themoviedb.org/3/movie/" +
  entryNumber +
  "/videos?api_key=" +
  apiKey +
  "&language=en-US";
const url =
  "https://api.themoviedb.org/3/movie/" +
  entryNumber.toString() +
  "?api_key=" +
  apiKey +
  "&language=en-US";
Http.open("GET", url);
Http.send();

let genresArray = [];

Http.onreadystatechange = (e) => {
  response = JSON.parse(Http.responseText);
  if (response.id) {
    document.getElementById("notFound").style.display = "none";
    document.getElementById("movie-box").style.display = "block";
    document.getElementById("original_title").innerHTML =
      response.original_title && response.original_title;
    document.getElementById("overview").innerHTML = response.overview;
    document.getElementById("movieType").innerHTML = response.adult;
    document.getElementById("budget").innerHTML = response.budget;
    document.getElementById("status").innerHTML = response.status;
    document.getElementById("tagline").innerHTML = response.tagline;
    document.getElementById("releaseDate").innerHTML = response.release_date;
    document.getElementById("poster").src =
      "https://image.tmdb.org/t/p/w500" + response.poster_path;
    document.getElementById("homepage").href =
      response.homepage !== "" ? response.homepage : "#";

    // code to get YOUTUBE urls
    Http.open("GET", videoLink, true);
    Http.send();
    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        videoResponse = JSON.parse(Http.responseText);
        videoResponse.results.map((item) => {
          var frameTag = document.createElement("iframe");
          frameTag.id = item.id;
          frameTag.width = "420";
          frameTag.height = "315";
          frameTag.src = "https://www.youtube.com/embed/" + item.key;
          document.getElementById("youtube").appendChild(frameTag);
        });
      }
    };
    //ends here
  } else {
    document.getElementById("movie-box").style.display = "none";
    document.getElementById("notFound").style.display = "block";
    document.getElementById("notFound").innerHTML =
      "Movie Data not found. Please try again later";
  }
};
