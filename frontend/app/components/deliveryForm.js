import { useState } from "react";

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    pickupName: "",
    pickupStreet: "",
    pickupCity: "",
    pickupProvince: "",
    pickupPostalCode: "",
    pickupCountry: "",
    pickupPhone: "",
    dropoffName: "",
    dropoffStreet: "",
    dropoffCity: "",
    dropoffProvince: "",
    dropoffPostalCode: "",
    dropoffCountry: "",
    dropoffPhone: "",
    manifestItems: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // Replace this with your API call logic
    try {
      const response = await fetch(
        "https://createdelivery-oqo3llm6oq-uc.a.run.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            pickupName: formData.pickupName,
            pickupStreet: formData.pickupStreet,
            pickupCity: formData.pickupCity,
            pickupProvince: formData.pickupProvince,
            pickupPostalCode: formData.pickupPostalCode,
            pickupCountry: formData.pickupCountry,
            pickupPhone: formData.pickupPhone,
            dropoffName: formData.dropoffName,
            dropoffStreet: formData.dropoffStreet,
            dropoffCity: formData.dropoffCity,
            dropoffProvince: formData.dropoffProvince,
            dropoffPostalCode: formData.dropoffPostalCode,
            dropoffCountry: formData.dropoffCountry,
            dropoffPhone: formData.dropoffPhone,
            manifestItems: formData.manifestItems,
          }).toString(), // Convert to URL-encoded string
        }
      );
      if (!response.ok) throw new Error("Failed to create delivery");
      const result = await response.json();
      alert("Delivery created successfully!");
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Error creating delivery");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create a Delivery</h2>
      <fieldset>
        <legend>Pickup Details</legend>
        <input
          type="text"
          name="pickupName"
          placeholder="Pickup Name"
          value={formData.pickupName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupStreet"
          placeholder="Pickup Street Address"
          value={formData.pickupStreet}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupCity"
          placeholder="Pickup City"
          value={formData.pickupCity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupProvince"
          placeholder="Pickup Province"
          value={formData.pickupProvince}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupPostalCode"
          placeholder="Pickup Postal Code"
          value={formData.pickupPostalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupCountry"
          placeholder="Pickup Country"
          value={formData.pickupCountry}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="pickupPhone"
          placeholder="Pickup Phone Number"
          value={formData.pickupPhone}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <legend>Dropoff Details</legend>
        <input
          type="text"
          name="dropoffName"
          placeholder="Dropoff Name"
          value={formData.dropoffName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffStreet"
          placeholder="Dropoff Street Address"
          value={formData.dropoffStreet}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffCity"
          placeholder="Dropoff City"
          value={formData.dropoffCity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffProvince"
          placeholder="Dropoff Province"
          value={formData.dropoffProvince}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffPostalCode"
          placeholder="Dropoff Postal Code"
          value={formData.dropoffPostalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffCountry"
          placeholder="Dropoff Country"
          value={formData.dropoffCountry}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="dropoffPhone"
          placeholder="Dropoff Phone Number"
          value={formData.dropoffPhone}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <legend>Manifest</legend>
        <textarea
          name="manifestItems"
          placeholder="Manifest Items (e.g., Package 1, Package 2)"
          value={formData.manifestItems}
          onChange={handleChange}
          required
        />
      </fieldset>
      <button type="submit">Create Delivery</button>
    </form>
  );
}
