# Ledgera website

The public landing site for **Ledgera — The Modular Distributed Ledger**.
A single-page static site — plain HTML/CSS/JS, no build step or dependencies.

## Project layout

```
.
├── index.html              Single-page site (all sections)
├── .htaccess               Apache rules for OVH hosting (canonical host + force HTTPS)
├── CNAME                   GitHub Pages custom domain (ledgera.tech)
├── .nojekyll               Disable Jekyll processing on GitHub Pages
├── .gitlab-ci.yml          CI: GitLab Pages publish + OVH SFTP deploy
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

## Deployment

The site can be published to any static host. Three targets are wired up:

| Target | Reachability | HTTPS | How |
| --- | --- | --- | --- |
| **GitLab Pages** | Internal (CEA network) | automatic | `pages` job in `.gitlab-ci.yml` |
| **OVH shared hosting** | Public | manual (OVH cert) | `deploy:ovh` job, or VS Code SFTP |
| **GitHub Pages** | Public | automatic (Let's Encrypt) | push to GitHub + `CNAME` |

> **Note:** the CEA GitLab instance (`gitlab.freyja.intra.cea.fr`) and its
> Pages are reachable only from inside the CEA network, so GitLab Pages serves
> as an **internal preview**. Public visitors are served by OVH and/or GitHub
> Pages.

### GitLab Pages — internal preview

`.gitlab-ci.yml` defines a `pages` job that copies `index.html`, `.htaccess`,
`LICENSE`, and `assets/` into `public/`, which GitLab Pages publishes. It runs
on every push to `main`; the published URL is shown under **Deploy → Pages**.
You can also trigger a run from **Build → Pipelines → Run pipeline**.

### OVH shared hosting — public

Two ways to push to the OVH account (cluster `cluster100`, docroot `www`):

- **CI — `deploy:ovh` job:** mirrors the built `public/` tree over SFTP with
  `lftp`. It stays **dormant** until you add a masked **`OVH_PASSWORD`** CI/CD
  variable (Settings → CI/CD → Variables). Optionally add **`OVH_KNOWN_HOSTS`**
  (the output of `ssh-keyscan ssh.cluster100.hosting.ovh.net`) to pin the host
  key with strict checking; without it the job falls back to trust-on-first-use.
  A TCP reachability pre-check and connection timeouts keep a blocked runner
  from hanging.
  ⚠️ The CEA runners have **no outbound internet**, so this job only succeeds
  on a runner with egress to OVH.
- **VS Code SFTP:** [`.vscode/sftp.json`](.vscode/sftp.json) uploads on save to
  the same docroot — the practical path from inside the CEA network.

[`.htaccess`](.htaccess) sets the canonical host (`www.ledgera.tech`) and forces
HTTPS on OVH's Apache. It is ignored by GitLab/GitHub Pages.

### GitHub Pages — public, automatic HTTPS

For public hosting with automatic Let's Encrypt HTTPS on `ledgera.tech`:

1. Push the repo to a **public** GitHub repository.
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`.**
3. The committed [`CNAME`](CNAME) (`ledgera.tech`) sets the custom domain;
   [`.nojekyll`](.nojekyll) disables Jekyll for this plain-HTML site.
4. Point DNS at GitHub — apex `A`/`AAAA` records to GitHub Pages' IPs and a
   `www` `CNAME` to `<user>.github.io` — **without** touching the OVH email
   records (`MX`, `SPF`/`TXT`, DKIM `_domainkey`, `mail`/`smtp`/`imap`/`pop3`
   CNAMEs, `SRV`).
5. Enable **Enforce HTTPS**. GitHub serves the apex and auto-redirects
   `www → ledgera.tech`.

## License

Released under the [MIT License](LICENSE).
