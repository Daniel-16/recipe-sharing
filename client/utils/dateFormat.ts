export function dateFormat(recipe: any) {
  const createdAtString = recipe;
  const createdAtDate = new Date(createdAtString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = createdAtDate.getDate();
  const month = months[createdAtDate.getMonth()];
  const year = createdAtDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate;
}
