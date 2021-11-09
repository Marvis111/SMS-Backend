
const {mysql} = require('../model/database');

module.exports ={
    newEvents:(req,res,next)=>{
        const {ETitle,EType,EDate} = req.body;
        const sql = `INSERT INTO events (Etitle,Etype,Edate) VALUES('${ETitle}','${EType}','${EDate}') `;
        mysql.query(sql,(err,result)=>{
                if(result.affectedRows == 1){
                    req.eventData = {success:true};
                    next();
                }
        });
            
    },
    sendEventSuccess:(req,res)=>{
        if(req.eventData){
            res.send(req.eventData);
        }
    },
    fetchAllevents:(req,res) =>{
        const sql = `SELECT * FROM events order by id DESC `;
        mysql.query(sql,(err,results)=>{
            res.send(results);
        })
    }
}