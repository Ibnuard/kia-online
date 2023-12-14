const path = '../../assets/images/';

export const ASSETS = {
  logo: require(path + 'logo.png'),
  promo: require(path + 'promo.png'),
  navigator: {
    home: [require(path + 'home.png'), require(path + 'homeOff.png')],
    imun: [require(path + 'imun.png'), require(path + 'imunOff.png')],
    history: [require(path + 'history.png'), require(path + 'historyOff.png')],
    akun: [require(path + 'profile.png'), require(path + 'profileOff.png')],
  },
  mode: {
    user: require(path + 'modeUser.png'),
    admin: require(path + 'modeAdmin.png'),
  },
  hero: {
    admin: [
      require(path + 'heroAdminLogin.png'),
      require(path + 'heroAdminRegister.png'),
    ],
    user: [
      require(path + 'heroUserLogin.png'),
      require(path + 'heroUserRegister.png'),
    ],
  },
};
