import { Text, Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useContext, useState } from 'react';
import {
  AttentionBar,
  CodeExamples,
  DescriptionLabel,
  HeaderLabel,
  PageHeader,
  SmPanel,
} from '../components/common';
import Dashboard from '../components/dashboard';
import { GenerateTokenComponent, TokenGenStages as TokenGenStage } from './manage-access';
import accountContext from '../utils/account-store-context';



export default observer(function GettingStarted({ }) {

  const [showDefaultCodeExample, setShowDefaultCodeExample] = useState(true);

  const { accountStore } = useContext(accountContext);


  const tokenGenerationStage = (stage: TokenGenStage) => {
    setShowDefaultCodeExample(stage != 'generated')
  }

  return (
    <Dashboard>
      <PageHeader
        headerLabel="Get Started"
        introduction="Start using our speech-to-text SaaS in a few simple steps."
      />

      <SmPanel width="800px">
        <Box>
          <HeaderLabel>Download an Example Audio File</HeaderLabel>
          <DescriptionLabel>
            Download our{' '}
            <a href='/example.wav'
              download='example.wav' title='Download an example file'>
              <Text color="smBlue.500" as="span">
                sample audio file
              </Text>
            </a>
            {' '}
            into the folder, or use your own. <br />
          </DescriptionLabel>
        </Box>
        <PanelDivider />
        <GenerateTokenComponent paddingTop="0.5em" raiseTokenStage={tokenGenerationStage} tokensFullDescr={
          <>You've already created 5 API Keys.{' '}
            Before generating a new API key, you need to remove an existing key from{' '}
            <Link href='/manage-access/'><a style={{ cursor: 'pointer', textDecoration: 'underline' }}>Manage Access</a></Link>{' '}
            page.
          </>} />
        {showDefaultCodeExample && <>
          <PanelDivider />
          <Box paddingTop="0.5em" width='100%'>
            <HeaderLabel>Make an API Request</HeaderLabel>
            <DescriptionLabel>Run the command to generate a transcript.</DescriptionLabel>{' '}
            <CodeExamples />
          </Box>
        </>}
      </SmPanel>
    </Dashboard>
  );
});

const PanelDivider = () => (
  <Box
    bg="smBlack.200"
    height="1px"
    width="calc(100% + 3em)"
    style={{ marginLeft: '-1.5em', marginTop: '1em' }}
  />
);
