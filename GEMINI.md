# Operator - Engineering Standards

## Brand Persona: "The Operator"
- **Aesthetic:** Dark, technical, utilitarian, minimal. High contrast with subtle glows (Orange/Cyan).
- **Voice:** Direct, precise, no-nonsense. Focus on "solving real problems."
- **Visuals:** JetBrains Mono for technical details, Outfit for display. Minimalist icons.

## Project Structure (Vite-based)
- `/src`: All source code.
- `/public`: Static assets (original high-res images, favicons).
- `/src/assets`: Processed assets (optimized images, CSS).
- `/src/data`: Project JSON and other static data.

## Engineering Mandates
- **Performance First:** All hero images must be WebP and optimized.
- **Maintainability:** Project cards must be generated from `projects.json`.
- **Styling:** Use Vanilla CSS with CSS Variables for theme management. No bulky frameworks unless necessary.
- **Accessibility:** Ensure high contrast and proper ARIA labels for all interactive elements.

## Workflows
- **Asset Processing:** Use tools to optimize images before committing.
- **Feature Development:** Research -> Strategy -> Execution -> Validation.
