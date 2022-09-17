import {routes} from "../../Routes";

class CRoute {
    public name: string;
    public view: JSX.Element;
    public path: string;
    public exact: boolean;
    public middleware: string;

    constructor(input: { name: string, view: JSX.Element, path: string, exact?: boolean, middleware?: string }) {
        this.name = input.name;
        this.path = input.path;
        this.view = input.view;
        this.exact = input.exact ?? true;
        this.middleware = input.middleware ?? '';
    }
}

class CGroup {
    public prefix: string;
    public middleware: string;
    public layoutName: string;
    public childes: Array<CRoute | CGroup>

    constructor(input: { prefix: string, middleware?: string, layoutName?: string, childes: Array<CRoute | CGroup> }) {
        this.prefix = input.prefix;
        this.layoutName = input.layoutName ?? '';
        this.middleware = input.middleware ?? '';
        this.childes = input.childes;
    }
}


function recursiveList(list: Array<CRoute | CGroup>, parent: CGroup | null, parentPrefix = '', routeName: string): any {
    return list.map((route: CRoute | CGroup) => makeRoute(route, parent, parentPrefix, routeName)).flat()
}

function makeRoute(route: CRoute | CGroup, parent: CGroup | null, parentPrefix = '', routeName: string) {
    let prefix = parentPrefix;
    if (route.constructor.name == 'CRoute' && !(route instanceof CGroup) && route.name === routeName) {
        return !(route instanceof CGroup) ? prefix + route.path : '';
    } else if (route.constructor.name == 'CGroup') {
        if (!(route instanceof CRoute)) {
            prefix += '/' + route.prefix;
        }
        if (!(route instanceof CRoute)) {
            return recursiveList(route?.childes, route, prefix, routeName);
        }
        return '';
    }
    return '';
}


function getRoutePath(routeName: string): string {
    const list: Array<CRoute | CGroup> = routes()
    return recursiveList(list, null, '', routeName).filter((item: string) => item !== '')[0] ?? ''
}

export {
    CRoute, CGroup, getRoutePath
}
