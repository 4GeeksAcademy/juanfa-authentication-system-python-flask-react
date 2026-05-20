import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
 
export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        if (!store.token) {
            navigate("/login");
            return;
        }
 
        const validateToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${store.token}`,
                        "Content-Type": "application/json"
                    }
                });
 
                if (!response.ok) {
                    dispatch({ type: "logout" });
                    navigate("/login");
                    return;
                }
 
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                console.error("Error validating token:", error);
                dispatch({ type: "logout" });
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
 
        validateToken();
    }, []);
 
    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/login");
    };
 
    if (loading) {
        return (
            <div style={styles.loadingScreen}>
                <div style={styles.saberLoader}></div>
                <p style={styles.loadingText}>Accessing the Force...</p>
            </div>
        );
    }
 
    return (
        <div style={styles.page}>
            {/* Starfield background */}
            <div style={styles.stars}></div>
 
            {/* Navbar */}
            <nav style={styles.navbar}>
                <span style={styles.navLogo}>⚡ JEDI PORTAL</span>
                <div style={styles.navRight}>
                    <span style={styles.navUser}>
                        🛸 {userData?.email || store.user?.email || "Jedi Master"}
                    </span>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
 
            {/* Hero section */}
            <header style={styles.hero}>
                <p style={styles.episodeLabel}>— EPISODE IV —</p>
                <h1 style={styles.title}>A NEW HOPE</h1>
                <p style={styles.subtitle}>
                    Welcome, <strong>{userData?.email?.split("@")[0] || "Rebel"}</strong>. 
                    The Force is strong with you.
                </p>
            </header>
 
            {/* Crawl text */}
            <div style={styles.crawlWrapper}>
                <div style={styles.crawl}>
                    <p>It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.</p>
                    <p>During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.</p>
                    <p>Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy…</p>
                </div>
            </div>
 
            {/* Cards */}
            <section style={styles.cardsSection}>
                <h2 style={styles.sectionTitle}>Choose your path</h2>
                <div style={styles.cards}>
                    {characters.map((char, i) => (
                        <div key={i} style={{...styles.card, animationDelay: `${i * 0.1}s`}}>
                            <div style={styles.cardIcon}>{char.icon}</div>
                            <h3 style={styles.cardName}>{char.name}</h3>
                            <p style={styles.cardRole}>{char.role}</p>
                            <p style={styles.cardQuote}>"{char.quote}"</p>
                        </div>
                    ))}
                </div>
            </section>
 
            {/* Footer */}
            <footer style={styles.footer}>
                <p>May the Force be with you, always. ✨</p>
            </footer>
 
            <style>{animations}</style>
        </div>
    );
};
 
// ── Data ──────────────────────────────────────────────
const characters = [
    { icon: "🧙", name: "Obi-Wan Kenobi", role: "Jedi Master", quote: "The Force will be with you, always." },
    { icon: "🦾", name: "Darth Vader",    role: "Sith Lord",   quote: "I find your lack of faith disturbing." },
    { icon: "👸", name: "Princess Leia",  role: "Rebel Leader", quote: "Help me, Obi-Wan. You're my only hope." },
    { icon: "🚀", name: "Han Solo",       role: "Smuggler",    quote: "Never tell me the odds." },
    { icon: "🤖", name: "R2-D2",          role: "Astromech",   quote: "Beep boop bweep... (I got this)." },
    { icon: "⚔️",  name: "Luke Skywalker", role: "Jedi Knight", quote: "I am a Jedi, like my father before me." },
];
 
// ── Animations ────────────────────────────────────────
const animations = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:ital,wght@0,300;0,400;1,300&display=swap');
 
@keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 1; }
}
@keyframes crawl {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-100%); }
}
@keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes saberSpin {
    to { transform: rotate(360deg); }
}
@keyframes heroGlow {
    0%, 100% { text-shadow: 0 0 20px #ffe81f88, 0 0 40px #ffe81f44; }
    50%       { text-shadow: 0 0 40px #ffe81fcc, 0 0 80px #ffe81f66; }
}
`;
 
