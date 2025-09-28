import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #0f4c75 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: 'white',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 207, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 120, 207, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 255, 207, 0.08) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1
      }}>
        {/* Elegant spinner with glow effect */}
        <div style={{
          width: '80px',
          height: '80px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid #00d4ff',
          borderRight: '3px solid #ff6b6b',
          borderRadius: '50%',
          animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
          margin: '0 auto 40px',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(255, 107, 107, 0.2)',
          position: 'relative'
        }}>
          {/* Inner spinning ring */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '54px',
            height: '54px',
            border: '2px solid transparent',
            borderTop: '2px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite reverse'
          }}></div>
        </div>

        <h2 style={{
          margin: '0 0 20px',
          fontSize: '3rem',
          fontWeight: 800,
          background: 'linear-gradient(45deg, #00d4ff, #ff6b6b, #4ecdc4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          letterSpacing: '2px',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}>
          KTEL ATTIKIS
        </h2>

        <p style={{
          margin: 0,
          fontSize: '1.3rem',
          opacity: 0.9,
          fontWeight: 400,
          letterSpacing: '0.5px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          {message}
        </p>

        {/* Pulse animation underneath */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
          zIndex: -1
        }}></div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }

        @keyframes glow {
          0% { filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.5)); }
          100% { filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.8)); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;