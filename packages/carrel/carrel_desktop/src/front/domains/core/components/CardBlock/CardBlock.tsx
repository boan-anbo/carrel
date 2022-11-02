import { Block } from "../../../../../ui/components/Block/Block";
import { TagFireflies } from "../TagFireflies";

export interface CardBlockProps {
  prop?: string;
}

export function CardBlock({ prop = "default value" }: CardBlockProps) {
  return (
    <Block
    >
      <TagFireflies />
    </Block>
  );
}
