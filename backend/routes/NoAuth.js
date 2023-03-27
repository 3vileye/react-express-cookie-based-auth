const express = require('express');
const router = express.Router();
const { Usercookiecheck } = require('../middlewares/reqCheck.mdlwre');
const userCtrl = require('../controllers/user.ctrl');

/* auth routes*/

router.post("/login1", userCtrl.login);
router.get("/refreshToken_cookie", userCtrl.refreshToken_cookie);
router.get("/world", Usercookiecheck,(req,res)=>{
	res.send('hello');
});
router.post("/GetUserDetailsFromCookie",Usercookiecheck, userCtrl.GetUserDetailsFromCookie);

router.get("/download/file",Usercookiecheck,userCtrl.DownloadFile)

module.exports = router;