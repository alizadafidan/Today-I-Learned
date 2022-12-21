function Header({ showForm, formHandler }) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Logo of the page" height="68" width="68" />
        <h1>{appTitle}</h1>
      </div>
      <button onClick={formHandler} className="btn btn-large btn-open">
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default Header;
