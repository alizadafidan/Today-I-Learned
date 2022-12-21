import { useState } from "react";
import supabase from "../supabase";
function NewFactForm({ categories, setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const textLength = text.length;

  const textHandler = (e) => setText(e.target.value);
  const sourceHandler = (e) => setSource(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function submitHandler(e) {
    // 1 - prevent default
    e.preventDefault();
    // 2 - check if data is , if so create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3 - upload a fact and receive it
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      // 4 - add fact to the ui
      if (!error) setFacts((prevState) => [newFact[0], ...prevState]);
      // 5 - reset input fields
      setText("");
      setCategory("");
      setSource("");
      // 6 - close the form
      setShowForm(false);
    }
  }

  return (
    <form onSubmit={submitHandler} className="fact-form">
      <input
        disabled={isUploading}
        value={text}
        onChange={textHandler}
        type="text"
        placeholder="Share a fact with the world..."
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        onChange={sourceHandler}
        type="text"
        placeholder=" Trustworthy source..."
        disabled={isUploading}
      />
      <select
        disabled={isUploading}
        value={category}
        onChange={categoryHandler}
        name="#"
        id="#"
      >
        <option value="">Choose category:</option>
        {categories.map((cat) => {
          return (
            <option value={cat.name} key={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          );
        })}{" "}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        POST
      </button>
    </form>
  );
}

export default NewFactForm;
