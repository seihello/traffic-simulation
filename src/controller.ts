$(() => {
    const canvas = $("#app").children("canvas")[0].getContext("2d")!;
    canvas.beginPath()
    canvas.moveTo(50, 50)
    canvas.lineTo(400, 200)
    canvas.stroke()
})

