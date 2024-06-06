const customName = (fullname) => {
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

  module.exports={
    customName
  }