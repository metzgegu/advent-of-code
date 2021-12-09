import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/9/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')
    const matrix = tab.map(line => line.split('').map(v => parseInt(v)))

    console.log('')
    console.log('---- Day 9 ----')

    console.log('Result part one :', getResultPartOne(matrix))

    console.log('Result part two :', getResultPartTwo(matrix))
  })
}

const getResultPartOne = (matrix) => {
  const lowerPointsList = getLowerPoints(matrix)

  return lowerPointsList.reduce((acc, value) => acc + 1 + value, 0)
}

const getResultPartTwo = (matrix) => {
  const bassinsList = []
  matrix.forEach((line, i) => line.forEach((element, j) => {
    if (isLowerPoint(element, matrix, i, j)) {
      bassinsList.push(getBassins(i, j, matrix, new Map()).flat().filter(e => e !== -1).length)
    }
  }))

  return bassinsList.sort((e1, e2) => e1 < e2 ? 1 : -1).slice(0, 3).reduce((acc, value) => acc * value, 1)
}

const getBassins = (i, j, matrix, alreadySeenMap) => {
  if (getValue(i, j, matrix) > 8) {
    return [-1]
  }
  alreadySeenMap.set(`${i},${j}`, true)
  return [
    getValue(i, j, matrix),
    ...(!alreadySeenMap.get(`${i + 1},${j}`) ? getBassins(i + 1, j, matrix, alreadySeenMap) : []),
    ...(!alreadySeenMap.get(`${i},${j + 1}`) ? getBassins(i, j + 1, matrix, alreadySeenMap) : []),
    ...(!alreadySeenMap.get(`${i - 1},${j}`) ? getBassins(i - 1, j, matrix, alreadySeenMap) : []),
    ...(!alreadySeenMap.get(`${i},${j - 1}`) ? getBassins(i, j - 1, matrix, alreadySeenMap) : [])
  ]
}

const isLowerPoint = (element, matrix, i, j) =>
  element < getValue(i + 1, j, matrix) && element < getValue(i + 1, j + 1, matrix) && element < getValue(i, j + 1, matrix) && element < getValue(i - 1, j, matrix) && element < getValue(i - 1, j - 1, matrix) && element < getValue(i, j - 1, matrix)

const getLowerPoints = (matrix) =>
  matrix.flatMap((line, i) => line.filter((element, j) => isLowerPoint(element, matrix, i, j)))

const getValue = (i, j, tab) => {
  if (tab[i] === undefined || tab[i][j] === undefined) {
    return 10
  }
  return tab[i][j]
}
