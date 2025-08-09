// app/api/delete-file/route.ts

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const session = await auth();
if (!session) {
  console.error("Unauthorized request to delete file.");
  return false;
}
  try {
    const { fileRoute } = await req.json();

    const url = `https://api.imagekit.io/v1/${fileRoute}`;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
    const base64Auth = Buffer.from(privateKey + ":").toString("base64");
console.log("Deleting file with route:", base64Auth, url);
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64Auth}`
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
       if (!response.ok) {
        console.error("Failed to delete file:", data);
      return NextResponse.json({ success: false, error: data.error }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
