//Return convert function that convert point from mathematical-position to canvas-position
function getConvertFunction(cnv, scale) {
    const hWidth = cnv.width / 2
    const hHeight = cnv.height / 2
    const func = function toCnvPos2D(point) {
        if (!point) return
        point = mul(point, scale)
        point[0] += hWidth
        point[1] = hHeight - point[1]
        return point
    }
    return func
}

//Draw line from canvas
function drawLine(ctx, a, b) {
    ctx.moveTo(a[0], a[1])
    ctx.lineTo(b[0], b[1])
}

//2D graph
function getGraph2D(canvas, scale = 32) {
    const convertFunction = getConvertFunction(canvas, scale)
    return {
        cnv: canvas,
        ctx: canvas.getContext("2d"),
        scale: scale,
        lines: [],
        cvt: convertFunction,
        render: function () {
            this.ctx.beginPath()
            this.lines.forEach(line => {
                cvt = line.map(x => this.cvt(x))
                for (var i = 0; i < cvt.length - 1; i++) {
                    if (cvt[i] && cvt[i + 1]) drawLine(this.ctx, cvt[i], cvt[i + 1])
                }
            })
            this.ctx.stroke()
        },
        renderWidth: function () {
            this.lines.forEach(line => {
                cvt = line.map(x => this.cvt(x))
                for (var i = 0; i < cvt.length - 1; i++) {
                    this.ctx.beginPath()
                    this.ctx.lineWidth = cvt[i][2]
                    if (cvt[i] && cvt[i + 1]) drawLine(this.ctx, cvt[i], cvt[i + 1])
                    this.ctx.stroke()
                }
            })
        },
        clear: function () { this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height) }
    }
}

//3D graph
function getGraph3D(canvas, scale = 32) {
    const convertFunction = getConvertFunction(canvas, scale)
    return {
        //Vars
        cnv: canvas,
        ctx: canvas.getContext("2d"),
        scale: scale,
        lines: [],
        dots: [],
        strs: [],
        camera: [[1, 1, 1], [1, 1, 1]],
        cvt: convertFunction,

        //Setter
        setCameraPos: function (pos) { this.camera[0] = pos },
        setCameraDir: function (dir) { this.camera[1] = dir },
        setScale: function (scale) { this.cvt = getConvertFunction(this.cnv, scale) },

        //Render
        project: function (points) { return project3(this.camera[0], this.camera[1], points).map(x => this.cvt(x)) },
        render: function () {
            this.ctx.beginPath()

            //Draw lines
            this.lines.forEach(line => {
                cvt = this.project(line)
                for (var i = 0; i < cvt.length - 1; i++) {
                    if (cvt[i] && cvt[i + 1]) drawLine(this.ctx, cvt[i], cvt[i + 1])
                }
            });

            //Draw dots
            this.project(this.dots).forEach(dot => {
                if (!dot) return
                this.ctx.moveTo(dot[0], dot[1])
                this.ctx.arc(dot[0], dot[1], 200 / dot[2], 0, Math.PI * 2)
            })

            //Draw texts
            this.strs.forEach(str => {
                var pos = this.project([str[0]])[0]
                if (!pos) return
                if (str[2]) this.ctx.font = Math.round(3000 / pos[2]) + 1 + 'px Arial'
                this.ctx.fillText(str[1], pos[0], pos[1])
            })
            this.ctx.stroke()
        },
        clear: function () {
            this.ctx.fillStyle = '#FFFFFF'
            this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
            this.ctx.fillStyle = '#000000'
            // this.ctx.stroke()
        }
    }
}