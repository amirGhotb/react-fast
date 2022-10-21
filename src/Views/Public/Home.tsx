import React, {useState} from "react";
import Form from "../../Core/Components/Form";
import {useToast} from "../../Core/Components/Toast";

export default function Home(): JSX.Element {
    // const {state, dispatch} = useContext(AppContext);
    // const [flag, setFlag] = useState(false);
    // const context = useContext(AppContext)
    const toast = useToast();
    // const navigate = useNavigate();
    // Api({
    //         apiName: 'employees',
    //         onSuccess: (body, response) => {
    //             console.log(body, response);
    //         },
    //         condition: flag
    //     }, [flag]
    // )
    const [text, setText] = useState('');

    return (
        <div>
            <Form inputs={[
                {
                    type: "numberFloat",
                    value: text,
                    required: true,
                    setValue: (v) => {
                        setText(v)
                    },
                }
            ]} submit={() => {
                console.log('aa');
            }} buttons={[
                {
                    type: 'submit',
                    text: 'hello',
                    class: 'btn-success'
                }
            ]}/>
        </div>
    )
}
