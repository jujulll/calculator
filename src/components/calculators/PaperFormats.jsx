import React from 'react';
import { FORMATS } from '../../data/prices';

export default function PaperFormats() {
  return (
    <div className="tab-pane">
      <div className="page-header">
        <h2>Справочник стандартных форматов бумаги</h2>
        <p className="subtitle">Метрические размеры ISO 216 и типографские стандарты</p>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Формат</th>
              <th>Ширина (мм)</th>
              <th>Высота (мм)</th>
              <th>Площадь (м²)</th>
              <th>Типовое применение</th>
            </tr>
          </thead>
          <tbody>
            {FORMATS.map((f) => (
              <tr key={f.name}>
                <td><strong>{f.name}</strong></td>
                <td>{f.w} мм</td>
                <td>{f.h} мм</td>
                <td>{((f.w * f.h) / 1000000).toFixed(4)} м²</td>
                <td className="text-muted">
                  {f.name.startsWith('A4') ? 'Документы, бланки, меню' :
                   f.name.startsWith('A3') || f.name.startsWith('SRA3') ? 'Печатные листы цифры, плакаты' :
                   f.name.startsWith('A2') ? 'Календари, пакеты, офсет' :
                   f.name.startsWith('Визитка') ? 'Карточки, бирки, ценники' : 'Полиграфия'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
