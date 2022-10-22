import { Box } from "@chakra-ui/react";
import {NoInfer} from "@tanstack/react-table";


export interface CommentCellProps {
  children?: React.ReactNode;
}

export function CommentCell({children}: CommentCellProps) {
    return (
      <Box>
        <div>{children}</div>
      </Box>
    );
}
