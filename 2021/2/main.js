const fs = require('fs')

const getResultPartOne = (tab) => {
    const resultObject = tab.reduce((acc, value) => {
        const t = value.split(" ")
        let newAcc = {...acc}
        switch (t[0]) {
            case 'forward':
                newAcc.h += parseInt(t[1])
                break;
            case 'up':
                newAcc.d -= parseInt(t[1])
                break;
            case 'down':
                newAcc.d += parseInt(t[1])
                break
        }
        return newAcc
    }, { h: 0, d: 0 })

    return resultObject.h * resultObject.d
}

const getResultPartTwo = (tab) => {
    const resultObject = tab.reduce((acc, value) => {
        const t = value.split(" ")
        let newAcc = { ...acc }
        switch (t[0]) {
            case 'forward':
                newAcc.d += parseInt(t[1]) * newAcc.aim
                newAcc.h += parseInt(t[1])
                break;
            case 'up':
                newAcc.aim -= parseInt(t[1])
                break;
            case 'down':
                newAcc.aim += parseInt(t[1])
                break
        }
        return newAcc

    }, { h: 0, d: 0, aim: 0 })

    return resultObject.h * resultObject.d
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    const tab = data.split('\n')

    console.log('Result part one :', getResultPartOne(tab))

    console.log('Result part two :', getResultPartTwo(tab))
})
