import React, { useState, useMemo } from 'react';
import { BAG_DIES } from '../../data/bagDies';

export default function BagCalculator() {
  const [dieId, setDieId] = useState(BAG_DIES[0].id);
  const [qty, setQty] = useState(200);
  const [paperPrice, setPaperPrice] = useState(30); // 30 руб за лист А2 (мелованная 200г)
  const [colorMode, setColorMode] = useState('4+0');
  const [lamPrice, setLamPrice] = useState(44); // 44 руб матовая ламинация
  const [hasEyelets, setHasEyelets] = useState(true);
  const [hasCord, setHasCord] = useState(true);
  const [marginPercent, setMarginPercent] = useState(35);

  const selectedDie = BAG_DIES.find((d) => d.id === dieId) || BAG_DIES[0];

  const calc = useMemo(() => {
    const sheetsPerBag = selectedDie.isHalf ? 2 : 1;
    // Технологический отход (приладка тигеля и офсета)
    const wasteSheets = Math.max(30, Math.round(qty * 0.05));
    const totalSheets = qty * sheetsPerBag + wasteSheets;

    // 1. Бумага
    const costPaper = totalSheets * paperPrice;

    // 2. Печать (приладка форм Камзол + прогоны А2)
    let costPrint = 0;
    if (colorMode === '4+0') {
      costPrint = 3660 + totalSheets * 0.82;
    } else if (colorMode === '1+0') {
      costPrint = 915 + totalSheets * 0.41;
    }

    // 3. Ламинация (из листа Поспресс)
    const costLam = totalSheets * lamPrice;

    // 4. Вырубка (из листа Вырубка склейка: А2 приладка 2500 руб + 3.50 руб удар)
    const costDie = 2500 + totalSheets * 3.50;

    // 5. Ручная сборка, шнур и люверсы
    const costAssembly = qty * 18.0; // сборка + склейка пакета
    const costEyelets = hasEyelets ? qty * 13.0 : 0; // 4 люверса (6.5 руб за 2 шт)
    const costCord = hasCord ? qty * 8.0 : 0; // шнур 4-5 мм с нарезкой и установкой

    const totalOps = costAssembly + costEyelets + costCord;
    const baseCost = costPaper + costPrint + costLam + costDie + totalOps;
    const finalTotal = baseCost * (1 + marginPercent / 100);
    const unitPrice = qty > 0 ? finalTotal / qty : 0;

    return {
      sheetsPerBag,
      wasteSheets,
      totalSheets,
      costPaper,
      costPrint,
      costLam,
      costDie,
      totalOps,
      baseCost,
      finalTotal,
      unitPrice
    };
  }, [selectedDie, qty, paperPrice, colorMode, lamPrice, hasEyelets, hasCord, marginPercent]);

  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Калькулятор бумажных пакетов</h2>
        <p className="subtitle">Полный каталог вырубных штампов ПК-1...ПК-26, офсетная печать, ламинация и сборка</p>
      </div>

      <div className="grid-2">
        <div className="form-column">
          <div className="card">
            <h3>1. Выбор готового штампа</h3>
            <div className="form-group">
              <label>Вырубной штамп (из каталога производства):</label>
              <select value={dieId} onChange={(e) => setDieId(e.target.value)}>
                {BAG_DIES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="info-banner">
              <div><strong>Габариты готового пакета:</strong> {selectedDie.w} × {selectedDie.h} × {selectedDie.d} мм</div>
              <div><strong>Размер развертки по ножам:</strong> {selectedDie.knife}</div>
              <div><strong>Минимальный печатный лист:</strong> {selectedDie.sheet}</div>
              <div style={{ marginTop: '4px', color: selectedDie.isHalf ? '#b45309' : '#047857', fontWeight: 600 }}>
                {selectedDie.isHalf ? '⚠️ Пакет из двух половинок (расход: 2 печатных листа на 1 пакет)' : '✓ Цельный раскрой (расход: 1 лист на 1 пакет)'}
              </div>
            </div>
          </div>

          <div className="card">
            <h3>2. Параметры тиража и отделки</h3>
            <div className="input-row">
              <div className="form-group">
                <label>Тираж готовых пакетов (шт):</label>
                <input
                  type="number"
                  value={qty}
                  min="10"
                  step="10"
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                />
              </div>
              <div className="form-group">
                <label>Бумага:</label>
                <select value={paperPrice} onChange={(e) => setPaperPrice(Number(e.target.value))}>
                  <option value={24}>Мелованная 170г (24 ₽/А2)</option>
                  <option value={30}>Мелованная 200г (30 ₽/А2)</option>
                  <option value={38}>Мелованная 250г (38 ₽/А2)</option>
                  <option value={20}>Крафт бурый 120г (20 ₽/А2)</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="form-group">
                <label>Красочность печати:</label>
                <select value={colorMode} onChange={(e) => setColorMode(e.target.value)}>
                  <option value="4+0">4+0 (Полноцвет CMYK)</option>
                  <option value="1+0">1+0 (Один цвет / пантон)</option>
                  <option value="0+0">Без печати</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ламинирование листа (1+0):</label>
                <select value={lamPrice} onChange={(e) => setLamPrice(Number(e.target.value))}>
                  <option value={0}>Без ламинации</option>
                  <option value={38}>Глянцевая 25-32 мкм (+38 ₽/л)</option>
                  <option value={44}>Матовая 25-32 мкм (+44 ₽/л)</option>
                  <option value={70}>Soft Touch (+70 ₽/л)</option>
                </select>
              </div>
            </div>

            <div className="checkbox-row" style={{ marginTop: '8px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={hasEyelets}
                  onChange={(e) => setHasEyelets(e.target.checked)}
                />
                Установка люверсов (пикколо 4 шт)
              </label>
            </div>
            <div className="checkbox-row" style={{ marginTop: '6px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={hasCord}
                  onChange={(e) => setHasCord(e.target.checked)}
                />
                Вязаный полипропиленовый шнур 4-5 мм с установкой
              </label>
            </div>

            <div className="form-group" style={{ marginTop: '14px' }}>
              <label>Торговая наценка типографии (%):</label>
              <input
                type="number"
                value={marginPercent}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="results-column">
          <div className="card summary-card">
            <h3>Смета производства</h3>
            <div className="summary-item">
              <span>Печатных листов А2:</span>
              <b>{calc.totalSheets} л. <small className="text-muted">(приладка: {calc.wasteSheets} л.)</small></b>
            </div>

            <div className="divider"></div>

            <div className="summary-item">
              <span>1. Листовая бумага:</span>
              <span>{calc.costPaper.toFixed(0)} ₽</span>
            </div>
            <div className="summary-item">
              <span>2. Офсетная печать (формы + приладка):</span>
              <span>{calc.costPrint.toFixed(0)} ₽</span>
            </div>
            <div className="summary-item">
              <span>3. Ламинация:</span>
              <span>{calc.costLam.toFixed(0)} ₽</span>
            </div>
            <div className="summary-item">
              <span>4. Вырубка (тигель + приладка):</span>
              <span>{calc.costDie.toFixed(0)} ₽</span>
            </div>
            <div className="summary-item">
              <span>5. Сборка, склейка, ручки, люверсы:</span>
              <span>{calc.totalOps.toFixed(0)} ₽</span>
            </div>

            <div className="divider"></div>

            <div className="summary-item">
              <span>Себестоимость:</span>
              <b>{calc.baseCost.toFixed(0)} ₽</b>
            </div>
            <div className="summary-item total-row">
              <span>Итого стоимость заказа:</span>
              <span className="total-price">{calc.finalTotal.toFixed(0)} ₽</span>
            </div>
            <div className="summary-item unit-row">
              <span>Цена за 1 готовый пакет:</span>
              <span className="unit-price">{calc.unitPrice.toFixed(2)} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
