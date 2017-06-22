import Ember from 'ember';


function formatDate(date) {
  var year = date.getFullYear();

  return year;
}

export function dateYyyy(value) {
    // Make sure we have a date.
  if (!value.getMonth) {
    value = new Date(value);
  }

  return formatDate(value);
}

export default Ember.Helper.helper(dateYyyy);
