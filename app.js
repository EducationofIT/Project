const exam=JSON.parse(localStorage.getItem("exam"));

const q=exam.questions[0];

const div=document.getElementById("examArea");

div.innerHTML=`

<h2>${q.q}</h2>

<label><input type="radio" name="a" value="0">${q.o[0]}</label><br>

<label><input type="radio" name="a" value="1">${q.o[1]}</label><br>

<label><input type="radio" name="a" value="2">${q.o[2]}</label><br>

<label><input type="radio" name="a" value="3">${q.o[3]}</label>

`;

let seconds=exam.time*60;

setInterval(()=>{

seconds--;

timer.innerHTML=

Math.floor(seconds/60)+":"+seconds%60;

if(seconds<=0)

submitExam();

},1000);

let warning=0;

document.documentElement.requestFullscreen();

document.addEventListener("fullscreenchange",()=>{

if(!document.fullscreenElement){

warning++;

alert("Fullscreen exited");

document.documentElement.requestFullscreen();

}

if(warning>=3)

submitExam();

});

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

warning++;

}

if(warning>=3)

submitExam();

});

document.oncontextmenu=e=>e.preventDefault();

document.onkeydown=e=>{

if(

e.key==="F12"

||

(e.ctrlKey&&e.shiftKey&&["I","J","C"].includes(e.key))

||

(e.ctrlKey&&e.key==="u")

){

e.preventDefault();

warning++;

}

if(warning>=3)

submitExam();

};

function submitExam(){

let ans=

document.querySelector("input[name=a]:checked");

let score=0;

if(ans&&Number(ans.value)===q.a)

score=1;

localStorage.setItem("score","Score : "+score+"/1");

location.href="result.html";

}
