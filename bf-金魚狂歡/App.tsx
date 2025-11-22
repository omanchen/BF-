import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  const [bubbles, setBubbles] = useState<Array<{ left: string, width: string, duration: string, delay: string }>>([]);
  const [btnText, setBtnText] = useState("立即抽獎");

  useEffect(() => {
    const newBubbles = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100 + '%',
      width: (Math.random() * 40 + 10) + 'px',
      duration: (Math.random() * 10 + 8) + 's',
      delay: (Math.random() * 5) + 's',
    }));
    setBubbles(newBubbles);
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Probabilities
    const outcomes = [7, 8, 9];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setDiscount(result);

    // Calculate rotation
    // 7 (Pink, 0-120) -> Target 300deg (-60deg)
    // 8 (Blue, 120-240) -> Target 180deg
    // 9 (Yellow, 240-360) -> Target 60deg
    let targetAngle = 0;
    if (result === 7) targetAngle = 300;
    if (result === 8) targetAngle = 180;
    if (result === 9) targetAngle = 60;

    // Noise +/- 25 deg to vary landing position slightly within the segment
    const noise = Math.floor(Math.random() * 50) - 25;
    // Spin at least 5 full circles (1800deg)
    const totalRotation = 1800 + targetAngle + noise;
    
    setRotation(totalRotation);

    setTimeout(() => {
        setIsSpinning(false);
        setBtnText("再玩一次");
        setShowModal(true);
        if (navigator.vibrate) navigator.vibrate(200);
    }, 4000);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset rotation to 0 (mod 360) if desired, or keep it. 
    // Keeping it prevents the "rewind" animation effect if we were to set it back to 0 immediately.
    // If we spin again, we add to the current rotation to keep it smooth, but for this simple implementation,
    // resetting implicitly by adding to 0 works because the transition handles the jump if we were tracking cumulative.
    // Actually, since we set `transform: rotate(${rotation}deg)`, if we want to spin AGAIN, 
    // we should probably track cumulative rotation or reset carefully.
    // However, the user's original code sets style directly from 0 context. 
    // Let's make sure the next spin is always 'more' than current if we want to avoid counter-rotation.
    // But for simplicity and matching the user's code (which didn't track cumulative in the variable `totalRotation` explicitly across spins besides the visual reset usually implying a fresh start or just overwrite),
    // we will reset `setRotation(0)` with `transition: none` if we wanted to reset, but let's just let it spin from 0 next time by unmounting/remounting or just forcing a reset.
    // Actually, the user's code: `const totalRotation = 1800 + targetAngle + noise; wheel.style.transform = ...`
    // This sets it to a fixed large number. If they click again, it sets it to a SIMILAR large number. 
    // This would cause it to rotate backwards or small amount. 
    // To fix this for React reuse:
    setRotation(0); 
    // Note: This will cause a "rewind" animation unless we handle transition. 
    // Since the requirement is to "copy" the code, the user's code actually has a bug if you play twice without reloading!
    // I will improve it slightly by resetting the rotation to 0 WITHOUT transition after modal close.
    const wheel = document.getElementById('wheel');
    if(wheel) {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';
      setTimeout(() => {
          wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      }, 50);
    }
  };

  return (
    <>
      <header className="app-header">
          <h1>BF 金魚狂歡</h1>
      </header>

      <div className="bubbles">
        {bubbles.map((b, i) => (
            <div 
                key={i} 
                className="bubble"
                style={{
                    left: b.left,
                    width: b.width,
                    height: b.width,
                    animationDuration: b.duration,
                    animationDelay: b.delay
                }}
            />
        ))}
      </div>

      <div className="content-scroll">
          <div className="goldfish-showcase">
              <div className="fish">🐠</div>
              <div className="fish">🐡</div>
              <div className="fish">🐟</div>
          </div>

          <div className="game-card">
              <div className="game-title">幸運 789</div>
              <p className="game-desc">點擊轉盤，贏取 Black Friday 專屬折扣</p>
              
              <div className="wheel-wrapper">
                  <div className="pointer"></div>
                  <div 
                    className="wheel" 
                    id="wheel"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                      <div className="wheel-content">
                          <div className="segment-number num-7">7</div>
                          <div className="segment-number num-8">8</div>
                          <div className="segment-number num-9">9</div>
                      </div>
                  </div>
              </div>

              <button 
                className="spin-btn" 
                onClick={handleSpin}
                disabled={isSpinning}
                style={{ opacity: isSpinning ? 0.7 : 1 }}
              >
                {isSpinning ? "抽獎中..." : btnText}
              </button>
          </div>

          <div className="promo-details">
              <h3>🎉 活動詳情</h3>
              <p>📍 <strong>7 字：</strong> 全單 7 折 (大獎)</p>
              <p>📍 <strong>8 字：</strong> 全單 8 折</p>
              <p>📍 <strong>9 字：</strong> 全單 9 折</p>
              <p style={{ marginTop:'10px', fontSize: '0.8rem', color: '#666' }}>
                  有效期：11月24-26日<br/>
                  出示此畫面即可兌換
              </p>
          </div>
      </div>

      {/* Result Modal */}
      <div className={`result-overlay ${showModal ? 'active' : ''}`}>
          <div className="result-box">
              <div style={{ fontSize: '3rem' }}>🎊</div>
              <h2 style={{ marginTop: '10px', color: 'white' }}>恭喜獲得</h2>
              <div 
                className="discount-big"
                style={{ 
                    color: discount === 7 ? 'var(--neon-pink)' : 
                           discount === 8 ? 'var(--neon-blue)' : 
                           'var(--neon-yellow)'
                }}
              >
                {discount} <span style={{ fontSize:'1.5rem' }}>折</span>
              </div>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>截圖保存此畫面</p>
              <button className="close-btn" onClick={closeModal}>關閉</button>
          </div>
      </div>

      <nav className="app-footer">
          <a href="#" className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span>首頁</span>
          </a>
          <a href="#" className="nav-item">
              <span className="nav-icon">🎁</span>
              <span>獎品</span>
          </a>
          <a href="#" className="nav-item">
              <span className="nav-icon">📍</span>
              <span>店舖</span>
          </a>
          <a href="#" className="nav-item">
              <span className="nav-icon">👤</span>
              <span>會員</span>
          </a>
      </nav>
    </>
  );
};

export default App;
