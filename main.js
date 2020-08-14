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
    model.index = utility.randomIndex(model.tetrominoes())
    model.currentTetromino = model.createTetromino()
    model.squares = Array.from(document.querySelectorAll('.grid div'))    
    document.addEventListener('keyup', controller.control)
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
      model.index = utility.randomIndex(model.tetrominoes())
      model.currentTetromino = model.createTetromino()
      model.currentPosition = 4
      view.draw()
    }
  },
  moveLeft() {
    const current = model.currentTetromino
    const width = model.width
    const squares = model.squares
    const currentPosition = model.currentPosition
    view.undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    const isCollision = current.some(index => squares[currentPosition + index].classList.contains('taken'))
    if (!isAtLeftEdge) model.currentPosition--
    if (isCollision) model.currentPosition++
    view.draw()
  },
  moveRight() {    
    const width = model.width
    const squares = model.squares
    const current = model.currentTetromino
    const currentPosition = model.currentPosition
    view.undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    const isCollision = current.some(index => squares[currentPosition + index].classList.contains('taken'))
    if (!isAtRightEdge) model.currentPosition++
    if (isCollision) model.currentPosition--
    view.draw()
  },
  rotate() {
    const width = model.width
    const squares = model.squares
    const currentPosition = model.currentPosition
    const nextRotation = model.currentRotation + 1 === model.currentTetromino.length ? 0 : model.currentRotation + 1
    // 下一個旋轉位置
    const nextTetromino = model.createTetromino(nextRotation)
    const nextIsAtLeftEdge = nextTetromino.some(index => (currentPosition + index) % width === 0)
    const nextIsAtRightEdge = nextTetromino.some(index => (currentPosition + index) % width === width - 1)
    // 目前位置
    const current = model.currentTetromino
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    const isCollision = nextTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))
    if (isCollision) {
      return
    } else {
      view.undraw()
      if (nextIsAtLeftEdge & isAtRightEdge) {
        model.currentPosition--
        const isTetrominoI = nextTetromino[3] - nextTetromino[0] === 3
        // tetrominoI 太長了，需要讓現在位置-2
        // 另一種想法，如果有兩格跑到另一側，那就退後兩格
        if (isTetrominoI) model.currentPosition--
      } else if (nextIsAtRightEdge & isAtLeftEdge) {
        model.currentPosition++
      }
      model.currentRotation++
      if (model.currentRotation === model.currentTetromino.length) {
        model.currentRotation = 0
      }
      model.currentTetromino = model.createTetromino()
      view.draw()
    }
  },
  control(event) {
    switch (event.keyCode) {
      case 37:
        controller.moveLeft()
        break;
      case 38:
        controller.rotate()
        break;
      case 39:
        controller.moveRight()
        break;
      case 40:
        controller.moveDown()
        break;
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
  index: 0,
  createTetromino(currentRotation = this.currentRotation) {
    return this.tetrominoes()[this.index][currentRotation]
  }
}

const utility = {
  randomIndex(array) {
    return Math.floor(Math.random() * array.length)
  }
}

controller.displayGame()