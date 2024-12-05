import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2022/2/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 2 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const resultTab = getResultTab(tab)

  return resultTab.reduce((prev, value) => prev + value, 0)
}

const getResultPartTwo = (tab) => {
  const expectedResultMatch = tab
    .filter((match) => match !== '')
    .map((match) => {
      const neededScoreMatch = match.split(' ')

      switch (neededScoreMatch[1]) {
        case 'X':
          // lose
          return `${neededScoreMatch[0]} ${resultWieght.get(neededScoreMatch[0]).winningAgainst}`
        case 'Y':
          // draw
          return `${neededScoreMatch[0]} ${resultWieght.get(neededScoreMatch[0]).equal}`
        default:
          // win
          return `${neededScoreMatch[0]} ${resultWieght.get(neededScoreMatch[0]).losingAgainst}`
      }
    })

  const resultTab = getResultTab(expectedResultMatch)

  return resultTab.reduce((prev, value) => prev + value, 0)
}

const getResultTab = (tab) => {
  return tab
    .filter((match) => match !== '')
    .map((match) => {
      const resultMatch = match.split(' ')
      if (resultWieght.get(resultMatch[0]).equal === resultMatch[1]) {
        return resultWieght.get(resultMatch[1]).pts + 3
      } else {
        if (
          resultWieght.get(resultMatch[0]).winningAgainst === resultMatch[1]
        ) {
          return resultWieght.get(resultMatch[1]).pts
        } else {
          return resultWieght.get(resultMatch[1]).pts + 6
        }
      }
    })
}

const resultWieght = new Map([
  ['A', { winningAgainst: 'Z', pts: 1, equal: 'X', losingAgainst: 'Y' }],
  ['B', { winningAgainst: 'X', pts: 2, equal: 'Y', losingAgainst: 'Z' }],
  ['C', { winningAgainst: 'Y', pts: 3, equal: 'Z', losingAgainst: 'X' }],
  ['X', { winningAgainst: 'C', pts: 1, equal: 'A', losingAgainst: 'B' }],
  ['Y', { winningAgainst: 'A', pts: 2, equal: 'B', losingAgainst: 'C' }],
  ['Z', { winningAgainst: 'B', pts: 3, equal: 'C', losingAgainst: 'A' }],
])
