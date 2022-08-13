'use strict'
let day_1 = new Date(2019, 10, 1),
    day_2 = new Date(2019, 10, 7);

function diffDates(day_one, day_two) {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
};

console.log(diffDates(day_2, day_1));