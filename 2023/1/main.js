import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2023/1/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 1 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const digitsWords = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const getResultPartOne = (tab) => {
  return tab
    .map((value) => {
      const charArray = value.split('')
      const strNumber = `${findFirstNumber(charArray)}${findFirstNumber(charArray.reverse())}`
      return parseInt(strNumber)
    })
    .reduce((acc, value) => acc + value)
}

const getResultPartTwo = (tab) => {
  return tab
    .map((value) => {
      const charArray = value.split('')
      const strNumber = `${findDigitWordOrDigitInString(charArray)}${findDigitWordOrDigitInString(charArray.reverse(), true)}`
      return parseInt(strNumber)
    })
    .reduce((acc, value) => acc + value)
}

const findFirstNumber = (str) => {
  return parseInt(str.find((v) => digits.includes(v)))
}

const findDigitWordOrDigitInString = (str, reverse = false) => {
  const charArray = str
  let first = null
  for (let i = 0; i < charArray.length; i++) {
    const element = charArray[i]
    if (digits.includes(element)) {
      first = element
      break
    } else {
      let myDigitsWords = digitsWords
      if (reverse) {
        myDigitsWords = digitsWords.map((element) =>
          element.split('').reverse().join('')
        )
      }
      const result = myDigitsWords
        .map((element, index) =>
          recurence(element, charArray.slice(i)) !== -1 ? index : -1
        )
        .find((element) => element !== -1)
      if (result) {
        first = result
        break
      }
    }
  }
  return first
}

const recurence = (toFind, str, index = 0) => {
  if (str.length === index) {
    return -1
  }
  if (toFind.length - 1 === index && toFind[toFind.length - 1] === str[index]) {
    return toFind
  }
  if (toFind[index] === str[index]) {
    return recurence(toFind, str, index + 1)
  } else {
    return -1
  }
}
