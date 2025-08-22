export const ValidationRules = {
  DEFAULT_FIELD_LENGTH: 1,
  OTP_REGEX: /^\d+$/,
  OTP_LENGTH: 6,
  MIN_PASSWORD_LENGTH: 6,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
}
