import axios from "@/axios/axios-quiz"
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../types"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }

        const apiKey = 'AIzaSyBcTuT3KaYbzMs3kzeVqjbjLxicxTkgdeg'

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`

        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }

        const response = await axios.post(url, authData)

        const data = response.data
        const expirationDate = new Date(new Date()
                .getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT,
    }
}

export function authSuccess(token) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_SUCCESS,
        token
    }
}