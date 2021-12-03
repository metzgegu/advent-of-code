import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/3/input.txt', 'utf8', (err, data) => {
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

const getNumberOf = (query, tab) => {
  return tab.reduce((acc, value) => {
    const newAcc = [...acc]
    for (let i = 0; i < value.length; i++) {
      if (value[i] === query) {
        newAcc[i] = !newAcc[i] ? 1 : newAcc[i] += 1
      }
    }
    return newAcc
  }, [])
}

const getNumberOfTwoAndOne = (tab, i) => {
  return tab.reduce((acc, value, index) => {
    const newAcc = { ...acc }
    return {
      ...newAcc,
      ...(value[i] === '1' && { one: [...acc.one, index] }),
      ...(value[i] === '0' && { zero: [...acc.zero, index] })
    }
  }, { one: [], zero: [] })
}

const getResultPartOne = (tab) => {
  const numberOfOneList = getNumberOf('1', tab)
  const numberOfZeroList = getNumberOf('0', tab)

  const gammaArray = numberOfOneList.map((numberOfOne, index) => numberOfZeroList[index] < numberOfOne ? 1 : 0)
  const epsilonArray = gammaArray.map(value => value === 1 ? 0 : 1)

  const gamma = gammaArray.reduce((acc, value) => acc + value, '')
  const epsilon = epsilonArray.reduce((acc, value) => acc + value, '')

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

const getOxygenArray = (numberOfTwoAndOne) => {
  return numberOfTwoAndOne.one.length >= numberOfTwoAndOne.zero.length ? numberOfTwoAndOne.one : numberOfTwoAndOne.zero
}

const getCo2Array = (numberOfTwoAndOne) => {
  return numberOfTwoAndOne.zero.length <= numberOfTwoAndOne.one.length ? numberOfTwoAndOne.zero : numberOfTwoAndOne.one
}

const processPartTwo = (tab, getNewArray, i) => {
  if (tab.length === 1) {
    return tab
  }

  const numberOfTwoAndOne = getNumberOfTwoAndOne(tab, i)

  const newArrayIndex = getNewArray(numberOfTwoAndOne)

  const newArray = newArrayIndex.map(indexValue => tab[indexValue])

  return processPartTwo(newArray, getNewArray, i + 1)
}

const getResultPartTwo = (tab) => {
  const oxygenRating = processPartTwo(tab, getOxygenArray, 0)[0]
  const co2Scrubber = processPartTwo(tab, getCo2Array, 0)[0]

  return parseInt(oxygenRating, 2) * parseInt(co2Scrubber, 2)
}
