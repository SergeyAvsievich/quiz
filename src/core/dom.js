// тут мы создаем библеотеку наподобие jquery

class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback){
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback){
        this.$el.removeEventListener(eventType, callback)
    }

    append(node){
        if (node instanceof Dom){
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    // el.css({background: 'blue', color: 'red'})

    css(styles = {}){
        Object.entries(styles).forEach(([key, val]) => {
            this.$el.style[key] = val
        })
    }

    findAll(selector){
        return this.$el.document.querySelectorAll(selector)
    }

    findOne(selector){
        return this.$el.document.querySelector(selector)
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}