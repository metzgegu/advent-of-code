import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2023/2/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 2 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  const cubesByGames = tab.map(line => {
    const idGame = line.match(/Game\s(\d+)/)[1]

    const set = line.split(': ')[1].split('; ')
    return {
      idGame,
      sets: set.map(set => {
        return calculateNumberOfCube(set)
      })
    }
  })

  const finalSum = cubesByGames.filter(game => {
    let filter = true
    game.sets.forEach(set => {
      if (set.get('red') > 12 || set.get('blue') > 14 || set.get('green') > 13) {
        filter = false
      }
    })
    return filter
  }).reduce((acc, value) => parseInt(value.idGame) + acc, 0)

  return finalSum
}

const getResultPartTwo = (tab) => {
  const cubesByGames = tab.map(line => {
    const idGame = line.match(/Game\s(\d+)/)[1]

    const set = line.split(': ')[1].split('; ')
    return {
      idGame,
      sets: set.map(set => {
        return calculateNumberOfCube(set)
      })
    }
  })

  const result = cubesByGames.map(game => {
    const maxMap = new Map()
    game.sets.forEach(set => {
      ['red', 'blue', 'green'].forEach(color => {
        if (!maxMap.get(color) || maxMap.get(color) < set.get(color)) {
          maxMap.set(color, set.get(color))
        }
      })
    })

    return {
      idGame: game.idGame,
      result: ['red', 'blue', 'green'].reduce((acc, value) => (maxMap.get(value) || 1) * acc, 1)
    }
  })

  return result.reduce((acc, value) => acc + value.result, 0)
}

const calculateNumberOfCube = (set) => {
  const mapSet = new Map()

  const cubes = set.split(', ')
  const result = cubes.map(cube => calculateCube(cube))
  result.forEach(result => {
    if (!mapSet.get(result.color)) {
      mapSet.set(result.color, parseInt(result.number))
    } else {
      mapSet.set(result.color, mapSet.get(result.color) + parseInt(result.number))
    }
  })

  return mapSet
}

const calculateCube = (cube) => {
  const result = cube.match(/(\d+)\s(blue|red|green)/)
  return {
    number: result[1],
    color: result[2]
  }
}
