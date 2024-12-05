import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/5/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 5 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const rules = {}
  let acc = 0

  let i = 0

  while (tab[i].length > 0) {
    const [key, value] = tab[i].split('|')
    rules[key] = [...(rules[key] ?? []), value]
    i++
  }

  i++

  while (i < tab.length) {
    const isLineValid = computeIsLineValid(tab[i], rules)
    // console.log(tab[i], isLineValid)
    if (isLineValid) {
      // get middle value
      const values = tab[i].split(',')
      const middleValue = values[Math.floor(values.length / 2)]
      acc += parseInt(middleValue)
    }
    i++
  }

  return acc
}

const computeIsLineValid = (line, rules) => {
  const values = line.split(',')
  const alreadySeen = []

  for (let i = 0; i < values.length; i++) {
    if (rules[values[i]]) {
      for (let j = 0; j < rules[values[i]].length; j++) {
        if (alreadySeen.includes(rules[values[i]][j])) {
          return false
        }
      }
    }

    alreadySeen.push(values[i])
  }

  return true
}

const getResultPartTwo = (tab) => {
  const rules = {}
  let acc = 0

  let i = 0

  while (tab[i].length > 0) {
    const [key, value] = tab[i].split('|')
    rules[key] = [...(rules[key] ?? []), value]
    i++
  }

  i++

  while (i < tab.length) {
    const isLineValid = computeIsLineValid(tab[i], rules)

    if (isLineValid !== true) {
      const correctlySorted = sortLine(tab[i], rules)
      const values = correctlySorted.split(',')
      const middleValue = values[Math.floor(values.length / 2)]
      acc += parseInt(middleValue)
    }
    i++
  }

  return acc
}

const sortLine = (line, rules) => {
  const values = line.split(',')
  let alreadySeen = []
  let i = 0

  while (i < values.length) {
    if (rules[values[i]]) {
      const needToBeAfter = oneNeedToBeAfter(values[i], rules, alreadySeen)

      if (needToBeAfter) {
        const indexToSwitch = values.indexOf(needToBeAfter)
        const temp = values[i]
        values[i] = values[indexToSwitch]
        values[indexToSwitch] = temp
        alreadySeen = []
        i = 0
        continue
      }
    }

    alreadySeen.push(values[i])

    i++
  }

  return values.join(',')
}

const oneNeedToBeAfter = (value, rules, alreadySeen) => {
  for (let i = 0; i < rules[value].length; i++) {
    if (alreadySeen.includes(rules[value][i])) {
      return rules[value][i]
    }
  }
}
