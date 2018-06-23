export function debounce(fn, delay) {
    let timer = null
    return function () {
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(args)
        }, delay)
    }
}

export function on(el, eventName, handle, bubble = false) {
    el.addEventListener(eventName, handle, bubble)
}

export function off(el, eventName, handle, bubble = false) {
    el.removeEventListener(eventName, handle, bubble)
}
