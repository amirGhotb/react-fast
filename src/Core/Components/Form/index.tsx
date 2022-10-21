import React, {useState} from "react";
import {CustomInputProperties, FormProperties, InputProperties} from "../../Interfaces";
import { useToast} from "../Toast";
import Input from "./Input";

export default function (property: FormProperties) {
    const toast = useToast();

    const [invalids, setInvalids] = useState({
        list: property.inputs.map(() => {
            return {
                isInvalid: false,
                invalidFeedback: ''
            }
        })
    });


    return <form className={property.class} onSubmit={(e) => {
        e.preventDefault()
        const invalidFeedbackList = invalids.list

        function checkValidations(input: InputProperties | CustomInputProperties) {
            return input.validations?.map(item => {
                return {
                    isInvalid: !item.condition(input.value),
                    invalidFeedback: item.invalidFeedback
                }
            }) ?? [];
        }

        property.inputs.forEach((item, index) => {
                if (item.required && !item.value) {
                    invalidFeedbackList[index].isInvalid = true;
                    invalidFeedbackList[index].invalidFeedback = 'please enter value';
                } else if (item.validations) {
                    const invalidsTemp = checkValidations(item).filter(x => x.isInvalid);
                    if (invalidsTemp.length > 0) {
                        invalidFeedbackList[index].isInvalid = true;
                        invalidFeedbackList[index].invalidFeedback = invalidsTemp[0].invalidFeedback
                    }
                } else {
                    invalidFeedbackList[index].isInvalid = false;
                }
            }
        )

        setInvalids({...invalids, list: invalidFeedbackList})

        if (invalidFeedbackList.filter((item: { isInvalid: boolean; }) => !item.isInvalid).length === invalidFeedbackList.length) {
            property.submit()
        } else {
            toast.show({
                text: 'form validation error',
                type: 'danger',
            })
        }
    }
    }>
        {property.inputs.map((input, index) => {
            return (input.showCondition ?? true) && <Input key={'input' + index} index={index} property={input}/>
        })}

        <div className={property.buttonsBoxClass}>
            {
                property.buttons.map((button, index) => {
                    return <button key={'btn-' + index} className={'btn ' + button.class}
                                   disabled={button.disabled ?? false} type={button.type}
                                   onClick={() => button.onClick ? button.onClick() : null}>{button.text}</button>
                })
            }
        </div>
    </form>
}