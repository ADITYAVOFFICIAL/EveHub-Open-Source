function Pdfer() {
    return (
      <iframe src={require("./1.pdf")} width="100%" height="100%" style={{ border: "none" }} className="rounded-3xl">
        This browser does not support PDFs. Please <a href="https://github.com/ADITYAVOFFICIAL/EveHub-Open-Source/blob/main/src/pages/dashboard/1.pdf?raw=true">download the PDF</a> to view it.
      </iframe>
    );
  }
  
  export default Pdfer;
  