import { useState } from 'react';
import { downloadCalendarEvent } from '../utils/calendar';
import { Button } from './ui/Button';

export function AddToCalendar() {
  const [status, setStatus] = useState('');

  const addToCalendar = () => {
    try {
      downloadCalendarEvent();
      setStatus('Calendar invitation downloaded.');
    } catch {
      setStatus('We couldn’t create the calendar file. Please save 17 September manually.');
    }
  };

  return (
    <div className="calendar-action">
      <Button variant="secondary" onClick={addToCalendar}>
        <span aria-hidden="true">＋</span> Add to Calendar
      </Button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
