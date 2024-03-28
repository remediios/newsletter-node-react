export type Code = keyof typeof errors;

const errors = {
  "ERR-001": "{#key} is required",
};

const getErrorDescription = (code: Code, key?: string) => {
  const errorDescription = errors[code];
  const description = `${code}: ${errorDescription}`;

  if (!key) return description;

  return description.replace("{#key}", key);
};

export class ErrorCode extends Error {
  constructor(public code: Code, public key?: string) {
    const message = getErrorDescription(code, key);

    super(message);
    this.code = code;
  }
}
