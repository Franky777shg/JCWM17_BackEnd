// module buatan sendiri
const { pengurangan, penjumlahan } = require('./myModules')

// console.log(pengurangan(10, 5))
// console.log(penjumlahan(10, 5))

// module built-in dari node js
const timers = require('timers')
// timers.setTimeout(() => console.log('ini module timers'), 5000)

const url = require('url')
let link = 'http://frengky.code/data.html?online=yes&job=coder'

let linkParse = url.parse(link, true)

// console.log(linkParse.hostname)
// console.log(linkParse.pathname)
// console.log(linkParse.query)
// console.log(linkParse.search)

// module download from npm
const colors = require('colors')
// console.log('INI WARNA MERAH'.red)
// console.log('INI BG KUNING'.bgYellow.black)

const moment = require('moment')
let today = moment().format('dddd, MMMM Do YYYY, hh:mm:ss A')
console.log(today)