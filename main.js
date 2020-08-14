const view = {
  creatGirds() {
    const grid = document.querySelector('.grid')
    let girds = ''
    for (let i = 0; i < 210; i++) {
      if (i < 200) {
        girds += '<div></div>'
      } else {
        girds += '<div class="taken"></div>'
      }
    }
    grid.innerHTML = girds
  },
  draw() {
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.add('tetromino'))
  },
  undraw() {
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.remove('tetromino'))
  }
}

const controller = {
  displayGame() {
    view.creatGirds()    
    model.currentTetromino = model.createTetromino()
    model.squares = Array.from(document.querySelectorAll('.grid div'))
    view.draw()
    timerId = setInterval(this.moveDown, 1000)
  },
  moveDown() {
    view.undraw()
    model.currentPosition += model.width
    view.draw()
    controller.freeze()
  },
  freeze() {
    const currentPosition = model.currentPosition
    const width = model.width
    const current = model.currentTetromino
    const squares = model.squares
    const isCollision = current.some(index => squares[currentPosition + index + width].classList.contains('taken'))
    if (isCollision) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      model.currentTetromino = model.createTetromino()
      model.currentPosition = 4
      view.draw()
    }
  }
}

const model = {
  tetrominoes() {    
    const width = this.width
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
  width: 10,
  currentPosition: 4,
  currentRotation: 0,
  currentTetromino() {
    return this.createTetromino()
  },
  currentTetromino: [],
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