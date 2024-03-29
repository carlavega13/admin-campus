import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../Redux/actions";
import s from "../../../css/AdminCourses.module.css";
import { BsWhatsapp } from "react-icons/bs";
import { GrMailOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmailPopOut from "../../EmailPopOut";
import { DataGrid } from "@mui/x-data-grid";
import loading from "../../../public/images/AdminHome/loading-loading-gif.gif";
import { ToastInfo ,notifyError} from "../../../functions/toast";
import {  ThemeProvider } from '@mui/material/styles';
import customTheme from "../../../functions/tableTheme";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, user } = useSelector((res) => res);
  const [flag, setFlag] = useState({
    state: false,
    to: [],
  });
  const [teacher, setTeacher] = useState([]);
  if (courses?.length === 0) {
    dispatch(getCourses({ domain: user.domain, token: user.token }));
    return (
      <div className={s.divLoading}>
        <img src={loading} alt="loading" className={s.loading} />
      </div>
    );
  }
  if (courses === "No hay cursos") {
    return (
      <div>
        <h1>No hay cursos que mostrar</h1>
        <button onClick={() => navigate("/createCourse")}>Crea un curso</button>
      </div>
    );
  }

  const columns = [
    {
      field: "course",
      headerName: "CURSOS",
      width: 300,
      description: "Haga click en un nombre para ver el detalle del curso",
    },
    {
      field: "usersamount",
      headerName: "ESTUDIANTES",
      description: "CANTIDAD DE ESTUDIANTES",
      width: 150,
    },
    {
      field: "teacher",
      headerName: "PROFESOR",
      width: 300,
      renderCell: (params) => {
        const phoneNumber = params.row.phone1;
        if (phoneNumber) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "300px",
              }}
            >
              <p>{params.row.teacher}</p>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWhatsapp style={{ color: "#2f3367" }} />
              </a>
            </div>
          );
        }
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "300px",
            }}
          >
            <p>{params.row.teacher ? params.row.teacher : ""}</p>
          </div>
        );
      },
    },
  ];
  const rows = courses?.map((course) => {
    return {
      id: course.id,
      course: course.name,
      usersamount: course.enrolledPeople.length,
      teacher: course.teacher[0] ? course.teacher[0].fullname : "",
      phone1:
        course.teacher[0] && course.teacher[0].phone1
          ? course.teacher[0].phone1
          : "",
    };
  });

  const handlerSendSelected = () => {
    if (teacher.length === 0) {
      notifyError("Debes selecionar al menos un usuario");
    } else {
      const usersInfo = teacher
        .map((id) => {
          let cour = courses.find((cours) => cours.id == id);

          if (cour.teacher.length >= 1) {
            return cour.teacher[0].email;
          }
          return;
        })
        .filter((e) => e);

      setFlag({
        state: true,
        to: usersInfo,
      });
    }
  };
  return (
    <div className={s.container}>
      <ToastInfo/>
      <div className={s.btnContainer}>
             <button className={s.btnCreate}
        onClick={() => navigate("/createCourse")}>
        Crear curso
      </button>
      </div>
 
      <div>
        <ThemeProvider theme={customTheme}>
          <DataGrid
          className={s.containerDataGrid}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          pageSizeOptions={[6, 10, 40, 50]}
          checkboxSelection
          onRowSelectionModelChange={(teacher) => {
            setTeacher(teacher);
          }}
          onCellClick={(params, e) => {
            if (params.row.usersamount >= 1) {
              if (params.field === "course") {
                navigate(`/courseDetail/${params.id}`);
              }
            }
          }}
        />
        </ThemeProvider>
 
      </div>
      <button onClick={handlerSendSelected} className={s.btnEmails}>
        {`Enviar email a todos los usuarios seleccionados (${teacher.length})`}
      </button>
      {flag.state ? (
        <EmailPopOut to={flag.to} flag={flag.state} setFlag={setFlag} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminCourses;