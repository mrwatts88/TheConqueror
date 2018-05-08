import regent from 'regent';

// rule example
// const isRaining = { left: '@isRaining', fn: 'equals', right: true };

// data example
// const weatherData = {
//     isRaining: true,
// };

// assert rule given data
// const doINeedAnUmbrella = regent.evaluate(isRaining, weatherData); // true

// compose rules to make a compound rule
// const isRainingAndCalm = regent.and(isRaining, isCalm);

// composed rule looks like this
// {
//     compose: 'and',
//     rules: [isRaining, isWindy, isCold]
// }



var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");