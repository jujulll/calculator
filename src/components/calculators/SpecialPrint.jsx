import React, { useState } from 'react';
import { PVD_PRICES } from '../../data/prices';

export default function SpecialPrint() {
  // PVD
  const [pvdCirc, setPvdCirc] = useState('100');
  const [pvdColor, setPvdColor] = useState('1+0');

  // DTF
  const [dtfMeters, setDtfMeters] = useState(2);
  const [dtfPresses, setDtfPresses] = useState(10);

  const pvdUnit = PVD_PRICES[pvdCirc] ? PVD_PRICES[pvdCirc][pvdColor] : 35;
  const pvdTotal = pvdUnit * Number(pvdCirc);

  let dtfRate = 1800;
  if (dtfMeters >= 20) dtfRate = 1250;
  else if (dtfMeters >= 10) dtfRate = 1600;

  const dtfPrintCost = Math.max(1700, dtfMeters * dtfRate);
  const pressRate = dtfPresses >= 20 ? 65 : 110;
  const dtfPressCost = dtfPresses * pressRate;
  const dtfTotal = dtfPrintCost + dtfPressCost;

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Специальная печать (DTF, УФ, Пакеты ПВД)</h2>
        <p className="subtitle">Текстильный трансфер, брендирование пакетов и сувенирной продукции</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>1. Пакеты ПВД с шелкографией</h3>
          <div className="form-group">
            <label>Красочность печати:</label>
            <select value={pvdColor} onChange={(e) => setPvdColor(e.target.value)}>
              <option value="1+0">1+0 (Один цвет)</option>
              <option value="2+0">2+0 / 1+1 (Два цвета)</option>
              <option value="3+0">3+0 (Три цвета)</option>
              <option value="4+0">4+0 (Четыре цвета)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Тираж пакетов (шт):</label>
            <select value={pvdCirc} onChange={(e) => setPvdCirc(e.target.value)}>
              <option value="50">50 шт</option>
              <option value="100">100 шт</option>
              <option value="200">200 шт</option>
              <option value="300">300 шт</option>
              <option value="500">500 шт</option>
              <option value="1000">1000 шт</option>
            </select>
          </div>
          <div className="summary-item">
            <span>Цена за 1 шт:</span>
            <b>{pvdUnit} ₽</b>
          </div>
          <div className="summary-item total-row">
            <span>Итого тираж ПВД:</span>
            <span className="total-price">{pvdTotal} ₽</span>
          </div>
        </div>

        <div className="card">
          <h3>2. DTF-печать (рулон 60 см)</h3>
          <div className="form-group">
            <label>Погонных метров полотна (мин. 1700 ₽):</label>
            <input
              type="number"
              value={dtfMeters}
              min="1"
              onChange={(e) => setDtfMeters(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Количество термоприжимов на изделия:</label>
            <input
              type="number"
              value={dtfPresses}
              min="0"
              onChange={(e) => setDtfPresses(Number(e.target.value))}
            />
          </div>
          <div className="summary-item">
            <span>Печать на полотне:</span>
            <span>{dtfPrintCost} ₽</span>
          </div>
          <div className="summary-item">
            <span>Термоприжимы:</span>
            <span>{dtfPressCost} ₽</span>
          </div>
          <div className="divider"></div>
          <div className="summary-item total-row">
            <span>Итого DTF заказ:</span>
            <span className="total-price">{dtfTotal} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
