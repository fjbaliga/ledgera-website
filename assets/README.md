# assets/

Static resources served alongside `index.html`.

```
assets/
├── css/        Stylesheets (styles.css)
├── js/         Client-side scripts (script.js)
├── images/     Photos, illustrations, screenshots
│   └── logo/   Brand logos (SVG preferred, PNG fallback)
├── icons/      Favicons and small UI icons
├── fonts/      Self-hosted web fonts (.woff2)
└── docs/       Downloadable documents — PDFs (whitepapers, handbooks, specs)
```

## Conventions

- **Filenames**: lowercase, hyphen-separated (`hero-banner.png`, not `Hero Banner.PNG`).
- **Images**: prefer SVG for logos/icons; use WebP or optimized PNG/JPG for photos.
- **Referencing from HTML**: paths are relative to `index.html`, e.g.
  `<img src="assets/images/logo/logo.svg" alt="...">`.
- **Referencing from CSS**: paths are relative to the stylesheet location, e.g.
  in `assets/css/styles.css`, use `url(../images/bg.png)`.
