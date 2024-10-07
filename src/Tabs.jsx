// src/Tabs.jsx
import React, { useState } from 'react';
import './tabs.css'; // Import your tab styles

const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Set the default active tab index

  const selectTab = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="tab">
      <ul className="tab-items">
        <li className={`tab-item ${activeIndex === 1 ? 'active' : ''}`}>
          <a className="item-link" onClick={() => selectTab(1)} href="#">
            Phones
          </a>
        </li>
        <li className={`tab-item ${activeIndex === 2 ? 'active' : ''}`}>
          <a className="item-link" onClick={() => selectTab(2)} href="#">
            Earbuds
          </a>
        </li>
        <li className={`tab-item ${activeIndex === 3 ? 'active' : ''}`}>
          <a className="item-link" onClick={() => selectTab(3)} href="#">
            Accesories
          </a>
        </li>
        <li className={`tab-item ${activeIndex === 4 ? 'active' : ''}`}>
          <a className="item-link" onClick={() => selectTab(4)} href="#">
            Watches & Trackers
          </a>
        </li>
        <div className="separator"></div>
        <li className={`tab-item ${activeIndex === 5 ? 'active' : ''}`}>
          <a className="item-link" onClick={() => selectTab(5)} href="#">
            SignUp / LogIn
          </a>
        </li>
      </ul>
      <div className="tab-indicator" style={{ gridColumn: `${activeIndex}` }}></div>
    </div>
  );
};

export default Tabs;
