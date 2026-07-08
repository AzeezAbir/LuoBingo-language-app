import { Link, useMatch, useResolvedPath } from "react-router";
import {} from "react-router";
// import "./../links.css";
export default function Nav() {
  return (
    <>
      {/* This pure CSS block safely fixes the layout spacing */}
      <style>{`
        nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px; 
          width: 100%;
          margin-top: 10px; 
        }
        
        /* THIS IS THE FIX: It only hides the empty spacer spans, keeping your links safe! */
        nav > span:not(:has(a)) {
          display: none; 
        }
      `}</style>

      <nav>
        {/* <h1>
          <a href="/" className="site-title">
            Ezee Notes
          </a>
        </h1> */}
        <CustomLink className="links" to="/p" Children={"Physics"}></CustomLink>
        <span> </span>
        <CustomLink
          className="links"
          to="/c"
          Children={"Chemistry"}
        ></CustomLink>
        <span> </span>
        <CustomLink className="links" to="/b" Children={"Biology"}></CustomLink>
        <span> </span>
      </nav>
    </>
  );
}

function CustomLink({ to, Children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  // switch (Children) {
  //   case "Physics":
  //     console.log("Physicsssss");
  //     break;
  //   case "Chemistry":
  //     console.log("Chemisssss");
  //     break;
  //   case "Biology":
  //     console.log("BIOOOOOO");
  //     break;
  // }
  return (
    <>
      <span className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {Children}
        </Link>
      </span>
    </>
  );
}
