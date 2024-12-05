import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2021/1/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n').map((value) => parseInt(value))

    console.log('')
    console.log('---- Day 1 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  return tab.reduce(
    (acc, value) => ({
      prev: value,
      nbIncr: acc.prev && value > acc.prev ? acc.nbIncr + 1 : acc.nbIncr,
    }),
    { nbIncr: 0 }
  ).nbIncr
}

const getResultPartTwo = (tab) => {
  return tab
    .map((value, index) =>
      !!tab[index + 1] && !!tab[index + 2]
        ? value + tab[index + 1] + tab[index + 2]
        : -1
    )
    .filter((value) => value !== -1)
    .reduce(
      (acc, value) => ({
        prev: value,
        nbIncr:
          acc.prev && parseInt(value) > parseInt(acc.prev)
            ? acc.nbIncr + 1
            : acc.nbIncr,
      }),
      { nbIncr: 0 }
    ).nbIncr
}
