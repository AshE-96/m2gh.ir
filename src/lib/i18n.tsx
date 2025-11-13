// Temporarily disabled i18n for stability - will be implemented in production
export const routing = {
  locales: ['fa'],
  defaultLocale: 'fa'
}

export const Link = ({ href, children, ...props }: any) => (
  <a href={href} {...props}>{children}</a>
)

