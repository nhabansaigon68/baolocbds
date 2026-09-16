import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const supabaseUrl = import.meta.env.SUPABASE_URL;
    const supabaseSecretKey = import.meta.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("SUPABASE_HEALTH_CONFIG_MISSING");

      return new Response(
        JSON.stringify({
          ok: false,
          service: "supabase",
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
      `${supabaseUrl}/rest/v1/leads?select=id&limit=1`,
      {
        method: "GET",
        headers: {
          "apikey": supabaseSecretKey,
          "Authorization": `Bearer ${supabaseSecretKey}`,
        },
      },
    );

    if (!response.ok) {
      console.error(
        "SUPABASE_HEALTH_CHECK_FAILED",
        response.status,
      );

      return new Response(
        JSON.stringify({
          ok: false,
          service: "supabase",
          error: "SUPABASE_UNAVAILABLE",
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        service: "supabase",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "SUPABASE_HEALTH_CHECK_UNEXPECTED_ERROR",
      error,
    );

    return new Response(
      JSON.stringify({
        ok: false,
        service: "supabase",
        error: "SERVER_ERROR",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
