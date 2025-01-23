const qrformEL=document.getElementById("qrForm");
const imgEL=document.getElementById("img-section");
const qrsectionEL=document.getElementById("qr-section");
const inputTextEL=document.getElementById("input-text");
const generateBtnEl=document.getElementById("submit-btn");
const render=(url)=>{
if(!url) return;
generateBtnEl.innerText="Generating QR Code ...";

imgEL.src=url;
const onImageload=()=>{
    const interval=setInterval(()=>{
        qrsectionEL.classList.add("show");
        clearInterval(interval);
        generateBtnEl.innerText="Generate QR Code";
    },500);
};
imgEL.addEventListener("load",onImageload);

};
qrformEL.addEventListener("submit",(event) =>{
    event.preventDefault();

    const formData= new FormData(qrformEL);
    const text = formData.get("qrtext");
    const qrcodeUrl= `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
    render(qrcodeUrl);
});

inputTextEL.addEventListener("keyup",()=>{
if(!inputTextEL.value.trim())
{
    qrsectionEL.classList.remove("show");
}
});