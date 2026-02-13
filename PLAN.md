# Website Improvement Plan

## 1. Simplify Text Styling

### The Problem
The page currently uses **6 distinct font sizes** and multiple style combinations. That's more visual "levels" than a page this simple needs, and it makes the hierarchy feel busy.

### Current text styles (audit)
| Element | Font | Size | Weight | Extras |
|---|---|---|---|---|
| Name (h1) | Fraunces | ~2.25–3rem | 500 | tight letter-spacing |
| Tagline | Source Serif 4 | 1.25rem | 400 | italic, muted color |
| Nav links | Source Serif 4 | 0.95rem | 400 | muted color |
| Section headings (h2) | Fraunces | 1.125rem | 500 | UPPERCASE, wide tracking, muted |
| Sub-headings (h3) | Fraunces | 0.85rem | 500 | UPPERCASE, wide tracking, muted |
| Role title | Source Serif 4 | 1.125rem (body) | 500 | — |
| Role company | Source Serif 4 | 1rem | 400 | muted |
| Role description | Source Serif 4 | 0.95rem | 400 | muted |
| Body / links | Source Serif 4 | 1.125rem | 400 | — |

### Proposed changes
- **Merge h2 and h3 into one style.** "Currently" and "Previously" sub-headings don't need to be a different size from section headings — they can use the same style, or simply be bold body text.
- **Unify role-company and role-desc** to the same size as body text (1.125rem). Having 1rem and 0.95rem alongside 1.125rem creates three nearly-identical sizes that don't help readability.
- **Target: 3–4 distinct sizes** — one large (h1), one small-caps label (section/sub-headings), and one body size.

### Where in the code
All changes are in the `<style>` tag, roughly lines 65–175. No HTML structure changes needed.

---

## 2. Sticky Navigation

### What this means
When you scroll down, the nav bar ("Work · Writing · Contact") currently scrolls away and disappears. A **sticky** nav stays pinned to the top of the screen so you can always jump between sections.

### How it works (CSS concept: `position`)
- Currently the nav uses `position: absolute` — it's placed at the top of the page and stays there (scrolls away with the page).
- We'll change it to `position: sticky; top: 0` — this tells the browser "behave normally until the user scrolls past you, then stick to the top of the viewport."
- We'll also add a background color so content doesn't show through behind the nav as you scroll, and a subtle bottom border.

### Where in the code
- **CSS** (lines 51–63): Change `position: absolute` → `position: sticky`, add `top: 0`, `background`, and `z-index`.
- **HTML**: No changes needed.

---

## 3. Collapsible "Previously" Section

### What this means
The "Previously" work history will be **collapsed by default**, showing just a clickable "Previously" label. Clicking it expands to reveal the full list. This keeps the focus on current roles.

### How it works (HTML concept: `<details>` / `<summary>`)
HTML has a built-in element for this — no JavaScript required:
```html
<details>
  <summary>Previously</summary>
  <!-- content hidden until clicked -->
</details>
```
The browser handles the open/close behavior automatically. We just need to style it to match the rest of the page.

### Where in the code
- **HTML** (lines 289–305): Wrap the "Previously" work-group content in a `<details>` element, and change the `<h3>` to a `<summary>`.
- **CSS**: Add styles for `details`, `summary`, and the open/closed states.

---

## Order of implementation
1. **Text styling** (CSS only — lowest risk, biggest visual cleanup)
2. **Sticky nav** (CSS only — small change, immediately useful)
3. **Collapsible Previously** (HTML + CSS — most structural change)
