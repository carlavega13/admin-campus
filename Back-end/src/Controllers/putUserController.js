const{User}=require("../db")
const putUserController=async({firstName,lastName,DNI,phone,email,id,domain})=>{
try {
    const userToEdit= await User.findOne({where:{id:id}})
    let res= {
        firstname:firstName,
        lastname:lastName,
        fullname:`${firstName} ${lastName}`,
        phone:phone,
        email:email,
       
    }
    if(DNI&&DNI.length>5){

//   return {
//     id:res.id,
//     username:res.username,
//     token:res.token,
//     rol:res.rol,
//     isSuperAdmin:res.isSuperAdmin,
//      firstname:res.firstname,
//      lastname:res.lastname,
//      phone:res.phone,
//      email:res.email,
//      fullname:`${res.firstname} ${res.lastname}`,
//      domain:domain
//    }
    }else{

        let res1= await userToEdit.update({
            firstname:firstName,
            lastname:lastName,
            phone:phone,
            email:email,
            fullname:`${firstName} ${lastName}`,
           
        })
        
       console.log(userToEdit);
               return {
                id:res1.id,
                username:res1.username,
                token:res1.token,
                rol:res1.rol,
                isSuperAdmin:res1.isSuperAdmin,
                 firstname:res1.firstname,
                 lastname:res1.lastname,
                 phone:res1.phone,
                 email:res1.email,
                 fullname:`${res1.firstname} ${res1.lastname}`,
                 domain:domain
               }
    }
} catch (error) {
    throw new Error(error.message) 
}
}
module.exports=putUserController