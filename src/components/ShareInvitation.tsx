import { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { Button } from './ui/Button';

export function ShareInvitation() {
  const [status, setStatus] = useState('');
  const [showLink, setShowLink] = useState(false);
  const url = window.location.href.split('#')[0] || weddingConfig.site.productionUrl;

  const share = async () => {
    const data = {
      title: 'Rinsha & Sreeni — Wedding Reception',
      text: weddingConfig.copy.shareMessage,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
        setStatus('Invitation shared.');
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setStatus('Invitation link copied.');
        return;
      }
      setShowLink(true);
      setStatus('Copy the invitation link below.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShowLink(true);
      setStatus('Copy the invitation link below.');
    }
  };

  return (
    <div className="share-invitation">
      <Button variant="secondary" onClick={share}>
        <span aria-hidden="true">↗</span> Share Invitation
      </Button>
      {showLink ? (
        <label className="share-invitation__fallback">
          Invitation link
          <input value={url} readOnly onFocus={(event) => event.currentTarget.select()} />
        </label>
      ) : null}
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
