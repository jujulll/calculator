import React, { useState } from 'react';
import { DIGITAL_PAPERS } from '../../data/prices';

export default function DigitalPrint() {
  const [paperId, setPaperId] = useState(DIGITAL_PAPERS[2].id);
  const [sides, setSides] = useState('4+0');
  const [sheets, setSheets] = useState(50);

  const selectedPaper = DIGITAL_PAPERS.find((p) => p.id === paperId) || DIGITAL_PAPERS[0];

  let tierIdx = 0;
  if (sheets > 499) tierIdx = 5;
  else if (sheets > 249) tierIdx = 4;
  else if (sheets > 99) tierIdx = 3;
  else if (sheets > 49) tierIdx = 2;
  else if (sheets > 9) tierIdx = 1;

  const baseRate = selectedPaper.tiers[tierIdx];
  const mult = sides === '4+4' ? 1.8 : 1.0;
  const ratePerSheet = baseRate * mult;
  const total = ratePerSheet * sheets;

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Цифровая печать листовая (А3 / SRA3)</h2>
        <p className="subtitle">Тарифная сетка из прайса «Апрош» по клик-контракту и плотностям бумаг</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Параметры печати</h3>
          <div className="form-group">
            <label>Тип бумаги / картона:</label>
            <select value={paperId} onChange={(e) => setPaperId(e.target.value)}>
              {DIGITAL_PAPERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Красочность:</label>
            <select value={sides} onChange={(e) => setSides(e.target.value)}>
              <option value="4+0">4+0 (Односторонняя полноцветная)</option>
              <option value="4+4">4+4 (Двусторонняя полноцветная)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Количество печатных листов А3:</label>
            <input
              type="number"
              value={sheets}
              min="1"
              onChange={(e) => setSheets(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        <div className="card summary-card">
          <h3>Расчет стоимости</h3>
          <div className="summary-item">
            <span>Тиражный порог (кликов):</span>
            <b>{tierIdx === 0 ? 'до 9 листов' : tierIdx === 1 ? '10–49 листов' : tierIdx === 2 ? '50–99 листов' : tierIdx === 3 ? '100–249 листов' : tierIdx === 4 ? '250–499 листов' : '500+ листов'}</b>
          </div>
          <div className="summary-item">
            <span>Стоимость за 1 печатный лист:</span>
            <b>{ratePerSheet.toFixed(2)} ₽</b>
          </div>

          <div className="divider"></div>

          <div className="summary-item total-row">
            <span>Итого стоимость тиража:</span>
            <span className="total-price">{total.toFixed(0)} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
