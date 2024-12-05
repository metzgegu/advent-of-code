import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2021/4/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 4 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartTwo = (tab) => {
  const randomNumberList = tab[0].split(',').map((v) => parseInt(v))
  let matrixList = getMatrixList(tab.slice(2, tab.length - 1))

  const winnerList = []
  let index = 0

  while (index < randomNumberList.length) {
    const randomNumber = randomNumberList[index]
    matrixList = matrixList
      .map((matrix, i) => {
        const newMatrix = markFoundedValueInMatrix(matrix, randomNumber)
        if (hasMatrixWin(newMatrix)) {
          winnerList.push({
            matrix: newMatrix,
            index: i,
            numberOfTheWin: randomNumber,
            indexOfTheWin: index,
          })
          return undefined
        }
        return newMatrix
      })
      .filter((v) => !!v)
    index++
  }

  const indexOfLastWinner = winnerList.reduce(
    (i, winner) => (winner.indexOfTheWin > i ? winner.indexOfTheWin : i),
    0
  )
  const lastWinner = winnerList.find(
    (winner) => winner.indexOfTheWin === indexOfLastWinner
  )

  const result = lastWinner.matrix.reduce((accLine, vLine) => {
    const lineSum =
      accLine +
      vLine.reduce(
        (accRow, vRow) =>
          vRow.status === 'notFound' ? accRow + vRow.value : accRow,
        0
      )
    return lineSum
  }, 0)

  return result * lastWinner.numberOfTheWin
}

const getResultPartOne = (tab) => {
  const randomNumberList = tab[0].split(',').map((v) => parseInt(v))
  let matrixList = getMatrixList(tab.slice(2, tab.length - 1))

  let winner
  let index = 0

  while (!winner) {
    const randomNumber = randomNumberList[index]
    matrixList = matrixList.map((matrix, index) => {
      const newMatrix = markFoundedValueInMatrix(matrix, randomNumber)
      if (hasMatrixWin(newMatrix)) {
        winner = { matrix: newMatrix, index, numberOfTheWin: randomNumber }
      }
      return newMatrix
    })
    index++
  }

  const result = winner.matrix.reduce((accLine, vLine) => {
    const lineSum =
      accLine +
      vLine.reduce(
        (accRow, vRow) =>
          vRow.status === 'notFound' ? accRow + vRow.value : accRow,
        0
      )
    return lineSum
  }, 0)
  return result * winner.numberOfTheWin
}

const hasMatrixWin = (matrix) => {
  let columnValid
  for (let i = 0; i < 5; i++) {
    columnValid = true
    for (let j = 0; j < 5; j++) {
      if (matrix[j][i].status === 'notFound') {
        columnValid = false
      }
    }
    if (columnValid === true) {
      break
    }
  }
  return (
    matrix.some((row) => row.every((v) => v.status === 'founded')) ||
    columnValid
  )
}

const markFoundedValueInMatrix = (matrix, number) => {
  return matrix.map((row) => {
    return row.map((value) => {
      if (value.value === number) {
        return { ...value, status: 'founded' }
      }
      return value
    })
  })
}

const getMatrixList = (tab) => {
  let tmpMatrix = []
  let matrixList = []
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] === '') {
      matrixList = [...matrixList, tmpMatrix]
      tmpMatrix = []
    } else {
      tmpMatrix = [
        ...tmpMatrix,
        tab[i]
          .split(' ')
          .filter((v) => v !== '')
          .map((value) => ({ value: parseInt(value), status: 'notFound' })),
      ]
    }
    if (i === tab.length - 1) {
      matrixList = [...matrixList, tmpMatrix]
    }
  }

  return matrixList
}
