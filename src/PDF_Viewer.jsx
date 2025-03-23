export const PDF_Viewer = ({ base64, visible }) => {
  const pdfData = `data:application/pdf;base64,${base64}`;
  return (
    <iframe
      src={pdfData}
      title="PDF Viewer"
      width="100%"
      height="600px"
      style={{ border: "none", visibility: visible ? "visible" : "hidden" }}
    ></iframe>
  );
};
