import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2022/4/input.txt', 'utf8', (err, data) => {
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
  const pairList = tab.map(value => value.split(',').map(v => ({ x: parseInt(v.split('-')[0]), y: parseInt(v.split('-')[1]) })))

  const includedPair = pairList.filter(pair =>
    (pair[0].x >= pair[1].x && pair[0].y <= pair[1].y) || (pair[1].x >= pair[0].x && pair[1].y <= pair[0].y)
  )

  return includedPair.length
}

const getResultPartTwo = (tab) => {
  const pairList = tab.map(value => value.split(',').map(v => ({ x: parseInt(v.split('-')[0]), y: parseInt(v.split('-')[1]) })))

  const overlapPair = pairList.filter(pair =>
    (pair[0].y >= pair[1].x && pair[0].x <= pair[1].x) || (pair[0].x <= pair[1].y && pair[0].x >= pair[1].x)
  )

  return overlapPair.length
}
