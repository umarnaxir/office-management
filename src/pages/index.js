import React from "react";
import FormSubmission from "@/Components/FormSubmission/FormSubmission";
import Form from "@/Components/ContactForm/Form"
import "@/styles/Form.css";
export default function Home() {
  return (
    <div>
      <FormSubmission/>
      <Form/>
    </div>
  );
}