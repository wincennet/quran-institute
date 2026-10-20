import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, Trash2, Upload, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { BLOG_CATEGORIES, getBlogCategory } from "../lib/blog";
import { parseVideo } from "../lib/cms";

// Supabase's free plan refuses single files bigger than this.
const MAX_VIDEO_MB = 50;

const INPUT_CLASS =
  "w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-gold/50";
const PRIMARY = "bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light text-sm font-medium px-4 py-1.5 rounded-md transition-colors";
const SECONDARY = "border border-gold/40 text-brown-light hover:text-brown hover:border-gold text-sm font-medium px-4 py-1.5 rounded-md transition-colors";
const BUCKET = "blog";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Latin titles become a readable address; Urdu titles get a short generated one.
function makeSlug(title) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return base || `post-${Date.now().toString(36)}`;
}

// Shrinks a picked image to at most 1080 px wide and saves it as WebP, so slides
// stay light for visitors on phones.
async function prepareImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1080 / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (blob) return { blob, type: "image/webp", ext: "webp" };
  } catch {
    // Fall through to uploading the original file.
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  return { blob: file, type: file.type || "image/jpeg", ext };
}

// ------------------------------------------------------------------ sign in

function SignIn({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    onSignedIn(data.session);
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-sm mx-auto bg-cream-light border border-gold/25 rounded-2xl p-6 space-y-3"
    >
      <h1 className="font-heading text-brown text-2xl font-semibold">Admin sign in</h1>
      <div>
        <label htmlFor="admin-email" className="sr-only">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="sr-only">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={INPUT_CLASS}
        />
      </div>
      <button type="submit" disabled={status === "sending"} className={PRIMARY}>
        {status === "sending" ? "Signing in…" : "Sign in"}
      </button>
      {status === "error" && <p className="text-sm text-red-700">{message}</p>}
    </form>
  );
}

// ------------------------------------------------------------------ reviews

