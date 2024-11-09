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
  let hour = 0;
  let minutes = 0;

  for (let i = 1; (i + 60) - i <= duration; i++) {
    duration = duration - 60;
    hour = i;
    minutes = duration;
  }

  const hourStartDay = Number(startDaySplit[0]);
  const minutesStartDay = Number(startDaySplit[1]);

  const hourEndDay = Number(endDaySplit[0]);
  const minutesEndDay = Number(endDaySplit[1]);

  const hourStartMeeting = Number(startMeetingSplit[0]);
  const minutesStartMeeting = Number(startMeetingSplit[1]);

  if (hourStartMeeting >= hourStartDay) {
    if ((hourStartMeeting + hour) <= hourEndDay && (minutesStartMeeting + minutes) <= minutesEndDay) {
      console.log('true');
    } else {
      console.log('false');
    }
  } else {
    console.log('false');
  }


}
timeForBusiness('14:00', '17:30', '08:0', 90);
