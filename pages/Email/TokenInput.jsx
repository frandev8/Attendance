import TextField from "@mui/material/TextField";
import { createRef, useEffect, useRef, useState } from "react";

const TokenInput = () => {
  const [token, setToken] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([...Array(5)].map(() => createRef()));

  const handleChange = (index, value) => {
    const newToken = [...token];
    newToken[index] = value;
    setToken(newToken);
  };

  useEffect(() => {
    const isAllFilled = token.every((value) => value !== "");

    if (isAllFilled) {
      // Call your function here
      console.log("All fields filled:", token);

      // If you have a specific function to run, replace the console.log above
      // For example: yourFunction(token);
    }
  }, [token]);

  useEffect(() => {
    // Find the next empty input and focus on it
    const nextIndex = token.findIndex(
      (value, index) => value === "" && index > 0
    );
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex].current.focus();
    }
  }, [token]);

  return (
    <div className="flex">
      {token.map((value, index) => (
        <TextField
          key={index}
          id={`token-input-${index}`}
          variant="outlined"
          size="small"
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          style={{ marginRight: "8px" }}
          inputProps={{ maxLength: 1 }}
          inputRef={inputRefs.current[index]}
          disabled={index > 0 && token[index - 1] === ""}
        />
      ))}
    </div>
  );
};

export default TokenInput;
