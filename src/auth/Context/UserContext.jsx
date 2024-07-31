import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [savedItems, setSavedItems] = useState([]);
    const [favoriteCounts, setFavoriteCounts] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    setUser({ name: currentUser.displayName, photoURL: currentUser.photoURL });
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setSavedItems(userDoc.data().savedItems || []);
                    } else {
                        await setDoc(userDocRef, { savedItems: [] });
                    }
                } else {
                    setUser(null);
                    setSavedItems([]);
                }
            } catch (error) {
                console.error("Error in auth state change: ", error);
            }
        });
        return () => unsubscribe(); // Ensure the listener is unsubscribed on component unmount
    }, []);

    useEffect(() => {
        const fetchFavoriteCounts = async () => {
            try {
                const countsDocRef = doc(db, 'favoriteCounts', 'global');
                const countsDoc = await getDoc(countsDocRef);
                if (countsDoc.exists()) {
                    setFavoriteCounts(countsDoc.data());
                } else {
                    await setDoc(countsDocRef, {});
                    setFavoriteCounts({});
                }
            } catch (error) {
                console.error("Error fetching favorite counts: ", error);
            }
        };
        fetchFavoriteCounts();
    }, []);

    const saveItem = async (item) => {
        if (user) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    savedItems: arrayUnion(item)
                });
                setSavedItems(prevItems => [...prevItems, item]);
            } catch (error) {
                console.error("Error saving item: ", error);
            }
        }
    };

    const removeItem = async (itemId) => {
        if (user) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userDoc = await getDoc(userRef);
                const updatedItems = userDoc.data().savedItems.filter(item => item.id !== itemId);
                await updateDoc(userRef, {
                    savedItems: updatedItems
                });
                setSavedItems(updatedItems);
            } catch (error) {
                console.error("Error removing item: ", error);
            }
        }
    };

    const incrementFavoriteCount = async (category, itemId) => {
        try {
            const countsDocRef = doc(db, 'favoriteCounts', 'global');
            const countsDoc = await getDoc(countsDocRef);
            const counts = countsDoc.data();
            if (!counts[category]) {
                counts[category] = {};
            }
            counts[category][itemId] = (counts[category][itemId] || 0) + 1;
            await updateDoc(countsDocRef, counts);
            setFavoriteCounts(counts);
        } catch (error) {
            console.error("Error incrementing favorite count: ", error);
        }
    };

    const decrementFavoriteCount = async (category, itemId) => {
        try {
            const countsDocRef = doc(db, 'favoriteCounts', 'global');
            const countsDoc = await getDoc(countsDocRef);
            const counts = countsDoc.data();
            if (counts[category] && counts[category][itemId]) {
                counts[category][itemId] = Math.max(0, counts[category][itemId] - 1);
                await updateDoc(countsDocRef, counts);
                setFavoriteCounts(counts);
            }
        } catch (error) {
            console.error("Error decrementing favorite count: ", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, savedItems, saveItem, removeItem, favoriteCounts, incrementFavoriteCount, decrementFavoriteCount }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
