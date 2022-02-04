import {
  DocumentationIcon,
  GettingStartedIcon,
  SubscribeIcon,
  TranscribeIcon,
  RecentJobsIcon,
  UsageIcon,
  AccessTokenIcon,
} from '../components/Icons';

const menuData = [
  {
    path: '/home/',
    title: 'Home',
    icon: GettingStartedIcon,
  },
  {
    path: '/access-token/',
    title: 'Access Token',
    icon: AccessTokenIcon,
  },
  {
    path: '/subscriptions/',
    title: 'Billing',
    icon: SubscribeIcon,
  },
  {
    path: '/usage/',
    title: 'Usage',
    icon: UsageIcon,
  },
  {
    path: '/resources/',
    title: 'Resources',
    icon: DocumentationIcon,
  },
];

export default menuData;
