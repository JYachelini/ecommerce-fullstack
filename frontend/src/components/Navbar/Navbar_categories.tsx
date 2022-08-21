import { categories } from '../Interfaces/context.interface';
import { useContext } from 'react';
import { Context } from '../Context/Contex';

function Navbar_categories({ category, subcategories }: categories) {
  const { setSubcategoriesToView } = useContext(Context);

  return (
    <>
      <li
        className="navbar-categories_list-category"
        onMouseEnter={() => {
          setSubcategoriesToView(subcategories);
        }}
      >
        <span>{category}</span>
      </li>
    </>
  );
}

export default Navbar_categories;
