import { UserInterface } from '../../Interfaces/user.interface';

function UserList(props: UserInterface) {
  return <li>{props.username}</li>;
}

export default UserList;
