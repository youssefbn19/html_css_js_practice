const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "rgb(0 0 0)";

ctx.translate(width / 2, height / 2);
const img = new Image();
img.src = "./walk-right.png";
img.onload = draw;

let sprite = 0;
let posX = 0;

function draw() {
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
    ctx.drawImage(img, sprite * 102, 0, 102, 148, 0 + posX, -74, 102, 148);
    if (posX % 13 === 0) {
        if (sprite === 5) {
            sprite = 0;
        } else {
            sprite++;
        }
    }
    if (posX > width / 2) {
        let newStartPos = -(width / 2 + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
    } else {
        posX += 2;
    }
    window.requestAnimationFrame(draw);

}
