export const COMPANY_EMAIL = 'sarah@shilohfreshexporters.co.ke';
export const COMPANY_PHONE = '0786 381 259';
export const COMPANY_TEL = '+254786381259';
export const COMPANY_WHATSAPP = '254786381259';
export const SITE_URL = 'https://shilohfreshexporters.co.ke';

export const getQuotePath = (productName?: string) =>
  productName ? `/quote?product=${encodeURIComponent(productName)}` : '/quote';

type InquiryFields = Record<string, string>;

export async function sendInquiry(fields: InquiryFields) {
  if (fields.website?.trim()) {
    return { success: true };
  }

  const { website: _honeypot, ...payload } = fields;

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(COMPANY_EMAIL)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _template: 'table',
        _captcha: 'false',
        _autoresponse:
          'Thank you for contacting Shiloh Fresh Exporters. We have received your message and will reply within 24 hours.',
      }),
    },
  );

  const data = await response.json().catch(() => ({} as { message?: string; success?: string }));

  if (!response.ok) {
    throw new Error(data.message || 'Could not send your message. Please email us directly.');
  }

  return data;
}
