import {MiddlewareType} from "../Core/Interfaces";

export default function Middlewares(): MiddlewareType {
    // const toast = useToast();
    return {
        auth: {
            redirect: 'panelHome',
            condition: () => {
                // toast.show({text: 'You do not have access to this page', type: 'warning'})
                return false
            }
        },
    }
}

