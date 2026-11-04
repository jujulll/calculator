import React, { useState } from 'react';
import { WIDE_INTERIOR_MATERIALS } from '../../data/prices';

export default function WideAndInterior() {
  const [materialId, setMaterialId] = useState(WIDE_INTERIOR_MATERIALS[0].id);
  const [widthM, setWidthM] = useState(1.5);
  const [heightM, setHeightM] = useState(1.0);
  const [qty, setQty] = useState(1);

  const mat = WIDE_INTERIOR_MATERIALS.find((m) => m.id === materialId) || WIDE_INTERIOR_MATERIALS[0];
  const rawArea = widthM * heightM * qty;
  const billArea = Math.max(1.0, rawArea);
  const total = billArea * mat.price;

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Широкоформатная и интерьерная печать</h2>
        <p className="subtitle">Mimaki CJV-300, широкоформатные плоттеры 3.2м, баннеры и пленки</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Параметры печати</h3>
          <div className="form-group">
            <label>Материал и качество:</label>
            <select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
              {WIDE_INTERIOR_MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.price} ₽/м²
                </option>
              ))}
            </select>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label>Ширина (метры):</label>
              <input
                type="number"
                step="0.1"
                value={widthM}
                onChange={(e) => setWidthM(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Высота (метры):</label>
              <input
                type="number"
                step="0.1"
                value={heightM}
                onChange={(e) => setHeightM(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Количество (шт):</label>
            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          </div>
        </div>

        <div className="card summary-card">
          <h3>Расчет метража и стоимости</h3>
          <div className="summary-item">
            <span>Фактическая площадь:</span>
            <b>{rawArea.toFixed(2)} м²</b>
          </div>
          <div className="summary-item">
            <span>Оплачиваемая площадь (мин. 1.0 м²):</span>
            <b>{billArea.toFixed(2)} м²</b>
          </div>

          <div className="divider"></div>

          <div className="summary-item total-row">
            <span>Итого:</span>
            <span className="total-price">{total.toFixed(0)} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
