function lengthCheck (line, maxLength) {

  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}
lengthCheck('строка', 41);

function isPalindrome (line) {

  const lineLowerCase = line.toLowerCase();
  const lineChange = line.split('').reverse().join('');

  if (lineLowerCase === lineChange) {
    return true;
  } else {
    return false;
  }
}
isPalindrome('анна');
