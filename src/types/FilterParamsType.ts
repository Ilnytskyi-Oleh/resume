export type FilterParamsType = {
  name: string;
  sex: string;
  salary: {
    min: number;
    max: number;
  };
  age: {
    min: number;
    max: number;
  };
  page: number;
  perPage: number;
};
