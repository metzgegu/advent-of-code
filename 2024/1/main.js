import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/1/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    const tab1 = []
    const tab2 = []

    for (let i = 0; i < tab.length; i++) {
      const line = tab[i].split('   ')
      tab1.push(line[0])
      tab2.push(line[1])
    }

    console.log('')
    console.log('---- Day 1 ----')

    console.log('Result part one :', getResultPartOne([...tab1], [...tab2]))

    console.log('Result part two :', getResultPartTwo(tab1, tab2))
  })
}

const getResultPartOne = (tab1, tab2) => {
  let acc = 0

  while (tab1.length > 0) {
    const smallestTab1Index = getMin(tab1)
    const smallestTab2Index = getMin(tab2)

    acc += Math.abs(tab1[smallestTab1Index] - tab2[smallestTab2Index])

    tab1.splice(smallestTab1Index, 1)
    tab2.splice(smallestTab2Index, 1)
  }

  return acc
}

const getMin = (tab) => {
  let acc = 0

  for (let i = 0; i < tab.length; i++) {
    if (tab[i] < tab[acc]) {
      acc = i
    }
  }

  return acc
}

const getResultPartTwo = (tab1, tab2) => {
  let acc = 0

  for (let i = 0; i < tab1.length; i++) {
    acc += countOccurrence(tab2, tab1[i]) * tab1[i]
  }

  return acc
}

const countOccurrence = (tab, value) => {
  let acc = 0

  for (let i = 0; i < tab.length; i++) {
    if (tab[i] === value) {
      acc++
    }
  }

  return acc
}
