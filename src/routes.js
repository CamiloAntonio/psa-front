import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import ToDo from  "views/ToDo.js"

import Recursos from "views/ComponentesSquads/Recursos"
import Horas from "views/ComponentesSquads/Horas";
import Proyectos from "views/ComponentesSquads/proyectos/proyectos";
import routesProyectos from "routesProyectos";
import routesSoporte from "routesSoporte";

var routes = [
  {
    path: "/recursos",
    name: "Recursos",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Recursos,
    layout: "/admin",
  },
  {
    path: "/horas",
    name: "Carga de Horas",
    rtlName: "ساعات التحميل",
    icon: "tim-icons icon-time-alarm",
    component: Horas,
    layout: "/admin",
  }
  // {
  //   path: "/notifications",
  //   name: "Alertas",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "Mensajeria",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Facturacion",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Soporte",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
  // {
  //   path: "/todo",
  //   name: "Todo",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: ToDo,
  //   layout: "/admin",
  // },
];

routes = routes.concat(routesSoporte,routesProyectos)

export default routes;
