// Sum of two vector
const add = (a, b) => a.map((x, i) => x + b[i])
// Sub of two vector
const sub = (a, b) => a.map((x, i) => x - b[i])
// Constant times
const mul = (x, c) => x.map(x => x * c)
// Constant divide
const div = (x, c) => x.map(x => x / c)
// Dot product = Inner product
const dot = (a, b) => a.reduce((p, c, i) => p + c * b[i], 0)
// Cross product = Outer product
const crs = (a, b) =>
    [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
// Elemental wise product
const ewp = (a, b) => a.map((x, i) => x * b[i])
// Square of length
const len2 = x => dot(x, x)
// Legth of vector
const len = x => Math.sqrt(len2(x))
// Unit vector of given direction
const unt = x => div(x, len(x))
// Apply function to each element of given vector
const fnc = (x, f) => x.map((x, i) => f(x, i))