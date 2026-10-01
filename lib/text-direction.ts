const ARABIC_CHARACTER_PATTERN =
  /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/;

export function isArabicText(value: string) {
  return ARABIC_CHARACTER_PATTERN.test(value);
}

export function getTextLanguageAttributes(value: string) {
  return isArabicText(value)
    ? ({ dir: "rtl", lang: "ar" } as const)
    : ({} as const);
}
