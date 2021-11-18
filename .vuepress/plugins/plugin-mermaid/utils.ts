const escapeCharMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

export function encode (str: string): string {
  return String(str).replace(/[&<>]/g, (char) => escapeCharMap[char])
}

export function decode (str: string): string {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
