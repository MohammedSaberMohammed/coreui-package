import i18n from "../plugins/i18n";

export const isRequired = (value) =>
  Boolean(value) || i18n.t("validations.fieldIsRequired");

export const isRequiredAttachment = (value) => {
  if (!value) {
    return true;
  }

  const isValidValue = Array.isArray(value) && value.length > 0;

  return isValidValue || i18n.t("validations.fieldIsRequired");
};

export const onlyNumbers = (value) =>
  (value && /^-{0,1}\d+$/.test(value)) || i18n.t("validations.onlyNumbers");

export const startsWith = (value, charList) => {
  if (!value) {
    return true;
  }

  const listText = String(charList).replaceAll(",", ` ${i18n.t("or")} `);

  return (
    charList.some((char) => value.startsWith(char)) ||
    i18n.t("validations.startsWith", { listText })
  );
};

export const phoneNumber = (value) => {
  if (!value) {
    return true;
  }

  const saudiPhoneKey = "05";
  const saudiPhoneNumberLength = 10;
  const startWithSaudiPhoneKey = startsWith(value, [saudiPhoneKey]);
  const isMachExactLength = value.length === saudiPhoneNumberLength;
  const errorMessage = i18n.t("validations.phoneNumber", {
    key: saudiPhoneKey,
    length: saudiPhoneNumberLength,
  });

  if (typeof startWithSaudiPhoneKey !== "boolean") {
    return errorMessage;
  }

  return (startWithSaudiPhoneKey && isMachExactLength) || errorMessage;
};

export const emailAddress = (value, length) => {
  if (!value) {
    return true;
  }

  return (
    /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/gi.test(
      `${value.trim()}`
    ) || i18n.t("validations.emailAddress", { length })
  );
};

export const onlyArabic = (value, msg = i18n.t("validations.onlyArabic")) => {
  if (!value) {
    return true;
  }

  return /^[\u0600-\u06FF\s]*$/gi.test(value) || msg;
};

export const maxNumbersLength = (value, length) => {
  if (!value) {
    return true;
  }

  return (
    value.length <= length || i18n.t("validations.maxNumbersLength", { length })
  );
};

export const onlyArabicAndNumbers = (
  value,
  msg = i18n.t("validations.onlyArabicAndNumbers")
) => {
  if (!value) {
    return true;
  }

  return (value && /^([0-9]|[\u0600-\u06FF\s])*$/gi.test(value)) || msg;
};

export const numbersExactLength = (value, length) => {
  if (!value) {
    return true;
  }

  return (
    value.length === length ||
    i18n.t("validations.numbersExactLength", { length })
  );
};

export const isValidTwitterUrl = (value) => {
  if (!value) {
    return true;
  }

  return (
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(
      `${value.trim()}`
    ) || i18n.t("validations.twitterId")
  );
};

export const isValidFacebookUrl = (value) => {
  if (!value) {
    return true;
  }

  return (
    /http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/.test(
      `${value.trim()}`
    ) || i18n.t("validations.facebookId")
  );
};

export const minWordsLength = (data) => {
  const { length, message, value } = data;

  if (!value) {
    return true;
  }

  return (
    value.trim().split(" ").length >= length ||
    message ||
    i18n.t("validations.minWordsLength", { length })
  );
};

export const isUniquePhoneNumber = (data) => {
  const { applicantPhoneNumber, contactPhoneNumbers, value } = data;

  if (!value) {
    return true;
  }

  if (contactPhoneNumbers?.length && contactPhoneNumbers.includes(value)) {
    return i18n.t("validations.duplicatePhoneNumberInContactInfo");
  }

  return (
    applicantPhoneNumber !== value ||
    i18n.t("validations.duplicatePhoneNumberInApplicantInfo")
  );
};
