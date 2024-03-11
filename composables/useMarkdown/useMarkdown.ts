import { marked } from 'marked'

export function useMarkdown() {
  function render(text: string) {
    return marked.parse(text)
  }

  return { render }
}
