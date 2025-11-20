// Simple Firebase helper for the main app
class SimpleFirebase {
    constructor() {
        this.db = null;
        this.auth = null;
    }

    init(db, auth) {
        this.db = db;
        this.auth = auth;
        console.log('✅ SimpleFirebase initialized');
    }

    async getAllUsers(limit = 20) {
        if (!this.db) throw new Error('Database not initialized');
        
        const snapshot = await this.db.collection('users')
            .orderBy('stats.totalScore', 'desc')
            .limit(limit)
            .get();
        
        return snapshot.docs.map((doc, index) => ({
            id: doc.id,
            rank: index + 1,
            ...doc.data()
        }));
    }

    async getUserProfile(uid) {
        if (!this.db) throw new Error('Database not initialized');
        
        const doc = await this.db.collection('users').doc(uid).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    }

    async createUserProfile(uid, userData) {
        if (!this.db) throw new Error('Database not initialized');
        
        const userProfile = {
            uid: uid,
            username: userData.username || 'User' + uid.substring(0, 6),
            email: userData.email || '',
            displayName: userData.displayName || userData.username || 'Anonymous',
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
            friendRequests: { sent: [], received: [] },
            createdAt: new Date(),
            lastActive: new Date(),
            isOnline: true
        };

        await this.db.collection('users').doc(uid).set(userProfile);
        console.log('✅ User profile created');
        return userProfile;
    }

    async updateUserProfile(uid, updates) {
        if (!this.db) throw new Error('Database not initialized');
        
        await this.db.collection('users').doc(uid).update({
            ...updates,
            lastActive: new Date()
        });
        console.log('✅ User profile updated');
    }

    async sendFriendRequest(fromUid, toUid) {
        if (!this.db) throw new Error('Database not initialized');
        
        const batch = this.db.batch();
        
        const fromRef = this.db.collection('users').doc(fromUid);
        batch.update(fromRef, {
            'friendRequests.sent': firebase.firestore.FieldValue.arrayUnion(toUid)
        });
        
        const toRef = this.db.collection('users').doc(toUid);
        batch.update(toRef, {
            'friendRequests.received': firebase.firestore.FieldValue.arrayUnion(fromUid)
        });
        
        await batch.commit();
        console.log('✅ Friend request sent');
    }

    async acceptFriendRequest(currentUid, requesterUid) {
        if (!this.db) throw new Error('Database not initialized');
        
        const batch = this.db.batch();
        
        const currentRef = this.db.collection('users').doc(currentUid);
        batch.update(currentRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(requesterUid),
            'friendRequests.received': firebase.firestore.FieldValue.arrayRemove(requesterUid)
        });
        
        const requesterRef = this.db.collection('users').doc(requesterUid);
        batch.update(requesterRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(currentUid),
            'friendRequests.sent': firebase.firestore.FieldValue.arrayRemove(currentUid)
        });
        
        await batch.commit();
        console.log('✅ Friend request accepted');
    }

    async getUserFriends(uid) {
        if (!this.db) throw new Error('Database not initialized');
        
        const userDoc = await this.db.collection('users').doc(uid).get();
        if (!userDoc.exists) return [];
        
        const friendUids = userDoc.data().friends || [];
        if (friendUids.length === 0) return [];
        
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
window.simpleFirebase = new SimpleFirebase();