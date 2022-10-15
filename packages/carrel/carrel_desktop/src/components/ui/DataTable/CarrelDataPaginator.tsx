import { Text, Button, Container, Flex, Spacer, Select, Input, HStack } from "@chakra-ui/react";
import {CarrelDataTableInternalParams} from "./i-carrel-data-table-params";

export const CarrelDataPaginator = (props: CarrelDataTableInternalParams<any>) => {
    return (
      <Container
        paddingX="2"
        paddingY="1"
        h="50px"
        w="full"

        maxW="full"

      >
        <HStack alignContent={'center'}  w='full' h='full'>
          <Flex>
            <Button
              className="border rounded p-1"
              onClick={() => props.table.setPageIndex(0)}
              disabled={!props.table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              className="border rounded p-1"
              onClick={() => props.table.previousPage()}
              disabled={!props.table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              className="border rounded p-1"
              onClick={() => props.table.nextPage()}
              disabled={!props.table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              className="border rounded p-1"
              onClick={() =>
                props.table.setPageIndex(props.table.getPageCount() - 1)
              }
              disabled={!props.table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </Flex>
          <Spacer />
          <HStack>
            <Text
              color="primaryTextMute"
              fontSize="xs"
              className="flex items-center gap-1"
            >
              <div>Page</div>
            </Text>

            <Text fontSize='xs' color='primaryText'>
              {props.table.getState().pagination.pageIndex + 1} of{" "}
              {props.table.getPageCount()}
            </Text>
          </HStack>
          <Spacer />
          <HStack>
            <Text
              color="primaryTextMute"
              fontSize="xs"
              className="flex items-center gap-1"
            >
              Go:
            </Text>
            <Input
              size="xs"
              type="number"
              w='50px'
              defaultValue={props.table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                props.table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
            <Select
              color="primaryTextMute"
              size="xs"
              value={props.table.getState().pagination.pageSize}
              onChange={(e) => {
                props.table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>
      </Container>
    );
}
