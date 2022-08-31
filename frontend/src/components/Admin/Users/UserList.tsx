import { UserInterface } from '../../Interfaces/user.interface';

interface PropsUserList {
  user: UserInterface;
}

function UserList({ user }: PropsUserList) {
  return (
    <tr>
      <td className="user_username">{user.username || '-'}</td>
      <td className="user_id">{user._id || '-'}</td>
      <td className="user_name">{user.name || '-'}</td>
      <td className="user_phone">{user.phone || '-'}</td>
      <td className="user_email">{user.email || '-'}</td>
    </tr>
  );
}

export default UserList;
