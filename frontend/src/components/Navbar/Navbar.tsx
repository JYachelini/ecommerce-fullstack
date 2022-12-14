import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import { openDropDown, closeDropDown } from '../../utils/dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../CustomHooks/useAxios';

function Navbar() {
  const {
    categories,
    subcategoriesToView,
    setSubcategoriesToView,
    access_token,
    cart,
    productsCart,
    setAccessToken,
    setRefreshToken,
    setUser,
    setLoading,
  } = useContext(Context);
  const api = useAxios();
  const navigate = useNavigate();

  const [categoryDD, setCategoryDD] = useState<boolean>(false);

  const [categorySelected, setCategorySelected] = useState<string | null>(null);

  const logout = () => {
    setLoading(true);
    api
      .post('/logout')
      .then(() => {
        setAccessToken(null);
        setRefreshToken(null);
        setLoading(false);
        setUser(undefined);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAccessToken(null);
        setRefreshToken(null);
        setUser(undefined);
        navigate('/');
      });
  };

  return (
    <>
      <nav
        className="navbar"
        onMouseLeave={() => {
          closeDropDown(setCategoryDD);
          closeDropDown(setSubcategoriesToView);
          setCategorySelected(null);
        }}
      >
        <div
          className="navbar-logo"
          onMouseEnter={() => {
            closeDropDown(setCategoryDD);
          }}
        >
          <Link to="/">
            <h2>Logo</h2>
          </Link>
        </div>
        <div
          className="navbar-promos"
          onMouseEnter={() => {
            closeDropDown(setCategoryDD);
          }}
        >
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
                  <ul className="navbar-categories_list">
                    {categories
                      ? categories.map((category, index) => {
                          return (
                            <li
                              className={`navbar-categories_list-category ${
                                categorySelected == category.category
                                  ? 'active'
                                  : ''
                              }`}
                              onMouseEnter={() => {
                                setSubcategoriesToView(category.subcategories);
                                setCategorySelected(category.category);
                              }}
                              key={index}
                            >
                              <Link to={`/?category=${category.category}`}>
                                {category.category}
                              </Link>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                  {subcategoriesToView.length > 0 ? (
                    <div className="navbar-subcategories">
                      <ul className="navbar-subcategories_list">
                        {subcategoriesToView.map((subcategory, index) => {
                          return (
                            <li
                              key={index}
                              className="navbar-subcategories_list-subcategory"
                            >
                              <Link
                                to={`/?category=${categorySelected}&subcategory=${subcategory}`}
                              >
                                {subcategory}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="navbar-chat">
          <Link to="/chat" className="navbar-chat_logo">
            <h2>Chat</h2>
          </Link>
        </div>
        <div
          className="navbar-cart"
          onMouseEnter={() => {
            closeDropDown(setCategoryDD);
          }}
        >
          <Link to="/cart" className="navbar-cart_logo">
            <h2>Cart</h2>
            {productsCart.size > 0 ? (
              <span className="navbar-cart_quantity">{cart.totalQuantity}</span>
            ) : null}
          </Link>
        </div>
        <div
          className="navbar-user"
          onMouseEnter={() => {
            closeDropDown(setCategoryDD);
          }}
        >
          {access_token ? (
            <div className="navbar-user_profile">
              <Link to="/profile">
                <h2>Perfil</h2>
              </Link>
              <h2 onClick={logout}>Salir</h2>
            </div>
          ) : (
            <div className="navbar-user_auth">
              <Link to="/login">
                <h2>Ingresar</h2>
              </Link>
              <Link to="/register">
                <h2>Registrarse</h2>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
