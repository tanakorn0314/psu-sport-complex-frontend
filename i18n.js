import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'th',
  otherLanguages: ['en'],
  localeSubpaths: 'foreign'
})

export default NextI18NextInstance

/* Optionally, export class methods as named exports */
export const {
  i18n,
  appWithTranslation,
  withNamespaces,
} = NextI18NextInstance