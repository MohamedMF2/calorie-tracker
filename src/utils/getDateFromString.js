export function getDateFromString(dateString) {
  const tokens = dateString.split("-");
  console.log({tokens})
  return new Date (Number(tokens[0]), Number(tokens[1] - 1), Number(tokens[2]));
}
