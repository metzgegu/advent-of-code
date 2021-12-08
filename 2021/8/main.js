import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2021/8/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 8 ----')

    const lineList = tab.map(line => ({ patterns: line.split('|')[0].split(' ').filter(v => v), values: line.split('|')[1].split(' ').filter(v => v) }))

    console.log('Result part one :', getResultPartOne(lineList))

    console.log('Result part two :', getResultPartTwo(lineList))
  })
}

const getResultPartOne = (lineList) => {
  return lineList.reduce((acc, line) => {
    return line.values.reduce((acc2, value) => {
      if (value.length === 2 || value.length === 3 || value.length === 4 || value.length === 7) {
        return acc2 + 1
      }
      return acc2
    }, acc)
  }, 0)
}

const getResultPartTwo = (lineList) => {
  return lineList.reduce((acc, line) => {
    const digitMapping = getDigitMapping(line.patterns)
    return [...acc, line.values.reduce((acc2, value) => {
      return acc2 + getNumber(value, digitMapping)
    }, '')]
  }, []).reduce((acc, v) => acc + parseInt(v), 0)
}

const getNumber = (value, digitMapping) => {
  switch (value.length) {
    case 2:
      return 1
    case 3:
      return 7
    case 4:
      return 4
    case 7:
      return 8
  }
  return digitMapping.filter(v => v.letters.length === value.length && value.split('').every(l => v.letters.includes(l)))[0]?.value
}

const getDigitMapping = (patterns) => {
  const isEqual = (e0, e1) => e0.split('').every(e => e1.split('').includes(e))

  const one = patterns.find(e => e.length === 2)
  const three = patterns.filter(e => e.length === 5 && isEqual(one, e))[0]
  const four = patterns.find(e => e.length === 4)
  const seven = patterns.find(e => e.length === 3)
  const eight = patterns.find(e => e.length === 7)
  const nine = [...new Set([...four, ...three])].reduce((acc, v) => acc + v, '')
  const two = patterns.filter(e => e.length === 5 && !isEqual(e, three)).filter(pattern => [...new Set([...four, ...pattern])].length === 7)[0]
  const five = patterns.filter(e => e.length === 5 && !isEqual(e, three) && !isEqual(e, two))[0]
  const zero = patterns.filter(e => e.length === 6 && [...new Set([...five, ...e.split('')])].length === 7)[0]
  const six = patterns.filter(e => e.length === 6 && !isEqual(e, zero) && !isEqual(e, nine))[0]

  return [
    { value: 0, letters: zero.split('') },
    { value: 1, letters: one.split('') },
    { value: 2, letters: two.split('') },
    { value: 3, letters: three.split('') },
    { value: 4, letters: four.split('') },
    { value: 5, letters: five.split('') },
    { value: 6, letters: six.split('') },
    { value: 7, letters: seven.split('') },
    { value: 8, letters: eight.split('') },
    { value: 9, letters: nine.split('') }
  ]
}
