export function getDay(ssn: string): string {
  let day = Number(ssn.substring(0, 2));
  if (isDNumber(ssn)) {
    day = day - 40;
  } else if (day >= 72) {
    throw Error('Fødselsnummer is of unknown format');
  }
  return padLeft(String(day), 2, '0');
}

export function getFourDigitYear(ssn: string) {
  const year = Number(ssn.substring(4, 6));
  const individnummer = Number(ssn.substring(6, 9));

  if (individnummer < 500) {
    return year + 1900;
  }
  if (individnummer < 750 && 54 < year) {
    return year + 1800;
  }
  if (individnummer < 1000 && year < 40) {
    return year + 2000;
  }
  if (900 < individnummer || individnummer > 1000 || 39 >= year) {
    throw new Error(
      `Individnummer ${individnummer} could not be recognized in a valid range`,
    );
  }
  return year + 1900;
}

export function isDNumber(ssn: string) {
  const day = Number(ssn.substring(0, 2));
  return day > 40 && day <= 71;
}

export function padLeft(input: string, width: number, symbol: string) {
  if (input.length >= width) {
    return input;
  }
  const leadingSymbol = symbol.length > 0 ? symbol.charAt(0) : ' ';
  return leadingSymbol.repeat(width - input.length) + input;
}

export const calculateBirthdateFromSSN = (ssn: string): Date => {
  if (ssn.length !== 11) {
    throw Error(
      `Invalid SSN length, expected 11 digits - got : ${ssn.length} digits`,
    );
  }
  const day = getDay(ssn);
  const fourDigitYear = getFourDigitYear(ssn);
  const month = ssn.substring(2, 4);
  return new Date(`${fourDigitYear}-${month}-${day}`);
};
