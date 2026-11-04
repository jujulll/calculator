import React, { useState } from 'react';
import PaperFormats from './components/calculators/PaperFormats';
import SheetLayout from './components/calculators/SheetLayout';
import BagCalculator from './components/calculators/BagCalculator';
import DigitalPrint from './components/calculators/DigitalPrint';
import OffsetPrint from './components/calculators/OffsetPrint';
import Postpress from './components/calculators/Postpress';
import WideAndInterior from './components/calculators/WideAndInterior';
import SpecialPrint from './components/calculators/SpecialPrint';

export default function App() {
  const [activeTab, setActiveTab] = useState('bags');

  const menuItems = [
    { section: 'Инструменты инженера' },
    { id: 'formats', label: '1. Справочник форматов', icon: '📐' },
    { id: 'sheet', label: '2. Вместимость листа', icon: '📄' },
    { section: 'Калькуляторы готовых изделий' },
    { id: 'bags', label: '3. Бумажные пакеты (вырубка)', icon: '🛍️' },
    { section: 'Печатные технологии' },
    { id: 'digital', label: '4. Цифровая печать А3', icon: '🖨️' },
    { id: 'offset', label: '5. Офсетная печать (Камзол)', icon: '🏭' },
    { id: 'postpress', label: '6. Постпресс и отделка', icon: '✂️' },
    { id: 'wide', label: '7. Интерьерка / Широкоформатка', icon: '🖼️' },
    { id: 'special', label: '8. DTF / УФ / Пакеты ПВД', icon: '🎨' }
  ];

  return (
    <div className="app-layout">
      {/* Боковая панель */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-icon">⚙️</span>
          <div>
            <div className="brand-title">Полиграфия Pro</div>
            <div className="brand-sub">Калькулятор типографии</div>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="sidebar-category">
                  {item.section}
                </div>
              );
            }
            return (
              <button
                key={item.id}
                className={`tab-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Основной контент */}
      <main className="main-content">
        {activeTab === 'formats' && <PaperFormats />}
        {activeTab === 'sheet' && <SheetLayout />}
        {activeTab === 'bags' && <BagCalculator />}
        {activeTab === 'digital' && <DigitalPrint />}
        {activeTab === 'offset' && <OffsetPrint />}
        {activeTab === 'postpress' && <Postpress />}
        {activeTab === 'wide' && <WideAndInterior />}
        {activeTab === 'special' && <SpecialPrint />}
      </main>
    </div>
  );
}
