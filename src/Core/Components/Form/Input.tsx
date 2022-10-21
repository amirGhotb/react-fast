import React from "react";
import {persianNumberToEnglish} from "../../../Helper";
import {CustomInputProperties, InputProperties} from "../../Interfaces";

export default function Input({property, index}: {
    property: InputProperties | CustomInputProperties,
    index?: number
}) {
    function inputCreate(): JSX.Element {
        switch ("type" in property ? property.type : 'custom') {
            case 'text':
                return <input key={'text-' + index}
                              type="text"
                              value={property.value}
                              className={`form-control ${property.isInvalid ? 'is-invalid' : ''}`}
                              required={property.required}
                              disabled={property.disabled ?? false}
                              onChange={(e) => {
                                  property.setValue(e.target.value)
                              }}/>
            case 'numberFloat':
                return <input key={'numberFloat-' + index}
                              type="text"
                              value={property.value}
                              className={`form-control ${property.isInvalid ? 'is-invalid' : ''}`}
                              required={property.required}
                              disabled={property.disabled ?? false}
                              onChange={(e) => {
                                  const temp = persianNumberToEnglish(e.target.value)
                                  if (!isNaN(parseFloat(temp)) || temp === '') {
                                      property.setValue(temp)
                                  }
                              }}/>
            case 'numberInteger':
                return <input key={'numberInteger-' + index}
                              type="text"
                              value={property.value}
                              className={`form-control ${property.isInvalid ? 'is-invalid' : ''}`}
                              required={property.required}
                              disabled={property.disabled ?? false}
                              onChange={(e) => {
                                  const temp = persianNumberToEnglish(e.target.value)
                                  if (Number(temp) || temp === '') {
                                      property.setValue(temp.toString().replace('.', ''))
                                  }
                              }}/>
            case "checkBox":
                return <div className="form-check has-validation" key={'checkInput-' + index}>
                    <input type="checkbox" disabled={property.disabled}
                           className={`form-check-input ${property.isInvalid ? 'is-invalid' : ''}`}
                           value={property.value}
                           onChange={(e) => {
                               property.setValue(e.target.checked)
                           }}/>
                    <label className={`form-check-label ${property.labelClass ?? ''}`}
                           htmlFor={'checkInput-' + index}>{property.label}</label>
                    {
                        property.isInvalid && <p className={'invalid-feedback'}>{property.invalidFeedback}</p>
                    }
                </div>
            case 'textArea':
                return <textarea disabled={property.disabled} name="" key={'textArea-' + index}
                                 className={`form-control ${property.isInvalid ? 'is-invalid' : ''}`}
                                 value={property.value}
                                 onChange={(e) => property.setValue(e.target.value)}>

                </textarea>
            case 'select':
                return <select key={'select-' + index} disabled={property.disabled ?? false}
                               className={`form-control ${property.isInvalid ? 'is-invalid' : ''}`}
                               value={property.value}
                               onChange={(e) => property.setValue(e.target.value)}>
                    {
                        "options" in property ? property.options?.map((option, index) => {
                            return <option key={'option' + index} value={option.value}>{option.text}</option>
                        }) : <></>
                    }
                </select>
            // case 'searchableSelect':
            //     return <SearchableSelect options={input.options} classStyle={`${invalid ? 'is-invalid' : ''}`}
            //                              setValue={input.setValue} value={input.value}/>
            case 'custom':
                return "view" in property ? property.view(property.value, property.setValue, property.isInvalid, property.invalidFeedback) : <></>
            default:
                return <></>
        }
    }

    if ("type" in property) {

        return <label key={'label-' + index} htmlFor="" className={`${property.labelClass ?? ''} has-validation p-1`}>
            {property.label}
            {inputCreate()}
            {
                property.isInvalid &&
                <p key={'label-validation-' + index} className={'invalid-feedback mb-0'}>{property.invalidFeedback}</p>
            }
        </label>
    } else {
        return inputCreate();
    }
}