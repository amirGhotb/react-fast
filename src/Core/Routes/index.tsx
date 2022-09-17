import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {routes} from "../../Routes";
import {CGroup, CRoute} from "./RouteSelf";
import NotFound from "../Views/NotFound";
import Layout from "../Layouts";
import Middleware from "../Middleware";

export default function (): JSX.Element {
    const routesList: Array<CRoute | CGroup> = routes();

    function recursiveList(list: Array<CRoute | CGroup>, parent: CGroup | null, parentPrefix = ''): any {
        return list.map((route: CRoute | CGroup) => makeRoute(route, parent, parentPrefix)).flat()
    }

    function makeRoute(route: CRoute | CGroup, parent: CGroup | null, parentPrefix = '') {
        let prefix = parentPrefix;
        if (route.constructor.name == 'CRoute') {
            return <Route key={route.constructor.name + '-' + Math.random()}
                          path={!(route instanceof CGroup) ? `${prefix}/${route.path}` : ''}
                          element={<Middleware name={route.middleware ?? (parent?.middleware ?? '')}>
                              <Layout
                                  name={parent?.layoutName ?? ''}>{!(route instanceof CGroup) ? route.view : <></>}</Layout>
                          </Middleware>}/>
        }
        if (!(route instanceof CRoute)) {
            prefix += '/' + route.prefix;
        }
        return recursiveList(!(route instanceof CRoute) ? route?.childes :[], (route instanceof CGroup)?route:null, prefix)
    }


    return <BrowserRouter>
        <Routes>
            {recursiveList(routesList, null)}
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
}

