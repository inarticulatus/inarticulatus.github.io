---
title: 'Building an Offline-First Audiobook Player for the Web'
description: 'Designing a browser-based audiobook player with IndexedDB storage, chapter extraction, and a Nothing OS-inspired aesthetic — and why the web platform is underestimated for offline applications'
pubDate: 'Apr 13 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - projects
    - software engineering
---

## The Problem with Most Audiobook Apps

Every audiobook app I've tried has the same problem: they assume you have reliable internet. You don't. You're listening on a commute, on a flight, in a basement with no signal. The "cloud library" model fails exactly when you need it most.

The alternatives are native apps — and native apps have their own problems:
- App store approval cycles
- Large binary sizes
- Different behavior across platforms
- Storage limitations

I wanted something that:
- Works entirely offline after you upload your books
- Handles large audio files without crashing
- Understands chapters (M4B chapter marks, MP3 CHAP frames)
- Looks good without being bloated
- Lives in your browser, no install required

## The Architecture

```
Audio File Upload
       ↓
IndexedDB Storage (audio blobs)
       ↓
localStorage (metadata + position)
       ↓
Web Audio API (playback)
```

The split between IndexedDB and localStorage is deliberate. IndexedDB handles large binary blobs (audio files can be 500MB+). localStorage handles everything small and fast (metadata, playback position, sort preferences).

This isn't an obvious design choice. localStorage is simpler to work with, has a synchronous API, and is familiar. But localStorage is capped at ~5MB per domain. IndexedDB can store gigabytes.

## IndexedDB for Large Files

The Web Audio API needs a Blob URL to play audio. The challenge is bridging IndexedDB's async API with the synchronous `new Audio()` instantiation:

```javascript
async function loadChapter(chapterIndex) {
  const fileId = `${currentBook.id}_${chapterIndex}`;
  
  // Async read from IndexedDB
  const file = await getAudioFile(fileId);
  
  // Create blob URL for audio element
  const url = URL.createObjectURL(file);
  
  // Assign to audio element
  elements.audio.src = url;
}
```

Each chapter is stored as a separate IndexedDB entry keyed by `bookId_chapterIndex`. When you navigate between chapters, the old blob URL is revoked and a new one created:

```javascript
if (elements.audio.src) {
  URL.revokeObjectURL(elements.audio.src);
}
elements.audio.src = url;
```

This prevents memory leaks from accumulating blob URLs.

## Chapter Support

Professional audiobooks (M4B format) contain embedded chapter markers. The Web Audio API doesn't expose these directly, so the approach is file-format-dependent:

**For M4B files**: The format embeds chapter atoms that can be parsed from the file header. Each chapter has a start time, end time, and title.

**For MP3 files**: ID3 CHAP frames contain chapter information. These are parsed from the ID3 tag at the start of the file.

**For folder-based uploads**: Each file becomes a chapter, with the filename as the chapter title. Cumulative timestamps are calculated by summing previous chapter durations.

The chapter navigation model:

```javascript
async function nextChapter() {
  if (currentBook.currentChapter < currentBook.fileCount - 1) {
    const newChapter = currentBook.currentChapter + 1;
    await loadChapter(newChapter);
    await elements.audio.play();
  }
}

elements.audio.addEventListener('ended', async () => {
  if (currentBook.currentChapter < currentBook.fileCount - 1) {
    await nextChapter();
  }
});
```

## Position Persistence

Resume capability is non-negotiable for an audiobook app. You need to remember:
- Which book you were listening to
- Which chapter
- Position within the chapter
- Playback speed

```javascript
// Save position every 5 seconds
saveInterval = setInterval(() => {
  if (currentBook) {
    localStorage.setItem('audiobooks', JSON.stringify(audiobooks));
  }
}, 5000);

// Restore on load
function loadMetadata() {
  const saved = localStorage.getItem('audiobooks');
  if (saved) {
    audiobooks = JSON.parse(saved);
  }
  // Find last played book
  const lastBook = audiobooks.find(b => b.position > 0);
  if (lastBook) {
    currentBook = lastBook;
  }
}
```

On app load, it reconstructs the library from localStorage metadata and re-fetches the audio blobs from IndexedDB.

## The Nothing OS Design Direction

The aesthetic is inspired by Nothing OS — dark backgrounds, high contrast, dot-matrix accents. Not because it's trendy, but because it works:

- Pure black (#000000) background saves battery on OLED screens
- High contrast text is readable in any lighting
- Dot matrix patterns create visual interest without consuming resources
- Minimal animations are fast and non-distracting

```css
:root {
  --bg: #0d0d0d;
  --surface: #1a1a1a;
  --text-primary: #f5f5f5;
  --accent: #00d4ff;
  --dot: #444444;
}
```

The dot matrix pattern appears in empty states and book cover placeholders. It's a 4x4 or 5x5 grid of small circles at low opacity — enough to suggest a visual identity without adding weight.

## Mobile-First Layout

The layout adapts based on viewport width:

```css
@media (max-width: 768px) {
  .app {
    flex-direction: column;
  }
  
  .player-panel {
    display: none;
  }
  
  .player-panel.mobile-open {
    display: flex;
    max-height: 50vh;
  }
}
```

On mobile, the player is hidden by default. Tap a book, and the player slides up from the bottom. The library takes the full screen. This matches how you'd interact with a native app — tap to play, tap away to browse.

## Tech Stack

`HTML` `CSS` `JavaScript` `IndexedDB` `localStorage` `Web Audio API`

## Key Learnings

1. **IndexedDB is the right choice for large files.** The async API is more complex than localStorage, but the capacity difference (5MB vs gigabytes) makes it non-negotiable for audio.

2. **Blob URL management is explicit.** Unlike garbage-collected languages, JavaScript doesn't automatically clean up blob URLs. Every navigation between chapters needs to revoke the previous URL.

3. **Chapter parsing is format-specific.** There's no unified Web API for chapter metadata. M4B, MP3, OGG — each has its own way of embedding chapters, and the parsing code has to match.

4. **The web platform is underrated for offline apps.** Service Workers + IndexedDB is a complete offline-first architecture. No build step, no app store, works on any device with a browser.

5. **Design systems transfer across platforms.** The Nothing OS aesthetic works equally well in a web app and a Qt/KDE wrapper. The design is the asset, not the platform.
