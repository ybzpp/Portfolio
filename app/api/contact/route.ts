import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json(
      { error: 'Telegram not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, contact, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: 'Name, contact and message are required' },
        { status: 400 }
      );
    }

    const text = [
      '📩 Новая заявка с сайта',
      '',
      `Имя: ${name}`,
      `Контакты: ${contact}`,
      'Сообщение:',
      message,
    ].join('\n');

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram API error:', err);
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
