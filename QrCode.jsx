import React, { useState } from "react";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loding, setLoding] = useState(false);
  const [qrData, setQrData] = useState("https://Youtube.in/");
  const [qrSize, setQrSize] = useState("150");

  async function generateQR() {
    setLoding(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoding(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Erroor downloding QR code", error);
      });
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loding && <p>Please wait...</p>}
      {img && <img src={img} className="qr-code-image" />}
      <img src="images/anu.png" width={15} />
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          type="text"
          value={qrData}
          id="dataInput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQrData(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size(e.g.,150):
        </label>
        <input
          type="text"
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
          id="sizeInput"
          placeholder="Enter image size"
        />
        <button id="para1" disabled={loding} onClick={generateQR}>
          Generate QR code
        </button>
        <button id="para2" onClick={downloadQR}>
          Download QR code
        </button>
      </div>
      <p className="footer">Designed By Anu</p>
    </div>
  );
};

export default QrCode;
