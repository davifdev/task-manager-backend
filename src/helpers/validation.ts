import type { BodyParams } from "../controllers/tasks/create-task";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkRequiredFields = (
  params: BodyParams,
  requiredFields: string[],
) => {
  for (const field of requiredFields) {
    const fieldIsMissing = !params[field];

    if (fieldIsMissing) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }

  return {
    missingField: null,
    ok: true,
  };
};
