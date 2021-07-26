
import HoursView from "views/ComponentesSquads/hours/HoursView";
import HoursEdit from "views/ComponentesSquads/hours/HoursEdit";
import HoursCreate from "views/ComponentesSquads/hours/HoursCreate";

var routes = [
  {
    path: "/hours/create/:id/",
    name: "Carga de Horas",
    rtlName: "ساعات التحميل",
    icon: "tim-icons icon-time-alarm",
    component: HoursCreate,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/hours/edit/:id/",
    name: "Edición de Horas",
    rtlName: "ساعات التحميل",
    icon: "tim-icons icon-time-alarm",
    component: HoursEdit,
    layout: "/admin",
    redirect: true,
  },
  {
      path: "/hours/",
      name: "Visualización de Horas",
      rtlName: "ساعات التحميل",
      icon: "tim-icons icon-time-alarm",
      component: HoursView,
      layout: "/admin",
  },
];

export default routes;