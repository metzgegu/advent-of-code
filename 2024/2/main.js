import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/2/input.txt', 'utf8', (err, data) => {
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
  let count = 0

  for (let i = 0; i < tab.length; i++) {
    const values = tab[i].split(' ').map((value) => parseInt(value))

    if (getStatus(values) === 'safe') {
      count++
    }
  }

  return count
}

const getStatus = (values) => {
  let lastValue = values[0]
  const decreasing = values[0] > values[1]

  for (let i = 1; i < values.length; i++) {
    const value = values[i]
    if (lastValue === value) {
      return 'unsafe'
    }
    if (Math.abs(lastValue - value) > 3) {
      return 'unsafe'
    }

    if (!decreasing && lastValue > value) {
      return 'unsafe'
    }

    if (decreasing && lastValue < value) {
      return 'unsafe'
    }

    lastValue = values[i]
  }
  return 'safe'
}

const getResultPartTwo = (tab) => {
  let count = 0

  for (let i = 0; i < tab.length; i++) {
    const values = tab[i].split(' ').map((value) => parseInt(value))

    if (getStatus(values) === 'safe' || canOneBeRemoved(values)) {
      count++
    }
  }

  return count
}

const canOneBeRemoved = (values) => {
  for (let i = 0; i < values.length; i++) {
    const newValues = [...values]
    newValues.splice(i, 1)

    if (getStatus(newValues) === 'safe') {
      return true
    }
  }

  return false
}
