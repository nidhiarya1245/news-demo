import './Header.css';

function Header() {
  return (<header className="py-3 mb-3 border-bottom bg-dark text-white">
    <div className="container-fluid d-grid gap-3 align-items-center" id="logo-container">
      <div className="dropdown"></div>
      <div className="d-flex align-items-center">
        <div className="w-100 me-3"></div>
        <div className="flex-shrink-0 dropdown">
          <a href="javscript:void(0);" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle" width="32" height="32" />
          </a>
        </div>
      </div>
    </div>
  </header>);
}

export default Header;