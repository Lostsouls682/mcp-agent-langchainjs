# Tom's Playground branding

The chat and registration pages use an original purple paper-plane/spark mark inspired by the supplied image's playful, lightweight visual direction. It does not contain the Contoso wordmark.

## Assets and theme

- `public/assets/toms-playground-logo.svg`: desktop and registration wordmark.
- `public/assets/toms-playground-icon.svg`: compact navigation and SVG favicon.
- `src/styles.css`: purple theme, dark navigation, responsive logo sizing.
- `index.html`: page metadata and app-specific chat options. Options preserve the component defaults and nested strings; the assistant label is `Playground Assistant`.
- `register.html`: registration metadata and heading. Authentication elements and redirect remain unchanged.

The SVG wordmark uses a system-font stack, not an external font. Letter shapes may differ slightly by platform; convert lettering to vector outlines if exact typography is required. The favicon uses SVG; no PNG fallback has been generated. The old PNG remains in the repository but is no longer referenced by these two pages.

## Scope

This is a visual rebrand only. Burger suggestions, tool labels, API URLs, authentication, session handling, and backend behavior remain unchanged. The burger dashboard is not rebranded.

## Validation checklist

Build and browser checks must be run before merging; they have not been executed by the editing assistant.

- Build the agent webapp with its existing package scripts.
- Confirm both HTML entry points build and load.
- Confirm `/assets/toms-playground-logo.svg` and `/assets/toms-playground-icon.svg` return SVG assets, not navigation fallback HTML, in deployed Static Web Apps.
- Check navigation at 320px, 480px, 800px, and desktop widths with signed-in and signed-out states.
- Check keyboard focus, screen-reader brand labels, and text contrast.
- Confirm registration/login, user card, history, new chat, streaming, and burger tool calls behave as before.
- Confirm browser tabs show the new title and favicon (clear favicon cache if needed).
