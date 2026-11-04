// Прайс-листы типографии «Апрош» и офсета «Камзол»

export const FORMATS = [
  { name: 'SRA3', w: 450, h: 320 },
  { name: 'A0', w: 1189, h: 841 },
  { name: 'A1', w: 841, h: 594 },
  { name: 'A2', w: 594, h: 420 },
  { name: 'A3', w: 420, h: 297 },
  { name: 'A4', w: 297, h: 210 },
  { name: 'A5', w: 210, h: 148 },
  { name: 'A6', w: 148, h: 105 },
  { name: 'A7', w: 105, h: 74 },
  { name: 'Визитка стандарт', w: 90, h: 50 },
  { name: 'Евровизитка', w: 85, h: 55 }
];

export const DIGITAL_PAPERS = [
  { id: 'sneg', name: 'Бумага 80г «Снегурочка»', tiers: [92, 76, 52, 42, 29, 20] },
  { id: 'dns90', name: 'Бумага имп. 90г DNS / ColorCopy', tiers: [96, 81, 56, 45, 32, 23] },
  { id: 'melo130', name: 'Мелованная 130г (глянцевая / матовая)', tiers: [102, 83, 63, 50, 33, 29] },
  { id: 'melo170', name: 'Мелованная 170г', tiers: [108, 89, 69, 55, 38, 34] },
  { id: 'melo200', name: 'Мелованная 200г', tiers: [115, 96, 75, 60, 42, 38] },
  { id: 'melo250', name: 'Мелованная 250г', tiers: [125, 105, 83, 68, 48, 43] },
  { id: 'melo300', name: 'Мелованная 300г', tiers: [135, 114, 91, 75, 54, 49] },
  { id: 'touch', name: 'Touche Cover / Plike 301г', tiers: [350, 310, 270, 240, 210, 195] }
];

export const KAMZOL_OFFSET = {
  A3: {
    '1+0': { setup: 500, perRun: 0.22 },
    '1+1': { setup: 1000, perRun: 0.44 },
    '2+0': { setup: 1000, perRun: 0.22 },
    '2+1': { setup: 1500, perRun: 0.44 },
    '2+2': { setup: 2000, perRun: 0.44 },
    '4+0': { setup: 2000, perRun: 0.44 },
    '4+1': { setup: 2500, perRun: 0.66 },
    '4+4': { setup: 4000, perRun: 0.88 }
  },
  A2: {
    '1+0': { setup: 915, perRun: 0.41 },
    '1+1': { setup: 1830, perRun: 0.82 },
    '2+0': { setup: 1830, perRun: 0.41 },
    '2+1': { setup: 2347, perRun: 0.82 },
    '2+2': { setup: 3660, perRun: 0.82 },
    '4+0': { setup: 3660, perRun: 0.82 },
    '4+1': { setup: 4575, perRun: 1.23 },
    '4+4': { setup: 7320, perRun: 1.64 }
  }
};

export const POSTPRESS_RATES = {
  collation: 0.40, // Листподбор за 1 лист
  creasing: 1.70,  // Биговка за 1 биг
  stapling: 2.70,  // Степлирование за 1 скрепку
  eyelet: 6.50,    // Люверс 1 шт
  cornerRounding: 2.50, // Скругление углов за 1 экз
  cuttingPerSlice: 8.50 // Резка пачки до 50 листов
};

export const LAMINATION_RATES = {
  A4: { gloss32: 15, gloss75: 24, gloss125: 32, matte32: 18, softTouch: 30 },
  A3: { gloss32: 30, gloss75: 47, gloss125: 63, matte32: 36, softTouch: 60 },
  A2: { gloss32: 38, gloss75: 65, gloss125: 90, matte32: 44, softTouch: 70 }
};

export const WIDE_INTERIOR_MATERIALS = [
  { id: 'ger_720', name: 'Пленка с/к Германия 720 dpi', price: 830, type: 'interior' },
  { id: 'ger_1440', name: 'Пленка с/к Германия 1440 dpi', price: 1050, type: 'interior' },
  { id: 'plotter_cut', name: 'Пленка с/к с контурной плоттерной резкой', price: 1380, type: 'interior' },
  { id: 'cn_720', name: 'Пленка с/к Китай 720 dpi', price: 660, type: 'interior' },
  { id: 'cn_360', name: 'Пленка с/к Китай 360 dpi', price: 390, type: 'wide' },
  { id: 'banner_360', name: 'Баннер Frontlit 440г 360 dpi', price: 500, type: 'wide' },
  { id: 'banner_720', name: 'Баннер Frontlit 510г 720 dpi', price: 580, type: 'wide' },
  { id: 'one_way', name: 'Перфорированная пленка One Way Vision 360 dpi', price: 500, type: 'wide' }
];

export const PVD_PRICES = {
  50: { '1+0': 57, '2+0': 109, '3+0': 159, '4+0': 205 },
  100: { '1+0': 35, '2+0': 68, '3+0': 99, '4+0': 128 },
  200: { '1+0': 25, '2+0': 47, '3+0': 68, '4+0': 88 },
  300: { '1+0': 21, '2+0': 40, '3+0': 58, '4+0': 76 },
  500: { '1+0': 18, '2+0': 35, '3+0': 50, '4+0': 65 },
  1000: { '1+0': 16, '2+0': 31, '3+0': 44, '4+0': 57 }
};
