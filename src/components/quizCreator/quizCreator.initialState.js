import {createformControls} from "./quizCreator.form";

export const initialState = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createformControls()
}