# Sign Language Recognition — Project Documentation

## Project details

| Item | Value |
| --- | --- |
| Project title | Sign Language Recognition |
| Developer | Ryse Ian Prince Beralde |
| Role | System Developer |
| Public landing page URL | Not yet published; set `publicUrl` in `src/config/project.ts` after deployment |
| Official contact email | Not provided; configure `contactEmail` |

## Project team

| Team member | Role |
| --- | --- |
| Ryse Ian Prince Beralde | System Developer |
| Geralden Batoon | Project Manager |
| Jakielou Madar | Database Designer |
| Johanah Mae Obar | UI Designer |

The developer is configured in `project.developer`; the additional members are configured in `project.team`. Each member has `name`, `role`, and `photoUrl` fields. Portfolio and LinkedIn destinations can be provided through optional `portfolioUrl` and `linkedinUrl` fields. Photos and profile destinations have not been supplied.

## Landing page purpose

Introduce a camera-based sign language recognition and text conversion capstone to students, instructors, researchers, Deaf and hard-of-hearing users, and other visitors. The page explains the project's purpose, supported interaction concepts, workflow, technology, and potential contribution to inclusive communication.

The recognition project is a prototype for supported predefined signs. The landing page is a promotional website and does not access a camera or execute recognition models. Its interface preview uses clearly labeled demonstration content; it does not measure recognition accuracy or claim universal translation.

## Feature overview

- Sticky navigation with section links and a responsive mobile menu.
- Hero section with the supplied logo and an illustrated hand-tracking interface.
- Project background, six core feature cards, and a four-step recognition workflow.
- Recognition-system technology overview, separate from the landing-page stack.
- Interactive project preview with sample recognition modes and text output.
- Accessibility and educational benefits, four team profiles, three project social channels, contact area, and footer.
- Responsive layouts, keyboard focus styles, reduced-motion support, and subtle interface animation.

## Technology used

| Layer | Technologies |
| --- | --- |
| Promotional landing page | React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React |
| Recognition application described by the brief | Python, OpenCV, MediaPipe, TensorFlow/Keras, machine learning, Flask, Flask-SocketIO, HTML, CSS, JavaScript |
| Hosting artifact | Static files generated in `dist/` |

React is used for the promotional page. The recognition application and trained model files are not included in this landing-page project.

## Official social media URLs

The site's visible social channels are Facebook, Instagram, and TikTok. The project owner supplied the Facebook link, Instagram reel, and TikTok share link below. The Instagram destination opens a specific reel rather than a profile. The TikTok destination is the direct share link extracted from the supplied Facebook outbound URL, with the Facebook wrapper and tracking removed. Update these destinations in `src/config/project.ts`; missing destinations remain hidden or marked as coming soon without active links.

