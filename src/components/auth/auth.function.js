import {Input} from "../ui/input/Input"

export function renderInputs(validateState) {
    const inputs = Object.keys(validateState.formControls)
        .map((controlName, index) => {
            const control = validateState.formControls[controlName]
            return new Input({
                type: control.type,
                value: control.value,
                valid: control.valid,
                touched: control.touched,
                shouldValidate: !!control.validation,
                errorMessage: control.errorMessage,
                // onChange
            }).toHTML()
        })

    return inputs
}