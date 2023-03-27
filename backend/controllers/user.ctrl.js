const jwt = require("jsonwebtoken");




const login = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        const users = [{email:"admin@gmail.com",name:"admin-name",password:"1234"}];
        var user =null;
        users.filter(element => {
            if(element.email === email)
                user = element;
        });
        if(!user) return res.status(400).json({message:'user not found'});
            if(user.password === password){
                let accessToken = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn: '10s'});
                let refreshToken = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn: '12h'});
                res.cookie('refreshToken',refreshToken,{ httpOnly: true, sameSite: 'None', secure: true , maxAge: 24 * 60 * 60 * 1000 })
                res.cookie('accessToken',accessToken,{ httpOnly: true, sameSite: 'None', secure: true , maxAge: 24 * 60 * 60 * 1000 })
                return res.status(200).json({message:'signed in'});
            }else
                return res.status(400).json({message:'Wrong Password'});
    }
    catch(err){
        console.log("err creating user",err);
        next(err)
    }
};
 const refreshToken_cookie = async (req,res,next) => {
    if(req.headers.hasOwnProperty('cookie')){
        let refreshToken = req.cookies.refreshToken;
        // refreshToken = refreshToken.substring(0,refreshToken.length-1);
        jwt.verify(
            refreshToken,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(403).json({'message':'session expired'});
                }
                const accessToken = jwt.sign(
                    {
                        email: decoded.email
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '30s' }
                );
                const newRefreshToken = jwt.sign(
                    {
                        email: decoded.email
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '12h' }
                );
                res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
                res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                res.json({ message:'refreshed' });
            }
        );
     }
     else
         return res.status(403).json({'message':'session expired'});
};
 const GetUserDetailsFromCookie = async (req,res,next)=>{
    try {
        if(req.headers.hasOwnProperty('cookie')){
            const token = req.cookies.accessToken;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const users = [{email:"admin@gmail.com",name:"admin-name",password:"1234"}];
            var user =null;
            users.filter(element => {
                if(element.email === decoded.email)
                    user = element;
            });
            if(!user) 
                return res.status(403).json({'message':'session expired'});
            else
                return res.status(200).json({userData:{
                    name:user.name,
                    email:user.email,
                }});
        }else{
            return res.status(403).json({'message':'session expired'});
    }
    } catch (error) {
        console.log(error);
        next(error)
    }
}
 const DownloadFile = async (req,res,next)=>{
    try {
        res.download(`${__dirname}/abc.mp4`);
    } catch (error) {
        console.log(error);
    }
}
const UserAuthcheck = async (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        var currentTimestamp = new Date().getTime() / 1000;
        var IstokenNotExpired =  decoded.exp > currentTimestamp;
        return IstokenNotExpired;
    } catch (error) {
        console.log(error,'error');
        return error;
    }
}
module.exports = {UserAuthcheck,DownloadFile,GetUserDetailsFromCookie,refreshToken_cookie,login}