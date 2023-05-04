import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "antd";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);
  
  const handleOtpChange = (index, value) => {
    if (!/\d/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus(); 
    }
  };
  
  const handleKeyDown = (index, e) => {
    console.log(otp)
    if (e.keyCode === 8 && otp[index] !=='') {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    else if (e.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus(); 
      }
    }
    else if (e.key === "ArrowRight" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus(); 
    }
  };
  

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setOtp(Array(6).fill(""));
  };

  const handleOk = () => {
    setShowPopup(false);
    setOtp(Array(6).fill(""));
  };

  const inputStyle = {
    width: "40px",
    margin: "0 10px",
    fontSize: "24px",
    textAlign: "center"
  };

  const inputs = otp.map((value, index) => (
    <Input
      key={index}
      tabIndex={0}
      ref={(ref) => (inputRefs.current[index] = ref)}
      value={value}
      maxLength={1}
      style={inputStyle}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onInput={(e) => handleOtpChange(index, e.target.value)}
      onPaste={handlePaste}
    />
  ));

  return (
    <>
      <button onClick={handleShowPopup}>Verify Phone</button>
      <Modal open={showPopup} onCancel={handleCancel} onOk={handleOk}>
        <p>Please enter the 6-digit verification code sent to your phone:</p>
        <div>{inputs}</div>
      </Modal>
    </>
  );
}

export default App;
