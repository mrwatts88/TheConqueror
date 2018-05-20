// defer is a way to resolve a promise outside of the promise definition
export const defer = () => {
    let res, rej;

    const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });

    promise.resolve = res;
    promise.reject = rej;

    return promise;
}

export const xScale = p5 => p5.width / 900;
export const yScale = p5 => p5.height / 575;