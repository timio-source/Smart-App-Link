# AppStoreRedirect

A React component that allows your website to have a universal link to an app's download page. This 1 link automatically sends Android devices to your Google Play page, and IOS devices to Apple App Store. Desktop devices are shown a QR code with the same function.

The QR code is generated on the fly by [goqr.me's free API](https://goqr.me/api/) — no setup/key needed.

There's platforms that do this for you, but they require monthly subscriptions. 
Smart App Link is free and works forever after setup.
---

## Setup

By default it links to my app and QR code, so you'll need to replace it with your pages.

| What to replace | Where in the code | Replace with |
|---|---|---|
| App Store URL | `window.location.href = "https://apps.apple.com/..."` | Your app's App Store link |
| Google Play URL | `window.location.href = "https://play.google.com/..."` | Your app's Google Play link |
| Desktop message | `"Scan to download TIMIO on your phone"` | Your own app name |

The QR code automatically points to whatever URL the redirect page is hosted at — so desktop visitors who scan it will land on that same page on their phone, which then redirects them to the right store.

Afterwards just copy and paste into a code block on your website.

## Adding It to Your Website

### Next.js / React

1. Copy `AppStoreRedirect.tsx` into your project (e.g. `app/download/page.tsx` or `pages/download.tsx`)
2. Replace the three values noted above
3. The component fills whatever container it's placed in — style the parent page however you like

### Webflow / Framer / Squarespace (embed block)

These platforms don't run React natively. Use this plain HTML version instead — paste it into a custom embed block, or host it as a standalone page:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download</title>
  <style>
    body {
      margin: 0;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
      color: #fff;
      gap: 48px;
    }
    #msg { font-size: 2rem; font-weight: 700; text-align: center; padding: 0 24px; }
    #qr { display: none; width: 200px; height: 200px; border-radius: 16px; background: #fff; padding: 8px; border: 3px solid rgba(255,255,255,0.4); }
  </style>
</head>
<body>
  <div id="msg">Detecting your device...</div>
  <img id="qr" alt="QR code to download the app" />
  <script>
    var ua = navigator.userAgent;
    var msg = document.getElementById('msg');
    var qr = document.getElementById('qr');

    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      msg.textContent = 'Redirecting to the App Store...';
      window.location.href = 'https://apps.apple.com/us/app/YOUR-APP/idYOUR-ID'; // 👈 Replace
    } else if (/android/i.test(ua)) {
      msg.textContent = 'Redirecting to Google Play...';
      window.location.href = 'https://play.google.com/store/apps/details?id=YOUR.PACKAGE.ID'; // 👈 Replace
    } else {
      msg.textContent = 'Scan to download YOUR APP on your phone'; // 👈 Replace
      qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(window.location.href);
      qr.style.display = 'block';
    }
  </script>
</body>
</html>
```

Host this file anywhere (Vercel, Netlify, GitHub Pages) and point your download link or QR code at it.

---
---

## Full Code

Drop this into any React or Next.js project. No additional packages required.

```tsx
import { useEffect, useState } from "react"

export default function AppStoreRedirect() {
    const [message, setMessage] = useState("Detecting your device...")
    const [isDesktop, setIsDesktop] = useState(false)
    const [qrUrl, setQrUrl] = useState("")

    useEffect(() => {
        const userAgent =
            navigator.userAgent || navigator.vendor || (window as any).opera

        const isIOS =
            /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
        const isAndroid = /android/i.test(userAgent)

        if (isIOS) {
            setMessage("Redirecting you to the App Store...")
            window.location.href =
                "https://apps.apple.com/us/app/YOUR-APP/idYOUR-ID" // 👈 Replace
        } else if (isAndroid) {
            setMessage("Redirecting you to Google Play...")
            window.location.href =
                "https://play.google.com/store/apps/details?id=YOUR.PACKAGE.ID" // 👈 Replace
        } else {
            const pageUrl = encodeURIComponent(window.location.href)
            setQrUrl(
                `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pageUrl}`
            )
            setIsDesktop(true)
            setMessage("Scan to download YOUR APP on your phone") // 👈 Replace
        }
    }, [])

    if (isDesktop) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "48px",
                    fontFamily: "sans-serif",
                    color: "#ffffff",
                }}
            >
                <p style={{ fontSize: "32px", fontWeight: "600", margin: 0 }}>
                    {message}
                </p>
                {qrUrl && (
                    <img
                        src={qrUrl}
                        alt="QR code to download the app"
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: "16px",
                            border: "3px solid rgba(255, 255, 255, 0.4)",
                            padding: "8px",
                            background: "#ffffff",
                        }}
                    />
                )}
            </div>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: "15%",
                fontFamily: "sans-serif",
                fontSize: "56px",
                fontWeight: "700",
                color: "#ffffff",
            }}
        >
            {message}
        </div>
    )
}
```

---
## License

MIT — use it for anything.
