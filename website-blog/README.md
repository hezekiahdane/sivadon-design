# Sivadon — News & blog templates

Plain HTML + one stylesheet (`css/sivadon-blog.css`) + one small script (`js/sivadon-blog.js`). All classes are prefixed `sv-` so they can load next to the live Oxygen/Elementor CSS.

| File | What it is | WordPress mapping |
|---|---|---|
| `home-in-the-news.html` | Copy of the live homepage with the new `<section class="sv-news">` between the client logo wall and the team carousel, plus a "News" menu item. Tracking scripts removed. | Code block / template part on the Home page |
| `news.html` | Catalogue: feature slot (newest own post) + auto-fill grid of everything else, filter tabs, pager (hidden until >12) | Posts archive / `home.php` |
| `sivadon-logistics-joins-amilo.html` | Single post: header, cover, sticky TOC, pull quotes, "As featured in", media enquiries, related | `single.php` |

## News card — one anatomy, two flavours
- `.sv-card--press` — external outlet. Badge "Press coverage", ↗ corner icon, outlet name in the source line, CTA "Read on {Outlet} ↗", `target="_blank" rel="noopener"`, screen-reader "opens in a new tab". Fields: outlet, headline, date, URL, thumbnail, excerpt.
- `.sv-card--post` — own post. Green "Sivadon News" badge, "Read the story →". Fields: title, date, read time, cover, excerpt.
- Add `.sv-card--feature` for the horizontal catalogue layout.
- Suggest a custom post type "Press coverage" (external URL field) shown alongside normal posts; `data-kind="press|post"` drives the filter tabs.

## Languages
Thai and Chinese switch to Kanit (+ Noto Sans SC for CJK) with open leading via `:lang(th)` / `:lang(zh)`. No fixed heights or headline clamps, so longer TH/中文 headlines wrap. The language pill on the news pages swaps sample TH/中文 headlines for layout testing only. In WordPress, use Polylang's links. The translations are placeholders and need a native-speaker review.

## To replace before launch
Excerpts, body copy, outlet URLs (check the e27, Incubees and DealStreetAsia links), and thumbnails. Press-card thumbnails are royalty-free Unsplash placeholders (container yard, warehouse, truck, ship); the post cover uses the live Sivadon team photo. Swap stock for real Sivadon operations photography when available, as the brand guidelines ask.
