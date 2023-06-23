// create a date format function
 function dateFormat(timestamp){
    // return a string with the month, day, and year
    return `${new Date(timestamp).getMonth()+1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear()}`;
}

module.exports = dateFormat;
