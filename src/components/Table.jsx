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

export const Table = () => {
  const [result, setResult] = React.useState([{}]);
  const data = useGetData("http://localhost:3000/customers");
  React.useEffect(() => {
    setResult(data);
  }, [data]);

  const headers = result ? Object.keys(result[0]) : [];

  const onAdd = async () => {
    console.log("onpress");
    const url = "http://localhost:3000/customers";
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
        action: 'add',
      }),
    };

    await fetch(url, options).then((res) => {
      if (res.ok) {
        res.json().then((results) => setResult(results));
      }
    });
  };

  const onRemove = async () => {
    const url = "http://localhost:3000/customers";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerId: "this-is-a-customerId",
        action: 'delete',
      }),
    };

    await fetch(url, options).then((res) => {
      if (res.ok) {
        res.json().then((results) => setResult(results));
      }
    });
  };
  return (
    <>
      <CallbackButton callback={onAdd} text="Add test Customer" />
      <CallbackButton callback={onRemove} text="remove test Customer" />
      <table>
        <thead>
          <tr style={{ ...styles.tableValues }}>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result &&
            result.map((row, index) => (
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
    </>
  );
};

export default Table;
