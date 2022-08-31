import { useContext, useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { Context, INITIAL_STATE_CART } from '../Context/Context';
import { CartInterface } from '../Interfaces/cart.interface';
import RegisterInputs from '../auth/register/RegisterInputs';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../CustomHooks/useAxios';
import Loading from '../Loading/Loading';

const INITIAL_VALUES: CartInterface = {
  userId: '',
  userAddress: '',
  userPhone: '',
  userName: '',
  userEmail: '',
  userUsername: '',
  totalQuantity: 0,
  products: [],
  totalPrice: 0,
};

interface userValues {
  userAddress: string;
  userPhone: string;
  userName: string;
  userEmail: string;
  userUsername: string;
}

function Order() {
  const navigate = useNavigate();
  const api = useAxios();

  const { access_token, cart, user, setCart, loading, setLoading } =
    useContext(Context);
  const [valuesOrder, setValuesOrder] = useState(INITIAL_VALUES);
  const [userPhone, setUserPhone] = useState<string>('');
  useEffect(() => {
    if (user) {
      setValuesOrder({
        userId: user?._id || '',
        userAddress: user?.address || '',
        userPhone: user?.phone || '',
        userName: user?.name || '',
        userEmail: user?.email || '',
        userUsername: user?.username || '',
        products: cart.products,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
      });

      setUserPhone(user?.phone || '');
    }
  }, [user]);

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValuesOrder({ ...valuesOrder, [name]: value });
  };

  const inputs = [
    {
      id: 1,
      name: 'userName',
      type: 'text',
      placeholder: 'Nombre',
      errorMessage: 'Entre 3 y 16 caracteres y solo letras.',
      pattern: '^[A-Za-z]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'userEmail',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email invalido.',
      required: true,
    },
    {
      id: 3,
      name: 'userPhone',
      type: 'text',
      placeholder: 'Telefono de contacto',
      errorMessage: 'Numero invalido.',
      required: true,
    },
    {
      id: 4,
      name: 'userAddress',
      type: 'text',
      placeholder: 'Direccion',
      errorMessage:
        'Entre 3 y 16 caracteres, no se permiten caracteres especiales.',
      pattern: '^[A-Za-z0-9_ ]{3,16}$',
      required: true,
    },
  ];

  const [responseError, setResponseError] = useState<boolean>(false);
  const [idCart, setIdCart] = useState<string>();
  useEffect(() => {
    setLoading(false);
  }, []);

  const submitCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('http://localhost:8080/cart', { ...valuesOrder, userPhone })
      .then(({ data }) => {
        setResponseError(false);
        if (data._id) {
          setIdCart(data._id);
          setTimeout(() => {
            navigate('/profile/myorders');
            setCart(INITIAL_STATE_CART);
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseError(true);
        setLoading(false);
      });
  };
  if (!access_token)
    return <h1>Necesitas tener cuenta para completar el pedido.</h1>;
  else
    return (
      <div className="creating_order">
        {loading ? (
          <>
            <Loading />
            {idCart ? <span>Generando pedido con ID: {idCart}...</span> : null}
          </>
        ) : (
          <>
            <Cart
              btnContinue={false}
              totalEachShow={false}
              valueUnitShow={false}
            />
            <div className="order_user-info">
              {responseError ? (
                <span>
                  Error en la confirmación del pedido. Verifique que los
                  productos tengan stock y los campos debajo esten correctos.
                </span>
              ) : null}
              <h3>Tu información</h3>
              <form onSubmit={submitCart}>
                {inputs.map((input) => {
                  if (input.name === 'userPhone')
                    return (
                      <RegisterInputs
                        key={input.id}
                        {...input}
                        value={userPhone}
                        setPhone={setUserPhone}
                      />
                    );

                  return (
                    <RegisterInputs
                      key={input.id}
                      {...input}
                      value={valuesOrder[input.name as keyof userValues]}
                      handleChange={handleValues}
                    />
                  );
                })}
                <label>
                  <input type="checkbox" required={true} />
                  Confirmo el pedido
                </label>
                <button>Generar pedido</button>
              </form>
            </div>
          </>
        )}
      </div>
    );
}

export default Order;
