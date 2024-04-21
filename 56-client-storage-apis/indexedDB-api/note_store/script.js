// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');


// Database initial setup
let db;
// Open our database; it is created if it doesn't already exist
const openRequest = window.indexedDB.open("notes_db", 1);

openRequest.addEventListener('error', () => {
    console.error("Couldn't open the database");
});


openRequest.addEventListener('success', (e) => {
    console.log("The database is opened successfully.");
    db = e.target.result;
    displayData();
});

openRequest.addEventListener('upgradeneeded', (e) => {
    console.log('Upgrade database or create object stores for the database');

    db = e.target.result;
    const objectStore = db.createObjectStore("notes_os",{keyPath: "id", autoIncrement: true});
    objectStore.createIndex("title", "title", {unique: false});
    objectStore.createIndex("body", "body", {unique: false});

    displayData();
});

form.addEventListener("submit", addData);

function addData(e) {
    e.preventDefault();

    const newNote = {title: titleInput.value, body: bodyInput.value};
    const transaction = db.transaction("notes_os", "readwrite");
    const notesOS = transaction.objectStore("notes_os");
    const addNewNote = notesOS.add(newNote);

    addNewNote.addEventListener("success", () => {
        titleInput.value = "";
        bodyInput.value = "";
    });

    transaction.addEventListener("complete", () => {
        console.log("Transaction completed: database modification finished.");
        displayData();  
    });

    transaction.addEventListener("error", () => {
        console.log("Transaction not opened due to error."); 
    });
}

function displayData(){
    list.replaceChildren();

    const objectStore = db.transaction("notes_os").objectStore("notes_os");

    objectStore.openCursor().addEventListener('success', (e) => {
        const cursor = e.target.result;

        if (cursor){
            const note = document.createElement("li");
            const title = document.createElement("h3");
            const body = document.createElement("p");
            const deleteBtn = document.createElement("button");

            note.appendChild(title);
            note.appendChild(body);
            note.appendChild(deleteBtn);
            list.appendChild(note);

            title.textContent = cursor.value.title;
            body.textContent = cursor.value.body;
            deleteBtn.textContent = "delete";
            note.setAttribute("note-data-id", cursor.value.id);
            

            deleteBtn.addEventListener("click", deleteNote)

            cursor.continue();
        } else {
            if (!list.hasChildNodes()){
               const note = document.createElement("li");
               note.textContent = "No notes stored";
               list.appendChild(note); 
            }
        }
    });
}

function deleteNote(e){
    const noteID = Number(e.target.parentNode.getAttribute("note-data-id"));
    const transaction = db.transaction("notes_os", "readwrite");
    const objectStore = transaction.objectStore("notes_os");
    objectStore.delete(noteID);

    transaction.addEventListener('complete',() => {
        const note = e.target.parentNode;
        list.removeChild(note);

        if (!list.hasChildNodes()){
            const note = document.createElement("li");
            note.textContent = "No notes stored";
            list.appendChild(note); 
        }
    });
}