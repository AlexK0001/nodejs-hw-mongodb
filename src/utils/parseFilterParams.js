

const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isContactType(contactType)) return contactType;
  };

  const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;

    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return;
    }

    return parsedNumber;
  };

  export const parseFilterParams = (query) => {
    const {
        contactType,
        maxPhoneNumber,
        minPhoneNumber,
        maxEmail,
        minEmail, } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedMaxPhoneNumber = parseNumber(maxPhoneNumber);
    const parsedMinPhoneNumber = parseNumber(minPhoneNumber);
    const parsedMaxEmail = parseNumber(maxEmail);
    const parsedMinEmail = parseNumber(minEmail);

    return {
      contactType: parsedContactType,
      maxPhoneNumber: parsedMaxPhoneNumber,
      minPhoneNumber: parsedMinPhoneNumber,
      maxEmail: parsedMaxEmail,
      minEmail: parsedMinEmail,
    };
  };
