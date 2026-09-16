export interface LeadNotificationEnv {
  RESEND_API_KEY?: string;
  LEAD_NOTIFICATION_TO?: string;
  LEAD_NOTIFICATION_FROM?: string;
}

export interface LeadNotificationPayload {
  phoneRaw: string;
  phoneNormalized: string;
  name: string | null;
  intent: string;
  sourceUrl: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function notifyLeadByEmail(
  env: LeadNotificationEnv,
  lead: LeadNotificationPayload,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.LEAD_NOTIFICATION_TO?.trim();
  const from = env.LEAD_NOTIFICATION_FROM?.trim();

  if (!apiKey || !to || !from) {
    console.warn(
      "LEAD_NOTIFICATION_SKIPPED",
      "Email notification is not configured.",
    );

    return;
  }

  const name = lead.name || "Không cung cấp";

  const text = [
    "Có lead mới từ baolocbds.com",
    "",
    `Tên: ${name}`,
    `Điện thoại: ${lead.phoneRaw}`,
    `Điện thoại chuẩn hóa: ${lead.phoneNormalized}`,
    `Nhu cầu: ${lead.intent}`,
    `Nguồn: ${lead.sourceUrl}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717">
      <h2 style="margin-bottom:20px">
        Có lead mới từ baolocbds.com
      </h2>

      <table
        cellpadding="8"
        cellspacing="0"
        style="border-collapse:collapse"
      >
        <tr>
          <td><strong>Tên</strong></td>
          <td>${escapeHtml(name)}</td>
        </tr>

        <tr>
          <td><strong>Điện thoại</strong></td>
          <td>
            <a href="tel:${escapeHtml(lead.phoneNormalized)}">
              ${escapeHtml(lead.phoneRaw)}
            </a>
          </td>
        </tr>

        <tr>
          <td><strong>Nhu cầu</strong></td>
          <td>${escapeHtml(lead.intent)}</td>
        </tr>

        <tr>
          <td><strong>Nguồn</strong></td>
          <td>${escapeHtml(lead.sourceUrl)}</td>
        </tr>
      </table>
    </div>
  `;

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        from,
        to: [to],
        subject: `[BAO LOC BDS] Lead mới - ${lead.intent}`,
        text,
        html,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Resend notification failed: ${response.status} ${errorText}`,
    );
  }
}
