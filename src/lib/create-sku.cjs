function createSku(productName) {
  // Remove vowels and convert to uppercase
  let sku = productName.replace(/[aeiou]/gi, "").toUpperCase();

  // Split into words and create array
  let words = sku.split(" ");

  // Limit to three words
  if (words.length > 3) {
    words = words.slice(0, 3);
  }

  words = words.map((word) => {
    if (word.length > 3) {
      return word.slice(0, 3);
    } else {
      return word.padEnd(3, "X"); // Add 'X' to the end to ensure length is 3
    }
  });

  // Join words with dashes and return
  sku = words.join("-");
  return sku;
}

module.exports = createSku;
