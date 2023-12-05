import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2023/5/input.txt', 'utf8', (err, data) => {
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

const getResultPartOne = (lines) => {
  const seeds = lines[0].split('seeds: ')[1].split(' ').map(value => parseInt(value))
  // console.log(seeds)

  const specsMap = []
  let i = 1
  while (i < lines.length) {
    if (lines[i] === '') {
      i++
    } else if (lines[i].includes('map:')) {
      // const specName = lines[i].split(' map:')[0]
      let y = i + 1
      let map = []
      while (y < lines.length && lines[y] !== '') {
        map.push(lines[y].split(' ').map(value => parseInt(value)))

        y++
      }

      specsMap.push(map)
      i = y
    }
  }

  const result = seeds.map(seed => {
    return specsMap.reduce((currentSeed, lines) => {
      let newValues = currentSeed
      lines.forEach((values) => {
        const destination = values[0]
        const source = values[1]
        const range = values[2]
    
        const newValue = getValue(currentSeed, destination, source, range)
        if (newValue !== currentSeed) {
          newValues = newValue
        }
      })

      return newValues
    }, seed)
  })

  return result.reduce((acc, value) => value < acc ? value : acc, result[0])
}

const getResultPartTwo = (lines) => {
  const seeds = lines[0].split('seeds: ')[1].split(' ').map(value => parseInt(value))

  const specsMap = []
  let i = 1
  while (i < lines.length) {
    if (lines[i] === '') {
      i++
    } else if (lines[i].includes('map:')) {
      let y = i + 1
      let map = []
      while (y < lines.length && lines[y] !== '') {
        map.push(lines[y].split(' ').map(value => parseInt(value)))

        y++
      }

      specsMap.push(map)
      i = y
    }
  }

  let minValue
  for (let index = 0; index < seeds.length; index += 2) {
    const startRange = seeds[index]
    const range = seeds[index + 1]
    let seed = startRange
    while (seed < startRange + range) {
      const result = specsMap.reduce((currentSeed, lines) => {
        let newValues = currentSeed
        lines.forEach((values) => {
          const destination = values[0]
          const source = values[1]
          const range = values[2]
      
          const newValue = getValue(currentSeed, destination, source, range)
          if (newValue !== currentSeed) {
            newValues = newValue
          }
        })
  
        return newValues
      }, seed)
      if (result < minValue || minValue === undefined) {
        minValue = result
      }
      seed++
    }
  }

  return minValue
}

const getValue = (value, destination, source, range) => {
  if (value >= source && value < source + range) {
    return Math.abs(source - value) + destination
  } else {
    return value
  }
}
