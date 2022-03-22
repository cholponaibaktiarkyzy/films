const baseURL = "https://api.tvmaze.com";

const xhr = new XMLHttpRequest();
const changeState = (msg) => {
    let divState = document.querySelector('.readyState')
    divState.innerText = msg
    console.log(msg)
}
xhr.onreadystatechange = (progress) => {
    if (xhr.readyState === 1) {
        changeState('Request Opened')
    } else if (xhr.readyState === 2) {
        changeState('Request Send')
    } else if (xhr.readyState === 3) {
        changeState('Loading')
    } else if (xhr.readyState === 4) {
        changeState('Done ' + progress.target.status)
    }

}
xhr.open('GET', `${baseURL}/shows?page=2`);
xhr.send();
xhr.onload = (response) => {
    const films = JSON.parse(response.target.response);
    showFilms(films)
}

function showFilms(films) {
    const moviesContainer = document.querySelector('#movies');
    films.forEach((film) => {
        moviesContainer.innerHTML +=`
         <div class="col">
            <div class="card h-100">
                <img width="50px" height="250px" src=${film.image.medium} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><a  href=${film.url} target="_blank" style="color:green;text-decoration: none">${film.name}</a></h5>
                    <p class="card-text">${film.summary.length > 80 ? film.summary.substring(0,80)+"..." : film.summary }</p>
                </div>
            </div>
        </div>`
    })

}

