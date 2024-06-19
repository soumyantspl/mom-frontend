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

module.exports = {
  customName,
  formatDateTimeFormat,
  getTimeSession
};
