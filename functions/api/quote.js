export async function onRequestPost({ request }) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const name = String(form.get("name") ?? "");
  const message = String(form.get("message") ?? "");

  if (!email || !name || !message) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  return Response.json({
    ok: true,
    message: "Quote request received. Connect email delivery here for production.",
  });
}
