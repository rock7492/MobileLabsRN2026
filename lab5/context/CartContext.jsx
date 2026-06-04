import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { useProducts } from "./ProductsContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const { products } = useProducts();

  const [cartsByUserId, setCartsByUserId] = useState({});

  const userId = currentUser?.id;
  const userCart = userId ? (cartsByUserId[userId] ?? []) : [];

  const cartItems = useMemo(() => {
    return userCart
      .map((cartItem) => {
        const product = products.find((item) => item.id === cartItem.productId);

        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [userCart, products]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function updateCurrentUserCart(updater) {
    if (!userId) {
      return;
    }

    setCartsByUserId((prevCarts) => {
      const currentCart = prevCarts[userId] ?? [];

      return {
        ...prevCarts,
        [userId]: updater(currentCart),
      };
    });
  }

  function addToCart(product) {
    updateCurrentUserCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(productId) {
    updateCurrentUserCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId) {
    updateCurrentUserCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    updateCurrentUserCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId),
    );
  }

  function clearCart() {
    updateCurrentUserCart(() => []);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart потрібно використовувати всередині CartProvider.");
  }

  return context;
}
