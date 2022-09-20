import Authorization from "../../Api/Authorization";
import {AxiosRequestHeaders} from "axios";

export default function Header(auth = false, media = false): AxiosRequestHeaders {
    let headers: object = {
        'content-Type': media ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json',
    };
    if (auth) {
        headers = {...headers, ...Authorization()};
    }

    return <AxiosRequestHeaders>headers;
}
