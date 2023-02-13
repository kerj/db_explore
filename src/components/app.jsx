import React, { lazy, Suspense } from "react";

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


const LazyTable = lazy(() => import("./Table"));

export const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8"></meta>
        <title>SSR App</title>
      </head>
      <div style={{ ...styles.tableContainer }}>
        <Suspense fallback={<div>Loading... </div>}>
          <LazyTable />
        </Suspense>
      </div>
    </html>
  );
};

export default App;
