import React, { useMemo } from 'react';

import { Box, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
export interface TooltipProps {
  children?: React.ReactNode;
  content: string | undefined;
  type?: 'action' | 'regular';
  side?: 'left' | 'right' | 'top' | 'bottom';
  delayDuration?: number;
  openDelayDuration?: number;
  closeDelayDuration?: number;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = 'right',
  size = 'xs',
  type = 'regular',
  ...props
}: TooltipProps) {

  // check if the tooltip is disabled
  const hasTooltip = useMemo(() => content?.length > 0, [content]);
  // if the tooltip is disabled, return the children directly 
  if (!hasTooltip) {
    return <>{children}</>;
  }

  const textColor = useMemo(() => type === 'action' ? 'actionTextDark' : 'textDark', [type]);
  const textColorVar = useMemo(() => type === 'action' ? 'var(--chakra-colors-actionText)' : 'var(--chakra-colors-primaryText)', [type]);
  const bgColor = useMemo(() => type === 'action' ? 'actionBgDark' : 'bgDark', [type]);

  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger style={{ width: "100%" }}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side={side} {...props}>
        <Flex w="full" gap="0">
          <Box m={1}>
            <TooltipPrimitive.Arrow
              style={{ fill: textColorVar }}
              width={5}
              height={5}
            />
          </Box>
          <Box>
            <Text
              textColor={textColor}
              bg={bgColor}
              borderRadius="lg"
              fontSize={size}
              px={3}
              py={1}
            >
              {content}
            </Text>
          </Box>
        </Flex>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}
