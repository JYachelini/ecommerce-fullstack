import { Link } from 'react-router-dom';

function ProfileNavbar() {
  return (
    <nav className="profile_navbar">
      <Link to="/profile">Mis datos</Link>
      <Link to="/profile/myorders">Mis ordenes</Link>
    </nav>
  );
}

export default ProfileNavbar;
