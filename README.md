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

The page introduces Saad before the selected work, followed by experience, expertise, CVs and contact. The featured projects use native scrolling with sticky cards and reversible depth transitions; reduced-motion mode displays a regular list. Each featured project names Saad’s contribution, and internship entries link directly to their case studies.

Three.js loads after the initial paint during an idle callback. Its animation loop stops offscreen, in hidden tabs, and when motion is paused. Small screens and devices reporting four or fewer CPU cores use lighter geometry and a 30 fps rendering cap. Data-saver and 2G connections skip the renderer entirely. Devices without WebGL retain a CSS sculpture and all portfolio content. Detailed project dialogs load on demand. Fonts are served locally with swap rendering; their SIL Open Font Licenses are in `public/fonts/`. The font files came from the Google Fonts CSS API and the licenses from the official `google/fonts` repository.

Run `python scripts/check_project_stack.py` for stacking, focus access, and motion preference checks. Run a production preview on port 4173, then `python scripts/check_personal_portfolio.py` to verify personal context, experience links, deferred dialog loading, stopped/resumed WebGL drawing, data-saver behavior, and responsive layouts. These are browser checks, not field performance scores. Project covers illustrate the product workflow; real evidence remains in the case studies.

`public/projects/art/*-product.webp` contains four optimized product-interface illustrations. Current prompts and provenance are in `docs/product-artwork.md`. The earlier abstract cover prompts are archived in `docs/artwork.md`.

`ProjectExplorer.jsx` adds technology search, category filters, random discovery, local bookmarks, comparison, and copyable shortlists. Bookmarks use the `saad-project-shortlist` localStorage key and fall back to in-memory state when storage is unavailable. Run `python scripts/check_gallery.py` to verify these flows.

Expertise changes animate the panel and its contents with GSAP, including rapid switching and keyboard navigation. The selected discipline changes the panel accent. Pausing motion or requesting reduced motion makes the update immediate. `python scripts/check_enhancements.py` checks these transitions, direct case-study links, clipboard sharing, and evidence images.