function ReviewsAdmin() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [role, setRole] = useState("all");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setRows(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setApproved = async (id, approved) => {
    const { error: updateError } = await supabase.from("reviews").update({ approved }).eq("id", id);
    if (updateError) setError(updateError.message);
    else load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this review for good?")) return;
    const { error: deleteError } = await supabase.from("reviews").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else load();
  };

  const shown = rows.filter(
    (row) =>
      (filter === "all" || (filter === "pending" ? !row.approved : row.approved)) &&
      (role === "all" || row.role === role),
  );
  const pendingCount = rows.filter((row) => !row.approved).length;

  const pill = (active) =>
    `text-xs font-medium rounded-md px-3 py-1.5 border transition-colors ${
      active ? "bg-gold text-cream-light border-gold" : "text-brown-light border-gold/30 hover:border-gold"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        {[
          ["pending", `Waiting (${pendingCount})`],
          ["approved", "Approved"],
          ["all", "All"],
        ].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setFilter(id)} className={pill(filter === id)}>
            {label}
          </button>
        ))}
        <span className="mx-1 text-brown-light/50">|</span>
        {[
          ["all", "Parents and students"],
          ["Parent", "Parents"],
          ["Student", "Students"],
        ].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setRole(id)} className={pill(role === id)}>
            {label}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <ul className="mt-5 space-y-3">
        {shown.length === 0 && <li className="text-sm text-brown-light">Nothing here.</li>}
        {shown.map((row) => (
          <li key={row.id} className="bg-cream-light border border-gold/25 rounded-2xl p-4">
            <p className="text-xs text-brown-light">
              {row.role} · {row.name}, {row.country} · {formatDate(row.created_at)} ·{" "}
              <span className={row.approved ? "text-green-700" : "text-gold-dark"}>
                {row.approved ? "Showing on the site" : "Waiting"}
              </span>
            </p>
            <p className="mt-2 text-sm text-brown leading-relaxed whitespace-pre-wrap">{row.review}</p>
            <div className="mt-3 flex gap-2">
              {row.approved ? (
                <button type="button" onClick={() => setApproved(row.id, false)} className={SECONDARY}>
                  Hide from site
                </button>
              ) : (
                <button type="button" onClick={() => setApproved(row.id, true)} className={PRIMARY}>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} /> Approve
                  </span>
                </button>
              )}
              <button type="button" onClick={() => remove(row.id)} className={SECONDARY}>
                <span className="inline-flex items-center gap-1.5">
                  <Trash2 size={14} /> Delete
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------------ posts

const EMPTY_POST = {
  id: null,
  category: "english",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  slides: [],
  published: true,
  published_at: null,
};

function PostEditor({ initial, onDone }) {
  const [post, setPost] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const isUrdu = post.category === "urdu";
  const isVideo = getBlogCategory(post.category)?.kind === "video";
  const textDir = isUrdu ? "rtl" : isVideo ? "auto" : "ltr";
  const bodyRef = useRef(null);

  const update = (patch) => setPost((current) => ({ ...current, ...patch }));

  // Turns the selected line(s) into a heading (shown in gold on the site) by putting
  // "## " in front, with a blank line around it so the text under it is body text.
  // Tapping it again on a heading turns it back into normal text.
  const makeHeading = () => {
    const field = bodyRef.current;
    if (!field) return;
    const text = post.body;
    const lineStart = text.lastIndexOf("\n", field.selectionStart - 1) + 1;
    let lineEnd = text.indexOf("\n", field.selectionEnd);
    if (lineEnd === -1) lineEnd = text.length;

    const lines = text
      .slice(lineStart, lineEnd)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) return;

    const allHeadings = lines.every((line) => line.startsWith("## "));
    const converted = lines
      .map((line) => (allHeadings ? line.slice(3) : line.startsWith("## ") ? line : `## ${line}`))
      .join("\n");

    const before = text.slice(0, lineStart);
    const after = text.slice(lineEnd);
    let padBefore = "";
    if (before && !before.endsWith("\n\n")) padBefore = before.endsWith("\n") ? "\n" : "\n\n";
    let padAfter = "";
    if (after.trim()) {
      if (after.startsWith("\n\n")) padAfter = "";
      else padAfter = after.startsWith("\n") ? "\n" : "\n\n";
    }

    const next = before + padBefore + converted + padAfter + after;
    update({ body: next });

    const caretStart = before.length + padBefore.length;
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(caretStart, caretStart + converted.length);
    });
  };

  const uploadFiles = async (event) => {
    const files = [...event.target.files];
    event.target.value = "";
    if (files.length === 0) return;
    setStatus("uploading");
    setMessage("");
    const folder = post.slug || makeSlug(post.title);
    const added = [];
    for (const [position, file] of files.entries()) {
      const { blob, type, ext } = await prepareImage(file);
      const path = `${folder}/${Date.now()}-${position}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: type });
      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      added.push({ src: data.publicUrl, alt: post.title });
    }
    update({ slides: [...post.slides, ...added] });
    setStatus("idle");
  };

  const uploadVideo = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      setStatus("error");
      setMessage(
        `That video is ${Math.round(file.size / 1024 / 1024)} MB, over the ${MAX_VIDEO_MB} MB limit. Upload it to YouTube instead and paste the link below.`,
      );
      return;
    }
    setStatus("uploading-video");
    setMessage("");
    const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
    const path = `${post.slug || makeSlug(post.title)}/video-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || "video/mp4" });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    update({ video_url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl });
    setStatus("idle");
  };

  const moveSlide = (from, to) => {
    if (to < 0 || to >= post.slides.length) return;
    const next = [...post.slides];
    [next[from], next[to]] = [next[to], next[from]];
    update({ slides: next });
  };

  const save = async (event) => {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const slug = post.slug.trim() || makeSlug(post.title);
    const row = {
      category: post.category,
      title: post.title.trim(),
      slug,
      excerpt: post.excerpt.trim() || null,
      body: post.body,
      slides: post.slides.map((slide) => ({ ...slide, alt: slide.alt || post.title })),
      cover_url: post.slides[0]?.src ?? null,
      published: post.published,
      published_at: post.published ? post.published_at ?? new Date().toISOString() : post.published_at,
    };
    // Only sent when there is a video (or the post already had the column), so
    // text posts keep saving even before the video_url column has been added.
    if (isVideo && (post.video_url || "video_url" in initial)) {
      row.video_url = post.video_url?.trim() || null;
    }
    const query = post.id
      ? supabase.from("posts").update(row).eq("id", post.id)
      : supabase.from("posts").insert(row);
    const { error } = await query;
    if (error) {
      setStatus("error");
      setMessage(
        error.code === "23505" ? "That address (slug) is already used by another post." : error.message,
      );
      return;
    }
    onDone();
  };

  return (
    <form onSubmit={save} className="bg-cream-light border border-gold/25 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-brown text-xl font-semibold">
          {post.id ? "Edit post" : "New post"}
        </h2>
        <button type="button" onClick={onDone} aria-label="Close editor" className="text-brown-light">
          <X size={20} />
        </button>
      </div>

      <div className="grid sm:grid-cols-[10rem_1fr] gap-3">
        <div>
          <label htmlFor="post-category" className="text-xs text-brown-light font-medium">
            Section
          </label>
          <select
            id="post-category"
            value={post.category}
            onChange={(event) => update({ category: event.target.value })}
            className={`${INPUT_CLASS} mt-1`}
          >
            {BLOG_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.kind === "video" ? category.title : category.id === "urdu" ? "Urdu" : "English"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="post-title" className="text-xs text-brown-light font-medium">
            Title
          </label>
          <input
            id="post-title"
            required
            value={post.title}
            onChange={(event) => update({ title: event.target.value })}
            dir={textDir}
            className={`${INPUT_CLASS} mt-1`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="post-excerpt" className="text-xs text-brown-light font-medium">
          Short summary (shown in the list)
        </label>
        <input
          id="post-excerpt"
          value={post.excerpt}
          onChange={(event) => update({ excerpt: event.target.value })}
          dir={textDir}
          className={`${INPUT_CLASS} mt-1`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="post-body" className="text-xs text-brown-light font-medium">
            Text
          </label>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={makeHeading}
            className="text-xs font-semibold rounded-md px-3 py-1.5 border border-gold bg-gold/15 text-gold-dark hover:bg-gold/30 transition-colors"
          >
            Heading
          </button>
        </div>
        <textarea
          id="post-body"
          ref={bodyRef}
          rows={10}
          value={post.body}
          onChange={(event) => update({ body: event.target.value })}
          dir={textDir}
          placeholder="Leave a blank line between paragraphs."
          className={`${INPUT_CLASS} mt-1 resize-y leading-relaxed`}
        />
        <p className="mt-1 text-xs text-brown-light">
          To make a heading: tap in the line (or select it), then tap <strong>Heading</strong>. It
          shows in gold on the site, and the text under it stays normal text. Tap again to undo.
          To write Arabic, start a line with <code>ar: </code>.
        </p>
      </div>

      {isVideo && (
        <div>
          <p className="text-xs text-brown-light font-medium">Video</p>
          {post.video_url && (
            <p className="mt-1 text-xs text-green-700 break-all">
              {parseVideo(post.video_url)?.type === "youtube" ? "YouTube link" : "Uploaded video"}:{" "}
              {post.video_url}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className={`${SECONDARY} inline-flex items-center gap-2 cursor-pointer`}>
              <Upload size={14} />
              {status === "uploading-video" ? "Uploading video…" : "Upload a video file"}
              <input
                type="file"
                accept="video/*"
                onChange={uploadVideo}
                disabled={status === "uploading-video"}
                className="sr-only"
              />
            </label>
            {post.video_url && (
              <button type="button" onClick={() => update({ video_url: "" })} className={SECONDARY}>
                Remove video
              </button>
            )}
          </div>
          <input
            aria-label="Or paste a YouTube link"
            value={post.video_url ?? ""}
            onChange={(event) => update({ video_url: event.target.value })}
            placeholder="Or paste a YouTube link (watch, youtu.be or Shorts)"
            className={`${INPUT_CLASS} mt-2`}
          />
          <p className="mt-1 text-xs text-brown-light">
            Uploaded files can be up to {MAX_VIDEO_MB} MB (MP4 works best on phones). For longer
            sessions, upload to YouTube and paste the link here.
          </p>
        </div>
      )}

      <div>
        <p className="text-xs text-brown-light font-medium">
          {isVideo ? "Cover image (optional)" : "Slides (optional, the first is the cover)"}
        </p>
        {post.slides.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-3">
            {post.slides.map((slide, position) => (
              <li key={slide.src} className="w-24">
                <img
                  src={slide.src}
                  alt=""
                  className="w-24 aspect-[4/5] object-cover rounded-lg border border-gold/25"
                />
                <div className="mt-1 flex justify-between">
                  <button
                    type="button"
                    aria-label="Move earlier"
                    onClick={() => moveSlide(position, position - 1)}
                    className="text-brown-light"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Move later"
                    onClick={() => moveSlide(position, position + 1)}
                    className="text-brown-light"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove slide"
                    onClick={() => update({ slides: post.slides.filter((_, i) => i !== position) })}
                    className="text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <label className={`${SECONDARY} mt-2 inline-flex items-center gap-2 cursor-pointer`}>
          <Upload size={14} />
          {status === "uploading" ? "Uploading…" : "Add images"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={uploadFiles}
            disabled={status === "uploading"}
            className="sr-only"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-brown">
        <input
          type="checkbox"
          checked={post.published}
          onChange={(event) => update({ published: event.target.checked })}
          className="accent-[#b8924d]"
        />
        Published (untick to keep it as a draft)
      </label>

      <details className="text-xs text-brown-light">
        <summary className="cursor-pointer">Page address</summary>
        <input
          aria-label="Page address"
          value={post.slug}
          onChange={(event) => update({ slug: event.target.value.toLowerCase() })}
          placeholder="Made from the title if left empty"
          className={`${INPUT_CLASS} mt-2`}
        />
      </details>

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={status === "saving" || status === "uploading" || status === "uploading-video"} className={PRIMARY}>
          {status === "saving" ? "Saving…" : "Save post"}
        </button>
        <button type="button" onClick={onDone} className={SECONDARY}>
          Cancel
        </button>
      </div>
      {status === "error" && <p className="text-sm text-red-700">{message}</p>}
    </form>
  );
}

function PostsAdmin() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setRows(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (row) => {
    if (!window.confirm(`Delete "${row.title}" for good?`)) return;
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    else load();
  };

  if (editing) {
    return (
      <PostEditor
        initial={editing}
        onDone={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setEditing({ ...EMPTY_POST })} className={PRIMARY}>
        New post
      </button>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      <ul className="mt-5 space-y-3">
        {rows.length === 0 && (
          <li className="text-sm text-brown-light">
            No posts here yet. Posts already on the site (written in code) are not listed.
          </li>
        )}
        {rows.map((row) => (
          <li key={row.id} className="bg-cream-light border border-gold/25 rounded-2xl p-4">
            <p className="text-xs text-brown-light">
              {getBlogCategory(row.category)?.kind === "video"
                ? getBlogCategory(row.category).title
                : row.category === "urdu"
                  ? "Urdu"
                  : "English"}{" "}
              · {formatDate(row.created_at)} ·{" "}
              <span className={row.published ? "text-green-700" : "text-gold-dark"}>
                {row.published ? "Published" : "Draft"}
              </span>
            </p>
            <p className="mt-1 text-brown font-medium" dir={row.category === "urdu" ? "rtl" : "auto"}>
              {row.title}
            </p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => setEditing(row)} className={SECONDARY}>
                Edit
              </button>
              <button type="button" onClick={() => remove(row)} className={SECONDARY}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------------ page

export default function AdminPage() {
  const [session, setSession] = useState(undefined);
  const [tab, setTab] = useState("reviews");

  // Keep the page out of search engines.
  useEffect(() => {
    document.title = "Admin | Assiratul Mustaqeem Institute";
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, nofollow";
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <main className="bg-cream pt-28 pb-24 min-h-[70vh]">
        <p className="max-w-xl mx-auto px-6 text-brown-light">
          The admin page is not connected to a database yet.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-cream pt-28 pb-24 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 text-left">
        {session === undefined && <p className="text-brown-light">Loading…</p>}
        {session === null && <SignIn onSignedIn={setSession} />}
        {session && (
          <>
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-heading text-brown text-3xl font-medium">Admin</h1>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className={SECONDARY}
              >
                Sign out
              </button>
            </div>
            <div className="mt-5 flex gap-2">
              {[
                ["reviews", "Reviews"],
                ["posts", "Blog posts"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`text-sm font-medium rounded-md px-4 py-1.5 border transition-colors ${
                    tab === id
                      ? "bg-gold text-cream-light border-gold"
                      : "text-brown-light border-gold/30 hover:border-gold"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-6">{tab === "reviews" ? <ReviewsAdmin /> : <PostsAdmin />}</div>
          </>
        )}
      </div>
    </main>
  );
}
