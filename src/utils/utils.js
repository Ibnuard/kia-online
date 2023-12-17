import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
moment.locale('id');

//create simple log
export const cLog = (log = '', color) => {
  const _selectColor = () => {
    switch (color) {
      case 'red':
        return '\x1B[31m';
        break;
      case 'blue':
        return '\x1B[34m';
        break;
      default:
        return '';
        break;
    }
  };
  console.log(`${_selectColor()}${log}`);
};

//callback to avoid re-render
export const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function selisihHari(date) {
  // Membuat objek Moment dari tanggal yang diberikan
  const tanggalDiberikan = moment(date);

  // Mendapatkan tanggal saat ini
  const tanggalSekarang = moment();

  const startOfDate = tanggalDiberikan.startOf('day');
  const startOfNow = tanggalSekarang.startOf('day');

  // Menghitung selisih dalam hari
  const selisihHari = startOfDate.diff(startOfNow, 'days');

  return selisihHari;
}

export function hitungUmur(tanggalLahir) {
  // Membuat objek Moment dari tanggal lahir
  const tanggalLahirMoment = moment(tanggalLahir);

  // Mendapatkan tanggal saat ini
  const tanggalSekarang = moment();

  // Menghitung selisih tahun antara tanggal lahir dan tanggal saat ini
  const umur = tanggalSekarang.diff(tanggalLahirMoment, 'years');

  return umur;
}

export function mergeDataBySameId(data) {
  const groupedById = data.reduce((acc, current) => {
    const existing = acc.find(item => item.id === current.id);

    if (!existing) {
      acc.push(current);
    } else {
      // Gabungkan propertinya jika id sudah ada
      Object.assign(existing, current);
    }

    return acc;
  }, []);

  return groupedById;
}

export const isPhoneValid = (phone = '') => {
  return String(phone).startsWith('62');
};

// send notif
export const sendNotification = async (token, title, desc) => {
  try {
    const send = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization:
          'key=AAAAc68a5LM:APA91bENLrUOJWT0X8KPDG7oslJkw10m4jNJLtQqV5y-Jng6rG59JqS8DJ5NJiVTU_C0UG4STsgM2zZrc7JcK7ZBx_OiG_ms81H1BoaaMoRB584GH9KkpaozuD_-qLsm_mdunPk4jen7',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration_ids: token,
        notification: {
          title: title,
          body: desc,
          image: '',
        },
        data: {},
      }),
    });

    const sendJson = await send.json();

    console.log('SUKSES');

    console.log(sendJson);
  } catch (error) {
    //throw error;
    console.log(error);
  }
};
