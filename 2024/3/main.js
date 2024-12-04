import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2024/3/input.txt', 'utf8', (err, data) => {
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
  const line = tab[0]
  let acc = 0

  const mulTab = [...line.matchAll(/mul\(\d*,\d*\)/g)]

  for (let i = 0; i < mulTab.length; i++) {
    const mul = mulTab[i][0]
    const [firstNumber, secondNumber] = mul.match(/\d+/g)

    acc += parseInt(firstNumber) * parseInt(secondNumber)
  }

  return acc
}

const getResultPartTwo = (tab) => {
  const line = tab[0]
  let acc = 0

  const mulTab = [...line.matchAll(/mul\(\d*,\d*\)/g)]
  const doTab = [...line.matchAll(/(do|don't)\(\)/g)]

  const bigTab = [...mulTab, ...doTab].sort((a, b) => a.index - b.index)

  let isDo = true

  for (let i = 0; i < bigTab.length; i++) {
    if (bigTab[i][0] === 'do()') {
      isDo = true
    } else if (bigTab[i][0] === "don't()") {
      isDo = false
    } else if (isDo) {
      const mul = bigTab[i][0]
      const [firstNumber, secondNumber] = mul.match(/\d+/g)

      acc += parseInt(firstNumber) * parseInt(secondNumber)
    }
  }

  return acc
}
