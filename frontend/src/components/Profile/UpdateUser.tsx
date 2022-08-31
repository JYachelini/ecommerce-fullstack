interface PropsUpdateUser {
  name: string;
  placeholder: string;
  type: string;
  defaultValue: string;
  handleChange: (e: any) => void;
  enableEdit: boolean;
}

function UpdateUser(props: PropsUpdateUser) {
  const { defaultValue, handleChange, enableEdit, ...inputProps } = props;

  return (
    <div>
      <label>
        {inputProps.placeholder}
        <input
          {...inputProps}
          defaultValue={defaultValue}
          disabled={!enableEdit}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UpdateUser;
