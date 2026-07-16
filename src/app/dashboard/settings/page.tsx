"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

interface Setting {
  id?: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  currency: string;
  timezone: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("dark");

  const [notifications, setNotifications] =
    useState(true);

  const [logo, setLogo] = useState<File | null>(null);

  const [form, setForm] = useState<Setting>({
    companyName: "",
    email: "",
    phone: "",
    website: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");

      const data = await res.json();

      if (data) {
        setForm({
          companyName: data.companyName || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          currency: data.currency || "INR",
          timezone:
            data.timezone || "Asia/Kolkata",
        });

        setTheme(data.theme || "dark");

setNotifications(
data.notifications ?? true
);

setLogo(data.logo || "");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function saveSettings(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body:JSON.stringify({

...form,

theme,

notifications,

logo

}),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      alert("Settings Saved Successfully!");
    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={saveSettings}
      className="space-y-8"
    >
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure your ClientSphere
          workspace.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* COMPANY */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="mb-6 text-xl font-bold">
            🏢 Company
          </h2>

          <div className="space-y-4">

            <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  }}
  className="w-full rounded-xl bg-white/5 p-3"
/>

            <input
              placeholder="Company Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 p-4"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 p-4"
            />

            <input
              placeholder="Website"
              value={form.website}
              onChange={(e) =>
                setForm({
                  ...form,
                  website:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 p-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setLogo(e.target.files[0]);
  }
}}
              className="w-full rounded-xl bg-white/5 p-3"
            />

            {logo && (
              <p className="text-sm text-cyan-400">
                {logo.name}
              </p>
            )}
          </div>

        </div>

        {/* PREFERENCES */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="mb-6 text-xl font-bold">
            ⚙ Preferences
          </h2>

          <div className="space-y-4">

            <select
              value={form.currency}
              onChange={(e) =>
                setForm({
                  ...form,
                  currency:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 p-4"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>

            <select
              value={form.timezone}
              onChange={(e) =>
                setForm({
                  ...form,
                  timezone:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 p-4"
            >
              <option>
                Asia/Kolkata
              </option>

              <option>UTC</option>

              <option>
                America/New_York
              </option>
            </select>

            <div
className="
flex
items-center
justify-between
rounded-xl
bg-white/5
p-4
"
>

<span>

Notifications

</span>

<input
type="checkbox"
checked={notifications}
onChange={(e)=>
setNotifications(
e.target.checked
)
}
/>

</div>

          </div>

        </div>

        {/* APPEARANCE */}

        <div className="space-y-5">

<button
type="button"
onClick={()=>
setTheme(
theme==="dark"
?"light"
:"dark"
)
}
className="
rounded-xl
bg-cyan-500
px-6
py-3
"
>

Current Theme :

{theme}

</button>

</div>

        {/* ACCOUNT */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="mb-6 text-xl font-bold">
            👤 Account
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
type="button"
onClick={()=>
alert(
"Coming Soon"
)
}
className="
rounded-xl
bg-yellow-500
px-6
py-3
"
>

Change Password

</button>

            <button

type="button"

onClick={()=>

signOut()

}

className="rounded-xl bg-red-500 px-6 py-3"

>

Logout

</button>

<button

type="button"

onClick={()=>{

if(

confirm(

"Delete Account?"

)

){

alert(

"API Coming Soon"

)

}

}}

className="
rounded-xl
bg-red-600
px-6
py-3
"

>

Delete Account

</button>

          </div>

        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4"
      >
        {loading
          ? "Saving..."
          : "Save Settings"}
      </button>

    </form>
  );
}