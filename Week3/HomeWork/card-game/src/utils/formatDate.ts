const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const getHours = date.getHours();
  let hours = getHours % 12;
  if (hours === 0) {
    hours = 12;
  }
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const meridian = getHours >= 12 ? "오후" : "오전";

  return `${year}.${month}.${day}. ${meridian} ${hours}:${minutes}:${seconds}`;
};

export default formatDate;
