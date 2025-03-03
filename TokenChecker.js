const jwt = require("jsonwebtoken");

function TokenChecker(AuthToken) {
    try {
        if(!!AuthToken){
        // console.log("Check Token -> ", AuthToken);
    
        const token = AuthToken.split(' ')[1];
        // console.log("Check Split Token -> ", token);
    
        //Authorization: 'Bearer TOKEN'
        if (!token) {
            return { success: false, status: 401, message: "Error! Token was not provided." };
        }
        else {
            //Decoding the token
            // return jwt.verify(token, process.env.JWT_SECRET_KEY,{algorithms:"HS256", ignoreExpiration: true });
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY,{algorithms:"HS256" });
            return { success: true, decoded };
        }}
        else
        {
            console.log("Check Token -> ", AuthToken);
            return { success: false, status: 406, message: "Undefined AuthToken" };
        }
    } catch (error) {
        return { success: false, status: 500, message: "Auth Token Error!!", error };
    }
}

module.exports = { TokenChecker }