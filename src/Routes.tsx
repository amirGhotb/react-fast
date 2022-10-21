import Home from "./Views/Public/Home"
import {CGroup, CRoute} from "./Core/Routes/RouteSelf";
import AboutUs from "./Views/Public/AboutUs";
import PanelHome from "./Views/Panel/PanelHome";


function routes(): Array<CRoute | CGroup> {
    return [
        new CRoute({
            name: 'home',
            view: <Home/>,
            path: '',
        }),
        new CRoute({
            name: 'aboutUs',
            view: <AboutUs/>,
            path: '/about-us'
        }),
        new CGroup({
            prefix: 'panel', layoutName: 'panel', childes: [
                new CRoute({
                    path:'',
                    name: 'panelHome',
                    view: <PanelHome/>,
                }),
            ]
        })
    ]
}

export {
    routes
}
