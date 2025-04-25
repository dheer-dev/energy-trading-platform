import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuvFXPrpESsJJYU3ZTl-cDmxIAIRgTQpY",
  authDomain: "energytradingplatform-b455b.firebaseapp.com",
  projectId: "energytradingplatform-b455b",
  storageBucket: "energytradingplatform-b455b.firebasestorage.app",
  messagingSenderId: "538641293241",
  appId: "1:538641293241:web:9b614f69947e1099afa068",
  measurementId: "G-VTWSP5N5CG"
};

const app = initializeApp(firebaseConfig);

// Authentication exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore exports
export const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export const energyListingsRef = collection(db, 'energyListings');
export const bidsRef = collection(db, 'bids');

// Enhanced Auth Functions
export const signUpWithEmail = async (email, password, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Store additional user data in Firestore
    await addDoc(usersRef, {
      uid: userCredential.user.uid,
      email,
      userType, // 'buyer' or 'seller'
      createdAt: new Date()
    });
    return userCredential;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Trading Functions
export const createEnergyListing = async (sellerId, amount, pricePerKWh) => {
  try {
    const docRef = await addDoc(energyListingsRef, {
      sellerId,
      amount,
      pricePerKWh,
      status: 'active',
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

export const getActiveListings = async () => {
  try {
    const q = query(energyListingsRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting listings:", error);
    throw error;
  }
};

export const placeBid = async (listingId, buyerId, bidAmount) => {
  try {
    await addDoc(bidsRef, {
      listingId,
      buyerId,
      bidAmount,
      status: 'pending',
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
};

// Google Sign-In (updated with user type handling)
export const signInWithGoogle = async (userType) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Store user type in Firestore
    await addDoc(usersRef, {
      uid: result.user.uid,
      email: result.user.email,
      userType,
      createdAt: new Date()
    });
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};