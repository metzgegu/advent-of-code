import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/6/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 6 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const directions = ['<', '^', '>', 'v']

const getResultPartOne = (tab) => {
  let guardXY
  let directionInitital

  const map = tab.map((line, x) => {
    const lineSplitted = line.split('')

    let guardY = lineSplitted.find((v) => directions.includes(v))
    if (guardY) {
      guardXY = [x, lineSplitted.indexOf(guardY)]
      directionInitital = guardY
    }

    return lineSplitted.map((v) => (directions.includes(v) ? '.' : v))
  })

  return exploreMap(map, guardXY, directionInitital)
}

const exploreMap = (map, guardXY, directionInitital) => {
  let guard = guardXY
  let direction = directionInitital
  let seenMap = {}

  seenMap[`${guardXY[0]}-${guardXY[1]}`] = true
  switch (direction) {
    case '<':
      guard = [guard[0], guard[1] - 1]
      break
    case '^':
      guard = [guard[0] - 1, guard[1]]
      break
    case '>':
      guard = [guard[0], guard[1] + 1]
      break
    case 'v':
      guard = [guard[0] + 1, guard[1]]
      break
  }

  while (map[guard[0]]?.[guard[1]]) {
    const moveResult = move(map, guard, direction, seenMap)
    direction = moveResult.direction
    guard = moveResult.position
    seenMap = moveResult.seenMap
  }

  return Object.keys(seenMap).length
}

const avance = (guard, direction) => {
  switch (direction) {
    case '<':
      return [guard[0], guard[1] - 1]
    case '^':
      return [guard[0] - 1, guard[1]]
    case '>':
      return [guard[0], guard[1] + 1]
    case 'v':
      return [guard[0] + 1, guard[1]]
  }
}

const move = (map, guard, direction, seenMap) => {
  if (map[guard[0]][guard[1]] === '.') {
    seenMap[`${guard[0]}-${guard[1]}`] = true
    switch (direction) {
      case '<':
        return { position: [guard[0], guard[1] - 1], direction, seenMap }
      case '^':
        return { position: [guard[0] - 1, guard[1]], direction, seenMap }
      case '>':
        return { position: [guard[0], guard[1] + 1], direction, seenMap }
      case 'v':
        return { position: [guard[0] + 1, guard[1]], direction, seenMap }
    }
  } else if (map[guard[0]][guard[1]] === '#') {
    switch (direction) {
      case '<':
        guard = [guard[0], guard[1] + 1]
        direction = '^'
        break
      case '^':
        guard = [guard[0] + 1, guard[1]]
        direction = '>'
        break
      case '>':
        guard = [guard[0], guard[1] - 1]
        direction = 'v'
        break
      case 'v':
        guard = [guard[0] - 1, guard[1]]
        direction = '<'
        break
    }
    return { position: avance(guard, direction), direction, seenMap }
  }
}

const getResultPartTwo = (tab) => {
  let guardXY
  let directionInitital

  const map = tab.map((line, x) => {
    const lineSplitted = line.split('')

    let guardY = lineSplitted.find((v) => directions.includes(v))
    if (guardY) {
      guardXY = [x, lineSplitted.indexOf(guardY)]
      directionInitital = guardY
    }

    return lineSplitted.map((v) => (directions.includes(v) ? '.' : v))
  })

  let ahead = move(map, guardXY, directionInitital, {})
  guardXY = ahead.position

  let newMap = map.map((line, x) =>
    line.map((v, y) => (guardXY[0] === x && guardXY[1] === y ? '#' : v))
  )

  let i = 0
  let direction = directionInitital
  let cycleCount = 0

  const initialGuardXY = guardXY
  const alreadyCycle = {}

  while (map[guardXY[0]]?.[guardXY[1]] !== undefined) {
    if (map[guardXY[0]]?.[guardXY[1]] === '.') {
      const res = explore2Map(
        newMap,
        initialGuardXY,
        `${directionInitital}`,
        guardXY
      )

      if (res.cycle && !alreadyCycle[`${guardXY[0]}-${guardXY[1]}`]) {
        cycleCount++
      }
      alreadyCycle[`${guardXY[0]}-${guardXY[1]}`] = true
    }
    let ahead = move(map, guardXY, direction, {})
    guardXY = ahead.position
    direction = ahead.direction
    newMap = map.map((line, x) =>
      line.map((v, y) => (guardXY[0] === x && guardXY[1] === y ? '#' : v))
    )
    i++
  }

  return cycleCount
}

const explore2Map = (map, guardXY, directionInitital, bobo) => {
  let guard = guardXY
  let direction = directionInitital
  let seenMap = {}
  let i = 0
  let maxI = map.length * map[0].length

  seenMap[`${guardXY[0]}-${guardXY[1]}`] = true
  switch (direction) {
    case '<':
      guard = [guard[0], guard[1] - 1]
      break
    case '^':
      guard = [guard[0] - 1, guard[1]]
      break
    case '>':
      guard = [guard[0], guard[1] + 1]
      break
    case 'v':
      guard = [guard[0] + 1, guard[1]]
      break
  }

  while (map[guard[0]]?.[guard[1]] && i < maxI) {
    const moveResult = move(map, guard, direction, seenMap)
    direction = moveResult.direction
    guard = moveResult.position
    seenMap = moveResult.seenMap
    i++
  }

  return { res: Object.keys(seenMap).length, cycle: i === maxI }
}
