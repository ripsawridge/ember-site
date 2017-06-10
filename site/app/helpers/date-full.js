import Ember from 'ember';

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + year;
}

export function dateFull([value, ...rest]) {
    // Make sure we have a date.
  if (!value.getMonth) {
    value = new Date(value);
  }

  return formatDate(value);
}

export default Ember.Helper.helper(dateFull);
