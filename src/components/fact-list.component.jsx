import Fact from "./fact.component";

function FactList({ facts, setFacts, categories }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one!
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => {
          const findColor = categories.find(
            (cat) => cat.name === fact.category
          ).color;
          return (
            <Fact
              setFacts={setFacts}
              key={fact.id}
              fact={fact}
              findColor={findColor}
            />
          );
        })}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

export default FactList;
