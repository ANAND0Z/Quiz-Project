const express=require('express');
const router=express.Router();
require('dotenv').config();
const connection = require('./db');


router.post('/getsub',async(req,res)=>{
    try{
    const {year,dept,section}=req.body;
        var t=year+"_"+dept+"_"+section;
        const q1='select * from classes where class=?';
        connection.query(q1,[t],async(err,results)=>{
            if(err)
                throw err;
          var  t1=results[0];
        console.log(t1);
    if(t1!=null){
    if(t1.class==t){
    
    const query=`select * from ${year+"_"+dept+"_"+section}_subject`;
    connection.query(query,async(err,results)=>{
        if(err){
            throw err;}
        console.log('success');
        return res.json(results);
    
    });
 
}}
    else{
        return res.json({subject_name:''});
    }});

    }catch(error)
    {
        console.log(error);
    }

});


router.post('/check_addquiz',async(req,res)=>{
    try{
    const {subject,year,dept,section,no_of_qn,unit,start,end}=req.body;
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
    if(s1!=null){

        const d1=`delete from ${year+"_"+dept+"_"+section+"_"+subject}`;
        connection.query(d1,async(err,results)=>{
            if(err){
                throw err;}
        })

        const q1=`insert into ${year+"_"+dept+"_"+section+"_"+subject}(register_no,marks) values (?,?)`;
        connection.query(q1,[unit,no_of_qn],async(err,results)=>{
            if(err){
                throw err;}
        })




        function generateCode() {
                    const randomCode = Math.floor(Math.random() * 1000000);
                    connection.query(`SELECT * FROM ${year+"_"+dept+"_"+section}_subject WHERE code = ?`, [randomCode], (err, codeResults) => {
                        if (err) {
                            throw err;
                            }
                        if (codeResults.length > 0) {
                            return generateCode();
                        }
                        connection.query(`UPDATE ${year+"_"+dept+"_"+section}_subject SET code = ?, start=?, end=? where subject_name=?`, [randomCode,start,end,subject], err => {
                            if (err) 
                                throw err;

                            return res.json({ success: true });
                        });
                    });
            }

            generateCode(); 

    }
    else{
        return res.json({success:false});
    }

});
}}
else{
    return res.json({success:false});
}});
    
}catch(error)
    {
        console.error(error);
    }

});




router.post('/addquiz',async(req,res)=>{
    try{
    const {year,dept,section,subject,id,qn,op_1,op_2,op_3,op_4,ct_op}=req.body;
    const q1=`update ${year+"_"+dept+"_"+section+"_"+subject}_quiz set qn='${qn}',op_1='${op_1}',op_2='${op_2}',op_3='${op_3}',op_4='${op_4}',correct_op='${ct_op}' where id='${id}'`;
    connection.query(q1,async(err,results)=>{
        if(err){
            throw err;}
    })
    return res.json({success:true});
}catch(err){
    console.log(err);
}
})


router.post('/code',async(req,res)=>{
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



router.post('/Student_data',async(req,res)=>{
    try{
    const {year,dept,section,subject}=req.body;
    
    const q1=`select * from ${year+"_"+dept+"_"+section+"_"+subject} order by register_no asc`;
     connection.query(q1,async(err,results)=>{
        if(err){
            throw err;}
        return res.json(results);
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




module.exports=router;
