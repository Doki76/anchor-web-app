import { ActionButton } from '@anchor-protocol/neumorphism-ui/components/ActionButton';
import { SnackbarProvider } from '@anchor-protocol/snackbar';
import {
  NotifiableFetchParams,
  NotifiableFetchProvider,
  useNotifiableFetch,
} from '@anchor-protocol/use-notifiable-fetch';
import React, { ComponentType } from 'react';
import { SnackbarContainer } from './components/SnackbarContainer';
import { SnackbarContent } from './components/SnackbarContent';

export default {
  title: 'core/use-notifiable-fetch/Transfer On Always',
  decorators: [
    (Story: ComponentType) => (
      <NotifiableFetchProvider>
        <SnackbarProvider>
          <Story />
          <SnackbarContainer />
        </SnackbarProvider>
      </NotifiableFetchProvider>
    ),
  ],
};

const params: NotifiableFetchParams<
  { a: number; b: number },
  { c: number },
  Error
> = {
  transferOn: 'always',
  fetchFactory: ({ a, b }) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ c: a + b }), 3000);
    });
  },
  notificationFactory: (result) => {
    switch (result.status) {
      case 'in-progress':
        return (
          <SnackbarContent
            message={`${result.status} : ${result.params.a} + ${result.params.b} = ?`}
          />
        );
      case 'done':
        return (
          <SnackbarContent
            message={`${result.status} : ${result.params.a} + ${result.params.b} = ${result.data.c}`}
          />
        );
      case 'error':
        return <SnackbarContent message={`${result.status} : Error!!!`} />;
      default:
        return (
          <SnackbarContent message={`${result.status} : Unknown case!!!`} />
        );
    }
  },
};

export const Transfer_On_Always = () => {
  const [fetch] = useNotifiableFetch(params);

  return (
    <div>
      <ActionButton
        style={{ width: 200 }}
        onClick={() =>
          fetch({
            a: Math.floor(Math.random() * 10),
            b: Math.floor(Math.random() * 10),
          })
        }
      >
        Fetch
      </ActionButton>
    </div>
  );
};
