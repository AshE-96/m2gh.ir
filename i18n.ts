import { getRequestConfig } from 'next-intl/server'

export const routing = {
  locales: ['fa'],
  defaultLocale: 'fa'
}

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale!,
  messages: (await import(`../../messages/${locale}.json`)).default
  }
})
