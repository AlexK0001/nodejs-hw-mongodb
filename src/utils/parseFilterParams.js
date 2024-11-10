

const parseСontactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isСontactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isСontactType(contactType)) return contactType;
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

    const parsedСontactType = parseСontactType(contactType);
    const parsedMaxPhoneNumber = parseNumber(maxPhoneNumber);
    const parsedMinPhoneNumber = parseNumber(minPhoneNumber);
    const parsedMaxEmail = parseNumber(maxEmail);
    const parsedMinEmail = parseNumber(minEmail);

    return {
      contactType: parsedСontactType,
      maxPhoneNumber: parsedMaxPhoneNumber,
      minPhoneNumber: parsedMinPhoneNumber,
      maxEmail: parsedMaxEmail,
      minEmail: parsedMinEmail,
    };
  };
