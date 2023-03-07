import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setGreeter }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputGreeter, setInputGreeter] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  const handleInpuGreeterChange = e => {
    if (/[a-zA-Z]+/g.test(e.target.value)) {
      //alert(e.target.value);
      setInputGreeter(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };
  const getGreet = async () => {
    const greet = await contract.methods.greet().call({ from: accounts[0] });
    setGreeter(greet);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };
  const sgreeter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputGreeter === "") {
      alert("Please enter a value to sgreeter.");
      return;
    }

    await contract.methods.setGreeter(inputGreeter).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <button onClick={getGreet}>
        getGreet()
      </button>

      <div onClick={sgreeter} className="input-btn">
        sgreeter(<input
          type="text"
          placeholder="string"
          value={inputGreeter}
          onChange={handleInpuGreeterChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
