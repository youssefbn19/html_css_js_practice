const form = document.querySelector("form");

const nameContainer = document.querySelector(".remember")
const nameValue = document.querySelector("#entername")
const submit = document.querySelector("#submitname");

const forgetContainer = document.querySelector(".forget");
const forgetName = document.querySelector("#forgetname");

const greetings = document.querySelector(".personal-greeting");
const header = document.querySelector('h1');

form.addEventListener('submit', (e) => e.preventDefault());

submit.addEventListener('click', ()=>{
    localStorage.setItem('name', nameValue.value);
    displayName();
});

forgetName.addEventListener('click', ()=>{
    localStorage.removeItem('name');
    displayName();
})
function displayName() {
    let name = localStorage.getItem('name');
    if (name) {
        forgetContainer.style.display = "block";
        nameContainer.style.display = "none";
        greetings.textContent = `Welcome to our website, ${name}!. We hope you have fun while you are here.`;
        header.textContent = `Welcome, ${name}.`;
    } else{
        forgetContainer.style.display = "none";
        nameContainer.style.display = "block";
        greetings.textContent = `Welcome to our website. We hope you have fun while you are here.`;
        header.textContent = `Welcome to our website.`;
    }
}
displayName();