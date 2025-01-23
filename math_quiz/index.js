//math question randomly generated
const questionEl=document.getElementById("question");
const questionFormEl= document.getElementById("Idform");
const scoreEl= document.getElementById("score");
let answerEL;
let score=localStorage.getItem("score");
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomQuestion =()=>{
const randomNumber1=randomNumber(1,10);
const randomNumber2=randomNumber(1,10);
const questionType =randomNumber(1,4);

let question;
let answer;
let firstNumber,secondNumber;

if(firstNumber>secondNumber && questionType>2)
{
    firstNumber=randomNumber1;
    secondNumber=randomNumber2;
}else{
    firstNumber=randomNumber2;
    secondNumber=randomNumber1;
}
switch (questionType) {
    case 1:
        question=`Q. What is ${firstNumber} multiply by ${secondNumber} is ?`;
        answer= firstNumber * secondNumber;
        break;
    case 2:
        question=`Q. What is ${firstNumber} added to ${secondNumber} is ?`
        answer= firstNumber + secondNumber;
        break;
    case 3:
        question=`Q. What is ${firstNumber} divided by ${secondNumber} is ?`;
        answer= firstNumber/secondNumber;
        break;
    case 4:
        question=`Q. What is ${firstNumber} subtracted by ${secondNumber} is ?`;
        answer= firstNumber-secondNumber;
        break;
    default:
        question=`Q. What is ${firstNumber} subtracted by ${secondNumber} is ?`;
        answer= firstNumber-secondNumber;
        break;
}
// const question=`Q. What is ${randomNumber1} multiply by ${randomNumber2} is ?`;
// const answer= randomNumber1 * randomNumber2;
return { question,answer }; 
};

const showquestion =()=>{
const {question,answer} = randomQuestion();
questionEl.innerHTML=question;
scoreEl.innerText=score;
answerEL=answer;
};
showquestion();

const checkAnswer= (event)=>{
    event.preventDefault();
    const formData = new FormData(questionFormEl);
    const userAnswer= parseInt(formData.get("answer"));
    if(userAnswer == answerEL){
        score +=1;
    }else{
        score -=1;
    }
    scoreEl.innerText=score;
    localStorage.setItem("score",score);
    event.target.reset();
    showquestion();
    console.log("answer",userAnswer);
}