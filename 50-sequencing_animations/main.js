const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' },
];
const aliceTumblingBack = [
    { transform: 'rotate(360deg) scale(0)' },
    { transform: 'rotate(0) scale(1)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");
//  Using callback hell
// console.log(alice1.animate(aliceTumbling, aliceTiming))
// function animation(alice, callback) {
//     const animate = alice.animate(aliceTumbling, aliceTiming);
//     animate.onfinish = () => {callback()};
// }
// animation(alice1, () => {
//     animation(alice2, () => {
//         animation(alice3, () =>{
//             return;
//         })
//     })
// });
// Using Promise Chaining
// const animation =  alice1.animate(aliceTumbling, aliceTiming).finished;
// animation.then(() => {
//     return alice2.animate(aliceTumbling, aliceTiming).finished;
// }).then(() => alice3.animate(aliceTumbling, aliceTiming).finished);

// Using async and await
// async function animation(){
//     while (true){
//         await alice1.animate(aliceTumbling, aliceTiming).finished;
//         await alice2.animate(aliceTumbling, aliceTiming).finished;
//         await alice3.animate(aliceTumbling, aliceTiming).finished;
//         await alice3.animate(aliceTumblingBack, aliceTiming).finished;
//         await alice2.animate(aliceTumblingBack, aliceTiming).finished;
//         await alice1.animate(aliceTumblingBack, aliceTiming).finished;
//     }

// }
// animation();