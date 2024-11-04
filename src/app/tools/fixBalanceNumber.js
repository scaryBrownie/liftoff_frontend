export const formatFloat = (value) => {
   if (!isFloat(value)) return;
   return value
      .toFixed(1)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const isFloat = (value) => {
   return !isNaN(value) && parseFloat(value) === Number(value);
};

// Örnek kullanım
console.log(formatFloat(5167.8)); // "5.167,8"
console.log(formatFloat(1234567890.2)); // "1.234.567.890,2"
