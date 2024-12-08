import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/8/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 8 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const symbolMap = {}

  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[i][j] !== '.') {
        symbolMap[tab[i][j]] = [...(symbolMap[tab[i][j]] ?? []), { x: i, y: j }]
      }
    }
  }

  const antennas = {}

  for (let symbol in symbolMap) {
    if (symbolMap[symbol].length === 1) {
      continue
    }
    addAntenna(symbolMap[symbol], tab, antennas)
  }

  return Object.keys(antennas).length
}

const addAntenna = (symbols, tab, antennas) => {
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i]
    const x = symbol.x
    const y = symbol.y

    for (let j = 0; j < symbols.length; j++) {
      if (i === j) {
        continue
      }
      const yDistance = y - symbols[j].y
      const xDistance = x - symbols[j].x
      const newAntenne = {
        x: symbols[j].x - xDistance,
        y: symbols[j].y - yDistance,
      }
      const newAntenne2 = { x: x + xDistance, y: y + yDistance }
      if (
        newAntenne.x >= 0 &&
        newAntenne.y >= 0 &&
        newAntenne.x < tab.length &&
        newAntenne.y < tab.length
      ) {
        antennas[`${newAntenne.x}-${newAntenne.y}`] =
          (antennas[`${newAntenne.x}-${newAntenne.y}`] ?? 0) + 1
      }
      if (
        newAntenne2.x >= 0 &&
        newAntenne2.y >= 0 &&
        newAntenne2.x < tab.length &&
        newAntenne2.y < tab.length
      ) {
        antennas[`${newAntenne2.x}-${newAntenne2.y}`] =
          (antennas[`${newAntenne2.x}-${newAntenne2.y}`] ?? 0) + 1
      }
    }
  }
}

const getResultPartTwo = (tab) => {
  const symbolMap = {}
  const antennas = {}

  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[i][j] !== '.') {
        symbolMap[tab[i][j]] = [...(symbolMap[tab[i][j]] ?? []), { x: i, y: j }]
        antennas[`${i}-${j}`] = 1
      }
    }
  }

  for (let symbol in symbolMap) {
    if (symbolMap[symbol].length === 1) {
      continue
    }
    addAntennas(symbolMap[symbol], tab, antennas)
  }

  return Object.keys(antennas).length
}

const addAntennas = (symbols, tab, antennas) => {
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i]
    const x = symbol.x
    const y = symbol.y

    for (let j = 0; j < symbols.length; j++) {
      if (i === j) {
        continue
      }
      const yDistance = y - symbols[j].y
      const xDistance = x - symbols[j].x

      const newAntenne = {
        x: symbols[j].x - xDistance,
        y: symbols[j].y - yDistance,
      }
      const newAntenne2 = { x: x + xDistance, y: y + yDistance }

      while (
        newAntenne.x >= 0 &&
        newAntenne.y >= 0 &&
        newAntenne.x < tab.length &&
        newAntenne.y < tab.length
      ) {
        if (
          newAntenne.x >= 0 &&
          newAntenne.y >= 0 &&
          newAntenne.x < tab.length &&
          newAntenne.y < tab.length
        ) {
          antennas[`${newAntenne.x}-${newAntenne.y}`] =
            (antennas[`${newAntenne.x}-${newAntenne.y}`] ?? 0) + 1
        }
        newAntenne.x = newAntenne.x - xDistance
        newAntenne.y = newAntenne.y - yDistance
      }
      while (
        newAntenne2.x >= 0 &&
        newAntenne2.y >= 0 &&
        newAntenne2.x < tab.length &&
        newAntenne2.y < tab.length
      ) {
        if (
          newAntenne2.x >= 0 &&
          newAntenne2.y >= 0 &&
          newAntenne2.x < tab.length &&
          newAntenne2.y < tab.length
        ) {
          antennas[`${newAntenne2.x}-${newAntenne2.y}`] =
            (antennas[`${newAntenne2.x}-${newAntenne2.y}`] ?? 0) + 1
        }
        newAntenne2.x = newAntenne2.x + xDistance
        newAntenne2.y = newAntenne2.y + yDistance
      }
    }
  }
}
