import * as yup from 'yup';

// Mirror svastha login validation: required, valid email, max 254 chars; password required + min 8
const EMAIL_REGEX =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

export interface LoginFormInputs {
  email: string;
  password: string;
  gReCaptchaToken?: string;
  otpExtensionToken?: string;
  isNarcoticsPortal?: boolean;
}

export const LoginFormValidateSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please Enter Email Address')
    .test('email-format', 'Please Enter Valid Email Address', function (value) {
      if (!value) return true;
      return EMAIL_REGEX.test(value);
    })
    .test('email-max-length', 'Must be 254 characters or less', function (value) {
      if (!value) return true;
      return value.length <= 254;
    }),
  password: yup
    .string()
    .required('Please Enter Password')
    .test('password-min-length', 'Must be 8 characters or more', function (value) {
      if (!value) return false;
      return value.length >= 8;
    }),
}).required();

