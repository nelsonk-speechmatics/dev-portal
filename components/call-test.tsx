import { Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { call } from '../utils/call-api';

export default ({ tokenPayload }) => {
  const [response, setResponse] = useState();

  const callb = useCallback(() => {
    if (tokenPayload) {
      console.log({ tokenPayload });
      call(tokenPayload.accessToken, process.env.TEST_API_CALL_ENDPOINT, 'GET').then(
        (resp) => (setResponse(resp.name), console.log(JSON.stringify(resp)))
      );
    }
  }, [tokenPayload]);

  const callb2 = useCallback(() => {
    if (tokenPayload) {
      console.log({ tokenPayload });
      call(tokenPayload.idToken, process.env.TEST_API_CALL_ENDPOINT, 'GET').then(
        (resp) => (setResponse(resp.name), console.log(JSON.stringify(resp)))
      );
    }
  }, [tokenPayload]);

  return (
    <div style={{ marginTop: 50 }}>
      <Button onClick={callb}>test accesstoken</Button>
      <Button onClick={callb2}>test idtoken</Button>
      <div dangerouslySetInnerHTML={{ __html: response }} />
      <div>test env var:: {process.env.TEST_IF_WORKS_ENV_VAR}</div>
    </div>
  );
};
