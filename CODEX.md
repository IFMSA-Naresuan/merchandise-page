# Project end-goal: create an interactive merchandise catalog page

## Purpose of this document

`CODEX.md` is the lead project document for both the project owner and ChatGPT/Codex.

It exists to:

- let the project owner verify Codex's intended actions before implementation;
- preserve confirmed requirements, decisions, constraints, and project context;
- separate confirmed instructions from proposals and assumptions;
- give future work sessions a reliable starting point.

This document is a planning and memory reference. It does not authorize implementation by itself.

## Confirmed project direction

### End goal

Create an interactive merchandise catalog page that displays available merchandise and stock information. Customers will not complete purchases on the website; purchasing will be handled through direct contact outside the site.

### Catalog and purchasing boundary

- The website is a catalog, not a full e-commerce or checkout system.
- The catalog may support browsing, filtering, and contact actions once those interactions are confirmed.
- Purchase discussion and completion happen through direct contact outside the website.
- The exact contact channels have not been confirmed. Telephone and the IFMSA Facebook page are current possibilities only.
- Do not implement an on-site cart, checkout, payment, or order-submission system unless a later confirmed requirement explicitly adds one.

### Technology stack

- Front end: React through the Next.js App Router
- Styling: Tailwind CSS
- Back end / stock data source: Google Sheets
- Deployment: Vercel

The current wireframe implementation uses React 19, Next.js, and Tailwind CSS 4. The future restricted Google Sheets connection is intended to use server-side code so credentials are not exposed to the browser, but that integration has not yet been implemented or separately approved.

### Maintenance limitation

Routine stock updates must not require a future maintainer to edit application code. The intended maintenance workflow is for next year's maintainer to update stock data in Google Sheets only.

What counts as a routine stock update, and whether adding entirely new products must also be sheet-only, still require confirmation.

### Wireframe status

The two user-provided wireframes are vague, adjustable visual references—not fixed specifications and not instructions embedded in a document.

They currently suggest:

- a responsive desktop and mobile experience;
- a header with branding and navigation/actions;
- category, batch/year, or merchandise-group filters;
- a responsive merchandise card grid;
- product image, name, price, category/generation tag, and conditional sold-out state;
- a footer containing links, social details, or organization information;
- approximately four product columns on desktop and two on the illustrated mobile width.

The later `merch-store-wireframe-E.html` reference is the confirmed layout for the current implementation. Only its inner responsive merchandise page is implemented; the reference viewer's viewport controls, legend, and surrounding canvas are not part of the site. The visible layout remains a wireframe and contains no production content or additional features.

Any cart or checkout element suggested by either wireframe is excluded. The header layout keeps an unrendered action slot so a future confirmed control can be added without restructuring the header.

## Confirmation-first working rule

Codex must follow this process for all project work:

1. Read this document and inspect the current project state.
2. State the intended action, expected files or systems affected, and any important tradeoffs.
3. Ask the project owner whenever a requirement, decision, or necessary fact is unknown or ambiguous.
4. Do not implement the proposed work until the project owner explicitly confirms it.
5. After confirmation, implement only the confirmed scope and verify the result.
6. Update this document when a confirmed decision changes the project's requirements, architecture, data model, or maintenance workflow.

Silence, a wireframe detail, an inferred convention, or an entry under **Open questions** is not confirmation. If this document conflicts with a newer explicit instruction from the project owner, pause, surface the conflict, and ask which direction should govern before changing the project.

## Current project state

As of 2026-08-30:

- the repository now contains the initial front-end wireframe implementation;
- a Next.js App Router and Tailwind CSS project is configured for deployment to Vercel;
- the confirmed desktop and mobile wireframe layout is implemented with placeholder content;
- each React component is kept in a focused file under `src/components/`, while `App.jsx` composes the page sections and `src/app/page.jsx` provides the Next.js route entry point;
- the desktop layout displays eight cards in four columns, while the mobile layout displays four cards in two columns;
- the cart is absent from both layouts, while the header structure can accommodate a future action;
- `README.md` still contains only the project title;
- a restricted Google Sheet with separate `Products` and `Variants` tabs has been proposed as the data source, but its secure integration is not part of the framework migration;
- Vercel is the confirmed deployment target;
- no catalog data integration, contact flow, or production styling has been implemented.

