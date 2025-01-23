let isDOBopen=false;
let dateofBirth;
const settingiconEL= document.getElementById("setting");
const settingcontentEL= document.getElementById("setting-content");
const initialtextEL=document.getElementById("initialtext");
const timertextEL=document.getElementById("timertext");
const dobButtonEL=document.getElementById("dobButton");
const dobInputEL=document.getElementById("dobInput");
const yearEL=document.getElementById("year");
const monthEL=document.getElementById("month");
const daysEL=document.getElementById("days");
const hourEL=document.getElementById("hour");
const minutesEL=document.getElementById("minutes");
const secondEL=document.getElementById("second");

const makeTwoDigitNumber=(number)=>{
    return number>9?number:`0${number}`;
};

const toggleDateOfBirthSeclator= () =>{
    if(isDOBopen)
    {
        settingcontentEL.classList.add('hide');
    }
    else{
        settingcontentEL.classList.remove('hide');
    }
    isDOBopen= !isDOBopen;
    console.log("Toggle",isDOBopen);
};
const updateAge= () =>{
    const currentdate= new Date();
    const dateDiff=currentdate-dateofBirth;
    const year=Math.floor(dateDiff/(1000*60*60*24*365));
    const month=Math.floor((dateDiff/(1000*60*60*24*365))%12);
    const day=Math.floor(dateDiff/(1000*60*60*24))%30;
    const hour=Math.floor(dateDiff/(1000*60*60))%24;
    const minutes=Math.floor(dateDiff/(1000*60))%60;
    const second=Math.floor(dateDiff/(1000))%60;
    yearEL.innerHTML=makeTwoDigitNumber(year);
    monthEL.innerHTML=makeTwoDigitNumber(month);
    daysEL.innerHTML=makeTwoDigitNumber(day);
    hourEL.innerHTML=makeTwoDigitNumber(hour);
    minutesEL.innerHTML=makeTwoDigitNumber(minutes);
    secondEL.innerHTML=makeTwoDigitNumber(second);
    };

const localStorageGetter= () => {
    const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    const date=localStorage.getItem("date");

    if(year && month && date)
    {
        dateofBirth=new Date(year,month,date);
    }
    updateAge();
};

const contentToggler = () =>{
    updateAge();
    if(dateofBirth)
        {
            initialtextEL.classList.add("hide");
            timertextEL.classList.remove("hide");
            // updateAge();
            setInterval(() => updateAge(),1000);
        }
        else{
            timertextEL.classList.add("hide");
            initialtextEL.classList.remove("hide");
        }
};
    
const setDOBHandler= () =>{
    const dateString=dobInputEL.value;

    dateofBirth= dateString ? new Date(dateString) : null;
    if(dateofBirth)
    {
        localStorage.setItem("year",dateofBirth.getFullYear());
        localStorage.setItem("month",dateofBirth.getMonth());
        localStorage.setItem("date",dateofBirth.getDate());
        
        // updateAge();
       
    }
   
    contentToggler();
    setInterval(() => updateAge(),1000);
    
};

localStorageGetter();
contentToggler();                                               
settingiconEL.addEventListener("click",toggleDateOfBirthSeclator);
dobButtonEL.addEventListener("click",setDOBHandler);