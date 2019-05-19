const add = (a, b) => a.map((x, i) => x + b[i])
const sub = (a, b) => a.map((x, i) => x - b[i])
const mul = (x, c) => x.map(x => x * c)
const div = (x, c) => x.map(x => x / c)
const dot = (a, b) => a.reduce((p, c, i) => p + c * b[i], 0)
const crs = (a, b) =>
    [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
const len2 = x => dot(x, x)
const len = x => Math.sqrt(len2(x))
const unt = x => div(x, len(x))
const fnc = (x, f) => x.map(x => f(x))