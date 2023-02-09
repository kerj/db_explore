import React from "react";

import { CallbackButton } from "./CallbackButton";

const styles = {
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em 0em",
  },

  tableValues: {
    textAlign: "center",
    border: "1px solid",
    padding: "3px",
  },
};

const useGetData = (url) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    let cleaningup = false;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (!cleaningup) {
          setData(result);
        }
      });

    return () => {
      cleaningup = true;
    };
  }, [url]);

  return data;
};

export const App = () => {
  const results = useGetData("http://localhost:3000/customers");
  const headers = results ? Object.keys(results[0]) : [];
  const onAdd = () => {
    const url = "http://localhost:3000/addcustomer";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerId: "this-is-a-customerId",
        email: "test@test.com",
        first_name: "Lebron",
        last_name: "James",
      }),
    };

    fetch(url, options);
  };

  const onRemove = () => {
    const url = "http://localhost:3000/removecustomer";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerId: "this-is-a-customerId",
      }),
    };

    fetch(url, options);
  };

  return (
    <>
      <CallbackButton callback={onAdd} text="Add test Customer" />
      <CallbackButton callback={onRemove} text="remove test Customer" />
      <div style={{ ...styles.tableContainer }}>
        {
          <table>
            <thead>
              <tr style={{ ...styles.tableValues }}>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(results || []).map((row, index) => (
                <tr key={index}>
                  {headers.map((header, ind) => (
                    <td key={ind} style={{ ...styles.tableValues }}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </>
  );
};

export default App;
