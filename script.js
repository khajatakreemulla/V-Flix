// DOM TARGETING
const home_screen = document.getElementById("home_screen")
const form = document.getElementById("form")
const search = document.getElementById("search")
const tags = document.getElementById("tags")


// #TMDB Api Key
const API_KEY = 'api_key=bcee2dd41d40a05f223caf0c787bcd33';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

// Fecting the Data From TMBD api 
getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            home_screen.innerHTML = `<h1 class="no_result">No Result Found</h1>`
        }
    });
}

//  Showing the Fetch Data on OUr main screen
function showMovies(data) {
    home_screen.innerHTML = "";

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
                            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1000x1500"}" alt="image">
                            <div class="movie_info">
                                <h3>${title}</h3>
                                <span class="${getColor(vote_average)}">${vote_average}</span>
                            </div>
                            <div class="overview" id="overview">
                                <h3>Over View</h3>
                                ${overview}
                            </div>
        `
        home_screen.appendChild(movieEl);
    })
}
// changing the color of rating based on number rating 
function getColor(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

//  Search bar javascript function
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    selectedGenere = [];
    setGenere()
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL)
    }
})
// Getting the genere and updating the data on homescreen
// Generes array
const genere = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

// Defining an empty array to push the id of genere     
var selectedGenere = [];
setGenere()

// function to get and update genere and its data
function setGenere() {
    tags.innerHTML = "";
    genere.forEach(genere => {
        const taggin = document.createElement('div');
        taggin.classList.add('tag');
        taggin.id = genere.id;
        taggin.innerText = genere.name;
        taggin.addEventListener('click', () => {
            if (selectedGenere.length == 0) {
                selectedGenere.push(genere.id)
            } else {
                if (selectedGenere.includes(genere.id)) {
                    selectedGenere.forEach((id, idx) => {
                        if (id == genere.id) {
                            selectedGenere.splice(idx, 1)
                        }
                    })
                } else {
                    selectedGenere.push(genere.id)
                }
            }
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenere.join(",")));
            highlightSelection()
        })
        tags.append(taggin)
    })
}

// Getting the genere and updating the data on homescreen Close

// highlighting seleected generes
function highlightSelection() {
    const tag = document.querySelectorAll(".tag");
    tag.forEach(tag => {
        tag.classList.remove("highlight")
    })
    clearBtn()
    if (selectedGenere.length != 0) {
        selectedGenere.forEach(id => {
            const highlightedtag = document.getElementById(id);
            highlightedtag.classList.add("highlight")
        })
    }
}
// highlighting seleected generes close

// function for clear the selected generes
function clearBtn() {
    let clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.classList.add("highlight")
    } else {
        let clear = document.createElement("div");
        clear.classList.add("tag", "highlight");
        clear.id = "clear";
        clear.innerText = "Clear x"
        clear.addEventListener("click", () => {
            selectedGenere = [];
            setGenere();
            getMovies(API_URL);
        })
        tags.append(clear)
    }

}
