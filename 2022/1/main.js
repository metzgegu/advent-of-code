import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2022/1/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 1 ----')

    const elfSum = getElfSum(tab)

    console.log('Result part one :', getResultPartOne(elfSum))

    console.log('Result part two :', getResultPartTwo(elfSum))
  })
}

const getResultPartOne = (elfSum) => {
  return elfSum.reduce((prev, value) => prev < value ? value : prev, 0)
}

const getResultPartTwo = (elfSum) => {
  const sorted = elfSum.sort((a, b) => a > b ? -1 : 1)

  return sorted[0] + sorted[1] + sorted[2]
}

const getElfSum = (tab) => {
  const tabSum = []
  let tmpTab = []
  tab.forEach(value => {
    if (value === '') {
      tabSum.push(tmpTab.reduce((prev, value) => parseInt(prev) + parseInt(value), 0))
      tmpTab = []
    } else {
      tmpTab.push(value)
    }
  })
  return tabSum
}