const styles = {
    page: {
        minHeight: "100vh",
        background: "#000005",
        color: "#e8e8e8",
        fontFamily: "'Exo 2', sans-serif",
        overflowX: "hidden",
        position: "relative",
    },
    stars: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `
            radial-gradient(1px 1px at 10% 20%, white, transparent),
            radial-gradient(1px 1px at 30% 50%, white, transparent),
            radial-gradient(1px 1px at 50% 10%, white, transparent),
            radial-gradient(1px 1px at 70% 80%, white, transparent),
            radial-gradient(1px 1px at 90% 35%, white, transparent),
            radial-gradient(1px 1px at 15% 70%, white, transparent),
            radial-gradient(1px 1px at 55% 60%, white, transparent),
            radial-gradient(1px 1px at 80% 15%, white, transparent),
            radial-gradient(2px 2px at 25% 90%, #ffffffaa, transparent),
            radial-gradient(2px 2px at 65% 25%, #ffffffaa, transparent)
        `,
        pointerEvents: "none",
        zIndex: 0,
    },
    navbar: {
        position: "relative", zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 40px",
        background: "rgba(0,0,0,0.7)",
        borderBottom: "1px solid #ffe81f33",
        backdropFilter: "blur(10px)",
    },
    navLogo: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "1rem", fontWeight: 700,
        color: "#ffe81f",
        letterSpacing: "0.2em",
    },
    navRight: { display: "flex", alignItems: "center", gap: "20px" },
    navUser: { fontSize: "0.85rem", color: "#aaa", letterSpacing: "0.05em" },
    logoutBtn: {
        background: "transparent",
        border: "1px solid #ffe81f88",
        color: "#ffe81f",
        padding: "6px 18px",
        borderRadius: "4px",
        cursor: "pointer",
        fontFamily: "'Orbitron', monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        transition: "all 0.2s",
    },
    hero: {
        position: "relative", zIndex: 1,
        textAlign: "center",
        padding: "80px 20px 40px",
        animation: "fadeSlideUp 1s ease both",
    },
    episodeLabel: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "0.75rem", letterSpacing: "0.5em",
        color: "#ffe81f99",
        marginBottom: "16px",
    },
    title: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(2.5rem, 8vw, 6rem)",
        fontWeight: 900,
        color: "#ffe81f",
        margin: "0 0 20px",
        animation: "heroGlow 3s ease-in-out infinite",
    },
    subtitle: {
        fontSize: "1.1rem", fontWeight: 300,
        color: "#ccc", letterSpacing: "0.05em",
        maxWidth: "500px", margin: "0 auto",
    },
    crawlWrapper: {
        position: "relative", zIndex: 1,
        maxWidth: "600px", margin: "40px auto",
        height: "160px",
        overflow: "hidden",
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
    },
    crawl: {
        animation: "crawl 20s linear infinite",
        padding: "0 20px",
        textAlign: "center",
        fontSize: "0.9rem",
        lineHeight: "2",
        color: "#ffe81fcc",
        fontStyle: "italic",
    },
    cardsSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1100px", margin: "0 auto",
        padding: "40px 20px 60px",
    },
    sectionTitle: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "0.8rem", letterSpacing: "0.4em",
        color: "#ffe81f88",
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: "40px",
    },
    cards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
    },
    card: {
        background: "rgba(255,232,31,0.04)",
        border: "1px solid #ffe81f22",
        borderRadius: "8px",
        padding: "28px 20px",
        textAlign: "center",
        animation: "fadeSlideUp 0.6s ease both",
        transition: "border-color 0.3s, background 0.3s, transform 0.3s",
        cursor: "default",
    },
    cardIcon: { fontSize: "2.5rem", marginBottom: "12px" },
    cardName: {
        fontFamily: "'Orbitron', monospace",
        fontSize: "0.75rem", fontWeight: 700,
        color: "#ffe81f",
        letterSpacing: "0.1em",
        marginBottom: "4px",
    },
    cardRole: { fontSize: "0.75rem", color: "#888", marginBottom: "12px" },
    cardQuote: { fontSize: "0.8rem", fontStyle: "italic", color: "#aaa", lineHeight: 1.6 },
    footer: {
        position: "relative", zIndex: 1,
        textAlign: "center",
        padding: "30px",
        borderTop: "1px solid #ffe81f11",
        color: "#555",
        fontSize: "0.8rem",
        fontFamily: "'Orbitron', monospace",
        letterSpacing: "0.1em",
    },
    loadingScreen: {
        minHeight: "100vh",
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "20px",
    },
    saberLoader: {
        width: "60px", height: "60px",
        border: "3px solid #ffe81f33",
        borderTop: "3px solid #ffe81f",
        borderRadius: "50%",
        animation: "saberSpin 0.8s linear infinite",
    },
    loadingText: {
        fontFamily: "'Orbitron', monospace",
        color: "#ffe81f88",
        fontSize: "0.8rem",
        letterSpacing: "0.3em",
    },
};