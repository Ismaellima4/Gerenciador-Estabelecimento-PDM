export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export const PaymentStatusTranslations: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'PENDENTE',
  [PaymentStatus.COMPLETED]: 'CONCLUÍDO',
  [PaymentStatus.FAILED]: 'FALHOU',
  [PaymentStatus.CANCELLED]: 'CANCELADO',
};