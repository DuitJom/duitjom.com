export const CLIENT = {
  fullName: 'SITI AIDAH ABD AZIZ',
  myKad: '870804-03-5022',
  email: 'aidahs12@yahoo.com',
  phone: '+60 1110896264',
  sex: 'WOMAN',
  religionRace: 'MALAY / ISLAM',
  merchantName: 'GETMORE RESOURCES SDN BHD',
  product: 'DUITJOM FINANCE / GETMORE RESOURCES',
  status: 'ACTIVE',
};

export const COMPANY = {
  name: 'GETMORE RESOURCES SDN BHD',
  ssm: 'SSM: 202101021538 / 1421838-P',
  fax: '+60 16-534 9363',
  service: 'Financial Product',
  address: '47A Tingkat, Bandar Sunway, 1, Jln Todak 4, Seberang Jaya, 13700 Perai, Pulau Pinang.',
  maps: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x304ac5c47c1e91ed:0x865f1174ab57e5f7?entry=s&sa=X&ved=2ahUKEwiGg9XRkc6XAxWf1DgGHTGcAosQ4kB6BAgEEAA&hl=en',
};

export const PRODUCT_RECORD = {
  merchantId: '2000162100241',
  name: 'DUITJOM',
  product: 'DUITJOM WEBSITE',
  applicationNo: 'DJ 30021169',
  startDate: '16.10.2026',
  endDate: '22.10.2026',
  latestTransaction: '23.10.2026',
  latestAmount: 'RM 600.00',
  recordStatus: 'On Going',
  applicationSite: 'https://www.duitjom.com',
  repaymentSite: 'https://www.duitjom.my',
};

export const PROFILE_COMPANY = {
  ...COMPANY,
  logo: 'https://moneylinecredit.my/wp-content/uploads/2021/09/logo_mlc_512_red.png',
  service: 'Finance Product',
  origin: 'PENANG MALAYSIA',
  address: 'No. 47, Tingkat 1, Jalan Todak 4, Seberang Jaya Bandar Sunway, 13700 Perai, Pulau',
  maps: 'https://maps.app.goo.gl/MQdAwkAZ1SzdVUdn9',
  phone: '+6010-395 9930',
  phoneHref: 'tel:+60103959930',
};

export const mask = (s: string, keep = 4) =>
  s.split('').map((c, i) => (i < s.length - keep && /[A-Za-z0-9]/.test(c) ? '•' : c)).join('');
