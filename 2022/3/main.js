import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2022/3/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 3 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const typeItemList = tab.map((rucksack) => {
    const part1 = rucksack.slice(0, rucksack.length / 2)
    const part2 = rucksack.slice(rucksack.length / 2, rucksack.length)
    for (let i = 0; i <= part1.length - 1; i++) {
      if (part2.search(part1.at(i)) !== -1) {
        return part1.at(i)
      }
    }
  }).filter(item => item)

  const pointsList = typeItemList.map((item =>
    item.charCodeAt(0) - (item == item.toUpperCase() ? 38 : 96)
  ))

  return pointsList.reduce((acc, value) => acc + value, 0)
}

const getResultPartTwo = (tab) => {
  const resultTab = []
  for (let i = 0; i <= tab.length - 1; i += 3) {
    const part1 = tab[i]
    const part2 = tab[i + 1]
    const part3 = tab[i + 2]
    for (let i = 0; i <= part1.length - 1; i++) {
      if (part2.search(part1.at(i)) !== -1 && part3.search(part1.at(i)) !== -1) {
        resultTab.push(part1.at(i))
        break
      }
    }
  }

  const pointsList = resultTab.map((item =>
    item.charCodeAt(0) - (item == item.toUpperCase() ? 38 : 96)
  ))

  return pointsList.reduce((acc, value) => acc + value, 0)
}
