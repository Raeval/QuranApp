import supabase from "../supabaseClient";

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error};
}

export async function register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

export async function addCheckpoint(surah: number, ayah: number) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .insert({
      user_id: user.id,
      kind: "checkpoint",
      surah,
      ayah,
    })
    .select()

    console.log(data);

    if (error) throw error;
}

export async function addSaved(surah: number, ayah: number) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .insert({
      user_id: user.id,
      kind: "saved",
      surah,
      ayah,
    })
    .select()

    console.log(data);

    if (error) throw error;
}

export async function removeCheckpoint(surah: number, ayah: number) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .delete()
    .eq("user_id", user.id)
    .eq("kind", "checkpoint")
    .eq("surah", surah)
    .eq("ayah", ayah)
    .select();

    console.log(data);

    if(error) throw error;
}

export async function removeSaved(surah: number, ayah: number) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .delete()
    .eq("user_id", user.id)
    .eq("kind", "saved")
    .eq("surah", surah)
    .eq("ayah", ayah)
    .select();

    console.log(data);

    if(error) throw error;
}

export async function getCheckpoint(surah: number): Promise<number> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .select("ayah")
    .eq("user_id", user.id)
    .eq("kind", "checkpoint")
    .eq("surah", surah)
    .order("ayah", { ascending: false })
    .maybeSingle();

    if (error) throw error;

    return data?.ayah ?? 0;
}

export async function getSaved(surah: number): Promise<number> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");

    const { data, error } = await supabase
    .from("user_verse_marks")
    .select("ayah")
    .eq("user_id", user.id)
    .eq("kind", "saved")
    .eq("surah", surah)
    .order("ayah", { ascending: false })
    .maybeSingle();

    if (error) throw error;

    return data?.ayah ?? 0;
}

export async function replaceCheckpoint(surah: number, newAyah: number) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");
  
    // Step 1: remove old checkpoint(s) for this surah
    const { error: delErr } = await supabase
      .from("user_verse_marks")
      .delete()
      .eq("user_id", user.id)
      .eq("kind", "checkpoint")
      .eq("surah", surah);
  
    if (delErr) throw delErr;
  
    // Step 2: insert the new one
    const { data, error: insErr } = await supabase
      .from("user_verse_marks")
      .insert({
        user_id: user.id,
        kind: "checkpoint",
        surah,
        ayah: newAyah,
      })
      .select()
      .single();
  
    if (insErr) throw insErr;
}

export async function replaceSaved(surah: number, newAyah: number) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError) throw userError;
    if (!user) throw new Error("Not signed in");
  
    // Step 1: remove old checkpoint(s) for this surah
    const { error: delErr } = await supabase
      .from("user_verse_marks")
      .delete()
      .eq("user_id", user.id)
      .eq("kind", "saved")
      .eq("surah", surah);
  
    if (delErr) throw delErr;
  
    // Step 2: insert the new one
    const { data, error: insErr } = await supabase
      .from("user_verse_marks")
      .insert({
        user_id: user.id,
        kind: "saved",
        surah,
        ayah: newAyah,
      })
      .select()
      .single();
  
    if (insErr) throw insErr;
}