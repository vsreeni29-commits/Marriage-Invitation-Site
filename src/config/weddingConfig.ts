export const weddingConfig = {
  couple: {
    bride: 'Rinsha',
    groom: 'Sreeni',
    monogram: 'R + S',
  },
  event: {
    name: 'Wedding Reception',
    date: '2026-09-17',
    startTime: '18:00',
    endTime: '22:00',
    timezone: 'Asia/Kolkata',
    displayDate: 'Thursday, 17 September 2026',
    displayTime: '6:00 PM – 10:00 PM',
    startsAtIso: '2026-09-17T18:00:00+05:30',
    endsAtIso: '2026-09-17T22:00:00+05:30',
  },
  venue: {
    name: 'Sree Gupta Bhavan – SgB',
    address: '175, Velachery Main Road, Gowriwakkam, Chennai, Tamil Nadu – 600073',
    googleMapsUrl: 'https://maps.app.goo.gl/qxPLmU2nv74WX3Rw8',
  },
  copy: {
    title: 'Two traditions. Two cultures. One beautiful beginning.',
    hero: 'Kerala meets Tamil Nadu. And somewhere between the two, we found home.',
    shareMessage: 'Rinsha & Sreeni are celebrating their new beginning on 17 September 2026. We’d love for you to join us.',
  },
  assets: {
    music: 'audio/rinsha-sreeni-ambient.mp3',
    couplePortrait: null as string | null,
    heroPhoto: null as string | null,
    socialPreview: 'og-image.png',
  },
  site: {
    productionUrl: 'https://vsreeni29-commits.github.io/Marriage-Invitation-Site/',
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
