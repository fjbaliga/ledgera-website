# assets/

Static resources served alongside `index.html`.

```
assets/
├── css/
│   └── styles.css      Single stylesheet (light + dark themes)
├── js/
│   └── script.js       Theme toggle, mobile nav, scroll-spy, scroll-reveal
├── images/
│   ├── logo/           Brand logo, favicon, and role icons (SVG)
│   │   ├── ledgera-logo.svg
│   │   ├── ledgera-v1.1-web-icon.svg          (favicon)
│   │   └── ledgera_role_icons_svg/            (architecture role icons)
│   └── og-image.{png,svg}   Social-share image (Open Graph / Twitter)
├── fonts/              Reserved for self-hosted web fonts (.woff2)
└── docs/               Downloadable PDFs (whitepaper, yellow paper, Fantastyc)
```

## Conventions

- **Filenames**: lowercase, hyphen-separated (`hero-banner.png`, not `Hero Banner.PNG`).
- **Images**: prefer SVG for logos/icons; use WebP or optimized PNG/JPG for photos.
- **Referencing from HTML**: paths are relative to `index.html`, e.g.
  `<img src="assets/images/logo/ledgera-logo.svg" alt="...">`.
- **Referencing from CSS**: paths are relative to the stylesheet location, e.g.
  in `assets/css/styles.css`, use `url(../images/bg.png)`.
