"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Kapcsolat = () => {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    piercing_type: "",
    subject: "", // Hozzáadva a hiányzó mező
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/form-config?populate=*`
        );
        const data = response.data.data;
        const config = {
          cities: data.varos.map((city) => city.cities),
          piercingTypes: data.piercingTypes.map((type) => type.piercingTypes),
        };
        setFormConfig(config);
      } catch (error) {
        console.error("Error fetching form configuration:", error);
      }
    };

    fetchFormConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          city: formData.city, // Hozzáadva a city mező
          piercing_type: formData.piercing_type, // Hozzáadva a piercing_type mező
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setFormData({
          name: "",
          email: "",
          city: "", // Reset city mező
          piercing_type: "", // Reset piercing_type mező
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Hiba történt.");
      }
    } catch (err) {
      console.error(
        "Hiba történt a kapcsolatfelvételi űrlap elküldésekor:",
        err
      );
      setError("Nem sikerült elküldeni az üzenetet.");
    }
  };

  if (!formConfig) {
    return null;
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Kapcsolat</h2>
          {success && (
            <p className="text-green-600 text-center mb-4">
              Az üzenet sikeresen elküldve!
            </p>
          )}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Város
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#E3C16F]"
              >
                <option value="" disabled>
                  Válassz várost
                </option>
                {formConfig.cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Piercing fajta
              </label>
              <div className="mt-1 space-y-2">
                {formConfig.piercingTypes.map((type, index) => (
                  <label key={index} className="ml-2 inline-flex items-center">
                    <input
                      type="radio"
                      name="piercing_type"
                      value={type}
                      onChange={handleChange}
                      required
                      className="form-radio h-4 w-4 text-[#E3C16F] focus:ring-[#E3C16F]"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Név
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#E3C16F]"
                placeholder="Írd be a neved"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail cím
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#E3C16F]"
                placeholder="Írd be az e-mail címed"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Tárgy
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#E3C16F]"
                placeholder="Írd be az üzenet tárgyát"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Üzenet
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#E3C16F]"
                placeholder="Írd be az üzeneted"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E3C16F] text-white font-semibold py-2 rounded-md hover:bg-[#E3C16F95] focus:outline-none focus:ring focus:[#E3C16F95] "
            >
              Küldés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Kapcsolat;
