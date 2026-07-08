import { Outlet } from "react-router";
import Nav from "../components/Nav";
import "./../styles/Home.css";
export default function MainLayout() {
  return (
    <>
      <h1>
        <a href="/" className="site-title">
          Learn Kannada in your language
        </a>
      </h1>
      <Nav />
      <Outlet />
    </>
  );
}
