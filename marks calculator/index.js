document.getElementById('CalculateForm').onsubmit=function handelsubmit (e){
    e.preventDefault();
    total();
}
const calculateFormEL=document.getElementById("CalculateForm");
function total(event){
    const maxnum=400
     math = Number(document.getElementById('math').value) || 0;
     science=Number(document.getElementById('science').value) ||0;
     english=Number(document.getElementById('english').value) ||0;
     social=Number(document.getElementById('social').value) ||0;
        total = math+science+english+social;
       
    const percentage= (total/maxnum)*100;
    const resultEL= document.createElement("p");
    resultEL.className="result";
    resultEL.innerText= `You have got ${total} marks out of ${maxnum} and total percentage is ${percentage}`;
    calculateFormEL.after(resultEL);
}
