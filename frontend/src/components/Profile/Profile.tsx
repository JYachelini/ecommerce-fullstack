import { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
import Loading from '../Loading/Loading';
import EditField from './EditField';
import ProfileNavbar from './ProfileNavbar';

function Profile() {
  const { user, setLoading, loading } = useContext(Context);
  const { _id, name, username, email, phone, address } = user!;
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="profile_wrapper">
      <ProfileNavbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="profile">
          <h2 className="profile-title">
            Tu información<span>ID: {_id}</span>
          </h2>
          <div className="profile_values">
            <span>
              Nombre: {name} <EditField />
            </span>
            <span>Usuario: {username}</span>
            <span>
              Email: {email} <EditField />
            </span>
            <span>
              Telefono: {phone} <EditField />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
