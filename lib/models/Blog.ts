import { getFirebaseAdmin } from '../firebase';

export interface IBlog {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    images: string[];
    category: string;
    tags: string[];
    authorId: string;
    author?: {
        firstName: string;
        lastName: string;
        profileImage?: string;
        email?: string;
    };
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'hidden';
    rejectionReason?: string;
    featured: boolean;
    featuredOrder?: number;
    likes: string[];
    likeCount: number;
    views: number;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

function blogsCollection() {
    return getFirebaseAdmin().collection('blogs');
}

export async function createBlog(
    data: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likeCount' | 'views' | 'featured'>
): Promise<IBlog> {
    const now = new Date().toISOString();
    const cleanData: Record<string, unknown> = {
        likes: [],
        likeCount: 0,
        views: 0,
        featured: false,
        createdAt: now,
        updatedAt: now,
    };
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) cleanData[key] = value;
    }
    const blogData = cleanData as IBlog & Record<string, unknown>;
    const docRef = await blogsCollection().add(blogData);
    return { ...blogData, id: docRef.id } as IBlog;
}

export async function findBlogBySlug(slug: string): Promise<IBlog | null> {
    const snapshot = await blogsCollection()
        .where('slug', '==', slug)
        .limit(1)
        .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as IBlog;
}

export async function findBlogById(id: string): Promise<IBlog | null> {
    const doc = await blogsCollection().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as IBlog;
}

export async function updateBlog(id: string, data: Partial<IBlog>): Promise<void> {
    await blogsCollection().doc(id).update({
        ...data,
        updatedAt: new Date().toISOString(),
    });
}

export async function deleteBlog(id: string): Promise<void> {
    await blogsCollection().doc(id).delete();
}

export async function listBlogs(options: {
    status?: string;
    category?: string;
    tag?: string;
    authorId?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
}): Promise<{ blogs: IBlog[]; total: number }> {
    const { status, category, authorId, page = 1, limit = 12 } = options;

    let query: FirebaseFirestore.Query = blogsCollection();

    if (status) query = query.where('status', '==', status);
    if (category) query = query.where('category', '==', category);
    if (authorId) query = query.where('authorId', '==', authorId);

    query = query.orderBy('createdAt', 'desc');

    // Get total count
    const countSnapshot = await query.count().get();
    const total = countSnapshot.data().count;

    // Get paginated results
    const offset = (page - 1) * limit;
    const snapshot = await query.offset(offset).limit(limit).get();

    const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as IBlog[];

    return { blogs, total };
}

export async function getFeaturedBlogs(): Promise<IBlog[]> {
    const snapshot = await blogsCollection()
        .where('featured', '==', true)
        .where('status', '==', 'published')
        .orderBy('featuredOrder', 'asc')
        .limit(4)
        .get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as IBlog[];
}

export async function clearAllFeatured(): Promise<void> {
    const snapshot = await blogsCollection()
        .where('featured', '==', true)
        .get();

    const batch = getFirebaseAdmin().batch();
    snapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { featured: false, featuredOrder: null });
    });
    await batch.commit();
}

export async function getStatusCounts(): Promise<Record<string, number>> {
    const statuses = ['pending', 'published', 'rejected', 'hidden'];
    const counts: Record<string, number> = {};

    for (const status of statuses) {
        const snapshot = await blogsCollection()
            .where('status', '==', status)
            .count()
            .get();
        counts[status] = snapshot.data().count;
    }

    return counts;
}
