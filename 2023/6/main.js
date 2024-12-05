import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2023/6/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 6 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (lines) => {
  const times = lines[0]
    .split('Time:')[1]
    .split(' ')
    .filter((value) => value !== '')
  const distances = lines[1]
    .split('Distance:')[1]
    .split(' ')
    .filter((value) => value !== '')
  let result = 1

  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const distance = distances[i]
    let countWaysBeatingRecord = 0

    for (let holdTime = 1; holdTime < time; holdTime++) {
      const restOfTheTime = Math.abs(holdTime - time)
      const speed = holdTime

      const distanceCovered = speed * restOfTheTime
      if (distanceCovered > distance) {
        countWaysBeatingRecord++
      }
    }

    result *= countWaysBeatingRecord
  }

  return result
}

const getResultPartTwo = (lines) => {
  const time = lines[0]
    .split('Time:')[1]
    .split(' ')
    .filter((value) => value !== '')
    .reduce((acc, value) => '' + acc + value, '')
  const distance = lines[1]
    .split('Distance:')[1]
    .split(' ')
    .filter((value) => value !== '')
    .reduce((acc, value) => '' + acc + value, '')

  let countWaysBeatingRecord = 0

  for (let holdTime = time - 1; holdTime > 0; holdTime--) {
    const restOfTheTime = Math.abs(holdTime - time)
    const speed = holdTime

    const distanceCovered = speed * restOfTheTime
    if (distanceCovered > distance) {
      countWaysBeatingRecord++
    }
    if (distanceCovered < distance && countWaysBeatingRecord > 0) {
      break
    }
  }

  return countWaysBeatingRecord
}
