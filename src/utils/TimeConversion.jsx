export const convertFrom24To12Format = (time24) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? "AM" : "PM";
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

export const convertFrom12To24Format = (time12) => {
  const [sHours, minutes, period] = time12
    .match(/([0-9]{1,2}):([0-9]{2}) (AM|PM)/)
    .slice(1);
  const PM = period === "PM";
  const hours = (+sHours % 12) + (PM ? 12 : 0);

  return `${("0" + hours).slice(-2)}:${minutes}`;
};
