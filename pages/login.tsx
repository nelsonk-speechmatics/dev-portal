import { SpeechmaticsLogo } from '../components/icons-library';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, Spinner } from '@chakra-ui/react';
import accountStoreContext from '../utils/account-store-context';
import { RedirectRequest } from '@azure/msal-browser';

export default function Login() {
  const router = useRouter();

  const { instance, accounts, inProgress } = useMsal();
  const { tokenStore } = useContext(accountStoreContext);

  let authority = process.env.SIGNIN_POLICY;

  tokenStore.authorityToUse = authority;

  const loginRequest = {
    scopes: [],
    authority,
    redirectUri: process.env.REDIRECT_URI,

  } as RedirectRequest;

  const loginHandler = () => {
    instance.loginRedirect(loginRequest).catch((error) => {
      console.log(error);
    });
  };

  const inclErr = useMemo(() => (decodeURI(global.window?.location.hash).includes('AADB2C90118')), []);
  const postPassChange = useMemo(() => (decodeURI(global.window?.location.hash).includes('postPasswordChange')), []);

  console.log('global.window?.location.hash', global.window?.location.hash);

  if (postPassChange) {
    tokenStore.authorityToUse = process.env.RESET_PASSWORD_POLICY;
  }

  useEffect(() => {
    let st: number;

    if (inProgress == 'none' && accounts.length > 0 && authority == process.env.SIGNIN_POLICY) {
      st = window.setTimeout(() => router.push('/home/'), 1000);
    }

    console.log('postPassChange', postPassChange, 'inclErr', inclErr, 'inProgress', inProgress)

    if (inclErr && inProgress == 'none') {
      tokenStore.authorityToUse = loginRequest.authority = process.env.RESET_PASSWORD_POLICY;
      loginRequest.redirectUri = process.env.REDIRECT_URI;
      loginRequest.state = 'postPasswordChange'
      loginHandler();
    }

    return () => window.clearTimeout(st);
  }, [inProgress, accounts, accounts?.length]);



  const x = new URLSearchParams(global.window?.location.search)
  const loggedOutInfo = x.get('inactive') == 'true' ? <div>You were logged out due to an expired session.</div> : null;


  const LoginSub = () => {
    if (inProgress == 'startup' || inProgress == 'handleRedirect' || (accounts.length > 0 && inProgress === 'none')) {
      return <div className="login_text"><Spinner /></div>;
    } else if (inProgress == 'login') {
      return <div className="login_text"><Spinner /></div>;
    } else if (inProgress == 'none' && accounts.length == 0) {
      return (
        <div className="login_form">
          {loggedOutInfo}
          <Button variant="speechmatics" onClick={loginHandler}>
            Log in ➔
          </Button>
        </div>
      );
    } else return <></>;
  };


  return (
    <div className="login_container">
      <SpeechmaticsLogo />
      <LoginSub />
    </div>
  );
}
