import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {ToastContextType, ToastType} from "../Interfaces";

export const ToastContext = createContext<ToastContextType>({
    show: (content: ToastType) => null,
    hide: (id: number) => null,
    toasts: []
})

export default function ToastProvider({children}: { children: JSX.Element }): JSX.Element {
    const [toasts, setToasts] = useState<Array<ToastType>>([]);
    const stateRef = useRef<Array<ToastType>>(toasts);

    const show = (content: ToastType) => {
        const id = Math.random();
        setToasts([...toasts, {...content, id}])
    };
    const hide = (id: number) => {
        setToasts([...stateRef.current.filter((toast) => toast.id !== id)])
    }

    useEffect(() => {
        stateRef.current = toasts;
    }, [toasts]);

    return <ToastContext.Provider value={{show, hide, toasts}}>
        <div className={'toast-group'}>
            {
                toasts.map((item: ToastType) => {
                    return <Toast key={item.id} content={item}/>
                })
            }
        </div>
        {children}
    </ToastContext.Provider>
}

export function Toast({content}: { content: ToastType }) {
    const context = useContext(ToastContext)
    useEffect(() => {
        const timeout = setTimeout(() => {
            context.hide(content.id ?? 0)
        }, content.time ?? 3000);
        return () => clearTimeout(timeout);
    }, [content.id]);

    return <div className={`toast-box fadeInUp toast-${content.type}`}>
        {content.text}
    </div>
}

export const useToast = () => useContext(ToastContext);
