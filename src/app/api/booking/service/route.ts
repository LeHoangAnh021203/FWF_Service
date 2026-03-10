import { NextResponse } from "next/server";

type BookingPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  note?: string;
  branchName?: string;
  branchCity?: string;
};

function sanitize(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;
    const fullName = sanitize(body.fullName);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email);
    const note = sanitize(body.note);
    const branchName = sanitize(body.branchName);
    const branchCity = sanitize(body.branchCity);

    if (!fullName) {
      return NextResponse.json(
        { error: "Thiếu họ và tên." },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Thiếu số điện thoại." },
        { status: 400 },
      );
    }

    if (!branchName) {
      return NextResponse.json(
        { error: "Thiếu thông tin chi nhánh." },
        { status: 400 },
      );
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { error: "Chưa cấu hình GOOGLE_APPS_SCRIPT_WEB_APP_URL." },
        { status: 500 },
      );
    }

    const token = process.env.GOOGLE_APPS_SCRIPT_TOKEN ?? "";
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        sheetName: "Trang dịch vụ",
        submittedAt: new Date().toISOString(),
        data: {
          fullName,
          phone,
          email,
          note,
          branchName,
          branchCity,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const responseText = await response.text();
      return NextResponse.json(
        {
          error: `Không ghi được dữ liệu vào Google Sheet. Mã lỗi: ${response.status}.`,
          detail: responseText,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 },
    );
  }
}
