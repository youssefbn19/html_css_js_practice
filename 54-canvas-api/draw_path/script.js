const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "rgb(0 0 0)";

ctx.fillStyle = "rgb(255 0 0)";
ctx.beginPath();

// Drawing a equilateral triangle
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
const triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100, 50 + triHeight);
ctx.lineTo(50, 50);
ctx.fill();

// // Drawing a circles
ctx.moveTo(300, 150);
ctx.arc(300, 150, 100, degToRad(0), degToRad(360), false);
ctx.fill();

// // Drawing  a pacman
ctx.fillStyle = "yellow";
ctx.moveTo(500, 200);
ctx.arc(500, 200, 50, degToRad(-45), degToRad(45), true);
ctx.lineTo(500, 200);
ctx.fill();

// Drawing a text
ctx.lineWidth = 1;
ctx.fillStyle = "rgb(210, 243, 65)";
ctx.font = "48px arial";
ctx.fillText("ChibiTech", 300, 300);

ctx.strokeStyle = "rgb(210, 243, 65)";
ctx.font = "48px georgia";
ctx.strokeText("ChibiTech", 600, 300);
canvas.setAttribute("aria-label", "ChibiTech");
// Drawing an image
const image = new Image();
image.src = "./firefox.png";
image.addEventListener("load", () => ctx.drawImage(image, 600, 300));
canvas.setAttribute("aria-label", "Firefox Logo");


function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}
