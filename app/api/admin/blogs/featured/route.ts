import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: [],
            blogs: [],
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Unable to fetch featured blogs",
                data: [],
                blogs: [],
            },
            { status: 500 }
        );
    }
}
