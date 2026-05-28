export const checkIfIsString = (param: string) => {
  return typeof param === "string";
};

export const checkIfTimeIsValid = (param: string) => {
  return param === "morning" || param === "afternoon" || param === "evening";
};

export const checkIfStatusIsValid = (param: string) => {
  return (
    param === "is_pending" ||
    param === "in_progress" ||
    param === "is_completed"
  );
};

export const checkIfDescriptionIsValid = (param: string) => {
  return param.length > 3;
};
