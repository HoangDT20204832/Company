export interface IBlockOrFloorCard {
  onClickViewBtn: () => void;
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
  item: any;
}

export interface ITenant {
  id: number | null;
  name: string;
  tenancyName: string;
  isActive: boolean;
  mobileConfig: any;
  adminPageConfig: any;
  permissions: any;
}
