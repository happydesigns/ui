/**
 * Formats a date string, number, or Date object into a localized string.
 *
 * @param date - The date to format
 * @returns A formatted date string
 */
export default function formatDate(date?: string | number | Date): string {
  if (!date) {
    return ''
  }

  const d = new Date(date)
  if (Number.isNaN(d.getTime())) {
    return ''
  }

  const appConfig = useAppConfig()
  const locale = appConfig.app.date?.locale || 'en'
  const options = appConfig.app.date?.options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return d.toLocaleDateString(locale, options)
}
