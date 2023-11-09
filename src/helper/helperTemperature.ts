
const farenheitToCelsius = (farenheit: number) => {
    return Math.floor(((farenheit - 32) * 5) / 9);
  };

const celsiusToFarenheit = (celsius: number) => {
    return Math.floor(celsius * (9 / 5) + 32);
};


  

export {farenheitToCelsius, celsiusToFarenheit}