const view = {
  creatGirds() {
    const grid = document.querySelector('.grid')
    let girds = ''
    for (let i = 0; i < 200; i++) {
      girds += '<div></div>'
    }
    grid.innerHTML = girds
  },
  draw() {
    let squares = Array.from(document.querySelectorAll('.grid div'))
    let current = model.currentTetromino()
    current.forEach(index => squares[model.currentPosition + index].classList.add('tetromino'))
  }
}

const controller = {
  displayGame() {
    view.creatGirds()
    view.draw()
  }
}

const model = {
  tetrominoes() {
    const width = 10
    const tetrominoL = [
      [1, width + 1, width * 2 + 1, 2],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width + 1, width * 2 + 1, width * 2],
      [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const tetrominoZ = [
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1]
    ]
    const tetrominoT = [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1]
    ]
    const tetrominoO = [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1]
    ]
    const tetrominoI = [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3]
    ]
    return [
      tetrominoL,
      tetrominoZ,
      tetrominoT,
      tetrominoO,
      tetrominoI
    ]
  },
  currentPosition: 4,
  currentRotation: 0,
  currentTetromino() {
    return this.createTetromino()
  },
  createTetromino() {
    const index = utility.randomIndex(this.tetrominoes())
    return this.tetrominoes()[index][this.currentRotation]
  }
}

const utility = {
  randomIndex(array) {
    return Math.floor(Math.random() * array.length)
  }
}

controller.displayGame()