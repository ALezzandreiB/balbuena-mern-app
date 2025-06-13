import React from 'react';

// Import the Poppins font
import '@fontsource/poppins'; 

function AboutPage() {
  return (
    <div style={{ backgroundColor: '#f4f5b7', padding: '160px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ color: '#9B4DFF' }}>About Olivia Rodrigo</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
        {/* Image on the left */}
        <img 
          src="https://celebmafia.com/wp-content/uploads/2021/06/olivia-rodrigo-sour-album-promo-photos-2021-more-photos-1.jpg" 
          alt="Olivia Rodrigo" 
          style={{ width: '40%', height: 'auto', borderRadius: '10px', marginRight: '20px' }} 
        />
        
        {/* Text on the right */}
        <div style={{ width: '50%', textAlign: 'justify' }}>
          <p style={{ color: '#000000', fontSize: '18px', marginTop: '20px' }}>
            Olivia Rodrigo, born February 20, 2003, is a multi-talented artist who has captured the hearts of millions with her
            emotional and relatable music. She first gained recognition for her role in Disney's "High School Musical: The Musical: 
            The Series," but it was her 2021 album "SOUR" that truly propelled her into stardom.
          </p>
          <p style={{ color: '#000000', fontSize: '18px', marginTop: '20px' }}>
            Known for her vulnerability and ability to blend pop-punk and indie-pop, Olivia's debut album explored themes of heartbreak, 
            love, and self-discovery. Songs like "drivers license" and "good 4 u" became anthems for a generation, showcasing her
            raw talent and the power of her songwriting.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
