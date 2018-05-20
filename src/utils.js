import { origWidth, origHeight } from './constants'

// defer is a way to resolve a promise outside of the promise definition
export const defer = () => {
    let res, rej
    const promise = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
    })

    promise.resolve = res
    promise.reject = rej
    return promise
}

export const getRandomColor = () => {
    let color = '#'
    for (var i = 0; i < 6; i++) color += '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
    return color
}

export const xScale = p5 => p5.width / origWidth
export const yScale = p5 => p5.height / origHeight
