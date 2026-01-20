
  document.getElementById("getsubject").addEventListener('click',async function(event){
   try{
    event.preventDefault();
    const year=document.getElementById("year").value;
    const dept=document.getElementById("dept").value;
    const section=document.getElementById("section").value;
    var checking=true;
    if(year==""){
      document.getElementById("year").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("year").style.borderColor="black";
    } if(dept==""){
      document.getElementById("dept").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("dept").style.borderColor="black";
    } if(section==""){
      document.getElementById("section").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("section").style.borderColor="black";
    }
    if(checking==false){alert("Fill the missing details");return;}
    if(checking==true){
      removesub();
    const response= await fetch('/quiz/getsub',{
           method:'POST',
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify({year,dept,section})
    });
    const result= await response.json();
    console.log(result);
       getsubject(result);
}}catch(err){
   console.log(err);
}
});

function removesub(){
   try{
       const  subject=document.getElementById('subject');
      while(subject.hasChildNodes()){
       subject.removeChild(subject.firstChild);
      }}catch(err){
         console.log(err);
     }
}

function getsubject(result){
   try{
       const  subject=document.getElementById('subject');
       result.forEach(sub => {
          const option=document.createElement('option');
          option.value=sub.subject_name;
          option.innerHTML=sub.subject_name;
          option.style.backgroundColor="rgb(220, 212, 212)";
          option.style.color="black";
          subject.appendChild(option);
       })
      }catch(err){
         console.log(err);
     }
}

