import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2024/7/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tab = data.split('\n')

    console.log('')
    console.log('---- Day 7 ----')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
  })
}

const getResultPartOne = (tab) => {
  let acc = 0

  for (let i = 0; i < tab.length; i++) {
    const sep = tab[i].split(': ')
    const target = parseInt(sep[0])
    const nums = sep[1].split(' ').map((v) => parseInt(v))
    const canBe = canBeCalculated(target, nums)
    if (canBe) {
      acc += target
    }
  }

  return acc
}

const canBeCalculated = (target, nums) => {
  const matrix = combinations(nums.length)

  for (let i = 0; i < matrix.length; i++) {
    const sum = nums.reduce(
      (acc, v, j) => (matrix[i][j] === 0 ? acc * v : acc + v),
      0
    )
    if (sum === target) {
      return true
    }
  }

  return false
}

const combinations = (n) => {
  const bits = Math.pow(2, n)

  const result = new Array(bits).fill(0).map((v, i) => {
    return i
      .toString(2)
      .padStart(n, '0')
      .split('')
      .map((v) => parseInt(v))
  })

  return result
}

const getResultPartTwo = (tab) => {
  let acc = 0

  for (let i = 0; i < tab.length; i++) {
    const sep = tab[i].split(': ')
    const target = parseInt(sep[0])
    const nums = sep[1].split(' ').map((v) => parseInt(v))
    const canBe = canBeCalculated2(target, nums)

    if (canBe) {
      acc += target
    }
  }

  return acc
}

const canBeCalculated2 = (target, nums) => {
  const matrix = permutate([0, 1, 2], nums.length)

  for (let i = 0; i < matrix.length; i++) {
    const sum = nums.reduce((acc, v, j) => {
      let res
      if (matrix[i][j] === 0) {
        res = (acc ?? 1) * v
      } else if (matrix[i][j] === 1) {
        res = (acc ?? 0) + v
      } else {
        res = acc ? parseInt(`${acc}` + `${v}`) : v
      }
      return res
    }, undefined)
    if (sum === target) {
      return true
    }
  }

  return false
}

const permutate = (items, count) => {
  const req = (array) => {
    if (array.length == count) {
      results.push(array)
      return
    }
    for (const item of items) {
      req(array.concat(item))
    }
  }

  const results = []

  req([])

  return results
}
