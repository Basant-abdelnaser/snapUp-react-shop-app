import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemThunk } from "../../redux/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { clearCart } from "../../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center text-danger  "
        style={{ height: "90vh" }}
      >
        <h3>Your Cart is Empty!</h3>
      </div>
    );
  }

  return (
    <div className="container " >
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td className="d-flex align-items-center gap-3">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <span>{item.title}</span>
                </td>

                <td>${item.price}</td>

                <td>{item.quantity}</td>

                <td className="fw-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(deleteItemThunk(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column gap-3 flex-sm-row justify-content-between mt-4 align-items-center">
        <div>
          <button
            className="btn  p-3 btn-outline-danger "
            onClick={() => dispatch(clearCart())}
          >
            {" "}
            CLEAR CART
            <MdDeleteOutline className="ms-2" size={25} />
          </button>
        </div>
        <div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <p className="mb-0">Total ({items.length}) items :</p>

              <span
                className="text-primary fw-bold"
                style={{ fontSize: "30px" }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <button className="btn btn-primary mt-3 w-100">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
