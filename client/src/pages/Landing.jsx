import React, { useState } from 'react';
import "../assets/Button.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const Start = () => navigate("/update");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? 'linear-gradient(-45deg, #0f2027, #203a43, #2c5364)'
          : styles.container.background,
        color: darkMode ? '#ffffff' : '#000000',
      }}
    >
      {/* Animated SVG Wave */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.07,
        }}
        viewBox="0 0 1440 320"
      >
        <path
          fill={darkMode ? "#00e676" : "#81c784"}
          d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,170.7C1120,149,1280,139,1360,133.3L1440,128V0H0Z"
        />
      </svg>

      {/* Dark Mode & Language Buttons */}
      <div style={styles.topControls}>
        <div style={styles.languageButtons}>
          <button onClick={() => i18n.changeLanguage('en')} style={styles.langBtn}>🇬🇧</button>
          <button onClick={() => i18n.changeLanguage('hi')} style={styles.langBtn}>🇮🇳</button>
        </div>
        <button onClick={toggleDarkMode} style={styles.toggleBtn}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Text Content */}
      <div style={styles.textContainer}>
        <div
          style={{
            ...styles.blob,
            background: darkMode ? 'rgba(0, 230, 118, 0.1)' : styles.blob.background,
            border: darkMode ? '2px solid #00e676' : '2px solid #4caf50',
            boxShadow: darkMode
              ? '0 0 20px #00e676'
              : '0 0 20px rgba(76, 175, 80, 0.4)',
          }}
        >
          <h1 style={styles.title}>{t('Title')}</h1>
          <h2 style={styles.subtitle}>{t('LSlogan')}</h2>
          <p style={styles.description}>{t('LDesc')}</p>
          <button
            style={styles.button}
            onClick={Start}
          >
            {t('LButton')}
          </button>
        </div>
      </div>

      {/* Image */}
      <div style={styles.imageContainer}>
        <img src="/farm-farming.gif" alt="Crop" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #a1ffce, #faffd1)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 30px',
    minHeight: '100vh',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
    animation: 'gradientShift 10s ease infinite',
    backgroundSize: '400% 400%',
  },
  topControls: {
    position: 'absolute',
    top: 20,
    right: 30,
    display: 'flex',
    gap: '10px',
    zIndex: 5,
  },
  languageButtons: {
    display: 'flex',
    gap: '8px',
  },
  langBtn: {
    background: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '50%',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '6px',
  },
  toggleBtn: {
    background: '#ffffff20',
    color: '#fff',
    border: '1px solid #fff',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  textContainer: {
    flex: 1,
    minWidth: '300px',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  blob: {
    background: 'rgba(76, 175, 80, 0.85)',
    borderRadius: '30px',
    padding: '60px 40px',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.5s ease',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '20px',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.4rem',
    marginBottom: '15px',
    color: '#dcedc8',
  },
  description: {
    fontSize: '1.05rem',
    marginBottom: '30px',
    lineHeight: '1.6',
    color: '#e8f5e9',
  },
  button: {
    padding: '6px 16px',
    fontSize: '0.8rem',
    fontWeight: '500',
    backgroundColor: '#43a047',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 3px 15px rgba(76, 175, 80, 0.4)',
    minWidth: '90px',
    minHeight: '30px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
    maxWidth: '600px',
    zIndex: 1,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
};

// Inject keyframes for background animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Landing;
