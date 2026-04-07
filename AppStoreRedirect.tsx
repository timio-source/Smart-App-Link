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
                "https://apps.apple.com/us/app/timio-news/id6464381242"
        } else if (isAndroid) {
            setMessage("Redirecting you to Google Play...")
            window.location.href =
                "https://play.google.com/store/apps/details?id=com.timiott.bz&hl=en_US"
        } else {
            const pageUrl = encodeURIComponent(window.location.href)
            setQrUrl(
                `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pageUrl}`
            )
            setIsDesktop(true)
            setMessage("Scan to download TIMIO on your phone")
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
