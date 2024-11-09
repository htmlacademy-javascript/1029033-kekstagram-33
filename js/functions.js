/*function lengthCheck (line, maxLength) {

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
isPalindrome('анна'); */

function timeForBusiness (startDay, endDay, startMeeting, duration) {
  const startDaySplit = startDay.split(':');
  const endDaySplit = endDay.split(':');
  const startMeetingSplit = startMeeting.split(':');
  const hourStartDay = Number(startDaySplit[0]) * 60 + Number(startDaySplit[1]);
  const hourEndDay = Number(endDaySplit[0]) * 60 + Number(endDaySplit[1]);
  const hourStartMeeting = Number(startMeetingSplit[0]) * 60 + Number(startMeetingSplit[1]);

  if (hourStartDay <= hourStartMeeting) {
    if ((hourStartMeeting + duration) <= hourEndDay) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
timeForBusiness('8:00', '17:30', '08:00', 900);
