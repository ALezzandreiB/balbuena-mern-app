import React from 'react';

// Import the Poppins font
import '@fontsource/poppins'; 

function HomePage() {
  return (
    <div style={{ backgroundColor: '#f4f5b7', padding: '60px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ color: '#9B4DFF' }}>Olivia Rodrigo</h1>
      <img 
        src="https://images.gmanews.tv/webpics/2021/05/sour2_2021_05_21_08_37_44.jpg" 
        alt="Olivia Rodrigo" 
        style={{ width: '40%', height: 'auto', borderRadius: '10px' }} 
      />
      <p style={{ color: '#000000', fontSize: '18px', marginTop: '20px' }}>
        Olivia Rodrigo is an American singer-songwriter who has taken the music industry by storm
        with her raw, emotional lyrics and powerful vocals. From her debut album "SOUR" to her
        chart-topping singles, Olivia continues to captivate audiences worldwide with her unique
        sound and personal storytelling.
      </p>
    </div>
  );
}

export default HomePage;
