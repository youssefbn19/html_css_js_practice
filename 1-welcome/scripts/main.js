// Image Click Event 
const img = document.querySelector('img.img-bg');
const imgSrc1 = "https://images.unsplash.com/photo-1682688759157-57988e10ffa8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const imgAltSrc1 = "a person sitting inside of a tent in the desert"
const imgSrc2 = "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const imgAltSrc2 = "A person in a desert"
img.onclick = () => {
    let src = img.getAttribute("src");
    if (src === imgSrc1)
    {
        img.setAttribute('src', imgSrc2);
        img.setAttribute('alt', imgAltSrc2);
    }
    else
    {
        img.setAttribute('src', imgSrc1);
        img.setAttribute('alt', imgAltSrc1);
    }
}
// End of Image Click Event

// Set User Name
const heading = document.querySelector("span");
const btn_changeName = document.querySelector('button.btn-setName');
function setUserName(){
    const myName = prompt("Please Enter Your Name...");
    if(!myName){
        setUserName();
    }
    localStorage.setItem('name', myName);
    heading.textContent = myName;
}

if (localStorage.getItem('name')){
    heading.textContent = localStorage.getItem('name');
}
else {
    setUserName();
}

btn_changeName.onclick = () =>{
    setUserName();
}