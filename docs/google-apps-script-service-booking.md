# Google Apps Script cho form "Trang dịch vụ"

## 1) Tạo Apps Script
1. Mở Google Sheet của bạn.
2. Chọn `Tiện ích` -> `Apps Script`.
3. Xóa code mặc định và dán code bên dưới vào file `Code.gs`.

```javascript
const REQUIRED_SHEET_NAME = "Trang dịch vụ";

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var token = body.token || "";
    var expectedToken = PropertiesService.getScriptProperties().getProperty("BOOKING_TOKEN") || "";

    if (expectedToken && token !== expectedToken) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = body.sheetName || REQUIRED_SHEET_NAME;
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    ensureHeader(sheet);

    var data = body.data || {};
    var submittedAt = body.submittedAt || new Date().toISOString();

    sheet.appendRow([
      submittedAt,
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.note || "",
      data.branchName || "",
      data.branchCity || "",
    ]);

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    return jsonResponse(
      { ok: false, error: err && err.message ? err.message : "Unknown error" },
      500
    );
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "submitted_at",
    "full_name",
    "phone",
    "email",
    "note",
    "branch_name",
    "branch_city",
  ]);
}

function jsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 2) Set Script Property (token bảo mật)
1. Trong Apps Script: `Project Settings` -> `Script properties`.
2. Thêm key `BOOKING_TOKEN` với giá trị bí mật (ví dụ: `fwf_service_2026_secret`).

## 3) Deploy Web App
1. Chọn `Deploy` -> `New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy và copy URL Web App.

## 4) Cấu hình ở Next.js
1. Tạo file `.env.local` từ `.env.example`.
2. Điền:

```bash
GOOGLE_APPS_SCRIPT_WEB_APP_URL=<WEB_APP_URL>
GOOGLE_APPS_SCRIPT_TOKEN=<BOOKING_TOKEN>
```

3. Restart server `npm run dev`.

## 5) Kiểm tra
1. Mở trang dịch vụ, điền form, bấm `Đặt lịch ngay - Miễn phí tư vấn`.
2. Mở tab `Trang dịch vụ` trong Google Sheet để xác nhận có dòng mới.
