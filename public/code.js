const params=new URLSearchParams(window.location.search);
const username=params.get('username');
const year=params.get('year');
const dept=params.get('dept');
const section=params.get('section');

document.getElementById('start').addEventListener('click',async function (event) {
   try{
   event.preventDefault();
   const code=document.getElementById('code').value;
   if(code==""){
      alert("enter the code");
   }else if(username=="" || year=="" || dept=="" || section==""){
      console.log("data not entered");
   }
   else{
      const response=await fetch('/userquiz/checkcode',{
         method:'POST',
         headers:{
            'content-type':'application/json'
         },
         body:JSON.stringify({username,code,year,dept,section})
      })
      const result=await response.json();
      if(result.subject_name!=null){
        window.location.href=`/attend_quiz.html?username=${encodeURIComponent(username)}&year=${encodeURIComponent(year)}&dept=${encodeURIComponent(dept)}&section=${encodeURIComponent(section)}&code=${encodeURIComponent(code)}&subject=${encodeURIComponent(result.subject_name)}`;
      }
      else{
         alert("Invalid code");
         console.log("incorrect data");
      }
   }
}catch(err){
   console.log(err);
}
})


