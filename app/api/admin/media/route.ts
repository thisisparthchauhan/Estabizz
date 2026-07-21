import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requirePermission } from '@/lib/admin/requirePermission';
import MediaAsset from '@/lib/models/MediaAsset';

// ── GET /api/admin/media — list media assets ───────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const params = req.nextUrl.searchParams;
  const search  = params.get('search')?.trim() ?? '';
  const type    = params.get('type') ?? 'all';   // all | image | icon | pdf | other
  const page    = Math.max(1, Number(params.get('page')  ?? 1));
  const limit   = Math.min(48, Math.max(1, Number(params.get('limit') ?? 24)));

  try {
    await connectDB();

    const query: Record<string, unknown> = { status: 'active' };

    if (type === 'image') {
      query.format = { $in: ['jpg', 'jpeg', 'png', 'webp'] };
    } else if (type === 'icon') {
      query.format = 'svg';
    } else if (type === 'pdf') {
      query.format = 'pdf';
    } else if (type === 'other') {
      query.format = { $nin: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg'] };
    }

    if (search) {
      query.$or = [
        { title:    { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } },
        { altText:  { $regex: search, $options: 'i' } },
        { caption:  { $regex: search, $options: 'i' } },
        { tags:     { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      MediaAsset.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      MediaAsset.countDocuments(query),
    ]);

    return NextResponse.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('[admin/media] GET error:', err);
    return NextResponse.json({ error: 'Unable to load media.' }, { status: 500 });
  }
}

// ── POST /api/admin/media — save a media record after Cloudinary upload ────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_media');
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json() as Record<string, unknown>;
    const { publicId, secureUrl, url, resourceType, format, bytes,
            width, height, originalFilename, mimeType,
            title, altText, caption, tags } = body;

    if (!publicId || !secureUrl) {
      return NextResponse.json({ error: 'Upload data is incomplete.' }, { status: 400 });
    }

    // Only accept Cloudinary-hosted URLs — prevents recording of arbitrary external images
    if (!String(secureUrl).startsWith('https://res.cloudinary.com/')) {
      return NextResponse.json({ error: 'Upload data is incomplete.' }, { status: 400 });
    }

    const safeFormat  = String(format ?? '').toLowerCase();
    const safeFile    = String(originalFilename ?? '');
    const safeTitle   = String(title ?? safeFile ?? '').trim() || safeFile;

    await connectDB();

    const asset = await MediaAsset.create({
      title:          safeTitle,
      fileName:       safeFile,
      url:            String(url ?? secureUrl),
      secureUrl:      String(secureUrl),
      publicId:       String(publicId),
      resourceType:   String(resourceType ?? 'image'),
      format:         safeFormat,
      mimeType:       String(mimeType ?? ''),
      size:           Number(bytes ?? 0),
      width:          width  != null ? Number(width)  : undefined,
      height:         height != null ? Number(height) : undefined,
      altText:        String(altText  ?? ''),
      caption:        String(caption  ?? ''),
      tags:           Array.isArray(tags) ? (tags as unknown[]).map(String) : [],
      folder:         '',
      uploadedBy:     auth.admin.email,
      uploadedByRole: auth.admin.role,
      usedIn:         [],
      status:         'active',
    });

    return NextResponse.json({ success: true, asset });
  } catch (err) {
    console.error('[admin/media] POST error:', err);
    return NextResponse.json({ error: 'Unable to save media record.' }, { status: 500 });
  }
}
