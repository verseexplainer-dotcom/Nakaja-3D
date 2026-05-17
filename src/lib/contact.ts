import dealer from '../data/dealer.json';

const defaultMessengerLink = 'https://m.me/nakajabikes';
const normalizeNumber = (value: string) => value.replace(/\D/g, '');

export const publicWhatsAppNumber = normalizeNumber(import.meta.env.PUBLIC_WHATSAPP_NUMBER || dealer.phoneIntl);
export const publicMessengerLink = import.meta.env.PUBLIC_MESSENGER_LINK || defaultMessengerLink;
export const hasPublicWhatsAppConfig = Boolean(publicWhatsAppNumber);

export const buildWhatsAppUrl = (message: string, phoneNumber = publicWhatsAppNumber) => {
  const normalizedNumber = normalizeNumber(phoneNumber);
  if (!normalizedNumber) return '/contact';
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
};
