"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [password, setPassword] = useState("");
  const [resume, setResume] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/student/login");
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("email", user.email)
        .single();

      setProfile(
        data || {
          email: user.email,
          full_name: "",
          college: "",
          skills: "",
          about: "",
          resume_url: "",
        }
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // SAVE PROFILE
  const saveProfile = async () => {
    setSaving(true);

    const profileData = {
      email: user?.email,
      full_name: profile.full_name || "",
      college: profile.college || "",
      skills: profile.skills || "",
      about: profile.about || "",
      resume_url: profile.resume_url || "",
    };

    const { error } = await supabase
      .from("student_profiles")
      .upsert(profileData);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert("Profile updated ✅");
    }

    setSaving(false);
  };

  // RESUME UPLOAD
  const uploadResume = async () => {

    if (!resume) {
      alert("Select Resume PDF ❌");
      return;
    }

    const fileName =
      `${Date.now()}-${resume.name}`;

    const { error } =
      await supabase.storage
        .from("student-resumes")
        .upload(
          fileName,
          resume
        );

    if (error) {
      alert(error.message);
      return;
    }

    const { data } =
      supabase.storage
        .from("student-resumes")
        .getPublicUrl(fileName);

    const resumeUrl =
      data.publicUrl;

    await supabase
      .from("student_profiles")
      .update({
        resume_url:
          resumeUrl,
      })
      .eq(
        "email",
        user.email
      );

    setProfile({
      ...profile,
      resume_url:
        resumeUrl,
    });

    alert(
      "Resume uploaded ✅"
    );
  };

  // PASSWORD UPDATE
  const handlePasswordUpdate =
    async () => {

      if (
        !password ||
        password.length < 6
      ) {
        alert(
          "Password minimum 6 characters ❌"
        );
        return;
      }

      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        alert(error.message);
      } else {
        alert(
          "Password updated ✅"
        );

        setPassword("");
      }
    };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">

      <h1 className="text-3xl font-bold mb-6">
        Profile 👤
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="font-medium">
            {user?.email}
          </p>
        </div>

        <input
          placeholder="Full Name"
          value={profile.full_name || ""}
          onChange={(e)=>
            setProfile({
              ...profile,
              full_name:e.target.value
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          placeholder="College"
          value={profile.college || ""}
          onChange={(e)=>
            setProfile({
              ...profile,
              college:e.target.value
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          placeholder="Skills"
          value={profile.skills || ""}
          onChange={(e)=>
            setProfile({
              ...profile,
              skills:e.target.value
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          placeholder="About yourself..."
          value={profile.about || ""}
          onChange={(e)=>
            setProfile({
              ...profile,
              about:e.target.value
            })
          }
          className="w-full border p-3 rounded-xl h-24"
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          {saving
            ? "Saving..."
            : "Save Profile"}
        </button>

        <hr />

        <h2 className="font-bold text-lg">
          Resume 📄
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e)=>
            setResume(
              e.target.files?.[0]
            )
          }
        />

        <button
          onClick={uploadResume}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Upload Resume
        </button>

        {profile.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            className="text-blue-500 block"
          >
            View Resume
          </a>
        )}

        <hr />

        <h2 className="font-bold text-lg">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        <button
          onClick={
            handlePasswordUpdate
          }
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}