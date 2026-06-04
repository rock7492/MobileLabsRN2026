import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const collectionName = 'users';

function validateOwnUid(uid) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Користувач не авторизований.');
  }

  if (currentUser.uid !== uid) {
    throw new Error('Доступ дозволено лише до власного профілю.');
  }
}

export async function createInitialUserProfile(user) {
  validateOwnUid(user.uid);

  const userRef = doc(db, collectionName, user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return;
  }

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    name: '',
    age: 0,
    city: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  validateOwnUid(uid);

  const userRef = doc(db, collectionName, uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function saveUserProfile(uid, profile) {
  validateOwnUid(uid);

  const normalizedName = profile.name.trim();
  const normalizedCity = profile.city.trim();
  const normalizedAge = String(profile.age).trim();

  if (normalizedName.length < 2) {
    throw new Error('Ім’я має містити мінімум 2 символи.');
  }

  const ageNumber = Number(normalizedAge);
  if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 120) {
    throw new Error('Вік має бути цілим числом від 1 до 120.');
  }

  if (normalizedCity.length < 2) {
    throw new Error('Місто має містити мінімум 2 символи.');
  }

  const userRef = doc(db, collectionName, uid);

  await setDoc(
    userRef,
    {
      uid,
      email: auth.currentUser.email,
      name: normalizedName,
      age: ageNumber,
      city: normalizedCity,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function deleteUserProfile(uid) {
  validateOwnUid(uid);

  const userRef = doc(db, collectionName, uid);
  await deleteDoc(userRef);
}
