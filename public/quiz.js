const params=new URLSearchParams(window.location.search);
const subject=params.get('subject');
const year=params.get('year');
const dept=params.get('dept');
const section=params.get('section');
const code=params.get("code");
const username=params.get("username");
let qn=[];
let current=0;
let answers={};
let t;


async function end_quiz(){
    try{
     const response= await fetch('/userquiz/identify_state',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({year,dept,section,subject})
     });
     const result=await response.json();
     const now = new Date();
     const end=new Date(result[0].end)
    if(now>end){
        submit_answer();
    }}catch(err){
        console.log(err);
    }
}


async function loadquestions(){
    try{
    const response= await fetch('/userquiz/questions',{
       method:'POST',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify({year,dept,section,subject})
    });
    qn=await response.json();
    console.log(qn);
    showquestion();
}catch(err){
    console.log(err);
}
   }

function showquestion(){
    try{
         const data=qn[current];
         var quizdata=document.getElementById("quizdata");
         while(quizdata.hasChildNodes()){
            quizdata.removeChild(quizdata.firstChild);
           }
         t=data.id;
            let dataqn=data.qn;
            let data_op_1=data.op_1;
            let data_op_2=data.op_2;
            let data_op_3=data.op_3;
            let data_op_4=data.op_4;
            let dataqnimg=data.qn_img;
            let dataimg_op_1=data.img_op_1;
            let dataimg_op_2=data.img_op_2;
            let dataimg_op_3=data.img_op_3;
            let dataimg_op_4=data.img_op_4;
            let questions = document.createElement("div");
            questions.className="questions";
            questions.innerHTML = `
      
           <div class="palate" style="margin-top: 3%;">
    <div class="tit"><p>Quiz.${data.id}</p></div>
    <div class="qa">
        <div class="par">
            ${dataqn != '' ?` <span id="output_${data.id}" class="math-enabled" readonly> ${dataqn} </span>` : ''}
            
            ${dataqnimg != null ? `<div class="image"><img src="${dataqnimg}" alt="Option 1 Image" class="thumbnail" data-popup="popup1_${data.id}"></div>` : ''}
            ${dataqnimg != null ? `<div id="popup1_${data.id}" class="popup">
                <img src="${dataqnimg}" alt="Option 1 Large Image">
            </div>` : ''}
        </div>
    </div>  
    
    <div class="option_set">
        <div class="options op" id="A">
            <div><input class="option_input" type="radio" name="answer_${data.id}" id="op_1_${data.id}" value="c1"></div>
            ${data_op_1 != '' ? `<div style="display: flex; align-items: center; justify-content:center;width:100%;text-align: center;">
                <math-field readonly>${data_op_1}</math-field></div>` : ''}

            ${dataimg_op_1 != null ? `<div class="image_op" style="width:100%;display:flex;flex-direction: row; align-items: center; justify-content: center;">
                <img src="${dataimg_op_1}" alt="Option 2 Image" class="thumbnail inop_img" data-popup="popup2_${data.id}">
            </div>` : ''} 

            ${dataimg_op_1 != null ? `<div id="popup2_${data.id}" class="popup">
                <img src="${dataimg_op_1}" alt="Option 2 Large Image">
            </div>` : ''} 
        </div>

        <div class="options op" id="B">
            <div><input class="option_input" type="radio" name="answer_${data.id}" id="op_2_${data.id}" value="c2"></div>
            ${data_op_2 != '' ? `<div style="display: flex; align-items: center; justify-content:center;width:100%;text-align: center;">
                <math-field readonly>${data_op_2}</math-field></div>` : ''}

            ${dataimg_op_2 != null ? `<div class="image_op" style="width:100%;display:flex;flex-direction: row; align-items: center; justify-content: center;">
                <img src="${dataimg_op_2}" alt="Option 2 Image" class="thumbnail inop_img" data-popup="popup3_${data.id}">
            </div>` : ''} 

            ${dataimg_op_2 != null ? `<div id="popup3_${data.id}" class="popup">
                <img src="${dataimg_op_2}" alt="Option 2 Large Image">
            </div>` : ''} 
        </div>

        <div class="options op" id="C">
            <div><input class="option_input" type="radio" name="answer_${data.id}" id="op_3_${data.id}" value="c3"></div>
            ${data_op_3 != '' ? `<div style="display: flex; align-items: center; justify-content:center;width:100%;text-align: center;">
                <math-field readonly>${data_op_3}</math-field></div>` : ''}

            ${dataimg_op_3 != null ? `<div class="image_op" style="width:100%;display:flex;flex-direction: row; align-items: center; justify-content: center;">
                <img src="${dataimg_op_3}" alt="Option 2 Image" class="thumbnail inop_img" data-popup="popup4_${data.id}">
            </div>` : ''} 

            ${dataimg_op_3 != null ? `<div id="popup4_${data.id}" class="popup">
                <img src="${dataimg_op_3}" alt="Option 2 Large Image">
            </div>` : ''} 
        </div>

        <div class="options op" id="D">
            <div><input class="option_input" type="radio" name="answer_${data.id}" id="op_4_${data.id}" value="c4"></div>
            ${data_op_4 != '' ? `<div style="display: flex; align-items: center; justify-content:center;width:100%;text-align: center;">
                <math-field readonly>${data_op_4}</math-field></div>` : ''}

            ${dataimg_op_4 != null ? `<div class="image_op" style="width:100%;display:flex;flex-direction: row; align-items: center; justify-content: center;">
                <img src="${dataimg_op_4}" alt="Option 2 Image" class="thumbnail inop_img" data-popup="popup5_${data.id}">
            </div>` : ''} 

            ${dataimg_op_4 != null ? `<div id="popup5_${data.id}" class="popup">
                <img src="${dataimg_op_4}" alt="Option 2 Large Image">
            </div>` : ''} 
        </div>
    </div> 
</div>


            `;
        quizdata.appendChild(questions);
        
        document.getElementById('nextbutton').style.display=current < qn.length-1 ? 'inline' : 'none';
        document.getElementById('submitbutton').style.display=current === qn.length-1 ? 'inline' : 'none';
    }catch(err){
        console.log(err);
    }
}

function nextquestion(){
    try{
   const selected = document.querySelector(`input[name="answer_${t}"]:checked`);
   if (!selected) return alert('Select an answer');
   answers[current] = selected.value;
   current++;
   console.log(answers);
   showquestion();
}catch(err){
    console.log(err);
}
 };

async function submit_answer() {
    try{
    var mark=0;
    const selected = document.querySelector(`input[name="answer_${t}"]:checked`);
    if (!selected){
      answers[current] =' ';
    }
    else{
    answers[current] = selected.value;
    }
    console.log(answers,qn);
    for(let i=0;i<qn.length;i++){
      console.log(qn[i],answers[i]);
      if(qn[i].correct_op==answers[i]){
         mark=mark+1;
      }
    }

     console.log(mark);
     const marks=mark;
     const response2= await fetch('/userquiz/add_student_score',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({username,marks,year,dept,section,subject})
     });
     const result2=await response2.json();

     if(result2.success){
        window.location.href=`/code.html?username=${encodeURIComponent(username)}&year=${encodeURIComponent(year)}&dept=${encodeURIComponent(dept)}&section=${encodeURIComponent(section)}`;
     }}catch(err){
        console.log(err);
    }

}


loadquestions();


setInterval(end_quiz,45000);

