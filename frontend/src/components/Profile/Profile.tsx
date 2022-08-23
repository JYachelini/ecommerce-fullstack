import EditField from './EditField';

interface PropsProfile {
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}
function Profile({ user }: PropsProfile) {
  const { _id, email, name, phone, username } = user;

  if (user) {
    return (
      <div className="profile">
        <h2 className="profile-title">
          Tu información<span>ID: {_id}</span>
        </h2>
        <div className="profile_values">
          <span>
            Nombre: {name} <EditField />
          </span>
          <span>
            Usuario: {username} <EditField />
          </span>
          <span>
            Email: {email} <EditField />
          </span>
          <span>
            Telefono: {phone} <EditField />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>Cargando usuario...</h2>
    </div>
  );
}

export default Profile;
