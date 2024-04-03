import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../../Api/auth/authService";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [];

  if (userData?.role === "student") {
    navItems.push(
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Exams",
        slug: "/all-exams",
        active: authStatus,
      }
    );
  } else {
    navItems.push(
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Exams",
        slug: "/all-exams",
        active: authStatus,
      },
      {
        name: "Create Exam",
        slug: "/create-exam",
        active: authStatus,
      },
      {
        name: "Question Hut",
        slug: "/question-hut",
        active: authStatus,
      }
    );
  }

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="ml-8">
            <Link to="/">
              <Logo width="150px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
