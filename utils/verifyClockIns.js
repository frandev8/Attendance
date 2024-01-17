const canClockIn = (today, lastCheckInDate) => {
  if (!lastCheckInDate) {
    return true;
  }
  const previousCheckIn = new Date(lastCheckInDate);

  return (
    today.getDate() !== previousCheckIn.getDate() ||
    today.getMonth() !== previousCheckIn.getMonth() ||
    today.getFullYear() !== previousCheckIn.getFullYear()
  );
};

export default canClockIn;
