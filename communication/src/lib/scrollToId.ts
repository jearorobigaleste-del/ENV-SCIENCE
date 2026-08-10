export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export function scrollToProgress(frac: number) {
  const el = document.getElementById('stage')
  if (!el) return
  const max = el.scrollHeight - window.innerHeight
  window.scrollTo({ top: el.offsetTop + max * Math.min(1, Math.max(0, frac)), behavior: 'smooth' })
}

export function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
