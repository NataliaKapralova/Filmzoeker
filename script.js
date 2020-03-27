const nav = document.getElementById("nav");

const addToNavigation = () => {
  const type = "radio";
  const name = "film-filter";
  const movieTypes = {
    "princess-films": "Princess",
    "x-men-films": "X-Men",
    "avenger-films": "Avenger",
    "batman-films": "Batman",
    "latest-films": "Latest Movies"
  };

  for (id in movieTypes) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("id", id);
    input.setAttribute("value", id);
    div.appendChild(input);
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerHTML = movieTypes[id];
    div.appendChild(label);
    nav.appendChild(div);
  }
};

const addEventListeners = () => {
  const radioButtons = document
    .getElementById("nav")
    .getElementsByTagName("input");
  for (radioButton of radioButtons) {
    radioButton.addEventListener("change", handleOnChangeEvent);
  }
};

const addMoviesToDom = movies => {
  const ul = document.getElementById("list");

  const listItems = movies.map(movie => {
    const img = document.createElement("img");
    img.src = movie.Poster;

    const a = document.createElement("a");
    a.setAttribute("href", makeIMDBLink(movie.imdbID));

    const li = document.createElement("li");
    li.appendChild(a);
    a.appendChild(img);
    removeMoviesFromDom(ul);

    return li;
  });

 listItems.forEach(li => ul.appendChild(li));
};

const removeMoviesFromDom = ul => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const moviesList = () => {
  return data.Movies;
};

const handleOnChangeEvent = event => {
  const movieType = event.target.value;
  switch (movieType) {
    case "princess-films":
      filterMovies("Princess");
      break;
    case "x-men-films":
      filterMovies("X-Men");
      break;
    case "avenger-films":
      filterMovies("Avenger");
      break;
    case "batman-films":
      filterMovies("Batman");
      break;
    case "latest-films":
    default:
      latestMovies();
      break;
  }
};

const makeIMDBLink = id => {
  return `https://www.imdb.com/title/${id}`;
};

const filterMovies = wordInMovieTitle => {
  addMoviesToDom(
  moviesList().filter(movie => movie.Title.includes(wordInMovieTitle))
  );
};

const latestMovies = () => {
  addMoviesToDom(moviesList().filter(movie => (movie.Year) >= 2014));
};

addToNavigation();

addMoviesToDom(moviesList());

addEventListeners();
