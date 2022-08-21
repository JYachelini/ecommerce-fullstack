export const handleDropDown = async (
  dropDown: boolean,
  setDropDown: React.Dispatch<React.SetStateAction<any>>,
) => {
  setDropDown(!dropDown);
};

export const openDropDown = async (
  setDropDown: React.Dispatch<React.SetStateAction<any>>,
) => {
  setDropDown(true);
};

export const closeDropDown = async (
  setDropDown: React.Dispatch<React.SetStateAction<any>>,
) => {
  setDropDown(false);
};
