import { Link } from "@tanstack/react-router";

const AppBar = () => {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link to="/" className="font-semibold">
        Notes
      </Link>

      <nav className="flex items-center gap-4">
        <Link to="/">Notes</Link>
        <Link to="/highlights">Highlights</Link>
        <Link to="/labels">Labels</Link>
        <Link to="/upload">Upload</Link>
      </nav>
    </header>
  );
};

export default AppBar;
