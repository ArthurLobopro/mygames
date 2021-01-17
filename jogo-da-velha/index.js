function draw_x(id) {
    const canvas = document.getElementById(id)
    const ctx = canvas.getContext('2d')
    const x = new Image()
    x.src='midia/x.png'
    ctx.drawImage(x, 10 , 10)
}
function draw_o(id) {
    const canvas = document.getElementById(id)
    const ctx = canvas.getContext('2d')
    const o = new Image()
    o.src='midia/o.png'
    ctx.drawImage(o, 8, 7)
}