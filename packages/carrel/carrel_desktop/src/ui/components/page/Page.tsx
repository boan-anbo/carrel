import { Container, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { PageHeader } from './components';
import {BODY_HEIGHT} from "../../styles/constants";

export interface PageProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
}

function Page({ children, ...props }: PageProps) {
  return (
    <Container overflow='hidden' h={BODY_HEIGHT} maxH="full" p="0" m='0' maxW="full">
      <VStack  h="full" w="full">
        <PageHeader title={props.title} description={props.description} />
        <Container overflowY='auto' h="full" maxW="full" p="0">
          {children}
        </Container>
      </VStack>
    </Container>
  );
}

export default Page;
