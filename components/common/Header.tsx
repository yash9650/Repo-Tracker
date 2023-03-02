import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Repo Tracker
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/Repositories">
            Repositories
          </Nav.Link>
          <Nav.Link as={Link} href="/Branches">
            Branches
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
