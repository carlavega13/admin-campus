const {User}=require("../../db")
const axios=require("axios")
const enrolUser=async({domain,username,info})=>{
try {
    console.log(info);
    const user= await User.findOne({where:{username:username}})
  
    const token=await axios(`${domain}login/token.php?username=${user.username}&password=${user.password}&service=prueba`)

    const res=await axios(`${domain}/webservice/rest/server.php?wstoken=${token.data.token}&wsfunction=enrol_manual_enrol_users&moodlewsrestformat=json&enrolments[0][roleid]=${info.roleid}&enrolments[0][userid]=${info.userid}&enrolments[0][courseid]=${info.courseid}`)
    console.log(res.data);
return res.data
} catch (error) {
    console.log(error.message);
    return error.message
}
}
module.exports=enrolUser