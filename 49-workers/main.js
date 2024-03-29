// Create a new worker, giving it the code in "generate.js"
const worker = new Worker('./generate.js');


const generateBtn = document.querySelector("#generate");
const reloadBtn = document.querySelector("#reload");

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
generateBtn.addEventListener('click', ()=>{
    const quota = document.querySelector("#quota").value;
    worker.postMessage({
        command: "generate",
        quota
    })
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener("message", (msg) => {
    const output = document.querySelector("#output");
    output.textContent = `Finished generating ${msg.data} primes!`;
})

reloadBtn.addEventListener('click', () => {
    const userInput =  document.querySelector("#user-input");

    userInput.value = 'Try typing in here immediately after pressing "Generate primes"';
    document.location.reload();
})