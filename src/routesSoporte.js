import Soporte from "views/ComponentesSquads/soporte/Soporte.js"
import CreacionTicket from "views/ComponentesSquads/soporte/CreacionTicket.js"
import Tickets from "views/ComponentesSquads/soporte/Tickets";
import EdicionTicket from "./views/ComponentesSquads/soporte/EdicionTicket";
import VisualizacionTicket from "./views/ComponentesSquads/soporte/VisualizacionTicket";


var routes = [
    {
      path: "/soporte/tickets/:product/:version/creacion_ticket",
      name: "Creacion de Tickets",
      component: CreacionTicket,
      layout: "/admin",
      redirect: true
    },
    {
      path: "/soporte/tickets/:product/:version/:ticketId/edicion_ticket",
      name: "Edicion de Tickets",
      component: EdicionTicket,
      layout: "/admin",
      redirect: true
    },
    {
      path: "/soporte/tickets/:product/:version/:ticketId",
      name: "Visualizacion de Tickets",
      component: VisualizacionTicket,
      layout: "/admin",
      redirect: true
    },
    {
      path: "/soporte/tickets/:product/:version",
      name: "Tickets",
      icon: "tim-icons icon-paper",
      rtlName: "خرائط",
      component: Tickets,
      layout: "/admin",
        redirect: true
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