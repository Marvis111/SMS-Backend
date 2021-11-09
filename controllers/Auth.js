const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config/default');
const {admin,} = require('../model/database')

module.exports.Auth = {
    checkToken:(req,res,next) =>{
        req.failed = false
        const token = req.headers['x-auth-token'];
        jwt.verify(token,jwtSecretKey,(err,user)=>{
            if(err){
                req.failed = true;
            }else{
                req.failed = false;
                req.userId = user.id;
            }
        })
        next();
    },
    send:(req,res) =>{
        if(req.failed){
            res.send({success:false})
        }else{
            res.send(req.user);
        }
    },
    checkUser:async (req,res,next)=>{
        const _id = req.userId;
        const {Category} = req.body
        var authUser;
        try {
            switch (Category) {
                case 'admins':
                    authUser = await admin.findOne({_id});
                    break;
                case 'teachers':
                 //   authUser = await teachers.findOne({_id})
                default:
                    authUser = null
                    break;
            }
            if(authUser !== null){
                req.failed = false
                const {Email,Category,Name} = authUser
                req.user = {success:true,authUser:{Email,Category,Name,token:req.headers['x-auth-token']}}
                next()
            }else{
                req.failed =true
                next()
            }
        } catch (error) {
            if(error){
                req.failed =true
                next()
            }
        }
        
    }
}
