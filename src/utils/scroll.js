const NAVBAR_OFFSET = 100

export function scrollToSection(e, href) {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
