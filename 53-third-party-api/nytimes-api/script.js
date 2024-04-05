// Defining a baseURL and key to as part of the request URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = '2n6DiDyNRRL1gLVvak75ldwlPIAYMXXj';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

// Event listeners to control the functionality
searchForm.addEventListener("submit", submitSearch);

function submitSearch(e) {
  pageNumber = 0;
  fetchResults(e);
}

function fetchResults(e){
    e.preventDefault();
    let url = `${baseURL}?api-key=${key}&fq=document_type:("article")&q=${searchTerm.value}&page=${pageNumber}`;

    if(startDate.value){
        url += `&begin_date=${startDate.value}`;
    }

    if(endDate.value){
        url += `&end_date=${endDate.value}`;
    }

    // Use fetch() to make the request to the API
    fetch(url)
        .then((response) => response.json())
        .then((json) => displayResults(json))
        .catch((error) => console.error(`Error fetching data: ${error.message}`));
}

function displayResults(data){
    section.replaceChildren();
    const articles = data.response.docs;

    nav.style.display = articles.length === 10 ? "block" : "none";
    if (articles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No results returned.";
        section.appendChild(para);
    } else {
        for (const current of articles) {
            const article = document.createElement("article");
            const heading = document.createElement("h2");
            const link = document.createElement("a");
            const img = document.createElement("img");
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");
            const para1 = document.createElement("p");
            const keywordPara = document.createElement("p");
            keywordPara.classList.add("keywords");

            console.log(current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para1.textContent = current.snippet;
            keywordPara.textContent = "Keywords: ";
            for (const keyword of current.keywords) {
                const span = document.createElement("span");
                span.textContent = `${keyword.value} `;
                keywordPara.appendChild(span);
            }

            article.appendChild(heading);
            heading.appendChild(link);

            if (current.multimedia.length > 0) {
                img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
                img.alt = current.headline.main;
                article.appendChild(imgContainer);
                imgContainer.appendChild(img);
            }
            article.appendChild(para1);
            article.appendChild(keywordPara);
            section.appendChild(article);
        }
    }

}

nextBtn.addEventListener("click", (e) => {
    pageNumber++;
    fetchResults(e);
});
previousBtn.addEventListener("click", (e) => {
    if (pageNumber > 0){
        pageNumber--;
        fetchResults(e);
    }
    
});
