export enum PaymentType {
  CARD = 'CARD',
  CASH = 'CASH',
  PIX = 'PIX',
}

export const PaymentTypeTranslations: Record<PaymentType, string> = {
  [PaymentType.CARD]: 'Cartão',
  [PaymentType.CASH]: 'Dinheiro',
  [PaymentType.PIX]: 'Pix',
};
