var q;
var month;
var m;
var year;
var J;
var K;
var weekDayNum;
var weekDay;
var trueYear;

function dayOfWeek() {
  resetText()
  q = Number(document.getElementById("day").value);
  month = document.getElementById("month").value;
  switch (month) {
    case 'January':
      m = 13;
      break;
    case 'February':
      m = 14;
      break;
    case 'March':
      m = 3;
      break;
    case 'April':
      m = 4;
      break;
    case 'May':
      m = 5;
      break;
    case 'June':
      m = 6;
      break;
    case 'July':
      m = 7;
      break;
    case 'August':
      m = 8;
      break;
    case 'September':
      m = 9;
      break;
    case 'October':
      m = 10;
      break;
    case 'November':
      m = 11;
      break;
    case 'December':
      m = 12;
      break;
  }
  year = document.getElementById("year").value;
  trueYear = year;
  var validDate = checkDate(month, q, year)
  if (month == 'January' || month == 'February') {
    year--;
  }
  J = Math.floor(Number(year)/100);
  K = Number(year)%100;
  if (validDate) {
    if (year > 1582 || (year == 1582 && m > 10) || (year == 1582 && m == 10 && q >=15)) {
   weekDayNum = (q + Math.floor((m + 1)*13 / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + (5 * J))%7;
    }
  if (year < 1582 || (year == 1582 && (m < 10 || (m == 10 && q <= 14)))) {
    console.log(year)
    weekDayNum = (q + Math.floor((m + 1)*13 / 5) + K + Math.floor(K / 4) + 5 + (6 * J))%7;
  }
  switch (weekDayNum) {
    case 0:
      weekDay = 'Saturday';
      break;
    case 1:
      weekDay = 'Sunday';
      break;
    case 2:
      weekDay = 'Monday';
      break;
    case 3:
      weekDay = 'Tuesday';
      break;
    case 4:
      weekDay = 'Wednesday';
      break;
    case 5:
      weekDay = 'Thursday';
      break;
    case 6:
      weekDay = 'Friday';
      break;
  }
  addText(weekDay, "weekDay");
  getExplanation ();
  } 
}

function resetText () {
  document.getElementById("error1").innerHTML = "";
  document.getElementById("error2").innerHTML = "";
  document.getElementById("error3").innerHTML = "";
  document.getElementById("weekDay").innerHTML = "";
  document.getElementById("explanation").style.display = "none";
}

function checkDate (month, day, year) {
  var isDate = true;
  if (month == 'February' && day == '29' && !checkLeapYear(year)) {
    document.getElementById("error1").innerHTML = year + " is not a leap year";
    isDate = false;
}
  if (month == '0') {
      document.getElementById("error1").innerHTML = "Please select a month<br>";
      isDate = false;
      }
  if (day == '0') {
    document.getElementById("error2").innerHTML = "Please select a day<br>";
    isDate = false;
  }
  if (!year || Number(year) < 0 || isNaN(Number(year))) {
    document.getElementById("error3").innerHTML = "Please enter a year between 0 and 9999<br>";
      isDate = false;
  }
 return isDate;
}

function checkLeapYear (year) {
  if ((year%4 == 0 && !(year%100 == 0)) || (year%4 == 0 && year%400 == 0 && year >= 1600)) {
    return true;
  } else {
    return false;
  }
}

function getExplanation () {
  document.getElementById('explanation').style.display = 'block';
  var dayth;
  switch (q) {
    case 1:
    dayth = "1st";
    break;
    case 2:
    dayth = "2nd"
    break;
    case 3:
    dayth = "3rd"
    break;
    default:
    dayth = q + "th"
  }
  var mm = Math.floor(13*(m+1)/5)%7;
  var centuryType;
  var whyCalendar;
  var centuryValue;
  var centurySentence;
  var sumNumbers;
  var sumAnswer;
  var formulaImg;
  var imgSize;
  if (year < 1582 || (year == 1582 && (m < 10 || (m == 10 && q <= 14)))) {
    whyCalendar = "before October 15, 1582"
    centuryType = "J";
    centuryValue = J;
    sumNumbers = q + " + " + mm + " + " + K + " + " + Math.floor(K/4) + " + 5 - " + J; 
    sumAnswer = q + mm + K + Math.floor(K/4) + 5 - J;
    formulaImg = "https://tinyurl.com/y8odrue3";
    imgSize = "formula1";
    centurySentence = ""
  } else if (year < 1700 || year >= 2100) {
    whyCalendar ="after October 14, 2015 but not in the 1700s, 1800s, 1900s, or 2000s"
    centuryType = "J";
    centuryValue = J;
    sumNumbers = q + " + " + mm + " + " + K + " + " + Math.floor(K/4) + " + " + Math.floor(J/4) + " - " + 2*J;
    sumAnswer = q + mm + K + Math.floor(K/4) + Math.floor(J/4) - 2*J;
    formulaImg = "https://tinyurl.com/yckhjbog";
    imgSize = "formula4";
    centurySentence = "J (" + J + ") divided by 4 and rounded down is " + Math.floor(J/4) + ", and 2 times J is " + 2*J + "."
  } else {
    whyCalendar ="between January 1, 1700 and December 31, 2099"
    centuryType = "C";
    centuryValue = ((Math.floor(J/4)-2*J)%7+7)%7; 
    sumNumbers = q + " + " + mm + " + " + K + " + " + Math.floor(K/4) + " + " + centuryValue;
    sumAnswer = q + mm + K + Math.floor(K/4) + centuryValue;
    formulaImg = "https://tinyurl.com/y9wxgght";
    imgSize = "formula3";
    centurySentence = "";
  }
  addText(month, "month1");
  addText(month, "month2");
  addText(q, "q");
  addText(year, "year1");
  addText(trueYear, "year2");
  addText(K, "K1");
  addText(K, "K2");
  addText(Math.floor(K/4), "K4")
  addText(weekDayNum, "weekDayNum")
  addText(weekDay, "weekDay1")
  addText(dayth, "dayth1")
  addText(dayth, "dayth2")
  addText(mm, "M")
  addText(whyCalendar, "whyCalendar")
  addText(centuryType, "C-J")
  addText(centuryValue, "valC-J")
  addText(centurySentence, "century")
  addText(sumNumbers, "algebra")
  addText(sumAnswer, "answer1")
  addText(sumAnswer, "answer2")
  document.getElementById("formulaImage").setAttribute("src", formulaImg)
  document.getElementById("formulaImage").setAttribute("class", imgSize)
 if (month == 'January' || month == 'February') {
   addText("*", "asterisk")
   addText("<br><br><strong>*</strong> January and February are counted as the 13th and 14th months of the previous year.", "Jan-Feb")
 }
}

function addText(text, element) { document.getElementById(element).innerHTML = text;
}

// changeDay changes the date selections to hide dates that are not available in the selected month.
function changeDay () {
  document.getElementById("day").disabled = false;
  var month = document.getElementById("month").value;
  if (month.match(/^(January|March|May|July|August|October|December)$/)) {
    document.getElementById("30").hidden = false;
    document.getElementById("31").hidden = false;   
  } else if (month == 'February') {
    document.getElementById("30").hidden = true;
    document.getElementById("31").hidden = true;
  } else {
    document.getElementById("30").hidden = false;
    document.getElementById("31").hidden = true;
  }
}
