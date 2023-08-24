import React, { useState } from 'react';

const App = () => {
  const [selected, setSelected] = useState(false);

  const handleCardClick = () => {
    setSelected(!selected);
  };

  const cardStyle = {
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    boxShadow: selected
      ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    background: '#fff',
    margin: '20px 10px',
    cursor: 'pointer',
  };

  const selectableStyle = {
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    border: '4px solid transparent',
  };

  const selectedStyle = {
    borderColor: '#44aadd',
  };

  const checkStyle = {
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    width: '20px',
    height: '20px',
  };

  const checkmarkStyle = {
    display: 'block',
    fontSize: '20px',
    lineHeight: '20px',
    textAlign: 'center',
    color: 'transparent',
  };

  const buttonStyle = {
    display: 'block',
    cursor: 'pointer',
    width: '180px',
    margin: '20px auto',
    textAlign: 'center',
    padding: '16px',
    borderColor: 'transparent',
    borderRadius: '10px',
    background: '#44aadd',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    outline: 'none',
  };

  return (
    <div>
      <div
        className="card"
        style={cardStyle}
        onClick={handleCardClick}
      >
        <div
          className={`selectable ${selected ? 'selected' : ''}`}
          style={{ ...selectableStyle, ...(selected ? selectedStyle : {}) }}
        >
          <div className="check" style={checkStyle}>
            <div className="checkmark" style={checkmarkStyle}>
              ✓
            </div>
          </div>
        </div>
        <div className="content" style={{ padding: '24px' }}>
          <h1 className="title">Card Title</h1>
          <p className="description">Card Description</p>
        </div>
      </div>
      <button
        className="card"
        style={buttonStyle}
        onClick={handleCardClick}
      >
        Select Card
      </button>
    </div>
  );
};

export default App;
