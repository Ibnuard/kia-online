import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const adminsCollection = firestore().collection('Admins');
export const imunisasiCollection = firestore().collection('Imunisasi');
export const historyCollection = firestore().collection('History');

export const isDBPathExist = async path => {
  try {
    const isExist = (await firestore().doc(path).get()).exists;

    return isExist;
  } catch (error) {
    throw error;
  }
};

export const addToDB = (path, data) => {
  try {
    return firestore().doc(path).set(data);
  } catch (error) {
    throw error;
  }
};

export const getDBdata = async (path, useChildPath) => {
  try {
    if (useChildPath) {
      const data = await firestore().doc(path);

      return data;
    }

    const data = await firestore().doc(path).get();

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateDB = (path, data) => {
  try {
    return firestore().doc(path).update(data);
  } catch (error) {
    throw error;
  }
};

export const checkImunisasiStatus = async (id, userId) => {
  try {
    const status = (
      await imunisasiCollection
        .doc(id)
        .collection('Registered')
        .doc(userId)
        .get()
    ).exists;

    console.log(`STATUS ${userId} -> ` + status);

    return status;
  } catch (error) {
    throw error;
  }
};

export const getChildList = async (userId, childCb) => {
  try {
    await usersCollection
      .doc(userId)
      .collection('childs')
      .onSnapshot(snap => {
        let temp = [];
        snap.forEach(doc => {
          temp.push({...doc.data(), id: doc.id});
        });

        childCb(temp);
      });
  } catch (error) {
    throw error;
  }
};

export const imunisasiDone = async (imunisasiId, userId) => {
  try {
    const data = await imunisasiCollection
      .doc(imunisasiId)
      .collection('Registered')
      .doc(userId)
      .get();
    const getData = await data.data();

    if (getData.imunisasiStatus == 'DONE') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const getAdminsFCM = async cb => {
  try {
    await adminsCollection.onSnapshot(snap => {
      let temp = [];
      snap.forEach(doc => {
        const data = doc.data();
        temp.push(data?.fcmToken || '');
      });

      cb(temp);
    });
  } catch (error) {
    console.log(error);
  }
};
