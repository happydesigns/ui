/**
 * Formats a date string, number, or Date object into a localized datetime string (including time).
 *
 * @param date - The date to format
 * @returns A formatted datetime string
 */
export default function formatDateTime(date?: string | number | Date): string {
  if (!date) {
    return ''
  }

  const d = new Date(date)
  if (Number.isNaN(d.getTime())) {
    return ''
  }

  const appConfig = useAppConfig()
  const locale = appConfig.app.date?.locale || 'en'
  const options = appConfig.app.date?.datetimeOptions || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  return d.toLocaleString(locale, options)
}
