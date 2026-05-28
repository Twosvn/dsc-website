# DS Cleaners Website

DS Cleaners is a family-owned professional cleaning company. This repository houses the main website along with dynamically generated SEO landing pages.

## Directory Structure

- `index.html` - The main website (single page application with pricing calculator, contact form, services details, etc.).
- `generate.js` - Node.js generator script to build specialized SEO landing pages for each service and area.
- `landing/` - Subfolder containing all dynamically generated HTML landing pages (e.g., `domestic-cleaning-london.html`).

## Generating Landing Pages

To update or regenerate the landing pages:

1. Ensure you have Node.js installed.
2. Run the generator script from the root directory:
   ```bash
   node generate.js
   ```
3. The script will automatically create the `landing/` directory if it does not exist, and write the generated landing page HTML files there.
