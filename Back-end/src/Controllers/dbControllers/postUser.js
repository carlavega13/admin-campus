const {User} = require("../../db");

const postUser=async(user)=>{
    console.log(user);
try {
    if(typeof user.username==="string" && typeof user.password==="string"){
        const response=await User.create(user)
        return response
    }
} catch (error) {
    return error.message
}
}
module.exports=postUser