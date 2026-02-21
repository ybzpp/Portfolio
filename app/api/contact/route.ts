import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DEV_SKIP_TELEGRAM = process.env.DEV_SKIP_TELEGRAM === '1';

export async function POST(request: NextRequest) {
  const hasTelegram = !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);

  if (!hasTelegram && !DEV_SKIP_TELEGRAM) {
    return NextResponse.json(
      { error: 'telegram_not_configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, contact, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: 'validation_error' },
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

    if (hasTelegram) {
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
        const errText = await res.text();
        let errJson: { description?: string } = {};
        try {
          errJson = JSON.parse(errText);
        } catch {
          // ignore
        }
        console.error('Telegram API error:', res.status, errText);
        return NextResponse.json(
          { error: 'telegram_send_failed', detail: errJson.description ?? errText.slice(0, 100) },
          { status: 502 }
        );
      }
    } else {
      // DEV_SKIP_TELEGRAM: log and succeed so form works locally
      console.log('[DEV] Contact form (Telegram skipped):', { name, contact, message: message.slice(0, 80) + (message.length > 80 ? '…' : '') });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { error: 'server_error' },
      { status: 500 }
    );
  }
}
