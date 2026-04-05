import { getFirebaseAdmin } from '../firebase';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    password: string;
    role: 'user' | 'admin';
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
}

export type UserPublic = Omit<IUser, 'password'>;

function usersCollection() {
    return getFirebaseAdmin().collection('users');
}

export async function createUser(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const now = new Date().toISOString();
    const docRef = await usersCollection().add({
        ...data,
        createdAt: now,
        updatedAt: now,
    });
    return { id: docRef.id, ...data, createdAt: now, updatedAt: now };
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
    const snapshot = await usersCollection()
        .where('email', '==', email.toLowerCase())
        .limit(1)
        .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as IUser;
}

export async function findUserByEmailOrMobile(identifier: string): Promise<IUser | null> {
    // Try email first
    let user = await findUserByEmail(identifier);
    if (user) return user;

    // Try mobile
    const snapshot = await usersCollection()
        .where('mobile', '==', identifier)
        .limit(1)
        .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as IUser;
}

export async function findUserById(id: string): Promise<IUser | null> {
    const doc = await usersCollection().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as IUser;
}

export async function updateUser(id: string, data: Partial<IUser>): Promise<void> {
    await usersCollection().doc(id).update({
        ...data,
        updatedAt: new Date().toISOString(),
    });
}
