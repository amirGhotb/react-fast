import {AxiosError} from "axios";

export default function ErrorHandle(error: AxiosError) {
    if (error.response?.status === 500) {
        console.log('failed')
    }
}
