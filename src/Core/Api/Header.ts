import Authorization from "../../Api/Authorization";

export default function Header(auth = false, media = false) {
    let headers: { [key: string]: any } = {
        'content-Type': media ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json',
    };
    if (auth) {
        headers = {...headers, ...Authorization()};
    }

    return headers;
}
