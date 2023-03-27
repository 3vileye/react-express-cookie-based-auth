const {UserAuthcheck} = require('../controllers/user.ctrl');
 const requestCheck = async (req,res,next)=>{
    try {
        const access_token = req.headers.authorization.split(" ");
        const response = await UserAuthcheck(access_token[1]);
        if(typeof response == "boolean"){
            if(response)
                next();
            else
                throw new Error (`Please Login Again Token Expired`);
        }else{
            throw new Error (`Something went wrong in auth check`);
        }
    }catch (error) {
          res.status(401).json({message:error.message});
    }
}
 const Usercookiecheck = async(req,res,next)=>{
    try{
        const access_token =req.cookies.accessToken;
        const response = await UserAuthcheck(access_token);
        if(typeof response == "boolean"){
            if(response)
                next();
            else
                throw new Error (`Please Login Again Token Expired`);
        }else{
            throw new Error (`Please Login Again Token Expired`);
        }
    }catch (error) {
        res.status(401).json({message:error.message});
    }
}
module.exports = { Usercookiecheck, requestCheck };
