import Soporte from "views/ComponentesSquads/soporte/Soporte.js"
import CreacionTicket from "views/ComponentesSquads/soporte/CreacionTicket.js"
import Tickets from "views/ComponentesSquads/soporte/Tickets";
import EdicionTicket from "./views/ComponentesSquads/soporte/EdicionTicket";


var routes = [
    {
        path: "/soporte/creacion_ticket",
        name: "Creacion de Tickets",
        component: CreacionTicket,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/soporte/edicion_ticket",
        name: "Edicion de Tickets",
        component: EdicionTicket,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/soporte/tickets",
        name: "Tickets",
        icon: "tim-icons icon-paper",
        rtlName: "خرائط",
        component: Tickets,
        layout: "/admin",
      },
      {
        path: "/soporte",
        name: "Soporte",
        rtlName: "خرائط",
        icon: "tim-icons icon-pin",
        component: Soporte,
        layout: "/admin",
      }
];

export default routes;