document.getElementById("display_score").addEventListener('click',async function(event){
   try{
   event.preventDefault();
   const year=document.getElementById("year").value;
   const subject=document.getElementById("subject").value;
   const dept=document.getElementById("dept").value;
   const section=document.getElementById("section").value;
   var checking=true;
    if(year==""){
      document.getElementById("year").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("year").style.borderColor="black";
    } if(dept==""){
      document.getElementById("dept").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("dept").style.borderColor="black";
    } if(section==""){
      document.getElementById("section").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("section").style.borderColor="black";
    } if(subject==""){
      document.getElementById("subject").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("subject").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
   
   if(checking==true){
      removedetails();
      const response= await fetch('/score/showscore',{
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({subject,year,dept,section})
  });
     const scorejson=await response.json();
     console.log(scorejson);
     loaddetails(scorejson);
   }
}catch(err){
   console.log(err);
}

});


function removedetails(){
   try{
   const  content=document.getElementById('content');
   var l=content.children.length;
  while(l>0){
   content.removeChild(content.children[0]);
   l=content.children.length;
  }}catch(err){
   console.log(err);
}
}



async function loaddetails(scorejson) {
   try{
   const  content=document.getElementById('content');
   for(let i=0;i<Object.keys(scorejson).length;i++) {
     
      if(scorejson[i].register_no=="CO1" || scorejson[i].register_no=="CO2" || scorejson[i].register_no=="CO3" || scorejson[i].register_no=="CO4" || scorejson[i].register_no=="CO5"){
            continue;
        }

       const regdiv=document.createElement('div');
       regdiv.className='regdiv';
       const register_no=document.createElement('p');
       register_no.className='reg_para';
       register_no.textContent=scorejson[i].register_no;
       const stu_score=document.createElement('div');
       stu_score.className='stu_score';
       const scr_par=document.createElement('p');
       scr_par.className='scr_par';
       scr_par.textContent=scorejson[i].marks;
       regdiv.appendChild(register_no);
       stu_score.appendChild(scr_par);
      
       content.appendChild(regdiv);
       content.appendChild(stu_score);

   }; 
}catch(err){
   console.log(err);
}
}



document.getElementById("submit").addEventListener('click',async function(event){
   try{
   event.preventDefault();
   const year=document.getElementById("year").value;
   const subject=document.getElementById("subject").value;
   const dept=document.getElementById("dept").value;
   const section=document.getElementById("section").value;
   var checking=true;
    if(year==""){
      document.getElementById("year").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("year").style.borderColor="black";
    } if(dept==""){
      document.getElementById("dept").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("dept").style.borderColor="black";
    } if(section==""){
      document.getElementById("section").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("section").style.borderColor="black";
    } if(subject==""){
      document.getElementById("subject").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("subject").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
   
   
   if(checking==true){
      const response= await fetch('/score/showscore',{
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({subject,year,dept,section})
  });
     const scorejson=await response.json();
     console.log(scorejson);
     
     if(scorejson[0]!=null){
      const now=new Date();
     const response1= await fetch('/score/end',{
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({year,dept,section,subject,now})
      });
     const result1= await response1.json();
     console.log(result1);   
     const date=new Date();

     const response2= await fetch('/score/send_score',{
      method:'POST',
      headers:{
       'Content-Type':'application/json'
      },
      body:JSON.stringify({subject,year,dept,section,date,scorejson})
});
  const result2=await response2.json();
  console.log(result2);

  const response3= await fetch('/score/delete_table_data',{
   method:'POST',
   headers:{
    'Content-Type':'application/json'
   },
   body:JSON.stringify({subject,year,dept,section})
});
const result3=await response3.json();
console.log(result3);

    } }
   }catch(err){
      console.log(err);
  }
});
 



document.getElementById("Generate").addEventListener('click',async function(event){
   try{
   event.preventDefault();
   const year=document.getElementById("year").value;
   const subject=document.getElementById("subject").value;
   const dept=document.getElementById("dept").value;
   const section=document.getElementById("section").value;
   var checking=true;
    if(year==""){
      document.getElementById("year").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("year").style.borderColor="black";
    } if(dept==""){
      document.getElementById("dept").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("dept").style.borderColor="black";
    } if(section==""){
      document.getElementById("section").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("section").style.borderColor="black";
    } if(subject==""){
      document.getElementById("subject").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("subject").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
   
   
   if(checking==true){
      const response= await fetch('/score/get_score_marks',{
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({subject,year,dept,section})
  });
     const scorejson=await response.json();
     console.log(scorejson);


  // const worksheet = XLSX.utils.json_to_sheet(scorejson);

   const scoreData = XLSX.utils.sheet_to_json(
                XLSX.utils.json_to_sheet(scorejson), 
                { header: 1 }
            );
   const worksheet = XLSX.utils.aoa_to_sheet([
                [`Year: ${year}`, `Dept: ${dept}`, `Section: ${section}`, `Subject: ${subject}`],
                ...scoreData
            ]);


   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
   XLSX.writeFile(workbook, "data.xlsx");


   }
   }catch(err){
      console.log(err);
   }
})






document.getElementById("get_co").addEventListener("click", async function (event) {
  try {
   event.preventDefault();
   const year=document.getElementById("year").value;
   const subject=document.getElementById("subject").value;
   const dept=document.getElementById("dept").value;
   const section=document.getElementById("section").value;
   var checking=true;
    if(year==""){
      document.getElementById("year").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("year").style.borderColor="black";
    } if(dept==""){
      document.getElementById("dept").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("dept").style.borderColor="black";
    } if(section==""){
      document.getElementById("section").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("section").style.borderColor="black";
    } if(subject==""){
      document.getElementById("subject").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("subject").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
   
   
   if(checking==true){
    // Call your backend API that returns the DB data in same format as Excel
    const res =await fetch('/score/get_score_marks',{
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({subject,year,dept,section})
  });
    const data = await res.json();
      console.log(data);
    if (!Array.isArray(data) || data.length < 3) {
      alert("Invalid CO data from server");
      return;
    }

    // Extract units + questions per quiz
    const unitRow = data[0]; // {register_no:'unit', quiz1:1, quiz2:2,...}
    const qnRow = data[1];   // {register_no:'no of qn', quiz1:3, quiz2:4,...}

    const quizKeys = Object.keys(unitRow).filter(k => k !== "register_no");

    // Prepare final report
    const report = [];

    for (let i = 2; i < data.length; i++) {
      const student = data[i];
      const regNo = student.register_no;

      const unitTotals = {1:0,2:0,3:0,4:0,5:0};
      const scoreTotals = {1:0,2:0,3:0,4:0,5:0};
      const comarks = {1:0,2:0,3:0,4:0,5:0};

      quizKeys.forEach(qk => {
        const unit = unitRow[qk];
        const qn = qnRow[qk];
        const score = student[qk];

        if (unit >= 1 && unit <= 5) {
          // Convert raw score to "out of 2 marks"
          unitTotals[unit] +=  qn;
          scoreTotals[unit] +=  score;
        }
      });
      comarks[1]= (scoreTotals[1]/unitTotals[1])*100 || 0;
      comarks[2]= (scoreTotals[2]/unitTotals[2])*100 || 0;
      comarks[3]= (scoreTotals[3]/unitTotals[3])*100 || 0;
      comarks[4]= (scoreTotals[4]/unitTotals[4])*100 || 0;
      comarks[5]= (scoreTotals[5]/unitTotals[5])*100 || 0; 

      report.push({
        RegisterNo: regNo,
        CO1: comarks[1].toFixed(2),
        CO2: comarks[2].toFixed(2),
        CO3: comarks[3].toFixed(2),
        CO4: comarks[4].toFixed(2),
        CO5: comarks[5].toFixed(2)
      });
    }

    // Export Excel
   // const ws = XLSX.utils.json_to_sheet(report);

    
   const scoreData = XLSX.utils.sheet_to_json(
                XLSX.utils.json_to_sheet(report), 
                { header: 1 }
            );
   const ws = XLSX.utils.aoa_to_sheet([
                [`Year: ${year}`, `Dept: ${dept}`, `Section: ${section}`, `Subject: ${subject}`],
                ...scoreData
            ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CO_Report");
    XLSX.writeFile(wb, "CO_Report.xlsx");

  } }catch (err) {
    console.error("Error fetching CO data:", err);
    alert("Failed to generate CO report");
  }
});




