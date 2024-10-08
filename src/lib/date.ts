/**
 * ZSTiO Elektronika returns the "valid" date in "16 października, 2023r." or "16.10.2023r" format and the "Generated" date in "yyyy-mm-dd" format, so we should convert them to one format.
 */

const months: Record<string, string> = {
  stycznia: "01",
  lutego: "02",
  marca: "03",
  kwietnia: "04",
  maja: "05",
  czerwca: "06",
  lipca: "07",
  sierpnia: "08",
  września: "09",
  października: "10",
  listopada: "11",
  grudnia: "12",
};

export const convertTextDate = (inputDate: string): string => {
  inputDate = inputDate.replace(/r\./, "").trim();

  for (const [monthName, monthNumber] of Object.entries(months)) {
    if (inputDate.includes(monthName)) {
      const [day, year] = inputDate.replace(monthName, "").trim().split(/\s+/);
      return `${year}-${monthNumber}-${day.padStart(2, "0")}`;
    }
  }

  const regex = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;
  const matchResult = inputDate.match(regex);
  if (matchResult) {
    const [, day, month, year] = matchResult;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return inputDate;
};
