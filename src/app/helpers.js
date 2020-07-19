export function timer(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function copyToClipboard(element, selectionStart, selectionEnd) {
  const range = new Range()
  range.setStart(element, selectionStart)
  range.setEnd(element, selectionEnd)
  document.getSelection().removeAllRanges()
  document.getSelection().addRange(range)
  const isCopied = document.execCommand('copy')
  if (isCopied) {
    await timer(100)
    document.getSelection().removeAllRanges()
  }
}
