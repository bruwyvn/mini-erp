function createSku(productName) {
  // Remove vowels and convert to uppercase
  let sku = productName.replaceAll(/[aeiou]/gi, '').toUpperCase()

  // Split into words and create array
  let words = sku.split(' ')

  // Limit to three words
  if (words.length > 3) {
    words = words.slice(0, 3)
  }

  words = words.map((word) => {
    return word.length > 3 ? word.slice(0, 3) : word.padEnd(3, 'X')
  })

  // Join words with dashes and return
  sku = words.join('-')
  return sku
}

module.exports = createSku
