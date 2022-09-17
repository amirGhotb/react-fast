import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../Storage/AppContext';
import axios, {AxiosError, AxiosResponse} from 'axios';
import PreProcess from "./PreProcess";
import BodyProcess from "../../Api/BodyProcess";
import ErrorHandle from "../../Api/ErrorHandle";

const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export interface ApiRouteType {
    name: string,
    url: string,
    method: 'post' | 'get' | 'delete' | 'put',
    auth: boolean,
    media?: boolean
}

export interface AuthorizationType {
    [key: string]: string
}

interface ApiInput {
    apiName: string,
    entry?: object,
    onSuccess?: (body: any, response: AxiosResponse<any>) => void,
    onError?: (e: AxiosError<any>) => void,
    condition?: boolean
}

export default function (input: ApiInput, watch: Array<any>) {
    const [data, setData] = useState([{}, '']);
    const context = useContext(AppContext)
    const setSpinner = (active = false) => {
        context.dispatch({
            type: 'UPDATE',
            data: {spinner: active}
        })
    }
    const api = PreProcess(input.apiName, input.entry ?? {})
    const condition = input.condition === undefined ? true : input.condition

    useEffect(() => {
        if (condition) {
            setSpinner(true)
            setData([{}, apiStates.LOADING]);
            axios(api).then((response) => {
                setData([
                    BodyProcess(response),
                    apiStates.SUCCESS]);
                if (input.onSuccess) {
                    input.onSuccess(BodyProcess(response), response);
                }
                return response.data;
            }).catch((e) => {
                if (input.onError) {
                    input.onError(e);
                }
                ErrorHandle(e)
            }).finally(() => {
                setSpinner(false)
            });
        }
    }, watch);

    return data;
}
