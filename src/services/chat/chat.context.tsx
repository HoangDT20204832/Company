import * as signalR from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, createContext, useEffect, useReducer } from 'react';
import { useCookie } from 'react-use';

import { API_ENDPOINT } from '@/configs/constant.config';

import { IContextAction } from '../common/common.model';

type THubSignalR = signalR.HubConnection;
type TState = { hubSignalR?: THubSignalR };
const initialState: TState = {
  hubSignalR: undefined,
};
export type TActionType = 'setConnection';

const chatReducer = (
  state: TState,
  action: IContextAction<TActionType>,
): TState => {
  switch (action.type) {
    case 'setConnection': {
      return {
        hubSignalR: action.payload,
      };
    }

    default:
      return state;
  }
};

export const ChatContext = createContext<
  [state: TState, dispatch: Dispatch<IContextAction<TActionType>>]
>([initialState, () => null]);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const [encryptedAccessToken] = useCookie('encryptedAccessToken');
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!state.hubSignalR && !!encryptedAccessToken) {
      const _hubConnection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withUrl(
          API_ENDPOINT +
            '/messager?enc_auth_token=' +
            encodeURIComponent(encryptedAccessToken),
        )
        .build();
      _hubConnection
        .start()
        .then(() => {
          console.log('[START_CONNECT_HUBCONNECTION]');
        })
        .catch((err: any) => {
          console.log('[ERROR_START_CONNECT_SIGNALR]', err);
        });
      _hubConnection.onclose((e: any) => {
        if (e) {
          console.log('Chat connection closed with error: ', e);
        } else {
          console.log('Chat disconnected');
        }
        _hubConnection.start().then(() => {});
      });
      _hubConnection?.on('getChatMessage', () => {
        queryClient.refetchQueries(['GetUserChatMessages']);
        queryClient.refetchQueries(['GetOrganizationUnitChatAdmin']);
      });
      _hubConnection?.on('deleteChatMessage', () => {
        queryClient.refetchQueries(['GetUserChatMessages']);
        queryClient.refetchQueries(['GetOrganizationUnitChatAdmin']);
      });
      dispatch({ type: 'setConnection', payload: _hubConnection });
    }
    return () => {};
  }, [encryptedAccessToken, queryClient, state.hubSignalR]);

  return (
    <ChatContext.Provider value={[state, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
