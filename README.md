# Ledgera website

The public landing site for **Ledgera — The Modular Distributed Ledger**.
A single-page static site — plain HTML/CSS/JS, no build step or dependencies.
Published with **GitHub Pages** at <https://ledgera.tech>.

## Project layout

```
.
├── index.html              Single-page site (all sections)
├── CNAME                   GitHub Pages custom domain (ledgera.tech)
├── .nojekyll               Disable Jekyll processing on GitHub Pages
├── .gitignore
├── LICENSE                 MIT
├── README.md
└── assets/
    ├── css/styles.css      Stylesheet (light + dark themes)
    ├── js/script.js        Theme toggle / auto night mode, mobile nav, scroll-spy, scroll-reveal
    ├── images/
    │   ├── logo/           Ledgera logo, favicon, role icons (SVG)
    │   └── og-image.*      Social-share image (Open Graph / Twitter)
    ├── fonts/              Reserved for self-hosted web fonts
    └── docs/               Downloadable PDFs (whitepaper, yellow paper, Fantastyc)
```

## Features

- Single-page, fully static — no toolchain, no JS framework, no dependencies.
- **Light & dark themes** — follows the OS appearance automatically (including
  switching live when the system flips to night mode), with a header toggle
  that persists an explicit choice in `localStorage`. The theme is applied
  before first paint to avoid a flash.
- Mobile nav, scroll-spy active-section highlighting, and scroll-reveal
  animations — all respect `prefers-reduced-motion`.
- Social/SEO metadata: Open Graph + Twitter cards.

## Local development

Plain HTML/CSS/JS — serve the folder with any static file server:

```sh
python3 -m http.server 9000 --bind 127.0.0.1
# then open http://127.0.0.1:9000/
```

Use `--bind 0.0.0.0` to reach it from other devices on your LAN (mind
firewalls and what you're exposing).

## Deployment — GitHub Pages

The site is served by **GitHub Pages** straight from the repository root, with
no build step. Every push to `main` republishes it.

One-time setup:

1. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`.**
2. The committed [`CNAME`](CNAME) (`ledgera.tech`) sets the custom domain, and
   [`.nojekyll`](.nojekyll) disables Jekyll for this plain-HTML site.
3. **DNS** — point the apex `A`/`AAAA` records at GitHub Pages' IP addresses and
   a `www` `CNAME` at `<user>.github.io`. Leave email DNS (`MX`, `SPF`/`TXT`,
   DKIM, mail CNAMEs, `SRV`) untouched.
4. Enable **Enforce HTTPS** — GitHub provisions a Let's Encrypt certificate for
   `ledgera.tech` and `www.ledgera.tech`, and redirects `www → ledgera.tech`.

To update the live site, just push to `main`.

## License

Released under the [MIT License](LICENSE).
