import { useEffect, useState } from "react";

export default function PasswordCheck() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else {
      alert("Password is valid!");
    }
  }

  useEffect(() => {
    if (password.length < 8) {
      setMsg("Password must be at least 8 characters long.");
    } else {
      setMsg("Password is valid!");
    }
  }, [password]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
      <p>{msg}</p>
    </form>
  );
}
