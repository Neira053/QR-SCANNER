const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close");
copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData){
    infoText.innerText = "Scannng QR Code...";
    //sending post request at qr server api with passing
    // form data as body and getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST' , body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    });
}


fileInp.addEventListener("change", async e => {
    let file = e.target.files[0]; // getting user selecyed file
    if(!file) return;
    let formData = new FormData(); // creating a new formdata object
    formData.append('file', file); //adding selected file to formdata
    fetchRequest(file , formData);
});

copyBtn.addEventListener("click",() => {
    let text= document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));