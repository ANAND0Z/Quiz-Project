const express=require('express');
const router=express.Router();
require('dotenv').config();
const connection = require('./db');


router.post('/showscore',async(req,res)=>{
    try{
    const {subject,year,dept,section}=req.body;

    var t=year+"_"+dept+"_"+section;
        const q1='select * from classes where class=?';
        connection.query(q1,[t],async(err,results)=>{
            if(err)
                throw err;
          var  t1=results[0];
        console.log(t1);
    if(t1!=null){
    if(t1.class==t){

    const query=`select * from ${year+"_"+dept+"_"+section}_subject where subject_name=?`;
    connection.query(query,[subject],async(err,results)=>{
        if(err){
            throw err;}
        var s1=results[0];
    if(s1==null)
    {
       return res.json(results); 
    }
    else{
    const query=`select * from ?? order by register_no asc`;
    connection.query(query,[year+"_"+dept+"_"+section+"_"+subject],async(err,results)=>{
        if(err){
            throw err;}
        console.log('success');
        return res.json(results);
    
    });}});
    
}}});}catch(error)
    {
        console.error(error);
    }
});


router.post('/send_score',async(req,res)=>{
    const {subject,year,dept,section,date,scorejson}=req.body;
    try{
    const safeDate = date.replace(/[-:.TZ]/g, '_');

    const q1 = `ALTER TABLE ${year+"_"+dept+"_"+section+"_"+subject}_marks ADD COLUMN \`${safeDate}\` INT DEFAULT 0`;
    connection.query(q1,async(err,result)=>{
    if(err){
        throw err;
    }
   });

    for(let i=0;i<Object.keys(scorejson).length;i++) {
     
      if(scorejson[i].register_no=="CO1" || scorejson[i].register_no=="CO2" || scorejson[i].register_no=="CO3" || scorejson[i].register_no=="CO4" || scorejson[i].register_no=="CO5"){
        const q1=`update ${year+"_"+dept+"_"+section+"_"+subject}_marks set \`${safeDate}\`='${scorejson[i].register_no.slice(2,3)}' where register_no='unit'`;
        connection.query(q1,async(err,result)=>{
        if(err){
            throw err;
        }
        })
        
        const q2=`update ${year+"_"+dept+"_"+section+"_"+subject}_marks set \`${safeDate}\`='${scorejson[i].marks}' where register_no='no of qn'`;
        connection.query(q2,async(err,result)=>{
        if(err){
            throw err;
        }
        })
    }

      else{
        const q = `UPDATE ${year+"_"+dept+"_"+section+"_"+subject}_marks SET \`${safeDate}\`='${scorejson[i].marks}' WHERE register_no='${scorejson[i].register_no}'`;
        connection.query(q,async(err,result)=>{
        if(err){
            throw err;
        }
        })
      }
    }
    }
    catch(err){
        console.log(err);
    }
    res.json({success:true});
})



router.post('/get_score_marks',async(req,res)=>{
    const {subject,year,dept,section}=req.body;
    try{
    
    const q1 = `select * from ${year+"_"+dept+"_"+section+"_"+subject}_marks`;
    connection.query(q1,async(err,result)=>{
    if(err){
        throw err;
    }
    return res.json(result);
   });
}catch(err){
    console.log(err);
}
});



router.post('/delete_table_data',async(req,res)=>{
    try{
    const {subject,year,dept,section}=req.body;
    
const q1=`delete from ${year+"_"+dept+"_"+section+"_"+subject}_quiz`;
connection.query(q1,async(err,result)=>{
    if(err){
        throw err;
    }
});

  
const q2=`delete from ${year+"_"+dept+"_"+section+"_"+subject}`;
connection.query(q2,async(err,result)=>{
      if(err){
          throw err;
      }
  });
    
    return res.json({success:true});
    }catch(err){
        console.log(err);
    }
})




router.post('/end',async(req,res)=>{
    try{
    const {year,dept,section,subject,now}=req.body;

    const q1=`update ${year+"_"+dept+"_"+section}_subject set end="${now}" where subject_name="${subject}"`;
     connection.query(q1,async(err,results)=>{
        if(err){
            throw err;}
        return res.json({success:true});
})
    }catch(err){
        console.log(err);
    }
})




module.exports=router;
 
