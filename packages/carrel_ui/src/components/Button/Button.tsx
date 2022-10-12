import {useButton} from 'react-aria';
import {useRef} from 'react';
import { button, buttonStyles } from './button.css';
import clsx from 'clsx';
import { CUSize } from '../props/size';

export interface ButtonProps {
  /**
   * The variant of the button
   * @default 'primary'
   * @type 'primary' | 'secondary'
   */
  variant?: CUButtonVariant;

  size?: CUSize;
  
  children?: React.ReactNode;

  onClick?: () => void;
}

export const Button = ({
  variant = CUButtonVariant.UNSPECIFIED,
  ...props}: ButtonProps) => {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button
      {...buttonProps}
      className={clsx(
        buttonStyles({
          size: props.size,
          variant: props.variant,
        })
      )}
      ref={ref}
    >
      {children}
    </button>
  );
}