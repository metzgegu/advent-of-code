import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2023/4/input.txt', 'utf8', (err, data) => {
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
  let totalPoints = 0
  tab.forEach(line => {
    const newLine = line.split(': ')[1]
    const winningPart = newLine.split(' | ')[0].split(' ').filter(value => value !== '')
    const numberPart = newLine.split(' | ')[1].split(' ').filter(value => value !== '')

    const pointsEarned = calculatePointsEarned(winningPart, numberPart)
    totalPoints += pointsEarned
  })
  return totalPoints
}

const calculatePointsEarned = (winningPart, numberPart) => {
  const pointsEarned = numberPart.filter(number => {
    if (winningPart.includes(number)) {
      return true
    }
    return false
  })
  if (pointsEarned.length === 0) {
    return 0
  }
  pointsEarned.pop()
  return pointsEarned.reduce((acc, _) => acc * 2, 1)
}

const countCardWinning = (winningPart, numberPart) => {
  const pointsEarned = numberPart.filter(number => {
    if (winningPart.includes(number)) {
      return true
    }
    return false
  }).length
  return pointsEarned
}

const getResultPartTwo = (tab) => {
  const cardsMap = new Map()

  tab.forEach((line, index) => {
    const idGame = index + 1

    const newLine = line.split(': ')[1]
    const winningPart = newLine.split(' | ')[0].split(' ').filter(value => value !== '')
    const numberPart = newLine.split(' | ')[1].split(' ').filter(value => value !== '')

    const cardsEarned = countCardWinning(winningPart, numberPart)
    for (let i = 1; i <= cardsEarned; i++) {
      if (cardsMap.get(idGame + i)) {
        cardsMap.set(idGame + i, cardsMap.get(idGame + i) + 1)
        continue
      } else {
        cardsMap.set(idGame + i, 1)
      }
    }

    const extraCopies = cardsMap.get(idGame)
    if (extraCopies) {
      for (let y = 0; y < extraCopies; y++) {
        for (let i = 1; i <= cardsEarned; i++) {
          if (cardsMap.get(idGame + i)) {
            cardsMap.set(idGame + i, cardsMap.get(idGame + i) + 1)
            continue
          } else {
            cardsMap.set(idGame + i, 1)
          }
        }
      }
    }

    if (cardsMap.get(idGame)) {
      cardsMap.set(idGame, cardsMap.get(idGame) + 1)
    } else {
      cardsMap.set(idGame, 1)
    }
  })
  return Array.from(cardsMap.values()).reduce((acc, value) => acc + value, 0)
}
