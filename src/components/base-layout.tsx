import NiceModal from '@ebay/nice-modal-react';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import AuthProvider from '@/services/auth/auth.context';
import ChatProvider from '@/services/chat/chat.context';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <NiceModal.Provider>
        <AuthProvider>
          <ChatProvider>{children}</ChatProvider>
        </AuthProvider>
      </NiceModal.Provider>
    </SnackbarProvider>
  );
};

export default BaseLayout;
