import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'form_disabled' },
    { status: 403 }
  );
}
