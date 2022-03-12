import { Divider, Text, VStack } from '@chakra-ui/react';

export const SmPanel = ({ children, ...props }) => (
  <VStack className="sm_panel" alignItems="flex-start" {...props}>
    {children}
  </VStack>
);

export const PageHeaderLabel = ({ children }) => (
  <Text fontFamily="RMNeue-Bold" fontSize="2.2em" mt="2em">
    {children}
  </Text>
);

export const PageIntroduction = ({ children }) => (
  <Text fontFamily="RMNeue-Regular" fontSize="1.1em" color="smNavy.400">
    {children}
  </Text>
);


export const PageHeader = ({ headerLabel, introduction }) => {
  return <><PageHeaderLabel>{headerLabel}</PageHeaderLabel>
    <PageIntroduction>
      {introduction}
    </PageIntroduction>
    <Divider style={{ marginTop: '2em', width: '800px', marginBottom: '3em' }} />
  </>
}