import { useState } from "react";
import { PageShell, Reveal, SectionTitle } from "../components/ui";
import { profile, FORM_ENDPOINT } from "../data";

const empty = { name: "", email: "", subject: "", message: "" };

// Defined outside the page component so inputs keep focus while typing.
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-white/60">
        {label}
      </label>
      {children}
      {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | mailto

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // No backend connected yet -> fall back to the visitor's email app.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell>
      <section className="container-x">
        <SectionTitle
          eyebrow="Get in touch"
          title="Let's build something together"
          sub="Tell me about your project or role. I usually reply within a day."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-4">
              {[
                { l: "Email", v: profile.email, h: `mailto:${profile.email}` },
                { l: "Phone", v: profile.phone, h: `tel:${profile.phone.replace(/\s/g, "")}` },
                { l: "Location", v: profile.location },
                { l: "LinkedIn", v: "divyanshutailor", h: profile.links.linkedin },
                { l: "GitHub", v: "divyanshutailor", h: profile.links.github },
              ].map((c) => (
                <div key={c.l} className="glass rounded-2xl p-5">
                  <div className="font-mono text-xs text-neon">{c.l}</div>
                  {c.h ? (
                    <a href={c.h} target="_blank" rel="noreferrer" className="mt-1 block break-all hover:text-brand-400">
                      {c.v}
                    </a>
                  ) : (
                    <div className="mt-1">{c.v}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal i={1}>
            <form onSubmit={submit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name" error={errors.name}>
                  <input id="name" className="input" placeholder="Jane Doe" value={form.name} onChange={set("name")} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>
              </div>
              <Field id="subject" label="Subject (optional)">
                <input
                  id="subject"
                  className="input"
                  placeholder="Mobile app project / Job opportunity"
                  value={form.subject}
                  onChange={set("subject")}
                />
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  rows={6}
                  className="input resize-none"
                  placeholder="Tell me what you're building..."
                  value={form.message}
                  onChange={set("message")}
                />
              </Field>

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
                {status === "sending" ? "Sending..." : "Send message →"}
              </button>

              {status === "sent" && (
                <div className="rounded-xl border border-lime/30 bg-lime/10 p-3 text-sm text-lime">
                  Thanks! Your message was sent. I'll get back to you soon.
                </div>
              )}
              {status === "mailto" && (
                <div className="rounded-xl border border-neon/30 bg-neon/10 p-3 text-sm text-neon">
                  Your email app should open with the message ready to send.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
                  Something went wrong. Please email me directly at {profile.email}.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
