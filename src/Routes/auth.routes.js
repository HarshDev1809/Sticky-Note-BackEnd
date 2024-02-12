const {signUp,signIn} = require("../Controllers/auth.controller")
const {verifySignUp,verifySignIn} = require("../Middlewares/auth.middleware");

module.exports = (app)=>{
    app.post("/auth/signup",[verifySignUp],signUp);
    app.post("/auth/signin",[verifySignIn],signIn);
}