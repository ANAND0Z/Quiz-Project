const params=new URLSearchParams(window.location.search);
const subject=params.get('subject');
const year=params.get('year');
const dept=params.get('dept');
const section=params.get('section');
const code=params.get("code");

function loadcode(){
    const codetag=document.getElementById("code");
    codetag.textContent=`code:${code}`;
}

loadcode();


async function loadStudentdetails(){
    try{
    removeStudentdetails();
    
    const response= await fetch('/quiz/Student_data',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({year,dept,section,subject})
     });

    const details=await response.json();
    addStudentdetails(details);
}catch(err){
    console.log(err);
}
}

function addStudentdetails(details){
    try{
    const  table=document.getElementById('table');
    for(let i=0;i<Object.keys(details).length;i++){
        if(details[i].register_no=="CO1" || details[i].register_no=="CO2" || details[i].register_no=="CO3" || details[i].register_no=="CO4" || details[i].register_no=="CO5"){
            continue;
        }
       const serial_no=document.createElement('div');
       serial_no.className='serial_no';
       const serial_no_par=document.createElement('p');
       serial_no_par.className='serial_no_par';
       serial_no_par.textContent=i+1;
       const regdiv=document.createElement('div');
       regdiv.className='regdiv';
       const reg_para=document.createElement('p');
       reg_para.className='reg_para';
       reg_para.textContent=details[i].register_no;
       serial_no.appendChild(serial_no_par);
       regdiv.appendChild(reg_para);
       table.appendChild(serial_no);
       table.appendChild(regdiv);
   }}catch(err){
    console.log(err);
}
}

function removeStudentdetails(){
    try{
    const  table=document.getElementById('table');
    var l=table.children.length;
   while(l>2){
    table.removeChild(table.children[l-1]);
    l=table.children.length;
   }
}catch(err){
    console.log(err);
}
}



/*

document.getElementById("start").addEventListener("click",async function(event) {
    try{
    event.preventDefault();
    const response= await fetch('/quiz/start',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({year,dept,section,subject})
     });
    const result= await response.json();
    console.log(result);
}catch(err){
    console.log(err);
}
})


document.getElementById("end").addEventListener("click",async function(event) {
    try{
    event.preventDefault();
    const response= await fetch('/quiz/end',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({year,dept,section,subject})
     });
    const result= await response.json();
    console.log(result);
    if(result.success){
        window.location.href="/score.html";
    }
    else{
        console.log("error");
    }
}catch(err){
    console.log(err);
}
})


*/

setInterval(loadStudentdetails,3000);
