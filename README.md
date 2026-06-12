# Ledgera website

The public landing site for **Ledgera — The Modular Distributed Ledger**.
A single-page static site, no build step required.

## Project layout

```
.
├── index.html                Single-page site (all sections)
├── LICENSE                   MIT
├── .gitlab-ci.yml            GitLab Pages deploy job
└── assets/
    ├── css/styles.css        Stylesheet
    ├── js/script.js          Theme toggle, mobile nav + scroll-spy
    ├── images/logo/          Ledgera logo (SVG)
    ├── icons/                Favicon (SVG)
    ├── fonts/                Reserved for self-hosted web fonts
    └── docs/                 Downloadable PDFs (whitepaper, yellow paper)
```

## Local development

The site is plain HTML/CSS/JS — no toolchain or dependencies. Serve it with
any static-file server:

```sh
python3 -m http.server 9000 --bind 127.0.0.1
# then open http://127.0.0.1:9000/
```

To make it reachable from other devices on your LAN, replace `--bind 127.0.0.1`
with `--bind 0.0.0.0` (be mindful of firewalls and what you're exposing).

## Deployment — GitLab Pages

This repository is configured to deploy automatically to **GitLab Pages**
through the [`.gitlab-ci.yml`](.gitlab-ci.yml) at the repo root. Follow these
steps to publish the site.

### 1. Configure (already done)

The [`.gitlab-ci.yml`](.gitlab-ci.yml) defines a single `pages` job that
copies `index.html`, `LICENSE`, and the `assets/` tree into a `public/`
directory. GitLab Pages picks that directory up automatically.

The job runs only on the default branch (`main`).

### 2. Push to GitLab

Commit any changes and push to the default branch:

```sh
git add .
git commit -m "Update site"
git push origin main
```

### 3. Start (or watch) the pipeline

GitLab triggers the pipeline automatically on push. To watch it:

- Open the project in GitLab → **Build → Pipelines**.
- The first pipeline on this commit should run a `pages` job in the
  `deploy` stage. When it turns green, the deployment is live.

You can also trigger a pipeline manually from **Build → Pipelines →
Run pipeline**.

### 4. Find the published URL

Once the `pages` job succeeds, open **Deploy → Pages** in the project
sidebar. GitLab will show the URL at which the site is published.

The exact host depends on your GitLab instance:

- **gitlab.com**: `https://<group>.gitlab.io/<project>/`
- **self-hosted / corporate GitLab** (e.g. `gitlab.freyja.intra.cea.fr`):
  the Pages domain is configured per-instance and shown in **Deploy → Pages**.

It typically takes a few minutes after the first successful job for the
Pages URL to become reachable.

### Updating the live site

Every push to the default branch re-runs the `pages` job and re-publishes
the site. There is nothing to do beyond pushing changes.

## License

Released under the [MIT License](LICENSE).
