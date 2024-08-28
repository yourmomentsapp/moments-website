import "../stylesheets/navbar.css";

const OPTIONS = [
  {
    "title": "Home",
    "link": "/",
  },
  {
    "title": "About Us",
    "link": "/about",
  },
  {
    "title": "Features",
    "link": "/features"
  }
];

const NavBar = () => {
  return (
    <nav id="top-nav">
      <div>
        <div id="Logo">
          <h1>Moments</h1>
        </div>
        <a href="#welcome">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a className="special" href="#beta-testing">Beta Testing</a>
      </div>
    </nav>
  )
}

export default NavBar;