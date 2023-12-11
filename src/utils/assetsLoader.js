const path = '../../assets/images/';

export const ASSETS = {
  hero: require(path + 'hero.png'),
  hero2: require(path + 'hero2.png'),
  logo: require(path + 'logo.png'),
  promo: require(path + 'promo.png'),
  navigator: {
    home: [require(path + 'home.png'), require(path + 'homeOff.png')],
    imun: [require(path + 'imun.png'), require(path + 'imunOff.png')],
    history: [require(path + 'history.png'), require(path + 'historyOff.png')],
    akun: [require(path + 'profile.png'), require(path + 'profileOff.png')],
  },
};
