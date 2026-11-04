import React, { useState, useEffect, useRef } from 'react';

export default function SheetLayout() {
  const [sheetW, setSheetW] = useState(450);
  const [sheetH, setSheetH] = useState(320);
  const [margin, setMargin] = useState(5);
  const [itemW, setItemW] = useState(90);
  const [itemH, setItemH] = useState(50);
  const [bleed, setBleed] = useState(2);
  const [circ, setCirc] = useState(1000);

  const canvasRef = useRef(null);

  const useW = Math.max(0, sheetW - margin * 2);
  const useH = Math.max(0, sheetH - margin * 2);
  const totalItemW = itemW + bleed * 2;
  const totalItemH = itemH + bleed * 2;

  // Раскладка прямо
  const c1_cols = totalItemW > 0 ? Math.floor(useW / totalItemW) : 0;
  const c1_rows = totalItemH > 0 ? Math.floor(useH / totalItemH) : 0;
  const total1 = c1_cols * c1_rows;

  // Раскладка с поворотом на 90°
  const c2_cols = totalItemH > 0 ? Math.floor(useW / totalItemH) : 0;
  const c2_rows = totalItemW > 0 ? Math.floor(useH / totalItemW) : 0;
  const total2 = c2_cols * c2_rows;

  const isRotated = total2 > total1;
  const bestCount = isRotated ? total2 : total1;
  const bestCols = isRotated ? c2_cols : c1_cols;
  const bestRows = isRotated ? c2_rows : c1_rows;
  const curW = isRotated ? totalItemH : totalItemW;
  const curH = isRotated ? totalItemW : totalItemH;

  const sheetsReq = bestCount > 0 ? Math.ceil(circ / bestCount) : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 360;
    canvas.height = canvas.parentElement.clientHeight || 260;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (sheetW <= 0 || sheetH <= 0) return;

    const pad = 14;
    const scale = Math.min((canvas.width - pad * 2) / sheetW, (canvas.height - pad * 2) / sheetH);
    const dW = sheetW * scale;
    const dH = sheetH * scale;
    const startX = (canvas.width - dW) / 2;
    const startY = (canvas.height - dH) / 2;

    // Лист бумаги
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(startX, startY, dW, dH);
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(startX, startY, dW, dH);

    // Поля печати
    const mS = margin * scale;
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(startX + mS, startY + mS, dW - mS * 2, dH - mS * 2);
    ctx.setLineDash([]);

    // Изделия
    ctx.fillStyle = 'rgba(79, 70, 229, 0.15)';
    ctx.strokeStyle = '#4f46e5';
    for (let r = 0; r < bestRows; r++) {
      for (let c = 0; c < bestCols; c++) {
        const x = startX + mS + c * curW * scale;
        const y = startY + mS + r * curH * scale;
        ctx.fillRect(x, y, curW * scale, curH * scale);
        ctx.strokeRect(x, y, curW * scale, curH * scale);
      }
    }
  }, [sheetW, sheetH, margin, itemW, itemH, bleed, bestCount, bestCols, bestRows, curW, curH]);

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Вместимость печатного листа</h2>
        <p className="subtitle">Оптимальная раскладка изделий на лист с учетом вылетов и полей</p>
      </div>

      <div className="grid-2">
        <div className="form-column">
          <div className="card">
            <h3>Параметры печатного листа</h3>
            <div className="form-group">
              <label>Шаблон формата:</label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'SRA3') { setSheetW(450); setSheetH(320); }
                  else if (val === 'A3') { setSheetW(420); setSheetH(297); }
                  else if (val === 'A2') { setSheetW(594); setSheetH(420); }
                }}
              >
                <option value="SRA3">SRA3 (450 × 320 мм)</option>
                <option value="A3">A3 (420 × 297 мм)</option>
                <option value="A2">A2 (594 × 420 мм)</option>
                <option value="custom">Свой размер</option>
              </select>
            </div>
            <div className="input-row">
              <div className="form-group">
                <label>Ширина (мм):</label>
                <input type="number" value={sheetW} onChange={(e) => setSheetW(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Высота (мм):</label>
                <input type="number" value={sheetH} onChange={(e) => setSheetH(Number(e.target.value))} />
              </div>
            </div>
            <div className="form-group">
              <label>Поля листа от края (мм):</label>
              <input type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
            </div>
          </div>

          <div className="card">
            <h3>Параметры изделия</h3>
            <div className="form-group">
              <label>Шаблон изделия:</label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'card') { setItemW(90); setItemH(50); setBleed(2); }
                  else if (val === 'A5') { setItemW(210); setItemH(148); setBleed(2); }
                  else if (val === 'A4') { setItemW(297); setItemH(210); setBleed(2); }
                }}
              >
                <option value="card">Визитка (90 × 50 мм)</option>
                <option value="A5">Листовка А5 (210 × 148 мм)</option>
                <option value="A4">Листовка А4 (297 × 210 мм)</option>
                <option value="custom">Свой размер</option>
              </select>
            </div>
            <div className="input-row">
              <div className="form-group">
                <label>Ширина изделия (мм):</label>
                <input type="number" value={itemW} onChange={(e) => setItemW(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Высота изделия (мм):</label>
                <input type="number" value={itemH} onChange={(e) => setItemH(Number(e.target.value))} />
              </div>
            </div>
            <div className="input-row">
              <div className="form-group">
                <label>Вылеты под обрез (мм):</label>
                <input type="number" value={bleed} onChange={(e) => setBleed(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Тираж (шт):</label>
                <input type="number" value={circ} onChange={(e) => setCirc(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        <div className="results-column">
          <div className="card summary-card">
            <h3>Сводка раскладки</h3>
            <div className="summary-item">
              <span>Полезное поле листа:</span>
              <b>{useW} × {useH} мм</b>
            </div>
            <div className="summary-item">
              <span>Изделий на 1 листе:</span>
              <b className="highlight-val">{bestCount} шт. {isRotated ? '(с поворотом на 90°)' : ''}</b>
            </div>
            <div className="summary-item">
              <span>Всего листов на тираж:</span>
              <b>{sheetsReq} листов</b>
            </div>
          </div>

          <div className="card">
            <h3>Визуализация спуска полос</h3>
            <div className="canvas-wrapper">
              <canvas ref={canvasRef} height="260"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
