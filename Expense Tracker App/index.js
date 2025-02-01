
// const formEl= document.getElementById("form");
// const textEL= document.getElementById("text");
// const amountEL=document.getElementById("amount");
// const earnEL= document.getElementById("earn-btn");
// const expEL= document.getElementById("exp-btn");
// const final= document.getElementById("balance");
// const credittextEL= document.getElementById("ctext");
// const creditamoEL= document.getElementById("camo");
// const debitTextEL= document.getElementById("dtext");
// const debitAmtEL= document.getElementById("damt");
// const statusEL= document.getElementById("status");

// let finalvalue=parseFloat(localStorage.getItem("balance")) ||0;


// formEl.addEventListener('submit',function(event){
//     event.preventDefault();

//     const formData= new FormData(formEl);
//     const tData={};
//     formData.forEach((value,key)=>{
//         tData[key]=value;
//     });
    
// });


// function updateBalance(){
//     final.innerText=`Rs.${finalvalue}`;
//     localStorage.setItem('balance', finalvalue);
// }

// updateBalance();

// earnEL.addEventListener('click',function(){
//     const amount1= parseFloat(amountEL.value);
//     const type='C';
//     if(!isNaN(amount1) && amount1>0){
//         finalvalue +=amount1;
//         updateBalance();
//         updatecredit(textEL.value,amount1,type);
//         amountEL.value='';
//         textEL.value='';
//     }else {
//         alert('Please enter a valid positive number.');
//     }
// });

// expEL.addEventListener('click',function(){
//     const amount1= parseFloat(amountEL.value);
//     if(!isNaN(amount1) && amount1>0){
//         finalvalue -=amount1;
//         updateBalance();
//         updatedebit();
//         amountEL.value='';
//         textEL.value='';
//     }else {
//         alert('Please enter a valid positive number.');
//     }

// });

// function updatecredit(){
//     credittextEL.innerText=`${textEL.value}`;
//     creditamoEL.innerText=`+ Rs.${amount1}`;
//     statusEL.innerHTML=`${type}`;
    
// }

// function updatedebit(){
//     debitTextEL.innerText=`${textEL.value}`;
//     debitAmtEL.innerText=`- Rs.${amountEL.value}`;
// }

// const transactionEL=[{textEL:"",amountEL:0,tranType:''}];

//golbal state to store data

const state= {
    earnings: 0,
    expense:0,
    net:0,

    transactions:[],
};

let isUpdate =false;
let tid;

const formEL=document.getElementById("form");

const rendertransaction=()=>{
    const transactionEL=document.querySelector(".transactions");
    const balanceEl=document.querySelector("#balance");
    const earningEl=document.getElementById("earnings");
    const expenseEl=document.getElementById("expense");

    const transactions= state.transactions;

    let earning=0;
    let expense=0;
    let balance=0;
    transactionEL.innerHTML="";
    transactions.forEach((transaction)=>{
    const {id,text,amount,type}=transaction;  
    const isCredit = type === "credit" ? true:false;
    const sign = isCredit ?'+':'-';

        const transactionsEl=
        `<div class="transaction" id=${id}>
            <div class="content" onclick="showEdit(${id})">
                <div class="left" id="field1">
                    <p id="ctext">${text}</p>
                    <p id="camo">${sign} Rs.${amount}</p>
                </div>
                <div class="status credit ${isCredit?"credit":"debit"}">
                ${isCredit?"C":"D"} 
                </div>
            </div>
            <div class="lower">
                <div class="icon" onclick="handelUpdate(${id})">
                    <img src="./icons/pen.svg" alt="pen" />
                </div>
                <div class="icon" onclick="handelDelete(${id})">
                    <img src="./icons/trash.svg" alt="trash" />
                </div>
            </div>
        </div>`;

        earning +=isCredit? amount:0;
        expense +=!isCredit?amount:0;
        balance=earning-expense; 

        transactionEL.insertAdjacentHTML('afterbegin',transactionsEl);
    });

    balanceEl.innerHTML=`Rs. ${balance}`;
    earningEl.innerHTML=`Rs. ${earning}`;
    expenseEl.innerHTML=`Rs. ${expense}`;
};
const addTransaction =(e)=>{
    e.preventDefault();
    const isEarn = e.submitter.id === 'earn-btn'?true:false;
    const formData= new FormData(formEL);
    const tData= {};

    formData.forEach((value,key)=>{
        tData[key]=value;
    });

    const {text,amount}=tData;
    console.log({tData});
    const transaction={ id: isUpdate ? tid : state.transactions.length+1, 
        text:text,
        amount: +amount,
        type:isEarn?"credit":"debit",
    };

    if(isUpdate){
        const tIndex=state.transactions.findIndex((t) => t.id===tid);

        state.transactions[tIndex]=transaction;
        isUpdate=false;
        tid=null;
    }else{
        state.transactions.push(transaction);
    }

    
    rendertransaction();
    formEL.reset();
};

const showEdit=(id)=>{
     
    const selectedTransaction= document.getElementById(id);
    const lowerEl=selectedTransaction.querySelector(".lower");

    lowerEl.classList.toggle("showTransaction");
};

const handelUpdate=(id)=>{

    const transaction=state.transactions.find((t) => t.id === id);

    const {text,amount}=transaction;
    const textEL= document.getElementById("text");
    const amountEL=document.getElementById("amount");

    textEL.value=text;
    amountEL.value=amount;
    tid=id;
    isUpdate=true;

};

const handelDelete=(id)=>{

    const filteredTransaction = state.transactions.filter((t) => t.id !== id);
    
    state.transactions= filteredTransaction;
    rendertransaction();
};

rendertransaction();
formEL.addEventListener('submit',addTransaction);