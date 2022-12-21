import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jpdsfeygxgqnicsudyqk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZHNmZXlneGdxbmljc3VkeXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NjM2MDIsImV4cCI6MTk4NzAzOTYwMn0.pO4b6-BVLIyO-h5cejnqP_p-8YMdskIgcLqG3QDmPQg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
