import { weddingConfig } from '../config/weddingConfig';

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

export function buildCalendarEvent() {
  const title =
    weddingConfig.couple.bride +
    ' & ' +
    weddingConfig.couple.groom +
    ' — ' +
    weddingConfig.event.name;
  const description =
    'Celebrate the new beginning of ' +
    weddingConfig.couple.bride +
    ' and ' +
    weddingConfig.couple.groom +
    '. Directions: ' +
    weddingConfig.venue.googleMapsUrl;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rinsha and Sreeni//Wedding Reception//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'X-LIC-LOCATION:Asia/Kolkata',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    'UID:rinsha-sreeni-20260917@wedding-invitation',
    'DTSTAMP:' + stamp,
    'DTSTART;TZID=Asia/Kolkata:20260917T180000',
    'DTEND;TZID=Asia/Kolkata:20260917T220000',
    'SUMMARY:' + escapeIcs(title),
    'DESCRIPTION:' + escapeIcs(description),
    'LOCATION:' +
      escapeIcs(weddingConfig.venue.name + ', ' + weddingConfig.venue.address),
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadCalendarEvent() {
  const blob = new Blob([buildCalendarEvent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'rinsha-sreeni-wedding-reception.ics';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
