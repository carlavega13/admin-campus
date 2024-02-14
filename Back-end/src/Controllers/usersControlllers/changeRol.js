const {User}=require("../../db")
const changeRol=async(userInfo)=>{
try {
    const user=await User.findOrCreate({
        where:{id:userInfo.userid},
        defaults:{username:userInfo.username,
            rol:userInfo.rol,
            isSuperAdmin:userInfo.isSuperAdmin

        }
    }).then(([user, created])=>{
if(!created){

user.update(userInfo)
}
    })


    return user
} catch (error) {
    console.log(error.message);
    throw new Error(error.message)
}
}
module.exports=changeRol