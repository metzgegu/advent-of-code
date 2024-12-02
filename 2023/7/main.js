import fs from 'fs'

export function displayResultOfTheDay () {
  fs.readFile('2023/7/input.txt', 'utf8', (err, data) => {
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

const cardsWeight = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const cardsWeightWithJoker = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

const isFiveOfKind = (cards, joker = false) => {
  return cards.reduce((acc, value) => {
    if (joker && value === 'J') {
      return acc
    }
    if (acc === value || acc === 'J') {
      return value
    }
    return false
  }, cards[0]) !== false
}

const isFourOfKind = (cards, joker = false) => {
  const cardsMap = new Map()
  cards.forEach(card => {
    if (joker && card === 'J') {
      cardsWeightWithJoker.forEach(c => {
        if (cardsMap.has(c)) {
          cardsMap.set(c, cardsMap.get(c) + 1)
        } else {
          cardsMap.set(c, 1)
        }
      })
    } else if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })
  return Array.from(cardsMap.values()).includes(4)
}

const isFullHouse = (cards, joker = false) => {
  const cardsMap = new Map()
  const jokerCards = cards.filter(card => card === 'J')
  if (joker && jokerCards.length === 2 && isOnePair(cards.filter(card => card !== 'J'))) {
    return true
  }
  if (joker && jokerCards.length === 1 && isTwoPairs(cards.filter(card => card !== 'J'))) {
    return true
  }

  cards.forEach(card => {
    if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })

  return Array.from(cardsMap.values()).includes(3) && Array.from(cardsMap.values()).includes(2)
}

const isThreeOfKind = (cards, joker = false) => {
  const cardsMap = new Map()
  cards.forEach(card => {
    if (joker && card === 'J') {
      cardsWeightWithJoker.forEach(c => {
        if (cardsMap.has(c)) {
          cardsMap.set(c, cardsMap.get(c) + 1)
        } else {
          cardsMap.set(c, 1)
        }
      })
    } else if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })
  return Array.from(cardsMap.values()).includes(3)
}

const isTwoPairs = (cards, joker = false) => {
  const cardsMap = new Map()
  cards.forEach(card => {
    if (joker && card === 'J') {
      cardsWeightWithJoker.forEach(c => {
        if (cardsMap.has(c)) {
          cardsMap.set(c, cardsMap.get(c) + 1)
        } else {
          cardsMap.set(c, 1)
        }
      })
    } else if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })
  return Array.from(cardsMap.values()).filter(value => value === 2).length === 2
}

const isOnePair = (cards, joker = false) => {
  const cardsMap = new Map()
  cards.forEach(card => {
    if (joker && card === 'J') {
      cardsWeightWithJoker.forEach(c => {
        if (cardsMap.has(c)) {
          cardsMap.set(c, cardsMap.get(c) + 1)
        } else {
          cardsMap.set(c, 1)
        }
      })
    } else if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })
  return Array.from(cardsMap.values()).includes(2)
}

const isHighCard = (cards) => {
  const cardsMap = new Map()
  cards.forEach(card => {
    if (cardsMap.has(card)) {
      cardsMap.set(card, cardsMap.get(card) + 1)
    } else {
      cardsMap.set(card, 1)
    }
  })
  return Array.from(cardsMap.values()).filter(value => value === 1).length === 5
}

const getResultPartOne = (lines, joker = false, cardsWeightTab = cardsWeight) => {
  const newMap = new Map()
  lines.map(line => {
    const cards = line.split(' ')[0].split('')
    let point = 0

    if (isFiveOfKind(cards, joker)) {
      point = 6
    } else if (isFourOfKind(cards, joker)) {
      point = 5
    } else if (isFullHouse(cards, joker)) {
      point = 4
    } else if (isThreeOfKind(cards, joker)) {
      point = 3
    } else if (isTwoPairs(cards, joker)) {
      point = 2
    } else if (isOnePair(cards, joker)) {
      point = 1
    } else if (isHighCard(cards)) {
      point = 0
    }

    if (newMap.has(point)) {
      newMap.set(point, [...newMap.get(point), { cards, bid: line.split(' ')[1] }])
    } else {
      newMap.set(point, [{ cards, bid: line.split(' ')[1] }])
    }
  })

  for (let i = 0; i < 7; i++) {
    const cards = newMap.get(i)
    if (cards) {
      const newCardsSorted = cards.sort((a, b) => {
        for (let y = 0; y < a.cards.length; y++) {
          if (cardsWeightTab.indexOf(a.cards[y]) > cardsWeightTab.indexOf(b.cards[y])) {
            return -1
          } else if (cardsWeightTab.indexOf(a.cards[y]) === cardsWeightTab.indexOf(b.cards[y])) {

          } else {
            return 1
          }
        }
      })

      newMap.set(i, newCardsSorted)
    }
  }

  const sortedTab = []
  let resultNumber = 0
  for (let i = 0; i < 7; i++) {
    if (newMap.get(i)) {
      sortedTab.push(newMap.get(i))
    }
  }

  resultNumber = sortedTab.flat().reduce((acc, value, index) => {
    return acc + value.bid * (index + 1)
  }, 0)

  return resultNumber
}

const getResultPartTwo = (lines) => {
  return getResultPartOne(lines, true, cardsWeightWithJoker)
}
