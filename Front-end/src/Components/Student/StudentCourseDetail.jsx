import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentGrades } from "../../Redux/actions";
import { useEffect, useState } from "react";
import s from "../../css/StudentCourseDetail.module.css"
import loading from "../../public/images/AdminHome/loading-loading-gif.gif"
const StudentCourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promise, setPromise] = useState(false);
  let course = useSelector((state) => state.courses);
  let user = useSelector((state) => state.user);
  course = course?.find((c) => c.id == id);
  if (!course?.grades) {
    dispatch(
      getStudentGrades({
        domain: user.domain,
        token: user.token,
        courseid: course.id,
        userid: user.idMoodle,
      })
    ).then((res) => setPromise(true));
    return <div className={s.containerLoading}>
    <img src={loading} alt="Cargando..."className={s.loadingIcon}/>
  </div>
  }
 

  return (
    <div className={s.container}>
      <button className={s.btn} onClick={() => navigate("/studentHome")}>HOME</button>
      <h1>Calificaciones del curso: {`${course?.fullname}`}</h1>
      {course?.grades?.map((act) => {
        return (
          <div
            key={act.id}
            className={s.info}
          >
            <p>{act.itemname ? act.itemname : "Calificación final"}</p>
            <p>{act.graderaw ? act.graderaw : "No realizado"}</p>
          </div>
        );
      })}
    </div>
  );
};
export default StudentCourseDetail;