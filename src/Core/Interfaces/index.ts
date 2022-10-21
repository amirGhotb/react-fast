import {AxiosError, AxiosResponse} from "axios";
import {Dispatch} from "react";

export interface MiddlewareType {
    [key: string]: {
        redirect: string,
        condition: () => boolean
    }
}

export interface ApiRouteType {
    name: string,
    url: string,
    method: 'post' | 'get' | 'delete' | 'put',
    auth: boolean,
    media?: boolean
}

export interface ApiInputType {
    apiName: string,
    entry?: object,
    onSuccess?: (body: any, response: AxiosResponse<any>) => void,
    onError?: (e: AxiosError<any>) => void,
    condition?: boolean
}

export interface ToastType {
    id?: number,
    text: string,
    type: 'danger' | 'warning' | 'info',
    time?: number
}

export interface ToastContextType {
    show: (content: ToastType) => void,
    hide: (id: number) => void,
    toasts: Array<ToastType>
}

export interface AppContextType {
    state: { [key: string]: any };
    dispatch: Dispatch<DispatchUpdateType | DispatchDeleteType>;
}

export interface DispatchInitFromStorageType {
    type: 'INIT_FROM_STORAGE',
}

export interface DispatchUpdateType {
    type: 'UPDATE',
    data: { [key: string]: any }
}

export interface DispatchDeleteType {
    type: 'DELETE',
    data: Array<string>
}

export interface ItemToStorageType {
    [key: string]: 'local' | 'session'
}

export interface InputProperties {
    type: 'text' | 'numberInteger' | 'numberFloat' | 'checkBox' | 'textArea' | 'select' | 'searchableSelect',
    required?: boolean,
    showCondition?: boolean,
    disabled?: boolean,
    value: any,
    setValue: (v: any) => void,
    otherAttribute?: object,
    isInvalid?: boolean,
    invalidFeedback?: string,
    label?: string,
    labelClass?: string,
    options?: Array<{
        text: string,
        value: any
    }>,
    validations?: [{
        condition: (value: any) => boolean,
        invalidFeedback: string
    }]
}

export interface CustomInputProperties {
    required?: boolean,
    showCondition?: boolean,
    disabled?: boolean,
    value: any,
    setValue: (v: any) => void,
    isInvalid?: boolean,
    invalidFeedback?: string,
    label?: string,
    labelClass?: string,
    view: (value: any, setValue: (v: any) => void, isInvalid?: boolean, invalidFeedback?: String) => JSX.Element
    validations?: [{
        condition: (value: any) => boolean,
        invalidFeedback: string
    }]
}

export interface FormProperties {
    submit: () => void,
    inputs: Array<InputProperties | CustomInputProperties>,
    class?: string,
    buttonsBoxClass?: string,
    buttons: Array<{
        text: string,
        onClick?: () => void,
        disabled?: boolean,
        class?: string,
        type: 'button' | 'submit',
    }>
}