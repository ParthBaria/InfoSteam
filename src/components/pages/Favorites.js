import Nav from "../Nav";
import { useAuthContext } from "../context/AuthContext";
import { FilterNews } from "../news/FilterNews";

function Favorites() {
  const { currentUser } = useAuthContext();


  return (
    <>
      <Nav />
      {!currentUser && <div>Login to use this</div>}
      {currentUser && <FilterNews  />}
    </>
  );
}

export default Favorites;
