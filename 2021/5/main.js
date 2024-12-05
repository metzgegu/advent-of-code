import fs from 'fs'

export function displayResultOfTheDay() {
  fs.readFile('2021/5/input.txt', 'utf8', (err, data) => {
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

const getResultPartOne = (tab) => {
  const lineList = getLineList(tab)

  const verticalHorizontalLineList = lineList.filter(
    (line) =>
      line.points[0].x === line.points[1].x ||
      line.points[0].y === line.points[1].y
  )

  const occuredList = processCoveredPoints(verticalHorizontalLineList)

  return occuredList.reduce(
    (acc, value) => (value.occur > 1 ? acc + 1 : acc),
    0
  )
}

const getResultPartTwo = (tab) => {
  const lineList = getLineList(tab)

  const occuredList = processCoveredPoints(lineList)

  return occuredList.reduce(
    (acc, value) => (value.occur > 1 ? acc + 1 : acc),
    0
  )
}

const getLineList = (tab) => {
  return tab.map((line) =>
    line.split(' -> ').reduce(
      (acc, point) => ({
        ...acc,
        points: [
          ...acc.points,
          {
            x: parseInt(point.split(',')[0]),
            y: parseInt(point.split(',')[1]),
          },
        ],
      }),
      { points: [] }
    )
  )
}

const processCoveredPoints = (lines) => {
  const newLinesList = lines.map((line) => {
    if (isVerticalHorizontalLine(line)) {
      return {
        ...line,
        coveredPoints: isVerticalLine(line)
          ? Array(Math.abs(line.points[0].y - line.points[1].y))
              .fill()
              .reduce(
                (acc) => [
                  ...acc,
                  { x: line.points[0].x, y: acc[acc.length - 1].y + 1 },
                ],
                [
                  {
                    x: line.points[0].x,
                    y:
                      line.points[0].y > line.points[1].y
                        ? line.points[1].y
                        : line.points[0].y,
                  },
                ]
              )
          : Array(Math.abs(line.points[0].x - line.points[1].x))
              .fill()
              .reduce(
                (acc) => [
                  ...acc,
                  { y: line.points[0].y, x: acc[acc.length - 1].x + 1 },
                ],
                [
                  {
                    y: line.points[0].y,
                    x:
                      line.points[0].x > line.points[1].x
                        ? line.points[1].x
                        : line.points[0].x,
                  },
                ]
              ),
      }
    } else {
      return {
        ...line,
        coveredPoints: Array(Math.abs(line.points[0].y - line.points[1].y))
          .fill()
          .reduce(
            (acc, value) => {
              return [
                ...acc,
                {
                  x:
                    acc[acc.length - 1].x +
                    (line.points[0].x > line.points[1].x ? -1 : 1),
                  y:
                    acc[acc.length - 1].y +
                    (line.points[0].y > line.points[1].y ? -1 : 1),
                },
              ]
            },
            [line.points[0]]
          ),
      }
    }
  })

  const lineListMap = new Map()

  newLinesList
    .flatMap((v) => v.coveredPoints)
    .forEach((value) => {
      const alreadyInList = lineListMap.get(`${value.x},${value.y}`)
      lineListMap.set(`${value.x},${value.y}`, {
        points: value,
        occur: alreadyInList ? alreadyInList.occur + 1 : 1,
      })
    }, [])

  return Array.from(lineListMap).map(([_, value]) => value)
}

const isVerticalHorizontalLine = (line) =>
  isVerticalLine(line) || isHorizontalLine(line)
const isVerticalLine = (line) => line.points[0].x === line.points[1].x
const isHorizontalLine = (line) => line.points[0].y === line.points[1].y
