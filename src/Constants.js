import React from 'react';

const CARD_HOLDER_REGEXP = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
const CARD_CVV_REGEXP = /^[0-9]{3,4}$/;
const CARD_VISA_PAYMENT_REGEXP = /^4[0-9]{12}(?:[0-9]{3})?$/;
const CARD_MASTERCARD_PAYMENT_REGEXP = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
const CARD_NUMBER_REPLACE_REGEXP = /(?!(?<=[A-Z]))[^A-Z](?=[^A-Z\n]{4,})/gmi;

export {
    CARD_HOLDER_REGEXP,
    CARD_CVV_REGEXP,
    CARD_VISA_PAYMENT_REGEXP,
    CARD_MASTERCARD_PAYMENT_REGEXP,
    CARD_NUMBER_REPLACE_REGEXP
};