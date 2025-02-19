import {
  MenuPadlockIcon,
  MenuBillingIcon,
  MenuLearnIcon,
  MenuHouseIcon,
  MenuGettingStartedIcon,
  MenuTrackUsageIcon,
} from '../components/icons-library';

const menuData = [
  {
    path: '/home/',
    title: 'Home',
    icon: MenuHouseIcon,
  },
  {
    path: '/getting-started/',
    title: 'Get Started',
    icon: MenuGettingStartedIcon,
  },
  {
    path: '/manage-access/',
    title: 'Manage Access',
    icon: MenuPadlockIcon,
  },
  {
    path: '/usage/',
    title: 'Track Usage',
    icon: MenuTrackUsageIcon,
  },
  {
    path: '/manage-billing/',
    title: 'Manage Billing',
    icon: MenuBillingIcon,
  },
  {
    path: '/learn/',
    title: 'Learn',
    icon: MenuLearnIcon,
  },
];

export default menuData;
