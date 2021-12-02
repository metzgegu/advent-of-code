const fs = require('fs')

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    const tab = data.split('\n').map(value => parseInt(value))

    const resultPartOne = tab.reduce((acc, value) => ({
        prev: value,
        nbIncr: (acc.prev && value > acc.prev) ? acc.nbIncr + 1 : acc.nbIncr
    }), {nbIncr: 0})

    console.log('Result part one :', resultPartOne.nbIncr)

    const resultPartTwo = tab.map((value, index) => !!tab[index + 1] && !!tab[index + 2] ? value + tab[index + 1] + tab[index + 2] : -1)
        .filter(value => value !== -1)
        .reduce((acc, value) => (
            {prev: value, nbIncr: (acc.prev && parseInt(value) > parseInt(acc.prev)) ? acc.nbIncr + 1 : acc.nbIncr}
        ), {nbIncr: 0})

    console.log('Result part two :', resultPartTwo.nbIncr)
})
