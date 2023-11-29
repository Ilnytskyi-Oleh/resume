const getOnlyNumbers = (input: string): string => {
  return input.replace(/[^0-9]+/g, '');
};

const getOnlyLettersAndSingleSpace = (input: string): string => {
  return input.replace(/[^.A-Za-zА-Яа-я ]+/g, '').replace('  ', ' ');
};

export { getOnlyLettersAndSingleSpace, getOnlyNumbers };
