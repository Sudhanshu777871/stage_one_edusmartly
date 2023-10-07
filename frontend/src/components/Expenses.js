import { React, useState } from "react";
import "./css/Expense.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Expenses() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [seeAllBills, setSeeAllBills] = useState([]);
  const [showBill, setShowBill] = useState(false);
  // code for notify
  const notify = (msg) =>
    toast.info(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  // function for taking the value of item name and amount

  const addItemsFun = async () => {
    if (amount === "" || item === "") {
      notify("All Field Must Be Filled");
      return false;
    } else {
      let getApi = await fetch([process.env.REACT_APP_EXPENSEINSERT_API], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ information: item, amount: amount }),
      });
      if (getApi) {
        getApi = await getApi.json();
        if (getApi.affectedRows) {
          setItem("");
          setAmount("");
          notify("Bill Is Addedd SuccessFully");
        } else {
          notify("Bill Failed");
        }
      }
    }
  };

  // FUNCTION CODE FOR SHOWING THE BILLS
  const showBillItems = async () => {
    let getApi = await fetch(process.env.REACT_APP_ALLEXPENSE_API, {
      method: "GET",
      headers: { "Content-Type": "applicatio/json" },
    });

    if (getApi) {
      getApi = await getApi.json();
      setSeeAllBills(getApi);
      setShowBill(true);
    } else {
      console.log("Some Error Occurred");
    }
  };

  // FUNCTION FOR DELETING THE ITEMS
  const deltItem = async (serialNumber) => {
    const confirming = window.confirm("Are You Sure To Delete Bill ?");
    if (confirming) {
      let getApi = await fetch(process.env.REACT_APP_DELEXPENSEITEM_API, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: serialNumber }),
      });

      if (getApi) {
        getApi = await getApi.json();
        if (getApi.affectedRows) {
          showBillItems(); // For Updating The Bill
          notify("Bill Is Deleted Successfully");
        } else {
          notify("Bill Is Not Deleted Successfully");
        }
      }
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="container">
        {/* main heading start here */}
        <div
          className="row mt-3"
          style={{
            border: "1px solid white",
            padding: 5,
            boxShadow: "2px 2px 3px grey",
          }}
        >
          <div className="col-6">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              placeholder="Information About The Expense"
              className="addItems"
              style={{ padding: 4, textIndent: 10 }}
            />
          </div>
          <div className="col-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              style={{ width: 200, padding: 5, textIndent: 10 }}
            />
          </div>

          <div className="col-3">
            <button
              className="btn btn-danger"
              style={{ width: 200, justifySelf: "center" }}
              onClick={addItemsFun}
            >
              Add +{" "}
            </button>
          </div>
        </div>
        {/* code for seeing the all expenses */}
        <div className="row mt-3">
          <div className="col-3 offset-9">
            <button
              className="btn btn-warning float-right seeAllExpense"
              onClick={showBillItems}
            >
              See All Expenses <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {/* CONTAINER FOR SHOWING ALL THE BILLS */}
      {showBill ? (
        <div className="container mt-3 stylingTheContainerOfShowBill">
          <div className="row">
            <div className="col-12">
              {/* code for table */}

              <table className="table table-hover table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {seeAllBills.map((items, index) => {
                    return (
                      <tr className="showAllBilltr" key={index}>
                        <td>{index + 1}</td>
                        <td>{items.Expense_Information}</td>
                        <td>{items.Amount}</td>
                        <td>{items.Date}</td>
                        <td
                          onClick={() => {
                            deltItem(items.Serial_Number);
                          }}
                        >
                          <i
                            className="fa-solid fa-trash actionDelete"
                            style={{ color: "red", cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}
