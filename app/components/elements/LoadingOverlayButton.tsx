import {
  Button,
  LoadingOverlay,
  createPolymorphicComponent,
} from '@mantine/core';
import { forwardRef } from 'react';
import type { ButtonProps } from '@mantine/core';

type Props = ButtonProps;

const _LoadingOverlayButton = forwardRef<HTMLButtonElement, Props>(
  ({ loading, ...props }: Props, ref) => {
    return (
      <>
        <LoadingOverlay visible={loading} />
        <Button {...props} disabled={loading} ref={ref} />
      </>
    );
  },
);
_LoadingOverlayButton.displayName = 'LoadingOverlayButton';

export const LoadingOverlayButton = createPolymorphicComponent<
  'button',
  Props,
  typeof _LoadingOverlayButton
>(_LoadingOverlayButton);
