import { useState } from "react";
import "./App.css";
import { PDF_Viewer } from "./PDF_Viewer";
import { EXCEL_Viewer } from "./EXCEL_Viewer";
import * as XLSX from "xlsx";

export const App = () => {
  const [base64, setBase64] = useState("");
  const [visiblePDF, setVisblePDF] = useState(false);
  const [visibleEXCEL, setVisibleEXCEL] = useState(false);
  const [selection, setSelection] = useState("");
  const [data, setData] = useState([]);

  const GenerarPDF = () => {
    if (base64 === "") {
      alert("Ingrese un valor");
      return;
    }

    if (base64.startsWith("JVBER") === true) {
      setBase64(base64);
      setVisblePDF(true);
      setVisibleEXCEL(false);
      setSelection("PDF");
    } else if (base64.startsWith("UEsDB") == true) {
      handleFile();
      setVisblePDF(false);
      setVisibleEXCEL(true);
      setSelection("EXCEL");
    } else {
      setSelection("");
      setBase64("");
      setVisblePDF(false);
      setVisibleEXCEL(false);
      alert("No es un formato válido");
    }
  };

  const Limpiar = () => {
    setSelection("");
    setBase64("");
    setVisblePDF(false);
    setVisibleEXCEL(false);
  };

  const handleFile = () => {
    try {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      };
      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error al leer el Excel:", error);
    }
  };

  return (
    <div className="contenedor">
      <div className="contenedor-body">
        <div className="contenedor-input">
          <div>
            <textarea
              type="textarea"
              value={base64}
              onChange={(e) => setBase64(e.target.value)}
              placeholder="Ingrese el valor"
            />
          </div>

          <div className="contenedor-botones">
            <button onClick={GenerarPDF}>GENERAR</button>
            <button onClick={Limpiar}>LIMPIAR</button>
          </div>
        </div>

        <div className="contenedor-visualizador">
          {selection === "EXCEL" ? (
            <EXCEL_Viewer data={data} visible={visibleEXCEL} />
          ) : (
            <PDF_Viewer base64={base64} visible={visiblePDF} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
