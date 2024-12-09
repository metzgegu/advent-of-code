import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/9/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 9 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const line = tab[0].split('')

  const result = []
  let index = 0
  let freeSpaceCount = 0

  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      result.push(...new Array(parseInt(line[i])).fill(index))

      index++
    } else {
      result.push(...new Array(parseInt(line[i])).fill('.'))
      freeSpaceCount += parseInt(line[i])
    }
  }

  let i = 0
  let lastSpaceIndex = 0

  while (i < freeSpaceCount) {
    const current = result[result.length - 1 - i]
    if (current === '.') {
      i++
      continue
    }

    lastSpaceIndex = putInNextSpace(result, lastSpaceIndex, current)
    result[result.length - 1 - i] = '.'
    i++
  }

  return result.reduce(
    (acc, current, index) => (current !== '.' ? acc + current * index : acc),
    0
  )
}

const putInNextSpace = (result, lastSpaceIndex, current) => {
  if (lastSpaceIndex >= result.length) {
    return lastSpaceIndex
  }

  if (result[lastSpaceIndex] === '.') {
    result[lastSpaceIndex] = current
    return lastSpaceIndex
  }

  return putInNextSpace(result, lastSpaceIndex + 1, current)
}

const getResultPartTwo = (tab) => {
  const line = tab[0].split('')

  const result = []
  let index = 0
  let freeSpaceCount = 0
  const mapOfFile = []
  let mapOfFreeSpace = []

  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      if (parseInt(line[i]) === 0) {
        index++
        continue
      }
      const size = parseInt(line[i])
      result.push(...new Array(parseInt(line[i])).fill(index))
      mapOfFile.push({
        value: index,
        size,
        startIndex: result.length - size,
        endIndex: result.length - 1,
      })

      index++
    } else {
      if (parseInt(line[i]) === 0) {
        continue
      }
      result.push(...new Array(parseInt(line[i])).fill('.'))
      mapOfFreeSpace.push({
        size: parseInt(line[i]),
        startIndex: result.length - parseInt(line[i]),
        endIndex: result.length - 1,
      })
      freeSpaceCount += parseInt(line[i])
    }
  }

  let resultNew = result
  for (let i = mapOfFile.length - 1; i >= 0; i--) {
    const current = mapOfFile[i]

    for (let j = 0; j < mapOfFreeSpace.length; j++) {
      const freeSpace = mapOfFreeSpace[j]

      if (
        freeSpace.size >= current.size &&
        current.startIndex > freeSpace.startIndex
      ) {
        const startIndex = freeSpace.startIndex
        const endIndex = freeSpace.startIndex + current.size - 1

        mapOfFile.push({
          value: current.value,
          size: current.size,
          startIndex,
          endIndex,
        })

        resultNew.splice(
          startIndex,
          current.size,
          ...new Array(current.size).fill(current.value)
        )
        resultNew.splice(
          current.startIndex,
          current.size,
          ...new Array(current.size).fill('.')
        )

        mapOfFile.splice(i, 1)

        if (freeSpace.size !== current.size) {
          mapOfFreeSpace.splice(j, 1, {
            size: freeSpace.size - current.size,
            startIndex: endIndex + 1,
            endIndex: freeSpace.endIndex,
          })
        }

        if (freeSpace.size === current.size) {
          mapOfFreeSpace.splice(j, 1)
        } else if (freeSpace.size !== current.size) {
          mapOfFreeSpace.splice(j, 1, {
            size: freeSpace.size - current.size,
            startIndex: endIndex + 1,
            endIndex: freeSpace.endIndex,
          })
        }
        break
      }
    }
  }

  const newResult = new Array(result.length).fill('.')

  for (let i = 0; i < mapOfFile.length; i++) {
    const current = mapOfFile[i]

    newResult.splice(
      current.startIndex,
      current.size,
      ...new Array(current.size).fill(current.value)
    )
  }

  return newResult.reduce(
    (acc, current, index) => (current !== '.' ? acc + current * index : acc),
    0
  )
}

const findEmptySpaces = (result, index, test, lastElement, lastSpaceIndex) => {
  if (index >= result.length) {
    if (lastElement === '.') {
      test.push({
        size: index - lastSpaceIndex,
        startIndex: lastSpaceIndex,
        endIndex: index - 1,
      })
    }
    return
  }

  if (result[index] === '.') {
    if (lastElement === '.') {
      findEmptySpaces(result, index + 1, test, result[index], lastSpaceIndex)
    } else {
      findEmptySpaces(result, index + 1, test, result[index], index)
    }
  } else {
    if (lastElement === '.') {
      test.push({
        size: index - lastSpaceIndex,
        startIndex: lastSpaceIndex,
        endIndex: index - 1,
      })
    }

    findEmptySpaces(result, index + 1, test, result[index], lastSpaceIndex)
  }
}
