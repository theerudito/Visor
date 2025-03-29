export const EXCEL_Viewer = ({ data = [], visible = false }) => {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  return (
    <div>
      <table
        style={{
          display: visible ? "block" : "none",
          marginp: "auto",
          alignContent: "center",
        }}
      >
        <thead>
          <tr>
            {headers.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((key, colIndex) => (
                <td key={colIndex}>{String(item[key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
