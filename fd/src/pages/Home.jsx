import Container from "../components/container/Container";
import ChangePassword from "../components/ChangePassword";
import UserProfileData from "../components/UserProfileData";

function Home() {
  return (
    <Container>
      <div className="flex justify-around items-center">
        <UserProfileData />
        <ChangePassword />
      </div>
    </Container>
  );
}

export default Home;
