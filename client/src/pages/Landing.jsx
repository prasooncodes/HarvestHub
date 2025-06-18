import React from 'react';
import "../assets/Button.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const Start = () => {
    navigate("/update");
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t('Title')}</h1>
          <h2 style={styles.subtitle}>{t('LSlogan')}</h2>
          <p style={styles.description}>{t('LDesc')}</p>
          <button style={styles.button} onClick={Start}>
            {t('LButton')}
          </button>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img src="/farm-farming.gif" alt="Crop" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #c8e6c9, #66bb6a)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 30px',
    minHeight: '100vh',
    gap: '40px',
    fontFamily: "'Poppins', sans-serif",
  },
  textContainer: {
    flex: 1,
    minWidth: '300px',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRadius: '30px',
    padding: '50px 40px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '16px',
    color: '#1b5e20',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: '1.4rem',
    marginBottom: '12px',
    color: '#2e7d32',
    fontWeight: 600,
  },
  description: {
    fontSize: '1rem',
    marginBottom: '30px',
    lineHeight: '1.7',
    color: '#33691e',
    fontWeight: 400,
  },
  button: {
    padding: '8px 20px',
    fontSize: '0.85rem',
    fontWeight: 600,
    backgroundColor: '#43a047',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 5px 12px rgba(76, 175, 80, 0.35)',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
    maxWidth: '600px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '24px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
  },
};

export default Landing;
