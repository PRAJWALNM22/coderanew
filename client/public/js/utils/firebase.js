// Firebase configuration and initialization
class FirebaseUtils {
    constructor() {
        this.app = null;
        this.db = null;
        this.auth = null;
        this.isInitialized = false;
    }

    getFirebaseConfig() {
        return {
            apiKey: "AIzaSyCdl2AhZG9HBwDLcSENTroup0ryR7_NdW8",
            authDomain: "codera-battle.firebaseapp.com",
            projectId: "codera-battle",
            storageBucket: "codera-battle.firebasestorage.app",
            messagingSenderId: "825772579105",
            appId: "1:825772579105:web:583045e4bb94c7f9af0660",
            measurementId: "G-G10VGFQVBN"
        };
    }

    async initialize() {
        console.log('🔄 Starting Firebase initialization...');
        console.log('Firebase available:', !!window.firebase);
        
        try {
            const firebaseConfig = this.getFirebaseConfig();
            
            console.log('🔍 Firebase config check:');
            console.log('API Key present:', !!firebaseConfig.apiKey);
            console.log('Project ID:', firebaseConfig.projectId);
            console.log('Firebase global object:', !!window.firebase);
            
            // Check if Firebase config is provided
            if (firebaseConfig.apiKey && firebaseConfig.projectId && window.firebase) {
                console.log('Initializing Firebase for global communication (or reusing existing app)...');
                
                // Reuse existing app if already initialized elsewhere to avoid duplicate-app errors
                if (firebase.apps && firebase.apps.length > 0) {
                    this.app = firebase.app();
                } else {
                    this.app = firebase.initializeApp(firebaseConfig);
                }
                this.db = firebase.firestore();
                this.auth = firebase.auth();
                
                console.log('✅ Firebase app ready:', this.app.name);
                console.log('✅ Firestore initialized');
                console.log('✅ Auth initialized');
                
                this.isInitialized = true;
                return { app: this.app, db: this.db, auth: this.auth };
            } else {
                console.log('Firebase config not provided, authentication required');
                console.log('To enable authentication, add your Firebase config above.');
                
                // No authentication without Firebase
                return { app: null, db: null, auth: null };
            }
        } catch (error) {
            console.error("Error in Firebase initialization:", error);
            return { app: null, db: null, auth: null };
        }
    }

    setupAuthListener(callback) {
        if (this.auth) {
            return this.auth.onAuthStateChanged(callback);
        }
        return () => {}; // Return empty cleanup function
    }

    async signOut() {
        if (this.auth) {
            return await this.auth.signOut();
        }
    }

    async signInWithEmailAndPassword(email, password) {
        if (this.auth) {
            return await this.auth.signInWithEmailAndPassword(email, password);
        }
        throw new Error('Firebase auth not initialized');
    }

    async createUserWithEmailAndPassword(email, password) {
        if (this.auth) {
            return await this.auth.createUserWithEmailAndPassword(email, password);
        }
        throw new Error('Firebase auth not initialized');
    }

    async signInWithGoogle() {
        if (this.auth) {
            const provider = new firebase.auth.GoogleAuthProvider();
            return await this.auth.signInWithPopup(provider);
        }
        throw new Error('Firebase auth not initialized');
    }

    async signInAnonymously() {
        if (this.auth) {
            return await this.auth.signInAnonymously();
        }
        throw new Error('Firebase auth not initialized');
    }

    // User Management Functions
    async createUserProfile(uid, userData) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const normalizedUsername = (userData.username || 'User' + uid.substring(0, 6)).trim();

        const userProfile = {
            uid: uid,
            username: normalizedUsername,
            usernameLower: normalizedUsername.toLowerCase(),
            email: userData.email || '',
            displayName: userData.displayName || normalizedUsername || 'Anonymous',
            bio: userData.bio || 'New to competitive programming!',
            codingLevel: userData.codingLevel || 'Beginner',
            stats: {
                problemsSolved: 0,
                battlesWon: 0,
                battlesTotal: 0,
                currentStreak: 0,
                maxStreak: 0,
                totalScore: 0
            },
            badges: ['First Join'],
            friends: [],
            friendRequests: {
                sent: [],
                received: []
            },
            createdAt: new Date(),
            lastActive: new Date(),
            isOnline: true
        };

