const customName = (fullname) => {
  console.log(fullname)
  const nameArray = fullname.split(" ");
  // console.log(
  //   "nameArray=================================================",
  //   nameArray
  // );
  let result;

  if (nameArray.length > 1) {
    result =
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[nameArray.length - 1].charAt(0).toUpperCase();
  } else {
    result = nameArray[0].charAt(0).toUpperCase();
  }
  // console.log(
  //   "result---------------------------------->>>>>>>>>>>>>",
  //   result
  // );
  return result;
};

const formatDateTimeFormat = (date) => {
  console.log(date);
  const sourceDate = new Date(date).toDateString();
  const sourceTime = new Date(date).toLocaleTimeString();
  // The above yields e.g. 'Mon Jan 06 2020'
  console.log(sourceTime);
  const [, month, day, year] = sourceDate.split(" ");
  const formattedDate = [day, month, year].join(" ");
  // console.log(formattedDate);

  const [hour, minute, second] = sourceTime.split(" ")[0].split(":");
  const formattedTime =
    [hour, minute].join(":") + " " + sourceTime.split(" ")[1];
  return {
    formattedTime,
    formattedDate,
  };
};

const getTimeSession = (time) => {
  console.log(typeof time);
  const timeArray = time.split(":");
  const timeHour = timeArray[0];

  if (timeHour > 12) {
    return "PM";
  }
  return "AM";
};



const checkRsvpCount = (attendees) => {
  let yesCount = 0;
  let noCount = 0;
  let pendingCount = 0;
  let mayBeCount = 0;

  attendees.map((item) => {
    item.rsvp === "YES"
      ? (yesCount = yesCount + 1)
      : item.rsvp === "NO"
      ? (noCount = noCount + 1)
      : item.rsvp === "MAYBE"
      ? (mayBeCount = mayBeCount + 1)
      : (pendingCount = pendingCount + 1);
  });

  const countMessage = `${yesCount} Yes, ${noCount} No, ${mayBeCount} May Be, ${pendingCount} Awaiting`;

  return {
    yesCount,noCount,mayBeCount,pendingCount,countMessage
  };
};

const convertFirstLetterToCapital=(text)=>{
  return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1)
}
const convertFirstLetterOfFullNameToCapital=(textData)=>{
  const textArray=textData.split(" ")
  const convertedTextArray=textArray.map((text)=>{
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1)
  })
  return convertedTextArray.join(" ");
}


module.exports = {
  customName,
  formatDateTimeFormat,
  getTimeSession,
  checkRsvpCount,
  convertFirstLetterToCapital,
  convertFirstLetterOfFullNameToCapital
};
