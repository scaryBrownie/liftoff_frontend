export const formatFloat = (value) => {
   return value
      .toFixed(1)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Örnek kullanım
console.log(formatFloat(5167.8)); // "5.167,8"
console.log(formatFloat(1234567890.2)); // "1.234.567.890,2"
