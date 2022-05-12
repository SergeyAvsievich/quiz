export function capitalize(string){
    if (typeof string !== 'string'){
        return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function storage(key, data) {
    if (!data) {
        console.log('Нет данных!!!')
        return JSON.parse(localStorage.getItem(key))
    }

    localStorage.setItem(key, JSON.stringify(data))
}

// с map, set и подобными сд работать не будет!
export function isEqual(a, b){
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}