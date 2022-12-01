import { exerciceList as exerciceList2021 } from './2021/2021.module.js'
import { exerciceList as exerciceList2022 } from './2022/2022.module.js'

console.log('')
console.log('#### 2021 ####')

exerciceList2021.map(seeResult => seeResult())

console.log('')
console.log('#### 2022 ####')

exerciceList2022.map(seeResult => seeResult())
