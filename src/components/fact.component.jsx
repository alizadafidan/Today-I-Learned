import { useState } from "react";
import supabase from "../supabase";

function Fact({ fact, setFacts, findColor }) {
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedData, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    console.log(updatedData);
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => {
          return f.id === fact.id ? updatedData[0] : f;
        })
      );
  }

  return (
    <li className="fact">
      <p>
        {fact.text}{" "}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: findColor }}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          disabled={isUpdating}
          onClick={() => handleVote("votesInteresting")}
        >
          👍{fact.votesInteresting}
        </button>
        <button onClick={() => handleVote("votesMindblowing")}>
          🤯{fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")}>
          ❌{fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
