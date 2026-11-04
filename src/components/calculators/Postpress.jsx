import React, { useState } from 'react';
import { POSTPRESS_RATES } from '../../data/prices';

export default function Postpress() {
  const [qty, setQty] = useState(100);
  const [creasing, setCreasing] = useState(1);
  const [corners, setCorners] = useState(0);
  const [eyelets, setEyelets] = useState(0);
  const [cuts, setCuts] = useState(4);

  const costCrease = creasing * POSTPRESS_RATES.creasing * qty;
  const costCorners = corners * POSTPRESS_RATES.cornerRounding * qty;
  const costEyelets = eyelets * POSTPRESS_RATES.eyelet * qty;
  const costCuts = cuts * POSTPRESS_RATES.cuttingPerSlice * Math.ceil(qty / 50);

  const total = costCrease + costCorners + costEyelets + costCuts;

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Послепечатная обработка (Постпресс)</h2>
        <p className="subtitle">Тарифы на отделочные операции из прайс-листа Апрош</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Настройка операций</h3>
          <div className="form-group">
            <label>Тираж изделий (шт):</label>
            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Биговка (1.70 ₽ за 1 биг):</label>
            <input type="number" value={creasing} onChange={(e) => setCreasing(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Скругление углов (2.50 ₽ за экз):</label>
            <input type="number" value={corners} onChange={(e) => setCorners(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Люверсы (6.50 ₽ за шт):</label>
            <input type="number" value={eyelets} onChange={(e) => setEyelets(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Резка на гильотине (8.50 ₽ рез стопы до 50 листов):</label>
            <input type="number" value={cuts} onChange={(e) => setCuts(Number(e.target.value))} />
          </div>
        </div>

        <div className="card summary-card">
          <h3>Смета постпресса</h3>
          <div className="summary-item">
            <span>Биговка:</span>
            <span>{costCrease.toFixed(0)} ₽</span>
          </div>
          <div className="summary-item">
            <span>Скругление углов:</span>
            <span>{costCorners.toFixed(0)} ₽</span>
          </div>
          <div className="summary-item">
            <span>Люверсы:</span>
            <span>{costEyelets.toFixed(0)} ₽</span>
          </div>
          <div className="summary-item">
            <span>Резка:</span>
            <span>{costCuts.toFixed(0)} ₽</span>
          </div>

          <div className="divider"></div>

          <div className="summary-item total-row">
            <span>Итого постпресс:</span>
            <span className="total-price">{total.toFixed(0)} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
