function basis3(z) {
    var z = unt(z)
    var x = unt(crs(z, [0, 0, 1]))
    var y = unt(crs(x, z))
    return {
        x: x,
        y: y,
        z: z
    }
}

function project3(pos, dir, points) {
    base = basis3(dir)
    return points.map(point => {
        // Convert to pos-center space
        point = sub(point, pos)
        // When point is behind pos
        if (dot(point, dir) < 0) return

        point_ = mul(point, len2(dir) / dot(dir, point))
        var x = dot(point_, base.x)
        var y = dot(point_, base.y)
        var z = len(point)
        return [x, y, z]
    })
}