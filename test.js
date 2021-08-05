// let z = ''

// for (let i = 0; i < 4; i++) { // i = 0
//     for (let j = 0; j < 4; j++) { // j = 0
//         z += '* '
//     }
//     z += '\n'
// }
// console.log(z)

// 1 2 3 4
// 2 3 4 5
// 3 4 5 6
// 4 5 6 7
// 5 6 7 8

// let z = ''

// for (let i = 1; i <= 5; i++) { // i = 4
//     for (let j = i; j < i + 4; j++) { // j = 4
//         z += `${j} `
//     }
//     z += '\n'
// }
// console.log(z)

// 1
// 1 3
// 1 3 5
// 1 3 5 7
// 1 3 5 7 9
// 1 3 5 7 9 11

//        1       
//     1  2  3
//  1  2  3  4  5

let z = ''

for (let i = 1; i <= 3; i++) { // i = 4
    for (let j = i; j < 3; j++) { // j = 3
        z += '   '
    }
    for (let k = 1; k < i * 2; k++) {
        z += ` ${k} `
    }
    z += '\n'
}

console.log(z)