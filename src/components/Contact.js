import "./Contact.css";
function Contact() {
  return (
    <form
      action="mailto:Projectbeclearedlearninghub@gmail.com"
      method="POST"
      encType="text/plain"
    >
      <div className="contact-container">
        <h1>Resolve your queries here.</h1>
        <h2 className="text-center"> Contact Us</h2>
        <div className="mb-3">
          <label htmlFor="contact_email" className="form-label">
            Email address :
          </label>
          <input
            type="email"
            className="form-control"
            name="Email"
            id="contact_email"
            placeholder="name@example.com"
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text_area" className="form-label">
            Enter your query here :
          </label>
          <textarea
            className="form-control"
            name="problem"
            id="text_area"
            rows="4"
            required={true}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Contact;
