import {AuthMiddleware} from "./AuthMiddleware";

const Middlewares:{[key:string]:(children: JSX.Element) => JSX.Element} = {
    auth: AuthMiddleware,
}

export default Middlewares;
