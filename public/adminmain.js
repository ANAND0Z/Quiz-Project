document.getElementById("submitbtn").addEventListener('click',async function(event){
    try{
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
}}
catch(err){
    console.log(err);
}
});


function removesub(){
    try{
       const  subject=document.getElementById('subject');
      while(subject.hasChildNodes()){
       subject.removeChild(subject.firstChild);
      }}
      catch(err){
        console.log(err);
      }
}

function getsubject(result){
    try{
    if(result.subject_name!=''){
       result.forEach(sub => {
          let  subject=document.getElementById('subject');
          let option=document.createElement("option");
          option.value=sub.subject_name;
          option.text=sub.subject_name;
          option.disabled=false;
          subject.add(option);
       })
    }
}catch(err){
    console.log(err);
}
}


document.getElementById("scorebtn").addEventListener('click',async function(event){
    try{
       event.preventDefault();
       const response= await fetch('/score.html',{
              method:'GET',
              headers:{
               'Content-Type':'application/json'
              }
       });
       window.location.href="/score.html";
    }catch(err){
        console.log(err);
    }
     });

document.getElementById("generatebtn").addEventListener('click',async function(event){
    try{
    const year=document.getElementById("year").value;
    const dept=document.getElementById("dept").value;
    const section=document.getElementById("section").value;
    const subject=document.getElementById("subject").value;
    const no_of_qn=document.getElementById("questionCount").value;
    const unit=document.getElementById("unit").value;
    const date=document.getElementById("date").value;
    const time=document.getElementById("time").value;
    const duration=document.getElementById("duration").value;
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

    if(no_of_qn==""){
      document.getElementById("questionCount").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("questionCount").style.borderColor="black";
    } if(unit==""){
      document.getElementById("unit").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("unit").style.borderColor="black";
    } if(date==""){
      document.getElementById("date").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("date").style.borderColor="black";
    } if(time==""){
      document.getElementById("time").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("time").style.borderColor="black";
    }
    if(duration==""){
      document.getElementById("duration").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("duration").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
    else{
        var st=false;
        for(let i=1;i<=no_of_qn;i++){
            var qn=document.getElementById(`qn${i}`);
            var op_1=document.getElementById(`op_1_${i}`);
            var op_2=document.getElementById(`op_2_${i}`);
            var op_3=document.getElementById(`op_3_${i}`);
            var op_4=document.getElementById(`op_4_${i}`);
            var selected=document.querySelector(`input[name="answer_${i}"]:checked`);
            var option_group=document.getElementById(`options_group_${i}`)
            var ct_op;
            var id=i;
            if (!selected) {
                st=true;
                document.getElementById(`ct_1_${i}`).style.borderColor="red";
                document.getElementById(`ct_2_${i}`).style.borderColor="red";
                document.getElementById(`ct_3_${i}`).style.borderColor="red";
                document.getElementById(`ct_4_${i}`).style.borderColor="red";
            } else {
                document.getElementById(`ct_1_${i}`).style.borderColor="#4B95DF";
                document.getElementById(`ct_2_${i}`).style.borderColor="#4B95DF";
                document.getElementById(`ct_3_${i}`).style.borderColor="#4B95DF";
                document.getElementById(`ct_4_${i}`).style.borderColor="#4B95DF";
            }
            if(qn.value.trim()==""){
                //alert(`enter the question ${id}`);
                qn.style.borderColor="red";
                st=true;
            }else{
                qn.style.borderColor="#4B95DF";
            }if(op_1.value.trim()==""){
                //alert(`enter the option_1 in question ${id}`);
                op_1.style.borderColor="red";
                st=true;
            }else{
                op_1.style.borderColor="#4B95DF";
            } if(op_2.value.trim()==""){
                //alert(`enter the option_2 in question ${id}`);
                op_2.style.borderColor="red";
                st=true;
            }else{
                op_2.style.borderColor="#4B95DF";
            } if(op_3.value.trim()==""){
                //alert(`enter the option_3 in question ${id}`);
                op_3.style.borderColor="red";
                st=true;
            }else{
                op_3.style.borderColor="#4B95DF";
            } if(op_4.value.trim()==""){
                //alert(`enter the option_4 in question ${id}`);
                op_4.style.borderColor="red";
                st=true;
            }else{
                op_4.style.borderColor="#4B95DF";
            }
        }  
        if(st==true){
            alert(`Fill the missing details`);
            return;
        }

    const datestring = `${date} ${time}`;
    const start = new Date(datestring);
    const end=new Date(start.getTime() + duration * 60 * 1000);
    /*function formatForMySQL(dateObj) {
    return dateObj.toISOString().slice(0, 19).replace('T', ' ');
    }

    const start = formatForMySQL(startdate);
    const end = formatForMySQL(enddate);*/

    console.log("Start:", start);
    console.log("End:", end);

    console.log(start);

     const response= await fetch('/quiz/check_addquiz',{
            method:'POST',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify({subject,year,dept,section,no_of_qn,unit,start,end})
     });
     const r= await response.json();
     console.log(r);

    if(r.success){
        var t=true;
        for(let i=1;i<=no_of_qn;i++){
            var qn=document.getElementById(`qn${i}`).value;
            var op_1=document.getElementById(`op_1_${i}`).value;
            var op_2=document.getElementById(`op_2_${i}`).value;
            var op_3=document.getElementById(`op_3_${i}`).value;
            var op_4=document.getElementById(`op_4_${i}`).value;
            var ct_op=document.querySelector(`input[name="answer_${i}"]:checked`).value;
            var id=i;
            const response= await fetch('/quiz/addquiz',{
                method:'POST',
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify({year,dept,section,subject,id,qn,op_1,op_2,op_3,op_4,ct_op})
         });
         const result= await response.json();
         console.log(result);
         if(result.success==false){
            t=false;
            break;
         }
        }
        if(t){
            const response= await fetch('/quiz/code',{
                method:'POST',
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify({year,dept,section,subject})
         });
         const result= await response.json();
         console.log(result);
         var code=result[0];
         if(code!=null){
            window.location.href=`/adminquiz_control.html?subject=${encodeURIComponent(subject)}&year=${encodeURIComponent(year)}&dept=${encodeURIComponent(dept)}&section=${encodeURIComponent(section)}&code=${encodeURIComponent(code.code)}`;
        }}
    }
    }
}catch(err){
    console.log(err);
}
});










function previewImage(event, previewId) {
    try{
    const file = event.target.files[0];
    const reader = new FileReader();
    const imagePreview = document.getElementById(previewId);

    reader.onload = function() {
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';
    }

    if (file) {
        reader.readAsDataURL(file);
    }
    else {
        imagePreview.style.display = 'none';
    }
}catch(err){
    console.log(err);
}
}



function showQnImage(selector) {
    try{
    let imgElement = document.querySelector(selector);
    if (imgElement) {
        imgElement.style.display = imgElement.style.display === "none" || imgElement.style.display === "" ? "block" : "none";
    }
}catch(err){
    console.log(err);
}
}

function showOptImage(selector) {
    try{
    const optElement = document.querySelector(selector);
    if (optElement) {
        optElement.style.display = optElement.style.display === "none" || optElement.style.display === "" ? "block" : "none";
    }
}catch(err){
    console.log(err);
}
}

async function generateQuestions() {
    try{
    const year=document.getElementById("year").value;
    const dept=document.getElementById("dept").value;
    const section=document.getElementById("section").value;
    const subject=document.getElementById("subject").value;
    const no_of_qn=document.getElementById("questionCount").value;
    const unit=document.getElementById("unit").value;
    const date=document.getElementById("date").value;
    const time=document.getElementById("time").value;
    const duration=document.getElementById("duration").value;

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

    if(no_of_qn==""){
      document.getElementById("questionCount").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("questionCount").style.borderColor="black";
    } if(unit==""){
      document.getElementById("unit").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("unit").style.borderColor="black";
    } if(date==""){
      document.getElementById("date").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("date").style.borderColor="black";
    } if(time==""){
      document.getElementById("time").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("time").style.borderColor="black";
    }
    if(duration==""){
      document.getElementById("duration").style.borderColor="red";
      checking=false;
    }else{
      document.getElementById("duration").style.borderColor="black";
    }

    if(checking==false){alert("Fill the missing details");return;}
    else{

        const response= await fetch('/image/check_addquiz',{
            method:'POST',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify({subject,year,dept,section})
     });
     const r= await response.json();
     console.log(r);
     if(r.success){
        const response1= await fetch('/image/delete_quiz_table',{
            method:'POST',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify({subject,year,dept,section,no_of_qn,unit})
     });
     const result1= await response1.json();
     console.log(result1);
     if(result1.success){
        var t=true;
        const response2= await fetch('/image/create_quiz_table',{
            method:'POST',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify({subject,year,dept,section,no_of_qn})
     });
     const result2= await response2.json();
    if(result2==false){
        t=false;
    }
     if(t){

    let wrapper = document.getElementById("questions-wrapper");
    let count = parseInt(document.getElementById("questionCount").value);

    wrapper.innerHTML = "";
    
    if (count >= 3) {
        const gen = document.querySelector('.generate-btn');
        gen.style.display='block';
        const qnDiv = document.querySelector('.admin-page-2');
        qnDiv.style.display='block'; 

        for (let i = 1; i <= count; i++) {
            let newQuestion = document.createElement("div");
            newQuestion.classList.add("question-container");
            newQuestion.innerHTML = `
            <style>
                .question-image-hide-${i} {
                    display: none;
                }
                .option-image-hide-${i}1 {
                    display: none;
                }
                .option-image-hide-${i}2 {
                    display: none;
                }
                .option-image-hide-${i}3 {
                    display: none;
                }
                .option-image-hide-${i}4 {
                    display: none;
                }
            </style>
            <hr class="horizontal-line"/>
            <div class="question-section row">
                <div class="col-12">
                    <h1 class="head-question">Question ${i}:</h1>
                </div>
                <div class="formula-add-image-container col-12 d-flex flex-row justify-content-end">
                    <hr />
                    <div class="icons-container-margin">
                        <img id="addImageBtn" class="add-image-btn" onclick="showQnImage('.question-image-hide-${i}')" src="asserts/add-image.png"/>
                    </div>
                </div>
                <div class="question-enter-field col-12">
					<input id="${'qn'+i}" class="input-question math-enabled" placeholder="Type Question ${i} here." virtual-keyboard-mode="manual" mode="text-math" required>
                </div>
                <div class="image-enter-field question-image-hide-${i} col-12">
                    <div class="input-question-image">
                        <form class="text-center">
                            <div class="image-container">
                                <label for="imageUpload${i}">Choose Image for question:</label>
                                <input type="file" id="qn_img_${i}" name="imageUpload${i}" accept="image/*" onchange="previewImage(event, 'imagePreview${i}')">
                                <br><br>
                                <img id="imagePreview${i}" src="" alt="Image Preview ${i}" style="display:none; width:60%; height: 35rem; margin-left: 20%;"/> 
                                <input onclick="uploadbtn('${year}','${dept}','${section}','${subject}','qn_img','${i}')" class="upload-image-qn-btn" type="button" value="Upload Image ${i}">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row options-container" id="options_group_${i}">
                <div class="col-12 col-md-6 col-lg-3 options-field">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="icons-container-margin">
                            <label class="checkbox-container">
                                <input class="checkbox-btn" id="ct_1_${i}" name="answer_${i}" value="c1" type="radio" required>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="icons-container-margin">
                            <img class="add-image-btn" onclick="showOptImage('.option-image-hide-${i}1')" src="asserts/add-image.png"/>
                        </div>
                    </div>
                    <div class="option-enter-field">
						<input class="input-option-1 math-enabled" id="op_1_${i}" placeholder="Type Option 1 here." virtual-keyboard-mode="manual" mode="text-math" required>
                    </div>
                    <div class="image-enter-field option-image-hide-${i}1">
                        <div class="input-option-image-1">
                            <form class="text-center"> 
                                <div class="image-container">
                                    <label for="imageUpload${i}2">Choose Option Image 1:</label>
                                    <input type="file" id="img_op_1_${i}" name="imageUpload${i}2" accept="image/*" onchange="previewImage(event, 'imagePreview${i}2')">
                                    <br><br>
                                    <img id="imagePreview${i}2" src="" alt="Image Preview ${i}2" style="display:none; width:90%; margin-left: 5%;"/> 
                                    <input onclick="uploadbtn('${year}','${dept}','${section}','${subject}','img_op_1','${i}')" type="button" class="upload-image-op-btn"  value="Upload Image ${i}1">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 options-field">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="icons-container-margin">
                            <label class="checkbox-container">
                                <input class="checkbox-btn" id="ct_2_${i}" value="c2" name="answer_${i}" type="radio">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="icons-container-margin">
                            <img class="add-image-btn" onclick="showOptImage('.option-image-hide-${i}2')" src="asserts/add-image.png"/>
                        </div>
                    </div>
                    <div class="option-enter-field">
						<input class="input-option-2 math-enabled" id="op_2_${i}" placeholder="Type Option 2 here." virtual-keyboard-mode="manual" mode="text-math" required>
                    </div>
                    <div class="image-enter-field option-image-hide-${i}2">
                        <div class="input-option-image-2">
                            <form class="text-center"> 
                                <div class="image-container">
                                    <label for="imageUpload${i}3">Choose Option Image 2:</label>
                                    <input type="file" id="img_op_2_${i}" name="imageUpload${i}3" accept="image/*" onchange="previewImage(event, 'imagePreview${i}3')">
                                    <br><br>
                                    <img id="imagePreview${i}3" src="" alt="Image Preview ${i}3" style="display:none; width:90%; margin-left: 5%;"/>
                                    <input onclick="uploadbtn('${year}','${dept}','${section}','${subject}','img_op_2','${i}')" class="upload-image-op-btn" type="button" value="Upload Image ${i}2">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 options-field">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="icons-container-margin">
                            <label class="checkbox-container">
                                <input class="checkbox-btn" id="ct_3_${i}" value="c3" name="answer_${i}" type="radio">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="icons-container-margin">
                            <img class="add-image-btn" onclick="showOptImage('.option-image-hide-${i}3')" src="asserts/add-image.png"/>
                        </div>
                    </div>
                    <div class="option-enter-field">
						<input class="input-option-3 math-enabled" id="op_3_${i}" placeholder="Type Option 3 here." virtual-keyboard-mode="manual" mode="text-math" required>
                    </div>
                    <div class="image-enter-field option-image-hide-${i}3">
                        <div class="input-option-image-3">
                            <form class="text-center"> 
                                <div class="image-container">
                                    <label for="imageUpload${i}3">Choose Option Image 3:</label>
                                    <input type="file" id="img_op_3_${i}" name="imageUpload${i}4" accept="image/*" onchange="previewImage(event, 'imagePreview${i}4')">
                                    <br><br>
                                    <img id="imagePreview${i}4" src="" alt="Image Preview ${i}4" style="display:none; width:90%; margin-left: 5%;"/>
                                    <input onclick="uploadbtn('${year}','${dept}','${section}','${subject}','img_op_3','${i}')" class="upload-image-op-btn" type="button" value="Upload Image ${i}3">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 options-field">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="icons-container-margin">
                            <label class="checkbox-container">
                                <input class="checkbox-btn" id="ct_4_${i}" value="c4" name="answer_${i}" type="radio">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="icons-container-margin">
                            <img class="add-image-btn" onclick="showOptImage('.option-image-hide-${i}4')" src="asserts/add-image.png"/>
                        </div>
                    </div>
                    <div class="option-enter-field">
						<input class="input-option-4 math-enabled" id="op_4_${i}" placeholder="Type Option 4 here." virtual-keyboard-mode="manual" mode="text-math" required>
                    </div>
                    <div class="image-enter-field option-image-hide-${i}4">
                        <div class="input-option-image-4">
                            <form class="text-center"> 
                                <div class="image-container">
                                    <label for="imageUpload${i}5">Choose Option Image 4:</label>
                                    <input type="file" id="img_op_4_${i}" name="imageUpload${i}5" accept="image/*" onchange="previewImage(event, 'imagePreview${i}5')">
                                    <br><br>
                                    <img id="imagePreview${i}5" src="" alt="Image Preview ${i}5" style="display:none; width:90%; margin-left: 5%;"/>
                                    <input onclick="uploadbtn('${year}','${dept}','${section}','${subject}','img_op_4','${i}')" class="upload-image-op-btn" type="button" value="Upload Image ${i}4">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
            wrapper.appendChild(newQuestion);
        }
    }
    else {
        const qnDiv = document.querySelector('.admin-page-2');
        qnDiv.style.display='none';
        Swal.fire({
            title: "Dear Faculty!",
            text: "Please check the number of questions.",
            icon: "warning",
            confirmButtonText: "OK",
            background: "#ffffff",
            color: "#000000",
            confirmButtonColor: "#fcdf00",
            customClass: {
                confirmButton: 'custom-ok-button'
            }
        });
    }
}else{console.log("error1");}
     }else{console.log("error1");}
}
else{console.log("error2");}
}
}catch(err){
    console.log(err);
}
}




async function uploadbtn(year,dept,section,subject,data,no) {
    try{
    const response= await fetch('/image/check_addquiz',{
            method:'POST',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify({subject,year,dept,section})
     });
     const r= await response.json();
     console.log(r);
     if(r.success){

    try{
    const fileinput=document.getElementById(`${data}_${no}`);
    const file=fileinput.files[0];
    if(!file){
        alert("Please select a file");
        return;
    }
    const formdata=new FormData();
    formdata.append("year",year);
    formdata.append("dept",dept);
    formdata.append("section",section);
    formdata.append("subject",subject);
    formdata.append("data",data);
    formdata.append("no",no);
    formdata.append("image",file);
        const response=await fetch("/image/upload",{
            method:"POST",
            body:formdata
        })
        const result=await response.json();
        if(result.success){
            console.log("data added");
        }
        else{
            console.log("data not added");
        }
    }
    catch(err){
        console.log("error");
    }}
    else{
        console.log('err');
    }
}catch(err){
    console.log(err);
}
}






