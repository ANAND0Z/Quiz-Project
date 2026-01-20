const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
require('dotenv').config();
router.use(bodyparser.json());
const connection = require('./db');


router.post('/checkcode',async(req,res)=>{
    try{
    const {username,code,year,dept,section}=req.body;
    
    const query1=`select * from ${year+"_"+dept+"_"+section}_subject where code=?`;
    connection.query(query1,[code],async(err,results)=>{
        if(err){
            throw err;}
        var value=results[0];
        if(value!=null){
            const now = new Date();
            const start = new Date(value.start);
            const end = new Date(value.end); 

            console.log(now);
            console.log(start);
            console.log(end);
            if(start<now && now<end){

            const subject=value.subject_name;
            console.log(subject);
            const q2=`select * from ${year+"_"+dept+"_"+section+"_"+subject} where register_no=?`;
            connection.query(q2,[username],async(err,results)=>{
                if(err){
                    throw err;}
                var v1=results[0];
                if(v1!=null){
                    console.log(results);
                    return res.json({subject_name:null});
                }
                else{
                    const q3=`insert into ${year+"_"+dept+"_"+section+"_"+subject} (register_no) value (?)`;
                    connection.query(q3,[username],async(err,results)=>{
                        if(err){
                            throw err;}
                        console.log(results);
                        return res.json({subject_name:subject});
                    })
                }
            })
        }
        else{
            return res.json({subject_name:null});}

        }
        else{
          return  res.json({subject_name:null});
 }});

}catch(error)
    {
        console.error(error);
    }

});


router.post('/questions',async(req,res)=>{
    try{
    const {year,dept,section,subject}=req.body;
    
    const q1=`select * from ${year+"_"+dept+"_"+section+"_"+subject}_quiz`;
    connection.query(q1,async(err,result)=>{
        if(err){
            throw err;
        }
        return res.json(result);
    })
    }catch(err){
        console.log(err);
    }
})


router.post('/identify_state',async(req,res)=>{
    try{
    const {year,dept,section,subject}=req.body;
    
    const q1=`select * from ${year+"_"+dept+"_"+section}_subject where subject_name="${subject}"`;
     connection.query(q1,async(err,results)=>{
        if(err){
            throw err;}
        return res.json(results);
})
    }catch(err){
        console.log(err);
    }
})


router.post('/add_student_score',async(req,res)=>{
    try{
    const {username,marks,year,dept,section,subject}=req.body;
    console.log(marks);
    
    const q1=`update ${year+"_"+dept+"_"+section+"_"+subject} set marks='${marks}' where register_no="${username}"`;
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

