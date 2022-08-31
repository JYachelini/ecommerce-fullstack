import { useState } from 'react';
import { UserInterface } from '../../Interfaces/user.interface';

interface PropsUserList {
  user: UserInterface;
}

function UserList({ user }: PropsUserList) {
  const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);
  const handleUserInfo = () => {
    setDisplayUserInfo(!displayUserInfo);
  };
  return (
    <div className="user" onClick={handleUserInfo}>
      <span className="user_username">
        Username
        <strong>{user.username}</strong>
      </span>
      {displayUserInfo ? (
        <>
          <span className="user_id">
            Id <strong>{user._id || '-'}</strong>
          </span>
          <span className="user_name">
            Nombre <strong>{user.name || '-'}</strong>
          </span>
          <span className="user_phone">
            Telefono <strong>{user.phone || '-'}</strong>
          </span>
          <span className="user_email">
            Email <strong>{user.email || '-'}</strong>
          </span>
        </>
      ) : null}
    </div>
  );
}

export default UserList;
