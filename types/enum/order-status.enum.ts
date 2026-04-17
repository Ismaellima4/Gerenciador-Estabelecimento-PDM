export enum OrderStatus {
  INITIATED = 'INITIATED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}


export const OrderStatusTranslations: Record<OrderStatus, string> = {
  [OrderStatus.INITIATED]: 'INICIALIZADO',
  [OrderStatus.CANCELLED]: 'CANCELADO',
  [OrderStatus.COMPLETED]: 'COMPLETADO',
  [OrderStatus.PROCESSING]: 'PROCESSANDO',
};
