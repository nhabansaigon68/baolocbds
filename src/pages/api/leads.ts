import type { APIRoute } from "astro";

export const prerender = false;

function normalizeVietnamPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const cleaned = value
    .trim()
    .replace(/[.\s()-]/g, "");

  if (/^0\d{9}$/.test(cleaned)) {
    return `+84${cleaned.slice(1)}`;
  }

  if (/^\+84\d{9}$/.test(cleaned)) {
    return cleaned;
  }

  if (/^84\d{9}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  return null;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch (error) {
    console.error(
      "LEAD_CAPTURE_INVALID_REQUEST",
      error,
    );

    return new Response(
      JSON.stringify({
        ok: false,
        error: "INVALID_REQUEST",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const phoneRaw =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const phoneNormalized =
      normalizeVietnamPhone(phoneRaw);

    if (!phoneNormalized) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "INVALID_PHONE",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const name =
      typeof body.name === "string" &&
      body.name.trim()
        ? body.name.trim().slice(0, 80)
        : null;

    const intent =
      typeof body.intent === "string" &&
      body.intent.trim()
        ? body.intent.trim().slice(0, 80)
        : "unknown";

    const sourceUrl =
      typeof body.sourceUrl === "string" &&
      body.sourceUrl.trim()
        ? body.sourceUrl.trim().slice(0, 500)
        : "/";

    const supabaseUrl =
      import.meta.env.SUPABASE_URL;

    const supabaseSecretKey =
      import.meta.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("LEAD_CAPTURE_CONFIG_MISSING");

      return new Response(
        JSON.stringify({
          ok: false,
          error: "SERVER_CONFIG_ERROR",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/leads`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseSecretKey,
          "Authorization": `Bearer ${supabaseSecretKey}`,
          "Prefer": "return=minimal",
        },

        body: JSON.stringify({
          phone_raw: phoneRaw,
          phone_normalized: phoneNormalized,
          name,
          intent,
          source_url: sourceUrl,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "LEAD_CAPTURE_SUPABASE_ERROR",
        response.status,
        errorText,
      );

      return new Response(
        JSON.stringify({
          ok: false,
          error: "SAVE_FAILED",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "LEAD_CAPTURE_UNEXPECTED_ERROR",
      error,
    );

    return new Response(
      JSON.stringify({
        ok: false,
        error: "SERVER_ERROR",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
