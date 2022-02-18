import AvatarImg from 'assets/images/avatar.png';

export const user = {
  personal: {
    avatar: AvatarImg,
    fullName: 'Bruce Wayne',
    designation: 'Facility Manager',
    phone: '+31 53088054820',
  },
  account: {
    email: 'brucewayne@astralifts.com',
    password: 'complicated_password',
  },
  locale: {
    language: 'English',
    timezone: 'Europe/Amsterdam AMS (GMT + 01:00)',
  },
  dateFormat: {
    selected: 'dd MM yyyy',
    available: [
      {format: 'mm/dd/yyyy', example: '07/31/2022'},
      {format: 'dd/mm/yyyy', example: '31/07/2022'},
      {format: 'dd MM yyyy', example: '31 Jul 2022'},
    ],
  },
};
