import { useState, useCallback ,useEffect,useRef} from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#!$*&^";
    for (var i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  const handelCopy=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,16)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-2xl mb-4 text-center">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden  mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-500 px-2 py-2 font-semibold active:bg-blue-800 outline-none shrink-0 text-gray-900 "
          onClick={handelCopy}
          >
            COPY
          </button>
        </div>
        <div className="flex text-sm gap-x-5 font-semibold">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className="cursor-pointer mr-3"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
