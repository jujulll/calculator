import React, { useState } from 'react';
import { KAMZOL_OFFSET } from '../../data/prices';

export default function OffsetPrint() {
  const [format, setFormat] = useState('A3');
  const [colorMode, setColorMode] = useState('4+0');
  const [circ, setCirc] = useState(1000);

  const config = KAMZOL_OFFSET[format][colorMode] || { setup: 2000, perRun: 0.44 };
  const setupCost = config.setup;
  const runCost = circ * config.perRun;
  const total = setupCost + runCost;

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Офсетная печать (Типография «Камзол»)</h2>
        <p className="subtitle">Точный расчет форм CTP, приладочных оттисков и тиражных листопрогонов</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Параметры офсетного тиража</h3>
          <div className="form-group">
            <label>Формат машины:</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="A3">Офсет А3</option>
              <option value="A2">Офсет А2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Красочность:</label>
            <select value={colorMode} onChange={(e) => setColorMode(e.target.value)}>
              <option value="1+0">1+0 (1 краска с одной стороны)</option>
              <option value="1+1">1+1 (1+1 краска с двух сторон)</option>
              <option value="2+0">2+0 (2 краски)</option>
              <option value="2+2">2+2 (2 краски с двух сторон)</option>
              <option value="4+0">4+0 (Полноцвет CMYK)</option>
              <option value="4+4">4+4 (Полноцвет с двух сторон)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Тираж (листопрогонов):</label>
            <input
              type="number"
              value={circ}
              min="100"
              step="100"
              onChange={(e) => setCirc(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        <div className="card summary-card">
          <h3>Смета офсетных работ (без стоимости бумаги)</h3>
          <div className="summary-item">
            <span>Подготовка и формы CTP:</span>
            <b>{setupCost.toFixed(0)} ₽</b>
          </div>
          <div className="summary-item">
            <span>Печатные оттиски ({config.perRun} ₽/оттиск):</span>
            <b>{runCost.toFixed(0)} ₽</b>
          </div>

          <div className="divider"></div>

          <div className="summary-item total-row">
            <span>Итого офсетные работы:</span>
            <span className="total-price">{total.toFixed(0)} ₽</span>
          </div>
          <div className="summary-item unit-row">
            <span>Себестоимость оттиска:</span>
            <span className="unit-price">{(total / circ).toFixed(2)} ₽/лист</span>
          </div>
        </div>
      </div>
    </div>
  );
}
