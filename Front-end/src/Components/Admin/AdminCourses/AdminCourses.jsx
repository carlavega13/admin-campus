import { useDispatch, useSelector } from "react-redux"
import { getCourses } from "../../../Redux/actions";
import s from "../../../css/AdminCourses.module.css"
import { BsWhatsapp } from 'react-icons/bs';
import { GrMailOption } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
const AdminCourses=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {courses,user}=useSelector(res=>res)
    if(courses.length===0){
        dispatch(getCourses({domain:user.domain,token:user.token}))
        return(
            <>
            LOADING!!!!!!!!!!!!
            </>
        )
    }

return(
    <div className={s.box}>
    {
        courses?.map((course)=>{
          return (
            <div  className={s.row}>
            <div onClick={()=>navigate(`courseDetail/${course.id}`)}>{course?.name}</div>
            <div>{course?.enrolledPeople.length}</div>
            <div>
                {course?.teacher.map(tea=>{

                       return(<div>{tea.fullname}<GrMailOption/>{tea.phone1?<a href={`https://wa.me/${tea.phone1}`}><BsWhatsapp/></a>:""}</div>)
              
                })}
            </div>
            </div>
          )
        })
    }
    </div>
)
}
export default AdminCourses