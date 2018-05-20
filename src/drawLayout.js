const drawSidebar = p5 => {
    p5.fill('grey')
    p5.rect(p5.width - 160, 0, 160, p5.height)
    p5.fill('white')
}

const drawBorder = p5 => {
    p5.noFill()
    p5.rect(0, 0, p5.width - 1, p5.height - 1)
    p5.fill('white')
}

export const drawLayout = p5 => {
    drawSidebar(p5)
    drawBorder(p5)
}
