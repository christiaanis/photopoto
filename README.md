# Chrispy Photos

Professional photography portfolio site for [@chrispyphotos___](https://www.instagram.com/chrispyphotos___/), built with Next.js + Tailwind CSS.

## Adding your real photos

Drop JPGs into `public/images/portfolio/` named to match the slugs in `src/lib/photos.ts` (e.g. `portrait-01.jpg`, `street-02.jpg`). Until a file exists, that slot shows an elegant placeholder automatically — no code changes needed, just add the file.

To add/remove/reorder photos or categories, edit `src/lib/photos.ts`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
