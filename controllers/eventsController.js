
const {Events} = require('../model/database');

module.exports ={
    newEvents:async (req,res,next)=>{
        const {ETitle,EType,EDate} = req.body;
        try{
            const newEvents = await Events.create({ETitle,EType,EDate});
            req.eventData = {success:true};
            next();
        }catch(error){
            req.eventData = {success:false}
            next(error);
        }   
    },
    sendEventSuccess:(req,res)=>{
        if(req.eventData){
            res.send(req.eventData);
        }
    },
    fetchAllevents:async (req,res) =>{
        const events = await Events.find({});
        res.json(events,undefined,2);
       
    }
}