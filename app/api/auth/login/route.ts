import importDbUsers from '@/database/importDbUsers';
import { NextRequest, NextResponse } from 'next/server';


// export const runtime = 'nodejs'; // jer koristi Node API-je

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await importDbUsers(body);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
