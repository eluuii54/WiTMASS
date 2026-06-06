/* TIMELINE ACTIVE CARD EFFECT */

const timelineCards = document.querySelectorAll(".timeline-card");

function activateTimeline(){

timelineCards.forEach(card => {

const rect = card.getBoundingClientRect();
const screenCenter = window.innerHeight / 2;

if(rect.top < screenCenter && rect.bottom > screenCenter){
card.parentElement.classList.add("active");
card.classList.add("active");
}
else{
card.parentElement.classList.remove("active");
card.classList.remove("active");
}

});

}

window.addEventListener("scroll", activateTimeline);
window.addEventListener("load", activateTimeline);


/* QUIZ CODE */

let score = 0;
let answeredQuestions = [];

function answerQuestion(button, isCorrect, questionId){

if(answeredQuestions.includes(questionId)){
return;
}

answeredQuestions.push(questionId);

let progress = document.getElementById("quizProgress");

if(progress){
progress.style.width = (answeredQuestions.length/10*100)+"%";
}

let resultText = document.getElementById(questionId);

if(isCorrect){
score++;

let correctSound = document.getElementById("correctSound");
if(correctSound){
correctSound.play();
}

button.classList.add("correct-btn");
resultText.innerHTML = "✅ Correct!";
}
else{

let wrongSound = document.getElementById("wrongSound");
if(wrongSound){
wrongSound.play();
}

button.classList.add("wrong-btn");
resultText.innerHTML = "❌ Incorrect!";
}

let scoreBox = document.getElementById("score");
if(scoreBox){
scoreBox.innerHTML = score;
}

if(answeredQuestions.length === 10){
showRank();
}

}

function showRank(){

let rank = document.getElementById("rank");
let resultPopup = document.getElementById("resultPopup");

if(!rank || !resultPopup){
return;
}

if(score >= 9){
rank.innerHTML = "🏆 Boxing Expert (" + score + "/10)";
}
else if(score >= 7){
rank.innerHTML = "🥊 Skilled Contender (" + score + "/10)";
}
else if(score >= 5){
rank.innerHTML = "📚 Boxing Learner (" + score + "/10)";
}
else{
rank.innerHTML = "💪 Keep Training (" + score + "/10)";
}

resultPopup.style.display = "flex";

}


/* RANDOM BOXING FACT POPUP */

let boxingFacts = [
"Joe Louis held the world heavyweight championship from 1937 to 1949.",
"Boxing became an Olympic sport in 1904.",
"Manny Pacquiao won world titles in eight different weight divisions.",
"Mike Tyson became heavyweight champion at only 20 years old.",
"Modern boxing follows rules developed from the Queensberry Rules."
];

function showFact(){

let randomFact = boxingFacts[Math.floor(Math.random() * boxingFacts.length)];

let factText = document.getElementById("factText");
let factPopup = document.getElementById("factPopup");
let factButton = document.querySelector(".fact-button");

if(factText){
factText.innerHTML = randomFact;
}

if(factButton){
factButton.style.display = "none";
}

if(factPopup){
factPopup.style.display = "block";
}

}

function closeFact(){

let factPopup = document.getElementById("factPopup");
let factButton = document.querySelector(".fact-button");

if(factPopup){
factPopup.style.display = "none";
}

if(factButton){
factButton.style.display = "block";
}

}


/* CHAMPIONS */

function searchChampion(){

let searchBox = document.getElementById("searchBox");
let table = document.getElementById("databaseTable");

if(!searchBox || !table){
return;
}

let input = searchBox.value.toUpperCase();
let tr = table.getElementsByTagName("tr");

for(let i = 1; i < tr.length; i++){

let td = tr[i].getElementsByTagName("td");
let found = false;

for(let j = 0; j < td.length; j++){

if(td[j].innerHTML.toUpperCase().indexOf(input) > -1){
found = true;
}

}

tr[i].style.display = found ? "" : "none";

}

}

function loadChampionDropdown(){

let table = document.getElementById("databaseTable");
let select = document.getElementById("championSelect");

if(!table || !select){
return;
}

let rows = table.getElementsByTagName("tr");

for(let i = 1; i < rows.length; i++){

let cells = rows[i].getElementsByTagName("td");

let country = cells[0].innerHTML;
let champion = cells[1].innerHTML;
let nickname = cells[2].innerHTML;
let weight = cells[3].innerHTML;
let achievement = cells[4].innerHTML;

let option = document.createElement("option");

option.value = country + "|" + champion + "|" + nickname + "|" + weight + "|" + achievement;

option.innerHTML = champion + " - " + country;

select.appendChild(option);

}

}

function showSelectedChampion(){

let selected = document.getElementById("championSelect").value;
let info = document.getElementById("championInfo");

if(selected === ""){
info.innerHTML = "<h3>Spotlight</h3><p>Select a boxer from the dropdown list.</p>";
return;
}

let data = selected.split("|");

let country = data[0];
let champion = data[1];
let nickname = data[2];
let weight = data[3];
let achievement = data[4];

info.innerHTML =
"<h3>"+champion+"</h3>"+
"<p>"+
champion+" is from <b>"+country+"</b>, known as <b>"+nickname+"</b>. "+
"This boxer fought in the <b>"+weight+"</b> division and is remembered for <b>"+achievement+"</b>."+
"</p>";

}

window.addEventListener("load", loadChampionDropdown);

function closeResult(){

document.getElementById("resultPopup").style.display="none";

}