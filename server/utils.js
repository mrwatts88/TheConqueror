exports.getRandomColor = () => {
    let color = '#'
    for (var i = 0; i < 6; i++)
        color += '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
    return color
}
