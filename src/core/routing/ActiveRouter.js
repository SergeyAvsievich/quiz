export class ActiveRout {
    static get path() {
        return window.location.hash.slice(1)
    }

    static get params() {
        return window.location.hash.split('/')
    }
}