const colorbtn= document.querySelector("#colorpicker");
const colorList=document.querySelector(".allcolor");
const clearColor= document.querySelector(".clear");
const pickedColor=JSON.parse(localStorage.getItem("picked-color") || "[]");


const copyColor=ele=>{
    navigation.clipboard.writeText(ele.dataset.color);
    ele.innerText="Copied";
    setTimeout(()=>ele.innerText=ele.dataset.color,1000);
};
const showColor=()=>{
    colorList.innerHTML=pickedColor.map(color=>`
        <li class="color">
            <span class="rect" style="background:${color}; border:1px solid ${color=="#ffffff" ? "#ccc":color}"></span>
            <span class="value">${color}</span>
        </li>
    `).join("");
    document.querySelectorAll(".color").forEach(li=>{
        li.addEventListener("click",e=>copyColor(e.currentTarget.lastElementChild))
    });
}
showColor();

const addeyedrop= async() => {
    try{
        const eyeDropper= new EyeDropper();
        const {sRGBHex}= await eyeDropper.open();
        console.log(sRGBHex)
        navigator.clipboard.writeText(sRGBHex);
        if(!pickedColor.includes(sRGBHex)){
            pickedColor.push(sRGBHex);
            localStorage.setItem("picked-color",JSON.stringify(pickedColor));
            showColor();
        }
        
    }
    catch(error){
        console.log(error);
    }
}
const clearallcolor=()=>{
    pickedColor.length=0;
    localStorage.setItem("picked-color",JSON.stringify(pickedColor));
}
clearColor.addEventListener("click",clearallcolor);
colorbtn.addEventListener("click",addeyedrop);