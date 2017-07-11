var moment = require('moment');

console.log(moment().format());

// January 1st 1970 @ 12:00am  -> 0

var now = moment();

console.log('Current timestamp', now.unix());

var timestamp = 1459111648;
var currentMoment = moment.unix(timestamp);

console.log('Current moment', currentMoment.format('D MMM, YY @ h:mm a'));

console.log('Current moment', currentMoment.format('MMMM Do, YYYY @ h:mm A'));
