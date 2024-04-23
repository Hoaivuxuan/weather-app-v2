//Functions
//
export const convertDateTo_ddmm = (dateString) => {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}`;
};
//
export const convertDateTo_Week = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};
