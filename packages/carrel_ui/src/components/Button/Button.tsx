import {useButton} from 'react-aria';
import {useRef} from 'react';
import clsx from 'clsx';
import { CUSize } from '../props/size';
import {  CUButtonVariantType } from './CUButtonVariant';

export interface ButtonProps {
  /**
   * The variant of the button
   * @default 'primary'
   * @type 'primary' | 'secondary'
   */
  variant?: CUButtonVariantType;

  size?: CUSize;
  
  children?: React.ReactNode;

  onClick?: () => void;
}

export const Button = ({
  variant = 'menu',
  size,
  ...props}: ButtonProps) => {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button
    
      {...buttonProps}

      ref={ref}
    >
      {children}
    </button>
  );
}