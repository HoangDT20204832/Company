export enum FormIdFeedback {
  FormFeedbackGetall = 10,
  FormFeedbackPending = 11,
  FormFeedbackHandling = 12,
  FormFeedbackDeclined = 13,
  FormFeedbackAdminConfirmed = 14,
  FormFeedbackUserRating = 15,
}

export enum EState {
  _NewReflect = 1,
  Pending = 2,
  Completed = 3,
  CompletedUser = 4,
  Rated = 5,
}

export type TGetAllCommnetByCitizenReflectReq = {
  CitizenReflectId: number;
  MaxResultCount: number;
  SkipCount: number;
};

export type TCitizenReflectCommentReqData = {
  fullName: string;
  imageUrl: string;
  creatorFeedbackId: number;
  feedbackId: number;
  comment: string;
  readState: number;
  tenantId: number;
  fileUrl: string;
  typeComment: number;
  organizationUnitId: number;
  isDeleted: true;
  deleterUserId: number;
  deletionTime: string;
  lastModificationTime: string;
  lastModifierUserId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

export type TCitizenReflectComment = {
  fullName: string;
  imageUrl: string;
  creatorFeedbackId: number;
  feedbackId: number;
  comment: string;
  readState: number;
  tenantId: number;
  fileUrl: string;
  typeComment: number;
  organizationUnitId: number;
  isDeleted: boolean;
  deleterUserId: number;
  deletionTime: string;
  lastModificationTime: string;
  lastModifierUserId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

export type TAdminCitizenReflectItem = {
  fullName: string;
  userName: string;
  imageUrl: string;
  countAllComment: number;
  note: string;
  fileOfNote: string;
  email: string;
  address: string;
  organizationUnitName: string;
  handlerName: string;
  name: string;
  data: string;
  fileUrl: string;
  type: number;
  tenantId: number;
  finishTime: string;
  state: number;
  isPublic: boolean;
  rating: number;
  ratingContent: string;
  organizationUnitId: number;
  checkVerify: boolean;
  phone: string;
  nameFeeder: string;
  countUnreadComment: number;
  handleUserId: number;
  handleOrganizationUnitId: number;
  reflectReport: string;
  reportName: string;
  addressFeeder: string;
  apartmentCode: string;
  urbanId: number;
  buildingId: number;
  isDeleted: false;
  deleterUserId: number;
  deletionTime: string;
  lastModificationTime: string;
  lastModifierUserId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

export enum TYPE_COMMENT {
  /** tin nhắn text */
  TEXT = 1,
  /** 1 hình ảnh */
  IMAGE = 2,
  /** 1 video */
  VIDEO = 3,
  /** 1 file */
  FILE = 4,
  /** nhiều hình ảnh */
  IMAGES = 5,
  /** nhiều video */
  VIDEOS = 6,
  /** nhiều file */
  FILES = 7,
  /** phản ánh mới */
  STATE_PENDING = 8,
  /** người dùng từ chối xác nhận từ admin */
  STATE_DECLINED = 9,
  /** đang xử lý */
  STATE_HANDLING = 10,
  /** hẹn lịch xử lý */
  STATE_SETTIME = 14,
  /** admin xác nhận đã xử lý xong */
  STATE_ADMIN_CONFIRMED = 11,
  /** người dùng xác nhận đã xử lý */
  STATE_USER_CONFIRMED = 12,
  /** người dùng đánh giá về feedback */
  STATE_USER_RATE_FEEDBACK = 13,
}

type TWorks = {
  id: number;
  title: string;
  content: string;
  dateStart: any;
  dateExpected: any;
  dateFinish: any;
  userId: null;
  status: number;
  workTypeId: number;
  creatorUserId: number;
  qrCode: string;
  qrAction: any;
};

export type TGetCitizenReflectById = {
  works: TWorks[];
  id: number;
};
