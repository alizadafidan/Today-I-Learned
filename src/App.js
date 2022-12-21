import { Fragment, useEffect, useState } from "react";
import "./style.css";
import CategoryFilter from "./components/category-filter.component";
import Header from "./components/header.component";
import NewFactForm from "./components/new-fact-form.component";
import FactList from "./components/fact-list.component";
import supabase from "./supabase";
import Loader from "./components/loader.component";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const formHandler = function () {
    setShowForm((prevState) => !prevState);
  };

  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);
        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);
        setFacts(facts);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <Fragment>
      <Header showForm={showForm} formHandler={formHandler} />
      {showForm ? (
        <NewFactForm
          setShowForm={setShowForm}
          setFacts={setFacts}
          categories={CATEGORIES}
        />
      ) : null}

      <main className="main">
        <CategoryFilter
          setCurrentCategory={setCurrentCategory}
          categories={CATEGORIES}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList setFacts={setFacts} facts={facts} categories={CATEGORIES} />
        )}
      </main>
    </Fragment>
  );
}

export default App;
