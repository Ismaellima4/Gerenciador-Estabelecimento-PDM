export enum UserRole {
  Admin = 'admin',
  Admin_Stock = 'admin_stock',
  Admin_cashier = 'admin_cashier',
}


export const UserRoleTranslations: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Admin_Stock]: 'Estoque',
  [UserRole.Admin_cashier]: 'Caixa',
};
