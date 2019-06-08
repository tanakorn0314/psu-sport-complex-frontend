const NextI18Next = require('next-i18next/dist/commonjs')

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['th'],
  localeSubpaths: 'foreign'
})

/* Optionally, export class methods as named exports */
module.exports = NextI18NextInstance;
