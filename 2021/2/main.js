import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/2/input.txt', 'utf8', (err, data) => {
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
  const resultObject = tab.reduce((acc, value) => {
    const t = value.split(' ')
    return {
      ...acc,
      ...(t[0] === 'forward' && { h: acc.h + parseInt(t[1]) }),
      ...(t[0] === 'up' && { d: acc.d - parseInt(t[1]) }),
      ...(t[0] === 'down' && { d: acc.d + parseInt(t[1]) })
    }
  }, { h: 0, d: 0 })

  return resultObject.h * resultObject.d
}

const getResultPartTwo = (tab) => {
  const resultObject = tab.reduce((acc, value) => {
    const t = value.split(' ')
    return {
      ...acc,
      ...(t[0] === 'forward' && { d: acc.d + parseInt(t[1]) * acc.aim, h: acc.h + parseInt(t[1]) }),
      ...(t[0] === 'up' && { aim: acc.aim - parseInt(t[1]) }),
      ...(t[0] === 'down' && { aim: acc.aim + parseInt(t[1]) })
    }
  }, { h: 0, d: 0, aim: 0 })

  return resultObject.h * resultObject.d
}
