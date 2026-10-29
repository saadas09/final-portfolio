# Saad Abs — Portfolio

A personal portfolio for AI, data, cloud, and software engineering. Built with React, Vite, GSAP, Three.js, and Lucide icons. The visual direction combines near-black, electric lime, silver, and soft violet with oversized Syne typography.

Live site: https://abs-saad.netlify.app/

## Local development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Updating the portfolio

- `src/data/portfolioData.js`: project case studies, verified source links, skills, contact details, and the four CV imports. Project counts are calculated automatically.
- `src/data/caseStudies.js`: deeper engineering walkthroughs for FindUrWay, the LMS, and Darija OCR. Shareable URLs use `?project=findurway`, `?project=lms`, or `?project=darija`.
- `public/projects/`: original project evidence. The LMS welcome/sign-in screenshots were captured from the existing local `LMS_project/frontend` application without authenticating. The OCR input is copied from `MoroccanDarijaOCR/images/test.png`; it is an input artifact, not model output. Concept illustrations remain explicitly labeled.
- `src/features/hero/HeroSection.jsx`: the introduction and interactive discipline selector.
- `src/components/ChromeSculpture.jsx`: the lazy-loaded WebGL sculpture, three forms, desktop mouse parallax, drag rotation, keyboard controls, and CSS fallback.
- `src/components/ScrollEffects.jsx`: GSAP entrance effects, scroll-driven text, and layered project cards. Layout changes refresh scroll positions.
- `src/components/MotionProvider.jsx`: system reduced-motion preferences and the visitor's motion toggle.
- `src/features/about/AboutSection.jsx`: biography, internships, and education.
- `src/features/projects/components/ProjectVisual.jsx`: original concept illustrations, labeled as illustrations rather than product screenshots.
- `src/features/resume/ResumeSection.jsx`: CV previews and downloads with readable filenames.
- `src/index.css`: palette, typography, responsive layouts, and motion.
- `public/`: favicon, social sharing preview, sitemap, and robots file.

The four supplied CV PDFs are imported from the project root and bundled by Vite. Replace a PDF and update its import in the data file when a new version is ready. The previous CV has been removed.

Contact uses working email links and a copy-email action. It does not claim to send messages from an unconnected form.

## Automatic Netlify deployment

The existing Netlify project is connected to `saadas09/final-portfolio`, production branch `main`. `netlify.toml` specifies `npm run build` and the `dist` publish directory.

Commit and push reviewed changes to `main` to trigger a new deployment. Saving local files alone does not publish them. Confirm the latest deployment succeeds in Netlify after pushing.

## Browser verification

With Python, Playwright, and Google Chrome installed, start the local Vite server, then run:

```sh
python scripts/check_portfolio.py
```

To verify a production preview or the live site:

```sh
python scripts/check_portfolio.py https://abs-saad.netlify.app/
```

The browser checks exercise all 14 project dialogs, filtering, focus restoration, keyboard controls, mobile navigation, four actual PDF downloads, copy email, 3D controls, animated layouts, the motion toggle, WebGL fallback, and text/viewport overflow at nine widths from 320 to 1920 pixels. Screenshots and the verification summary go to the git-ignored `.qa` directory.

The site uses native scrolling and a staggered project gallery with scroll reveals. The 3D renderer skips offscreen/hidden frames and does not continuously redraw when paused. Three.js is loaded separately from the initial application. Devices without WebGL retain a CSS sculpture and all portfolio content. Project covers illustrate the product workflow; real evidence remains in the case studies.

`public/projects/art/*-product.webp` contains four optimized product-interface illustrations. Current prompts and provenance are in `docs/product-artwork.md`. The earlier abstract cover prompts are archived in `docs/artwork.md`.

`ProjectExplorer.jsx` adds technology search, category filters, random discovery, local bookmarks, comparison, and copyable shortlists. Bookmarks use the `saad-project-shortlist` localStorage key and fall back to in-memory state when storage is unavailable. Run `python scripts/check_gallery.py` to verify these flows.

Expertise changes animate the panel and its contents with GSAP, including rapid switching and keyboard navigation. The selected discipline changes the panel accent. Pausing motion or requesting reduced motion makes the update immediate. `python scripts/check_enhancements.py` checks these transitions, direct case-study links, clipboard sharing, and evidence images.
