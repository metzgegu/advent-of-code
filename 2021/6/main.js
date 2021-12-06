import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/6/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 6 ----')

    console.log('Result part one :', getResultPartOne(tab, 80))

    console.log('Result part two :', getResultPartTwo(tab, 256))
  })
}

const getResultPartOne = (tab, n) => {
  let fishList = tab[0].split(',').map(v => parseInt(v))

  for (let i = 0; i < n; i++) {
    const newFishList = []
    fishList = [
      ...fishList.map(fish => {
        if (fish === 0) {
          newFishList.push(8)
          return 6
        }
        return fish - 1
      }),
      ...newFishList
    ]
  }
  return fishList.length
}

const getResultPartTwo = (tab, n) => {
  const fishList = tab[0].split(',').map(v => parseInt(v))

  let fishMap = new Map()

  fishList.forEach(fish => {
    const alreadyInMap = fishMap.get(fish)
    if (alreadyInMap) {
      fishMap.set(fish, alreadyInMap + 1)
    } else {
      fishMap.set(fish, 1)
    }
  })

  for (let i = 0; i < n; i++) {
    const tmpMap = new Map()
    Array(9).fill().map((_, i) => i).forEach(key => {
      if (key === 0) {
        tmpMap.set(8, fishMap.get(0) !== 0 ? fishMap.get(0) : 0)
        tmpMap.set(6, fishMap.get(0) !== 0 ? fishMap.get(0) : 0)
      } else {
        tmpMap.set(key - 1, (tmpMap.get(key - 1) ?? 0) + (fishMap.get(key) ?? 0))
      }
    })
    fishMap = tmpMap
  }

  return Array.from(fishMap.values()).reduce((acc, value) => acc + value, 0)
}
