import prettyBytes from 'pretty-bytes';
import * as yup from 'yup';

import i18n from '@/i18n';

export type TChatItem = {
  friendUserId: number;
  friendTenantId: number;
  friendUserName: string;
  friendTenancyName: string;
  friendProfilePictureId: string;
  state: number;
  stateAddFriend: number;
  lastMessage: {
    userId: number;
    tenantId: number;
    targetUserId: number;
    targetTenantId: number;
    messageRepliedId: any;
    message: string;
    typeMessage: number;
    fileUrl: string;
    creationTime: string;
    isOrganizationUnit: boolean;
    side: number;
    readState: number;
    receiverReadState: number;
    sharedMessageId: string;
    id: number;
  };
  isOrganizationUnit: boolean;
  friendInfo: {
    fullName: string;
    address: any;
    nationality: any;
    identityNumber: any;
    tenantId: number;
    accountId: number;
    imageUrl: any;
    phoneNumber: any;
    email: any;
    gender: string;
    dateOfBirth: string;
    isVoter: boolean;
    apartmentCode: string;
    state: number;
    buildingCode: string;
    type: any;
    isStayed: any;
    otherPhones: any;
    birthYear: any;
    organizationUnitId: any;
    citizenTempId: any;
    citizenCode: any;
    relationShip: any;
    memberNum: any;
    career: any;
    urbanCode: any;
    urbanId: number;
    buildingId: number;
    isDeleted: boolean;
    deleterUserId: any;
    deletionTime: any;
    lastModificationTime: string;
    lastModifierUserId: number;
    creationTime: string;
    creatorUserId: number;
    id: number;
  };
  id: number;
  tenantId: any;
  isGroupOrFriend: boolean;
  creationTime: string;
  lastMessageDate: string;
  isOnline: boolean;
  isBlockOrDelete: boolean;
  unreadMessageCount: number;
};

export type TGetChatQuery = {
  organizationUnitId: number;
};

export type TGetMsgQuery = {
  UserId: number;
  OrganizationUnitId: number;
  IsOrganizationUnit: boolean;
};

export type TMsgItem = {
  userId: number;
  tenantId: number;
  targetUserId: number;
  targetTenantId: number;
  side: number;
  sharedMessageId: string;
  readState: number;
  message: string;
  fileUrl: any;
  creationTime: string;
  typeMessage: number;
  messageRepliedId: any;
  messageReplied: any;
  id: number;
};

export const sendMsgSchema = yup.object().shape({
  text: yup.string().optional(),
  image: yup
    .mixed<FileList>()
    .test(
      'type',
      `${i18n.t('Định dạng ko đúng')} image/png, image/jpg, image/jpeg`,
      (value: any) => {
        if (!value) return true;
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(
          value?.[0]?.type,
        );
      },
    )
    .test(
      'fileSize',
      `${i18n.t('Kích thước quá lớn')} ( > ${prettyBytes(2000000)})`,
      (value: any) => {
        if (!value) return true;
        return value?.[0]?.size <= 2000000;
      },
    ),
  file: yup
    .mixed<FileList>()
    .test(
      'type',
      `${i18n.t('Định dạng ko đúng')} .pdf, .docx`,
      (value: any) => {
        if (!value) return true;
        return [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(value?.[0]?.type);
      },
    )
    .test(
      'fileSize',
      `${i18n.t('Kích thước quá lớn')} ( > ${prettyBytes(2000000)})`,
      (value: any) => {
        if (!value) return true;
        return value?.[0]?.size <= 2000000;
      },
    ),
});

export const CreateGroupChatSchema = yup.object({
  memberShips: yup
    .array(yup.mixed())
    .default([])
    .min(1, 'Nhóm cần tối thiểu 01 thành viên'),
  groupName: yup.string().required('Tên nhóm không được để trống'),
  groupImageFile: yup
    .mixed<File>()
    .required('Ảnh nhóm không được để trống')
    .test(
      'type',
      `Ảnh nhóm định dạng ko đúng image/png, image/jpg, image/jpeg`,
      (value: any) => {
        if (!value) return true;
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(value?.type);
      },
    )
    .test(
      'fileSize',
      `Ảnh nhóm kích thước quá lớn ( > ${prettyBytes(2000000)})`,
      (value: any) => {
        if (!value) return true;
        return value?.size <= 2000000;
      },
    ),
});

export type TGroupChatConversationMember = {
  friendUserId: number;
  friendTenantId: number;
  friendUserName: string;
  friendTenancyName: string;
  friendProfilePictureId: string;
  state: number;
  stateAddFriend: number;
  lastMessage: {
    userId: number;
    tenantId: number;
    targetUserId: number;
    targetTenantId: number;
    messageRepliedId: number;
    message: string;
    typeMessage: number;
    fileUrl: string;
    creationTime: string;
    isOrganizationUnit: boolean;
    side: number;
    readState: number;
    receiverReadState: number;
    sharedMessageId: string;
    id: number;
  };
  isOrganizationUnit: boolean;
  friendInfo: {
    fullName: string;
    address: string;
    nationality: string;
    identityNumber: string;
    tenantId: number;
    accountId: number;
    imageUrl: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    isVoter: boolean;
    apartmentCode: string;
    state: number;
    buildingCode: string;
    type: number;
    isStayed: boolean;
    otherPhones: string;
    birthYear: number;
    organizationUnitId: number;
    citizenTempId: number;
    citizenCode: string;
    relationShip: number;
    memberNum: number;
    career: string;
    urbanCode: string;
    urbanId: number;
    buildingId: number;
    isDeleted: boolean;
    deleterUserId: number;
    deletionTime: string;
    lastModificationTime: string;
    lastModifierUserId: number;
    creationTime: string;
    creatorUserId: number;
    id: number;
  };
  id: number;
  tenantId: number;
  isGroupOrFriend: boolean;
  creationTime: string;
  lastMessageDate: string;
  isOnline: boolean;
  isBlockOrDelete: boolean;
  unreadMessageCount: number;
};

export type TGroupChatConversation = {
  adminId: number;
  userId: number;
  isAdmin: boolean;
  numberMember: number;
  name: string;
  groupChatCode: string;
  groupImageUrl: string;
  members: TGroupChatConversationMember[];
  lastMessage: {
    userId: number;
    tenantId: number;
    groupId: number;
    creatorUserId: number;
    message: string;
    typeMessage: number;
    shareMessageId: string;
    creationTime: string;
    side: number;
    readState: number;
    id: number;
  };
  id: number;
  tenantId: number;
  isGroupOrFriend: boolean;
  creationTime: string;
  lastMessageDate: string;
  isOnline: boolean;
  isBlockOrDelete: boolean;
  unreadMessageCount: number;
};

export type TGroupChatDetail = {
  name: string;
  groupChatCode: string;
  groupImageUrl: string;
  memberNumer: number;
  lastMessage: any;
  members: {
    userId: number;
    groupChatId: number;
    memberFullName: string;
    memberUserName: string;
    memberTenantId: number;
    memberAvatarUrl: string;
    role: number;
    creationTime: string;
    tenantId: number;
  }[];
  id: number;
  tenantId: number;
  isGroupOrFriend: boolean;
  creationTime: string;
  lastMessageDate: string;
  isOnline: boolean;
  isBlockOrDelete: boolean;
  unreadMessageCount: number;
};
