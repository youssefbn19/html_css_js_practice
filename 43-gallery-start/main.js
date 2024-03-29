const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg","pic5.jpg"] 
/* Declaring the alternative text for each image file */
const imagesAlt = ["A human eye", "Rock that looks like a wave", "Puple and white pensies",
                    "Section of wall from a pharoah's tomb", "Large moth on a leaf"];
/* Looping through images */
for (let i = 0; i < images.length; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `./images/${images[i]}`);
    newImage.setAttribute('alt', `${imagesAlt[i]}`);
    thumbBar.appendChild(newImage);
}
const thumbImages = document.querySelectorAll('.thumb-bar img');
for (const img of thumbImages){
    img.addEventListener("click", (e) => {
        displayedImage.setAttribute("src",e.target.src);
        displayedImage.setAttribute("alt",e.target.alt);
    })
}
/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", (e) => {
    if (btn.textContent === "Darken")
    {
        btn.textContent = "Lighten";
        btn.classList.remove();
        btn.classList.add("light");
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        btn.textContent = "Darken";
        btn.classList.remove();
        btn.classList.add("dark");
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
})