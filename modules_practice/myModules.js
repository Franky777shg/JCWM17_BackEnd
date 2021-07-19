penjumlahan = (angka1, angka2) => {
    return `${angka1} ditambah ${angka2} sama dengan ${angka1 + angka2}`
}

pengurangan = (angka1, angka2) => {
    return `${angka1} dikurang ${angka2} sama dengan ${angka1 - angka2}`
}

module.exports = {
    penjumlahan, 
    pengurangan
}