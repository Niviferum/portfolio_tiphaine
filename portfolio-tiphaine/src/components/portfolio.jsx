// src/components/Portfolio.jsx
import { useState, useRef, useEffect } from 'react';

const Portfolio = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isFrench, setIsFrench] = useState(true);
  
  // Textes à écrire progressivement en français et en anglais
  const frenchText = "Mon portfolio sera bientôt disponible en ligne";
  const englishText = "My portfolio will be up soon";
  
  // Liste des images de fond
  const backgroundImages = [
    '/bg-1.png',
    '/bg-2.png',
    '/bg-3.png',
  ];
  
  // Compétences pour la bande défilante
  const skills = [
    "ILLUSTRATION SCIENTIFIQUE",
    "MOTION DESIGN",
    "ANIMATION",
    "MÉDIATION CULTURELLE",
    "DIDACTIQUE VISUELLE",
    "DESIGN GRAPHIQUE"
  ];

  // Effet pour le carousel d'images
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setFadeState('fade-in');
      }, 500); // Durée du fondu
      
    }, 10000); // 10 secondes par image
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Effet pour l'animation d'écriture alternée français/anglais
  useEffect(() => {
    const currentText = isFrench ? frenchText : englishText;
    
    if (isTyping) {
      // Phase d'écriture
      if (typedText.length < currentText.length) {
        const timeoutId = setTimeout(() => {
          setTypedText(currentText.substring(0, typedText.length + 1));
        }, 50); // Vitesse d'écriture
        return () => clearTimeout(timeoutId);
      } else {
        // Texte complet, pause avant d'effacer
        const pauseId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause de 2 secondes avant d'effacer
        return () => clearTimeout(pauseId);
      }
    } else {
      // Phase d'effacement
      if (typedText.length > 0) {
        const timeoutId = setTimeout(() => {
          setTypedText(typedText.substring(0, typedText.length - 1));
        }, 30); // Vitesse d'effacement (un peu plus rapide que l'écriture)
        return () => clearTimeout(timeoutId);
      } else {
        // Texte effacé, changer de langue et recommencer à écrire
        const pauseId = setTimeout(() => {
          setIsFrench(!isFrench);
          setIsTyping(true);
        }, 1000); // Pause de 1 seconde avant de changer de langue
        return () => clearTimeout(pauseId);
      }
    }
  }, [typedText, isTyping, isFrench, frenchText, englishText]);

  // Gestion des clics sur les réseaux sociaux
  const handleSocialClick = (platform) => {
    switch (platform) {
      case 'instagram':
        window.open('https://www.instagram.com/Nephii_277', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/tiphaine-derrey-75602b234/', '_blank');
        break;
      case 'email':
        window.open('mailto:tiphaine.derr@gmail.com', '_blank');
        break;
      default:
        break;
    }
  };

  // Créer une bande défilante infinie
  const createMarqueeContent = () => {
    // Répéter les compétences pour assurer que la bande soit suffisamment longue
    const repeatedSkills = [...skills, ...skills, ...skills, ...skills]; 
    
    return (
      <div className="marquee-track">
        {repeatedSkills.map((skill, index) => (
          <span key={index}>{skill} - </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      {/* Arrière-plan avec carousel d'images */}
      <div className="full-page-bg">
        <div 
          className={`background-image ${fadeState}`} 
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
        />
        {/* Overlay violet/marron */}
        <div className="overlay"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="content">
        {/* Bande défilante en haut - Version infinie */}
        <div className="marquee-container">
          {createMarqueeContent()}
        </div>
        
        {/* Contenu principal avec titre et bouton */}
        <div className="main-content">
          {/* Titre à droite */}
          <div className="title">
            <h1>
              TIPHAINE<br />DERREY
            </h1>
          </div>
          
          {/* Section centrale */}
          <div className="center-section">
            {/* Flèche animée */}
            <div className="arrows">
              <div className="arrow">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            {/* Bouton de téléchargement */}
            <a 
              href="./portfolio_2025_Tiphaine_Derrey.pdf" 
              download
              className="download-btn"
              onMouseEnter={() => setHoveredButton('download')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                color: hoveredButton === 'download' ? '#60a5a1' : 'white',
                textDecoration: 'none'
              }}
            >
              Télécharger mon portfolio
            </a>
            
            {/* Texte qui s'écrit progressivement */}
            <div className="typing-text">
              <p>{typedText}<span className="cursor-blink">|</span></p>
            </div>
          </div>
        </div>
        
        {/* Pied de page avec réseaux sociaux et crédits */}
        <div className="footer">
          {/* Réseaux sociaux sur la droite */}
          <div className="bottom-content">
            <div className="social-icons-vertical">
              {/* Instagram */}
              <button 
                className="social-btn"
                onClick={() => handleSocialClick('instagram')}
                onMouseEnter={() => setHoveredButton('instagram')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  color: hoveredButton === 'instagram' ? '#60a5a1' : 'white'
                }}
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </button>
              
              {/* Email */}
              <button 
                className="social-btn"
                onClick={() => handleSocialClick('email')}
                onMouseEnter={() => setHoveredButton('email')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  color: hoveredButton === 'email' ? '#60a5a1' : 'white'
                }}
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
              
              {/* LinkedIn */}
              <button 
                className="social-btn"
                onClick={() => handleSocialClick('linkedin')}
                onMouseEnter={() => setHoveredButton('linkedin')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  color: hoveredButton === 'linkedin' ? '#60a5a1' : 'white'
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>
            </div>
            
            {/* Crédits */}
            <div className="credits">
              <p>Crédits - ©Tiphaine Derrey 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;