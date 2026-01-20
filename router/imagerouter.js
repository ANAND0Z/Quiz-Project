const express=require('express');
const mysql=require('mysql');
const multer=require('multer');
const path=require('path');
const router=express.Router();
require('dotenv').config();
const connection = require('./db');

const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        const year=req.body.year;
        const dept=req.body.dept;
        const section=req.body.section;
        const subject=req.body.subject;
        const data=req.body.data;
        const no=req.body.no;
        const timestamp=Date.now();
        const ext=path.extname(file.originalname);
        const newfilename=`${year}_${dept}_${section}_${subject}_${data}_${no}_${timestamp}${ext}`;
        cb(null,newfilename);
    }
})

const upload=multer({storage:storage});

router.post("/upload",upload.single("image"),(req,res)=>{
    try{
    if(!req.file){
        console.log("file not found");
        return res.json({success:false});
    }
    else{
        const year=req.body.year;
        const dept=req.body.dept;
        const section=req.body.section;
        const subject=req.body.subject;
        const data=req.body.data;
        const no=req.body.no;
        const imagepath=req.file.filename;
        
        const q1=`update ${year+"_"+dept+"_"+section+"_"+subject}_quiz set ${data}="${imagepath}" where id="${no}"`;
        connection.query(q1,async(err,result)=>{
            if(err){
                return res.json({success:false});}
        })
        return res.json({success:true});
        }
    }
    catch(err){
        res.json({success:false});
    }
})
        






router.post('/check_addquiz',async(req,res)=>{
    try{
    const {subject,year,dept,section}=req.body;
    var t=year+"_"+dept+"_"+section;
    const q1='select * from classes where class=?';
    connection.query(q1,[t],async(err,results)=>{
        if(err){
            throw err;}
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
        return res.json({success:true});
    }
    else{
        return res.json({success:false});
    }

});}}
else{
    return res.json({success:false});
}});
    
}catch(error)
    {
        console.error(error);
    }
});




router.post('/delete_quiz_table',async(req,res)=>{
    try{
    const {subject,year,dept,section,no_of_qn,unit}=req.body;

const q1=`delete from ${year+"_"+dept+"_"+section+"_"+subject}_quiz`;
connection.query(q1,async(err,result)=>{
    if(err){
        throw err;
    }
});
  return res.json({success:true});

}catch(error)
    {
        console.error(error);
    }
});






const util = require('util');

router.post('/create_quiz_table', async (req, res) => {
    try {
        const { subject, year, dept, section, no_of_qn } = req.body;
        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });

        const query = util.promisify(connection.query).bind(connection);
        const connect = util.promisify(connection.connect).bind(connection);

        await connect(); 
        console.log("Database connected");

        const values = Array.from({ length: no_of_qn }, (_, i) => [i + 1]);
        const sql = `INSERT INTO ${year+"_"+dept+"_"+section+"_"+subject}_quiz (id) VALUES ?`;

        await query(sql, [values]);
        console.log(values);
        connection.end();
        return res.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return res.json({ success: false });
    }
});





module.exports=router;

