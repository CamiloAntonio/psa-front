import Proyectos from "views/ComponentesSquads/proyectos/proyectos";
import Tareas from "views/ComponentesSquads/proyectos/tareas";
import CrearProyecto from "views/ComponentesSquads/proyectos/crearProyecto";
import Proyecto from "views/ComponentesSquads/proyectos/proyecto";
import CrearTarea from "views/ComponentesSquads/proyectos/crearTarea";



var routes = [
  {
    path: "/proyectos",
    name: "Proyectos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Proyectos,
    layout: "/admin",
  },
  {
    path: "/tareas",
    name: "Tareas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Tareas,
    layout: "/admin",
  },
  {
    path: "/crear-proyecto",
    name: "Crear Proyecto",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CrearProyecto,
    layout: "/admin",
    redirect: true
  },
  {
    path: "/proyecto/:id",
    name: "Proyecto",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Proyecto,
    layout: "/admin",
    redirect: true
  },
  {
    path: "/crear-tarea/",
    name: "Crear Tarea",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CrearTarea,
    layout: "/admin",
    redirect: true
  },


];
export default routes;
