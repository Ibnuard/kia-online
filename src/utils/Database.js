import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

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

export const getDBdata = async path => {
  try {
    const data = await firestore().doc(path).get();

    return data;
  } catch (error) {
    throw error;
  }
};
