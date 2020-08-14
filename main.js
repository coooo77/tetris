const view = {
  creatGirds() {
    const grid = document.querySelector('.grid')
    let girds = ''
    for (let i = 0; i < 200; i++) {
      girds += '<div></div>'
    }
    grid.innerHTML = girds
  }
}

view.creatGirds()