export default function FormSubmission() {
  const [form, setForm] = useState({
    email: '',
    message: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <form>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <br />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
      ></textarea>
      <p>Preview: {form.email} | {form.message}</p>
    </form>
  );
}


// import React, { useState } from "react";

// export default function FormSubmission() {
//   const [form, setForm] = useState({ name: "", lastName: "", email: "" });
//   const [submissions, setSubmissions] = useState([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmissions([...submissions, form]);
//     setForm({ name: "", lastName: "", email: "" }); 
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Name:{" "}
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               style={{ padding: "5px", marginLeft: "10px" }}
//             />
//           </label>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Last Name:{" "}
//             <input
//               type="text"
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               required
//               style={{ padding: "5px", marginLeft: "10px" }}
//             />
//           </label>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Email:{" "}
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               style={{ padding: "5px", marginLeft: "10px" }}
//             />
//           </label>
//         </div>
//         <button type="submit" style={{ padding: "5px 10px", cursor: "pointer" }}>
//           Submit
//         </button>
//       </form>

//       {submissions.length > 0 && (
//         <div>
//           <h3>All Submissions:</h3>
//           {submissions.map((entry, index) => (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               <p><strong>Name:</strong> {entry.name}</p>
//               <p><strong>Last Name:</strong> {entry.lastName}</p>
//               <p><strong>Email:</strong> {entry.email}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
