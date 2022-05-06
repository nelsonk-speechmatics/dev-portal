import { VStack, Text, HStack, Box, Button, Grid } from '@chakra-ui/react';
import Link from 'next/link';
import { InfoBarbox, PageHeader } from '../components/common';
import Dashboard from '../components/dashboard';
import {
  MenuLearnIcon,
  MenuPadlockIcon,
  MenuTrackUsageIcon,
  TranscribeAudioIcon,
} from '../components/icons-library';

export default function Home({ }) {
  return (
    <Dashboard>
      <PageHeader headerLabel="Home" introduction="Welcome to the Speechmatics SaaS Portal, as updated from gitlab!" />
      <VStack spacing='2em' width='100%' maxWidth='900px'>
        <InfoBarbox
          width="100%"
          bgColor="smBlue.500"
          icon={<TranscribeAudioIcon width='4em' height='3em' />}
          title="Transcribe an Audio File"
          description=""
          buttonLabel="Get Started"
          hrefUrl="/getting-started/"
        />
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(16em, 1fr))' gridAutoFlow='dense' width='100%' gap='1em'>
          <HomeWhiteBox
            icon={<MenuPadlockIcon width='6em' height='4em' />}
            title="Manage API Keys"
            description="You need to create an API key to make API requests."
            buttonLabel="Create API Key"
            hrefUrl="/manage-access/"
          />
          <HomeWhiteBox
            icon={<MenuTrackUsageIcon width='6em' height='4em' />}
            title="Track Your Usage"
            description="Usage is measured in hours of audio processed."
            buttonLabel="View Usage"
            hrefUrl="/usage/"
          />
          <HomeWhiteBox
            icon={<MenuLearnIcon width='6em' height='4em' />}
            title="Learning Resources"
            description="Explore our documentation and learning resources."
            buttonLabel="Learn"
            hrefUrl="/learn/"
          />
        </Grid>
      </VStack>
    </Dashboard>
  );
}

const HomeBox = ({ bgColor, icon, iconPadding = '24px', text, buttonLabel, hrefUrl }) => {
  return (
    <VStack width="100%" height="288px" bg={bgColor} borderRadius="2px" p="1.5em" spacing="1em">
      <Box borderRadius={'100%'} width="88px" height="88px" bg="smWhite.150" p={iconPadding}>
        {icon}
      </Box>
      <Text
        fontFamily="RMNeue-Bold"
        fontSize="1.5em"
        lineHeight="1.2em"
        textAlign="center"
        color="smWhite.500"
        paddingX="1.8em"
      >
        {text}
      </Text>
      <Link href={hrefUrl}>
        <Button variant="speechmaticsWhite" color={bgColor}>
          {buttonLabel}
        </Button>
      </Link>
    </VStack>
  );
};

const HomeWhiteBox = ({ icon, title, description, buttonLabel, hrefUrl }) => {
  return (
    <VStack
      className="sm_panel"
      width="100%"
      // minWidth='10em'
      // maxWidth='16em'
      height="278px"
      alignItems="center"
      padding="2em"
      justifyContent="space-between"
    >
      <VStack>
        <Box>{icon}</Box>
        <Text as="div" fontFamily="RMNeue-Bold" fontSize="1.1em" textAlign="center">
          {title}
        </Text>
        <Text
          as="div"
          fontFamily="RMNeue-Regular"
          fontSize="0.8em"
          color="smBlack.400"
          textAlign="center"
        >
          {description}
        </Text>
      </VStack>
      <Link href={hrefUrl}>
        <Button variant="speechmaticsOutline" width="100%">
          {buttonLabel}
        </Button>
      </Link>
    </VStack>
  );
};
