import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2023/3/input.txt', 'utf8', (err, data) => {
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

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const getResultPartOne = (tab) => {
  const result = []
  for (let lineIndex = 0; lineIndex < tab.length; lineIndex++) {
    const tabLine = tab[lineIndex]
    let index = 0
    while (index < tabLine.length) {
      if (digits.includes(tabLine[index])) {
        let newIndex = index
        let theNumber = ''
        let findSymbol =
          isSpecialCharInTheBack(
            index,
            tabLine,
            tab[lineIndex - 1],
            tab[lineIndex + 1],
            isSymbol
          ) ?? false
        while (digits.includes(tabLine[newIndex])) {
          if (
            isSpecialCharAboveOrBelow(
              newIndex,
              tab[lineIndex - 1],
              tab[lineIndex + 1],
              isSymbol
            )
          ) {
            findSymbol = true
          }

          theNumber += tabLine[newIndex]
          newIndex++
        }
        if (
          isSpecialCharInTheFront(
            newIndex - 1,
            tabLine,
            tab[lineIndex - 1],
            tab[lineIndex + 1],
            isSymbol
          )
        ) {
          findSymbol = true
        }
        if (findSymbol) {
          result.push(theNumber)
        }
        index = newIndex
      } else {
        index++
      }
    }
  }

  return result.reduce((acc, value) => acc + parseInt(value), 0)
}

const isSpecialCharInTheFront = (
  index,
  currentLine,
  previousLine,
  nextLine,
  isSpecialChar
) => {
  return (
    isSpecialChar(currentLine[index + 1]) ||
    (previousLine && isSpecialChar(previousLine[index + 1])) ||
    (nextLine && isSpecialChar(nextLine[index + 1]))
  )
}

const isSpecialCharAboveOrBelow = (
  index,
  previousLine,
  nextLine,
  isSpecialChar
) => {
  return (
    (previousLine && isSpecialChar(previousLine[index])) ||
    (nextLine && isSpecialChar(nextLine[index]))
  )
}

const isSpecialCharInTheBack = (
  index,
  currentLine,
  previousLine,
  nextLine,
  isSpecialChar
) => {
  return (
    isSpecialChar(currentLine[index - 1]) ||
    (previousLine && isSpecialChar(previousLine[index - 1])) ||
    (nextLine && isSpecialChar(nextLine[index - 1]))
  )
}

const isSymbol = (char) => {
  return char && !digits.includes(char) && char !== '.'
}

const isGear = (char) => {
  return char === '*'
}

const getResultPartTwo = (tab) => {
  const result = []
  for (let lineIndex = 0; lineIndex < tab.length; lineIndex++) {
    const tabLine = tab[lineIndex]
    let index = 0
    while (index < tabLine.length) {
      if (isGear(tabLine[index])) {
        result.push({
          index,
          lineIndex,
        })
      }
      index++
    }
  }

  const ratioArray = result.map((element) => {
    const index = element.index
    const lineIndex = element.lineIndex
    const tabLine = tab[lineIndex]
    let ratio = 0

    const findNumbers = []

    findNumbers.push(findNumberAboveOrBelow(tab[lineIndex + 1], index))
    findNumbers.push(findNumberAboveOrBelow(tab[lineIndex - 1], index))
    findNumbers.push(findNumberLeft(tabLine, index))
    findNumbers.push(findNumberRight(tabLine, index))

    const flatFindNumbers = findNumbers.flat()

    if (flatFindNumbers.length === 2) {
      ratio = parseInt(flatFindNumbers[0]) * parseInt(flatFindNumbers[1])
    }
    return ratio
  })
  return ratioArray.reduce((acc, value) => acc + value, 0)
}

const findNumberRight = (line, currentIndex) => {
  let newIndex = currentIndex + 1
  if (newIndex >= line.length) return []
  let theNumber = ''
  while (digits.includes(line[newIndex])) {
    theNumber += line[newIndex]
    newIndex++
  }

  return theNumber !== '' ? [theNumber] : []
}

const findNumberLeft = (line, currentIndex) => {
  let index = currentIndex - 1
  if (index < 0 || !digits.includes(line[index])) return []
  while (digits.includes(line[index - 1])) {
    index--
  }

  let newIndex = index
  let theNumber = ''
  while (digits.includes(line[newIndex])) {
    theNumber += line[newIndex]
    newIndex++
  }

  return theNumber !== '' ? [theNumber] : []
}

const findNumberAboveOrBelow = (line, currentIndex) => {
  if (!line) return []
  const indexes = [currentIndex - 1, currentIndex, currentIndex + 1]

  let index = indexes[0]
  while (digits.includes(line[index])) {
    index--
  }

  const numbersFound = []
  while (index < indexes[2] || digits.includes(line[index])) {
    if (digits.includes(line[index])) {
      let newIndex = index
      let theNumber = ''
      while (digits.includes(line[newIndex])) {
        theNumber += line[newIndex]
        newIndex++
      }
      index = newIndex
      if (theNumber !== '') numbersFound.push(theNumber)
    } else {
      if (index < indexes[2]) index++
    }
  }

  return numbersFound
}
