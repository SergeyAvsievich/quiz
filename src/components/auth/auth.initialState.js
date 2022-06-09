export const initialState = {
    isFormValid: false,
    formControls: {
        email: {
            value: '',
            type: 'email',
            label: 'Введите email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            },
        },
        password: {
            value: '',
            type: 'password',
            label: 'Введите пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            },
        },
    }
}