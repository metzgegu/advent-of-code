import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/7/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 7 ----')

    console.log('Result part one :', getResultPartOne(tab[0]))

    console.log('Result part two :', getResultPartTwo(tab[0]))
  })
}

const getResultPartOne = (line) => {
  const horizontalPositionList = line.split(',').map(v => parseInt(v))

  const maxPosition = Math.max(...horizontalPositionList)
  const minPosition = Math.min(...horizontalPositionList)

  let min

  for (let i = minPosition; i <= maxPosition; i++) {
    const fuel = horizontalPositionList.map(v => Math.abs(v - i)).reduce((acc, value) => acc + value, 0)
    if (min === undefined || fuel < min) {
      min = fuel
    }
  }

  return min
}

const getResultPartTwo = (line) => {
  const horizontalPositionList = line.split(',').map(v => parseInt(v))

  const maxPosition = Math.max(...horizontalPositionList)
  const minPosition = Math.min(...horizontalPositionList)

  let min

  for (let i = minPosition; i <= maxPosition; i++) {
    const fuel = horizontalPositionList.map(v => getFuelConsumption(v, i)).reduce((acc, value) => acc + value, 0)
    if (min === undefined || fuel < min) {
      min = fuel
    }
  }

  return min
}

const getFuelConsumption = (position, target) => {
  return Array(Math.abs(position - target)).fill(0).reduce((acc, _, i) => i + 1 + acc, 0)
}
