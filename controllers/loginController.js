const validator = require('../validator');
const {admin,teachers} = require('../model/database'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
{jwtSecretKey} = require('../config/default');

const loginController ={
    getUserDetails:async (req,res,next) =>{
        req.skip = false;
        const {Email,Password,Category} = req.body;
        const formState = validator(req.body);
        if(formState.errNo > 0){
            req.skip = true
            req.dataError = formState;
            next();
        }else{
            req.skip = false
            try {
                var userDetails
                switch (Category) {
                    case 'admins':
                        userDetails = await admin.findOne({Email});
                        break;
                    case 'teachers':
                        userDetails = await teachers.findOne({EAddress:Email});
                        break;
                    case 'students':
                       // userDetails = await students.findOne({Email});
                    default:
                        userDetails = null
                        break;
                }
                if(userDetails !== null){
                    const result = await bcrypt.compare(Password,userDetails.Password);
                    if(result == true){
                        req.skip = false;
                        jwt.sign({id:userDetails._id},jwtSecretKey,{expiresIn:3600},(ERR,token)=>{
                            if(ERR){
                                req.skip = true;
                                req.dataError =  {success:false,error:[{
                                    FieldName:"Email",
                                    err:ERR.message
                                }]}
                                next();
                            }
                            else{
                                req.skip = false;
                                switch (Category) {
                                    case 'admins':
                                        req.signedUser = {success:true,newUser:{
                                            Email,Name:userDetails.Name,token,Category,id:userDetails._id
                                        } }
                                        break;
                                    case 'teachers':
                                        req.signedUser = {success:true,newUser:{
                                            Email:userDetails.EAddress,Name:userDetails.FName +' '+userDetails.LName
                                            ,token,Category,id:userDetails._id,expiresIn:3600
                                        } }
                                        break;
                                
                                    default:
                                        break;
                                }
                                next();
                            }
                        })
                    }else{
                        req.skip = true;
                        req.dataError =  {success:false,error:[{
                                        FieldName:"Category",
                                        err:'Invalid Password/Email Combination.'
                                    }]}
                                    next();
                    }
                }else{
                    req.skip = true;
                    req.dataError =  {success:false,error:[{
                                    FieldName:"Category",
                                    err:'Invalid Password/Email Combination.'
                                }]}
                                next();
                } 
            } catch (err) {
                 req.skip = true;
                 console.log(err);
                    req.dataError =  {success:false,error:[{
                                    FieldName:"Category",
                                    err:err.message
                                }]}
                                next();
            }
        }
    },
    checkValidity:(req,res,next) =>{
        if(req.skip){
            next();
        }else{
            res.json(req.signedUser);
        }
    },
    sendStatus:(req,res) =>{
        if(req.skip){
            if(req.dataError){
                res.json(req.dataError,undefined,2);
            }   
        }     
    },
}
module.exports = loginController