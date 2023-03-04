import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header: React.FC = () => {
  const user: any = JSON.parse(localStorage.getItem("userData"));
  return (
    <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Repo Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/Repositories">
              Repositories
            </Nav.Link>
            <Nav.Link as={Link} href="/Branches">
              Branches
            </Nav.Link>
            <Nav.Link as={Link} href="/Issues">
              Issues
            </Nav.Link>
          </Nav>
          {user ? (
            <Nav>
              <Nav.Item className="text-primary align-self-center pe-2">
                @{user?.username}
              </Nav.Item>
              <Nav.Link as={Link} href="/logout">
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} href="/loginOrRegister">
                Login/Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
