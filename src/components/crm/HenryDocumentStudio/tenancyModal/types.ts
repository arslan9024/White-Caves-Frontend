import type { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';

export type TenancyDocType =
  | 'auto'
  | 'contract'
  | 'title_deed'
  | 'emirates_id_tenant'
  | 'emirates_id_landlord'
  | 'passport_tenant'
  | 'passport_landlord';

export type TenancyPreviewPage = number | 'all';

export type FieldChangeHandler = (
  field: keyof DldTenancyContractData,
  value: DldTenancyContractData[keyof DldTenancyContractData]
) => void;

export type { DldTenancyContractData };