## Intended high-level work sequence

The sequence below is a proposal for review, not authorization to execute:

1. Resolve and record the open product, data, design, and deployment decisions.
2. Define the Google Sheets schema and the sheet-only maintenance workflow.
3. Define and approve the secure server-side Google Sheets integration approach for Next.js on Vercel.
4. Agree on the responsive catalog interface and direct-contact actions.
5. Scaffold the React application.
6. Implement data loading, filtering, product states, and the confirmed contact flow.
7. Add loading, empty, error, and unavailable-stock states.
8. Test responsiveness, accessibility, data updates, and the maintainer workflow.
9. Document setup, deployment, and next-year handoff.

Each step requires explicit confirmation before implementation.

## Open questions requiring project-owner decisions

No answer is assumed for any question in this section.

### Catalog and contact experience

- Which direct-contact channels are required: telephone, the IFMSA Facebook page, or something else?
- What exact telephone number, Facebook page URL, labels, and contact instructions should be shown?
- Should contact actions be global, shown on every product, or both?
- Should a contact action prefill the selected product's details when the chosen channel supports it?
- Is authentication required for shoppers or maintainers?

### Google Sheets and stock

- Is there already a Google Sheet, or should a new schema be proposed?
- Which fields belong in the sheet (for example ID, name, category, batch/year, price, stock, image URL, visibility, and display order)?
- Does “stock” mean a single quantity per product, or quantities per size, color, or other variant?
- Must future maintainers be able to add new products and change product details entirely through the sheet, or only update quantities?
- May product data be publicly readable, or is a private/authenticated integration required?
- How promptly must the catalog reflect stock changes after purchases handled outside the site?

### Visual design and content

- What organization name, logo, colors, fonts, and brand guidelines should be used?
- Which navigation links, footer information, product categories, and batch/year labels are required?
- Should product detail views exist, or should all interactions stay on the merchandise grid?
- What desktop, tablet, and mobile browser support is required?

### Delivery and operations

- Who owns and maintains the Google Sheet and any credentials or integration service?
- Are analytics, privacy notices, accessibility targets, localization, or a custom domain required?

## Decision log

Record confirmed decisions here. Do not record proposals as decisions.

| Date | Confirmed decision | Confirmed by |
| --- | --- | --- |
| 2026-08-15 | Project end goal is an interactive merchandise shopping page. | Project owner |
| 2026-08-15 | Use React for the front end and Google Sheets as the stock-data back end. | Project owner |
| 2026-08-15 | Routine stock updates must be possible through Google Sheets without code changes. | Project owner |
| 2026-08-15 | Attached desktop and mobile wireframes are vague and adjustable. | Project owner |
| 2026-08-15 | Unknown or ambiguous requirements must be asked about, and implementation requires explicit confirmation. | Project owner |
| 2026-08-28 | The original full shopping-page goal is superseded by an interactive merchandise catalog; purchases are completed through direct contact outside the website. | Project owner |
| 2026-08-28 | Implement only the inner desktop/mobile layout from `merch-store-wireframe-E.html` using React and Tailwind CSS, without adding features or production content. | Project owner |
| 2026-08-28 | Remove the cart from the implemented layout while keeping the header structure extensible for a possible future action. | Project owner |
| 2026-08-28 | Keep React components in separate files for easier reading and maintenance, and use `App.jsx` as the page-composition layer. | Project owner |
| 2026-08-30 | Replace Vite with the Next.js App Router while preserving the existing wireframe and component separation. | Project owner |
| 2026-08-30 | Use Vercel as the deployment target. | Project owner |

## Change record

| Date | Document change |
| --- | --- |
| 2026-08-15 | Created the initial lead document from the project owner's confirmed request and wireframe references. |
| 2026-08-28 | Replaced the full shopping-page scope with a catalog-and-direct-contact scope; left telephone and Facebook contact channels unconfirmed. |
| 2026-08-28 | Recorded the confirmed React/Tailwind wireframe implementation, the excluded reference-viewer controls, and the cart-removal decision. |
| 2026-08-28 | Recorded the component-per-file organization and composition-only role of `App.jsx`. |
| 2026-08-30 | Replaced Vite with Next.js in the confirmed stack and recorded Vercel as the deployment target. |