        await this.db.collection('users').doc(uid).set(userProfile);
        console.log('✅ User profile created successfully');
        return userProfile;
    }

    async getUserProfile(uid) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const doc = await this.db.collection('users').doc(uid).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    }

    async updateUserProfile(uid, updates) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const updateData = {
            ...updates,
            lastActive: new Date()
        };
        
        await this.db.collection('users').doc(uid).update(updateData);
        console.log('✅ User profile updated successfully');
    }

    async updateUserStats(uid, statsUpdate) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const userRef = this.db.collection('users').doc(uid);
        
        return this.db.runTransaction(async (transaction) => {
            const doc = await transaction.get(userRef);
            if (!doc.exists) {
                throw new Error('User document does not exist');
            }
            
            const currentStats = doc.data().stats || {};
            const newStats = {
                problemsSolved: (currentStats.problemsSolved || 0) + (statsUpdate.problemsSolved || 0),
                battlesWon: (currentStats.battlesWon || 0) + (statsUpdate.battlesWon || 0),
                battlesTotal: (currentStats.battlesTotal || 0) + (statsUpdate.battlesTotal || 0),
                totalScore: (currentStats.totalScore || 0) + (statsUpdate.scoreChange || 0),
                currentStreak: statsUpdate.currentStreak !== undefined ? statsUpdate.currentStreak : currentStats.currentStreak || 0,
                maxStreak: Math.max((currentStats.maxStreak || 0), (statsUpdate.currentStreak || currentStats.currentStreak || 0))
            };
            
            transaction.update(userRef, { 
                stats: newStats,
                lastActive: new Date()
            });
        });
    }

    async getAllUsers(limit = 50) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const snapshot = await this.db.collection('users')
            .orderBy('lastActive', 'desc')
            .limit(limit)
            .get();
        
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async searchUsersByUsername(username, limit = 20) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }

        const term = (username || '').trim().toLowerCase();
        if (!term) {
            return [];
        }

        // Prefix, case-insensitive search via usernameLower
        // Matches usernames that START with the given term (e.g. "cod" → "coder1", "codera")
        const snapshot = await this.db.collection('users')
            .where('usernameLower', '>=', term)
            .where('usernameLower', '<=', term + '\uf8ff')
            .limit(limit)
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getLeaderboard(orderBy = 'totalScore', limit = 10) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const snapshot = await this.db.collection('users')
            .orderBy(`stats.${orderBy}`, 'desc')
            .limit(limit)
            .get();
        
        return snapshot.docs.map((doc, index) => ({ 
            id: doc.id, 
            rank: index + 1,
            ...doc.data() 
        }));
    }

    async sendFriendRequest(fromUid, toUid) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const batch = this.db.batch();
        
        // Add to sender's sent requests
        const senderRef = this.db.collection('users').doc(fromUid);
        batch.update(senderRef, {
            'friendRequests.sent': firebase.firestore.FieldValue.arrayUnion(toUid),
            lastActive: new Date()
        });
        
        // Add to receiver's received requests
        const receiverRef = this.db.collection('users').doc(toUid);
        batch.update(receiverRef, {
            'friendRequests.received': firebase.firestore.FieldValue.arrayUnion(fromUid),
            lastActive: new Date()
        });
        
        await batch.commit();
        console.log('✅ Friend request sent successfully');
    }

    async acceptFriendRequest(currentUid, requesterUid) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const batch = this.db.batch();
        
        // Add each other as friends
        const currentUserRef = this.db.collection('users').doc(currentUid);
        batch.update(currentUserRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(requesterUid),
            'friendRequests.received': firebase.firestore.FieldValue.arrayRemove(requesterUid),
            lastActive: new Date()
        });
        
        const requesterRef = this.db.collection('users').doc(requesterUid);
        batch.update(requesterRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(currentUid),
            'friendRequests.sent': firebase.firestore.FieldValue.arrayRemove(currentUid),
            lastActive: new Date()
        });
        
        await batch.commit();
        console.log('✅ Friend request accepted successfully');
    }

    async declineFriendRequest(currentUid, requesterUid) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const batch = this.db.batch();
        
        // Remove from both users' request lists
        const currentUserRef = this.db.collection('users').doc(currentUid);
        batch.update(currentUserRef, {
            'friendRequests.received': firebase.firestore.FieldValue.arrayRemove(requesterUid),
            lastActive: new Date()
        });
        
        const requesterRef = this.db.collection('users').doc(requesterUid);
        batch.update(requesterRef, {
            'friendRequests.sent': firebase.firestore.FieldValue.arrayRemove(currentUid),
            lastActive: new Date()
        });
        
        await batch.commit();
        console.log('✅ Friend request declined successfully');
    }

    async getUserFriends(uid) {
        if (!this.db) {
            throw new Error('Firestore not initialized');
        }
        
        const userDoc = await this.db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return [];
        }
        
        const friendUids = userDoc.data().friends || [];
        if (friendUids.length === 0) {
            return [];
        }
        
        // Get friend profiles
        const friendPromises = friendUids.map(friendUid => 
            this.db.collection('users').doc(friendUid).get()
        );
        
        const friendDocs = await Promise.all(friendPromises);
        return friendDocs
            .filter(doc => doc.exists)
            .map(doc => ({ id: doc.id, ...doc.data() }));
    }
}

// Create global instance
window.firebaseUtils = new FirebaseUtils();
