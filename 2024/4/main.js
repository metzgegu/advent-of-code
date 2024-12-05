import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/4/input.txt', 'utf8', (err, data) => {
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

const getResultPartOne = (tab) => {
  let horizontalCount = 0
  let verticalCount = 0
  let diagonalRightCount = 0
  let diagonalRightTab = []
  let diagonalLeftCount = 0
  let diagonalLeftTab = []
  let verticalTab = []

  for (let i = 0; i < tab.length; i++) {
    horizontalCount += [...tab[i].matchAll(/(?=(XMAS|SAMX))/g)].length

    for (let j = 0; j < tab[i].length; j++) {
      if (!verticalTab[j]) {
        verticalTab[j] = ''
      }

      verticalTab[j] += tab[i][j]
    }

    for (let j = 0; j < tab[i].length; j++) {
      if (!diagonalRightTab[j + i]) {
        diagonalRightTab[j + i] = ''
      }

      diagonalRightTab[j + i] += tab[i][j]
    }

    for (let j = 0; j < tab[i].length; j++) {
      if (!diagonalLeftTab[j - i]) {
        diagonalLeftTab[j - i] = ''
      }

      diagonalLeftTab[j - i] += tab[i][j]
    }
  }

  for (let i = 0; i < verticalTab.length; i++) {
    verticalCount += [...verticalTab[i].matchAll(/(?=(XMAS|SAMX))/g)].length
  }

  for (let i = 0; i < diagonalRightTab.length; i++) {
    diagonalRightCount += [...diagonalRightTab[i].matchAll(/(?=(XMAS|SAMX))/g)]
      .length
  }

  for (const i in diagonalLeftTab) {
    diagonalLeftCount += [...diagonalLeftTab[i].matchAll(/(?=(XMAS|SAMX))/g)]
      .length
  }

  return (
    horizontalCount + verticalCount + diagonalRightCount + diagonalLeftCount
  )
}

const getResultPartTwo = (tab) => {
  let count = 0

  for (let i = 1; i < tab.length - 1; i++) {
    for (let j = 0; j < tab[i].length - 1; j++) {
      if (tab[i][j] === 'A') {
        // M M
        // S S
        if (
          tab[i - 1][j - 1] === 'M' &&
          tab[i - 1][j + 1] === 'M' &&
          tab[i + 1][j + 1] === 'S' &&
          tab[i + 1][j - 1] === 'S'
        ) {
          count++
        }
        // S S
        // M M
        if (
          tab[i - 1][j - 1] === 'S' &&
          tab[i - 1][j + 1] === 'S' &&
          tab[i + 1][j + 1] === 'M' &&
          tab[i + 1][j - 1] === 'M'
        ) {
          count++
        }
        // M S
        // M S
        if (
          tab[i - 1][j - 1] === 'M' &&
          tab[i - 1][j + 1] === 'S' &&
          tab[i + 1][j + 1] === 'S' &&
          tab[i + 1][j - 1] === 'M'
        ) {
          count++
        }
        // S M
        // S M
        if (
          tab[i - 1][j - 1] === 'S' &&
          tab[i - 1][j + 1] === 'M' &&
          tab[i + 1][j + 1] === 'M' &&
          tab[i + 1][j - 1] === 'S'
        ) {
          count++
        }
      }
    }
  }

  return count
}
