export function getDateFromString(dateString) {
  const tokens = dateString.split("-");
  console.log({ tokens });
  const formattedDate = new Date(
    Number(tokens[0]),
    Number(tokens[1] - 1),
    Number(tokens[2])
  );
  console.log({ formattedDate });

  return formattedDate;
}
