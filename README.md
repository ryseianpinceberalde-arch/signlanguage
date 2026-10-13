# Sign Language Recognition

A responsive promotional landing page for the camera-based sign language recognition and text conversion capstone by **Ryse Ian Prince Beralde** and the project team.

The interactive dashboard uses labeled sample data. This website does not request camera access, run a trained recognition model, or provide a universal sign language translator.

## Run locally

Use Node.js **20.19+ within version 20**, or **22.12+** (matching `package.json`), and npm.

From the project directory:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. To check and preview the production build:

```sh
npm run lint
npm run build
npm run preview
```

The build produces `dist/`. The preview command is for local verification; publish the built static files through a hosting provider. For repeatable installations after a lockfile is present, use `npm ci`.

## Configure the project

Edit `src/config/project.ts` before publishing. Use only real, verified destinations.

| Field | Purpose |
| --- | --- |
| `title` | Project title |
| `tagline`, `description` | Project introduction |
| `logo` | Logo path relative to the site's base URL |
| `developer.name`, `developer.role` | Developer identity and role |
| `developer.photoUrl` | Optional developer photo |
| `developer.portfolioUrl`, `developer.linkedinUrl` | Optional professional profiles |
| `team` | Additional team members, each with `name`, `role`, and `photoUrl`; optional `portfolioUrl` and `linkedinUrl` |
| `publicUrl` | Final public landing page URL, including a repository subpath when applicable |
| `contactEmail` | Official contact email |
| `socials.facebook`, `socials.instagram`, `socials.tiktok` | The three visible project social channels |

Use full `https://` URLs for external destinations; invalid links and other protocols are not enabled. Missing destinations remain non-clickable or are hidden. No official social account, contact address, or public deployment URL has been invented. Configuration values are public site content; do not place secrets in this file.

The team consists of Ryse Ian Prince Beralde (System Developer), Geralden Batoon (Project Manager), Jakielou Madar (Database Designer), and Johanah Mae Obar (UI Designer). Facebook, Instagram, and TikTok are the site's three social channels; their supplied destinations are recorded in `DOCUMENTATION.md`.

The supplied logo is included at `public/images/project-logo.jpg`. Add team photos and real application screenshots only when available. Keep screenshot captions clear about what comes from the recognition application and what is a landing-page illustration.

Fonts are served locally from `public/fonts/`, with their SIL Open Font License files alongside them. The page needs no external font request. Presentation screenshots are included in `docs/screenshots/`.

The build always emits `dist/robots.txt`. Setting a valid HTTPS `publicUrl` also generates `dist/sitemap.xml`, a canonical URL, and absolute Open Graph URL/image tags. They are intentionally omitted until a real public address is configured. Page title and descriptive social metadata are in `index.html`; update those too if the project branding changes.

## Deployment

Publishing is a separate owner action. The local implementation does not publish to an account automatically.

Use the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory. No backend or API key is required.

| Provider | Setup |
| --- | --- |
| Netlify | Import the Git repository; confirm the build command is `npm run build` and the publish directory is `dist`. |
| Vercel | Import the Git repository, choose the Vite preset, and confirm the output directory is `dist`. |
| Cloudflare Pages | Create a Pages project from the Git repository; set the build command to `npm run build` and the output directory to `dist`. |

These settings follow the official [Netlify Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/), [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite), and [Cloudflare Pages build documentation](https://developers.cloudflare.com/pages/configuration/build-configuration/).

For GitHub Pages, select **GitHub Actions** under the repository's **Settings → Pages**, then add a Pages deployment workflow that runs `npm ci`, runs `npm run build`, and uploads `dist` as the Pages artifact. This project's Vite `base: './'` keeps bundled asset paths relative for both root and repository-subpath hosting. Set `publicUrl` to the complete published site address, including the repository path when applicable. See [Vite's GitHub Pages instructions](https://vite.dev/guide/static-deploy.html#github-pages) for the workflow template. No publishing workflow is enabled automatically.

After the host assigns a public URL, record it in `publicUrl`, rebuild, and redeploy. Verify the published site before adding its URL to social media bios.

## Verify before sharing

- Check desktop, tablet, and phone layouts, including navigation and overflow.
- Use the keyboard to open and close the mobile menu and operate the sample preview.
- Enable reduced motion and confirm the content remains understandable.
- Check every configured social/profile destination and contact link.
- Confirm the supplied logo loads and the sample-data labels remain visible.
- Check page metadata, `robots.txt`, and the generated `sitemap.xml` at the final public address after configuring `publicUrl`.

See [DOCUMENTATION.md](DOCUMENTATION.md) for the presentation summary, publication record, and screenshot checklist.
