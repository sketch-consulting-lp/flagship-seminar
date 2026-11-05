(() => {
  'use strict';
  const form = document.getElementById('seminarForm');
  const cta = document.getElementById('stickyCta');
  const ctaLink = document.getElementById('ctaLink');
  const submit = document.getElementById('submitButton');
  const error = document.getElementById('formError');
  const success = document.getElementById('formSuccess');
  const formSection = document.getElementById('application-form');
  let completed = false;
  let sending = false;

  // イベント名のみを送信し、氏名・会社名・電話番号・メールアドレス等は絶対に送信しない。
  function trackEvent(name) {
    // 将来 GA4 / Meta Pixel の設定後、ここにイベント名のみの送信処理を追加。
    // 現状は意図的に計測サービスへ何も送信しません。
    void name;
  }

  const toggleSticky = () => {
    if (completed) { cta.hidden = true; return; }
    const r = formSection.getBoundingClientRect();
    // フォームが表示領域の中央付近まで来たら固定CTAを隠して入力しやすくする。
    cta.hidden = r.top < window.innerHeight * 0.72 && r.bottom > 0;
  };
  window.addEventListener('scroll', toggleSticky, { passive: true });
  window.addEventListener('resize', toggleSticky);
  toggleSticky();

  ctaLink.addEventListener('click', e => {
    e.preventDefault();
    trackEvent('cta_click');
    formSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    error.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending || completed) return;
    error.hidden = true;
    error.textContent = '';
    if (!form.reportValidity()) return;
    const id = (window.LP_CONFIG?.formspreeId || '').trim();
    if (!/^[a-zA-Z0-9]+$/.test(id)) {
      showError('現在、お申し込みフォームの準備中です。FormspreeのフォームIDを設定してください。');
      return;
    }
    sending = true;
    submit.disabled = true;
    submit.textContent = '送信中…';
    trackEvent('form_submit_start');
    try {
      const payload = new FormData(form);
      payload.append('_subject', '12/9 共催セミナー申込');
      payload.append('seminar', '2026年12月9日 13:00〜14:00 ハローワーク求人×採用動画');
      // 広告流入判別に必要なUTMのみ保持。個人情報を含む任意パラメータは転送しない。
      const qs = new URLSearchParams(window.location.search);
      for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
        const value = qs.get(key);
        if (value) payload.append(key, value.slice(0, 150));
      }
      const response = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST', body: payload, headers: { 'Accept': 'application/json' }
      });
      let data = {};
      try { data = await response.json(); } catch (_) { /* handle status below */ }
      if (!response.ok) {
        const detail = Array.isArray(data.errors) ? data.errors.map(item => item.message).filter(Boolean).join(' / ') : '';
        throw new Error(detail || '送信に失敗しました。通信状況をご確認のうえ、もう一度お試しください。');
      }
      completed = true;
      form.hidden = true;
      success.hidden = false;
      cta.hidden = true;
      trackEvent('seminar_registration_complete');
      success.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      showError(err instanceof Error ? err.message : '通信エラーが発生しました。時間をおいて再度お試しください。');
    } finally {
      sending = false;
      if (!completed) {
        submit.disabled = false;
        submit.innerHTML = '無料セミナーに申し込む <span aria-hidden="true">›</span>';
      }
    }
  });
})();
