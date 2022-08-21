import { useContext, useState } from 'react';
import { Context } from '../Context/Contex';
import Navbar_categories from './Navbar_categories';
import { openDropDown, closeDropDown } from '../../utils/dropdown';

function Navbar() {
  const { categories, subcategoriesToView, setSubcategoriesToView } =
    useContext(Context);

  const [categoryDD, setCategoryDD] = useState<boolean>(true);

  return (
    <nav
      className="navbar"
      onMouseLeave={() => {
        // closeDropDown(setCategoryDD);
        closeDropDown(setSubcategoriesToView);
      }}
    >
      <div className="navbar-logo">
        <h2>Logo</h2>
      </div>
      <div className="navbar-promos">
        <h2>Promos</h2>
      </div>
      <div
        className="navbar-categories"
        onMouseEnter={() => {
          openDropDown(setCategoryDD);
        }}
      >
        <h2>Categorias</h2>
        {categoryDD ? (
          <>
            {categories ? (
              <>
                <ul
                  className={`${
                    categoryDD ? 'active' : ''
                  } navbar-categories_list`}
                >
                  {categories
                    ? categories.map((category, index) => {
                        return (
                          <Navbar_categories
                            category={category.category}
                            subcategories={category.subcategories}
                            key={index}
                          />
                        );
                      })
                    : null}
                </ul>
              </>
            ) : null}
          </>
        ) : null}
        {subcategoriesToView.length > 0 ? (
          <div className="navbar-subcategories">
            <ul className="navbar-subcategories_list">
              {subcategoriesToView.map((subcategory, index) => {
                return (
                  <li
                    key={index}
                    className="navbar-subcategories_list-subcategory"
                  >
                    <span>{subcategory}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="navbar-cart">
        <h2>Cart</h2>
      </div>
    </nav>
  );
}

export default Navbar;
