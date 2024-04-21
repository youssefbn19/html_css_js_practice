const section = document.querySelector("section");
const videos = [
  { 'name' : 'crystal' },
  { 'name' : 'elf' },
  { 'name' : 'frog' },
  { 'name' : 'monster' },
  { 'name' : 'pig' },
  { 'name' : 'rabbit' }
];

let db;
const request = window.indexedDB.open("video_db", 1);

request.addEventListener("error", () => console.error('Database failed to open'));
request.addEventListener("success", (e) => {
    console.log('Database opened successfully');
    db = e.target.result;
    initial();
});
request.addEventListener("upgradeneeded", (e) => {
    console.log('Database setup complete');

    db = e.target.result;
    const objectStore = db.createObjectStore("video_os", {keyPath: "name"});
    objectStore.createIndex("mp4", "mp4", {unique: false});
    objectStore.createIndex("webm", "webm", {unique: false});
});

function initial(){
    const videoStore = db.transaction("video_os").objectStore("video_os");
    for (const video of videos) {
        const request = videoStore.get(video.name);
        request.addEventListener("success", (e)=>{
            const data = e.target.result;
            if (data){
                displayVideo(data.name, data.mp4, data.webm);
            } else {
                fetchVideoFromNetwork(video);
            }
        })
    }
}
function fetchVideoFromNetwork(video){
    const mp4Blob = fetch(`./videos/${video.name}.mp4`).then(response => response.blob());
    const webmBlob = fetch(`./videos/${video.name}.webm`).then(response => response.blob());

    Promise.all([mp4Blob, webmBlob]).then(values => {
        displayVideo(video.name, values[0], values[1]);
        storeVideo(video.name, values[0], values[1]);
    });
}

function displayVideo(name, mp4, webm){
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const video = document.createElement("video");
    const mp4Source = document.createElement("source");
    const webmSource = document.createElement("source");

    const mp4Url = URL.createObjectURL(mp4);
    const webmUrl = URL.createObjectURL(webm);

    h2.textContent = name;
    
    video.setAttribute("controls", true);
    
    mp4Source.setAttribute('src', mp4Url);
    mp4Source.setAttribute('type', "video/mp4");

    webmSource.setAttribute('src', webmUrl);
    webmSource.setAttribute('type', "video/webm");

    article.appendChild(h2);
    article.appendChild(video);
    
    video.appendChild(mp4Source);
    video.appendChild(webmSource);

    section.appendChild(article)
}

function storeVideo(name, mp4, webm){
    const request = db.transaction("video_os", "readwrite").objectStore("video_os");
    const addToCache = request.add({name, mp4, webm});

    addToCache.addEventListener('success', ()=>{
        console.log("New video has been added successfully");
    });
    addToCache.addEventListener('error', ()=>{
        console.log("Oops! we couldn't add the video to the cache");
    });
}