| Channel | Configuration key | Publication record |
| --- | --- | --- |
| Facebook | `socials.facebook` | [Sign Language Recognition](https://www.facebook.com/share/19rtHdkiub/) |
| Instagram | `socials.instagram` | [Owner-supplied project reel](https://www.instagram.com/reel/Dea0p0uRyBl/?cplk=MXdxdDR2bzljaXlqbw==) |
| TikTok | `socials.tiktok` | [Owner-supplied TikTok share link](https://vt.tiktok.com/ZSbEdh5Hc/) |

Team photos, portfolios, and LinkedIn profiles can also be configured. Do not substitute guessed accounts or credentials.

## Deployment instructions

1. Install dependencies with `npm install` (or `npm ci` for the committed lockfile).
2. Run `npm run lint` and `npm run build`.
3. Preview the build with `npm run preview` and complete the checks below.
4. When the owner is ready to publish, import the repository into Netlify, Vercel, or Cloudflare Pages. Use the project root, build command `npm run build`, and output directory `dist`.
5. Record the assigned HTTPS public address in `publicUrl`, rebuild, and redeploy. This also generates the sitemap, canonical URL, and absolute Open Graph URL/image tags. Update the publication record in this document with the actual URL.
6. Test the final public site and official social links, then share that address in project social media bios.

See [README.md](README.md#deployment) for provider-specific setup and official deployment references. No account deployment has been performed as part of the local implementation.

## Screenshots checklist

Capture the actual website in a browser after the final build. Use descriptive filenames and record the viewport dimensions and final public URL with the submitted screenshots.

- [ ] Desktop hero, logo, and navigation.
- [ ] About section and core features.
- [ ] Four-step workflow and recognition technology stack.
- [ ] Interactive preview with its demonstration label visible.
- [ ] Benefits and all four team profiles.
- [ ] Facebook, Instagram, and TikTok links and contact/footer sections.
- [ ] Mobile hero and expanded mobile menu.
- [ ] Mobile feature cards and project preview.
- [ ] Visible keyboard focus on interactive controls.
- [ ] Deployed site with the real public URL in the address bar.

## Verification and saved screenshots

Local production verification completed on **13 October 2026**:

- `npm run build`: TypeScript and Vite production build passed.
- `npm run lint`: passed.
- Chromium browser checks at 320, 390, 768, 1024, 1440, and 1920px: no horizontal page overflow, broken internal anchors, failed images, or browser errors.
- Mobile navigation: opening, Escape dismissal, focus restoration, section navigation, and active-section indication passed.
- Preview: Letter/Number mode output, supported sample selection, and unavailable/invalid input feedback passed.
- Motion: OS reduced motion leaves no running animations; the manual pause control stops continuous animation, magnetic movement, and smooth scrolling.
- Automated axe-core WCAG 2 A/AA and WCAG 2.1 AA audits found no violations in the desktop or mobile-menu states. This does not replace manual screen-reader or physical-device testing.
- URL guards and generated canonical, Open Graph, robots, and sitemap values passed isolated configuration checks, including a public URL containing a query and fragment.

Screenshots captured from the production build are saved in `docs/screenshots/`:

| Screenshot | Viewport / content |
| --- | --- |
| [Desktop hero](docs/screenshots/desktop-hero.png) | 1440 × 1000 |
| [Full desktop page](docs/screenshots/desktop-full.png) | 1440px wide, all sections |
| [Desktop preview](docs/screenshots/desktop-preview.png) | Interface demonstration |
| [Team desktop](docs/screenshots/team-desktop.png) | All four team profiles, desktop |
| [Social links desktop](docs/screenshots/socials-desktop.png) | Three configured social channels, desktop |
| [Mobile hero](docs/screenshots/mobile-hero.png) | 390 × 844 |
| [Full mobile page](docs/screenshots/mobile-full.png) | 390px wide, all sections |
| [Mobile menu](docs/screenshots/mobile-menu.png) | Expanded navigation |
| [Mobile preview](docs/screenshots/mobile-preview.png) | Stacked interface demonstration |
| [Team mobile](docs/screenshots/team-mobile.png) | All four team profiles, mobile |
| [Social links mobile](docs/screenshots/socials-mobile.png) | Three configured social channels, mobile |
| [Keyboard focus](docs/screenshots/keyboard-focus.png) | Visible skip-to-content control |

The local URL used was `http://127.0.0.1:4173/`; it is not a public deployment URL. Fixed navigation overlays are hidden only in the isolated preview-section screenshots so the section content is unobstructed.

## Implementation summary

The page organizes the capstone story into reusable React sections and a central project configuration. A custom hand illustration and labeled sample interface communicate the recognition workflow without presenting simulated output as live AI results. The supplied project logo is included in the local assets. The build is static, with no backend, database, API key, or paid service requirement. It includes page/social metadata and generates `robots.txt`; the sitemap and deployment-specific metadata are generated after a valid public URL is supplied.

Remaining owner-supplied information: contact email, team photos and optional portfolio/LinkedIn destinations, real application screenshots if desired, and the final public deployment URL. An official Instagram profile URL can replace the supplied reel later if preferred. Browser, touch-device, assistive-technology, and final-host checks should be completed before public promotion. The supplied Facebook link, Instagram reel, and direct TikTok share link are configured; all three destinations should be checked in a regular browser. Automated fetching was throttled for Facebook and Instagram, and the TikTok share destination could not be accessed for verification.
