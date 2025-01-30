
import { useEffect, useState } from "react";
import { getToken, createUser, getPositions } from "../services/apiService";

export default function RegistrationUser() {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: null,
  });

  useEffect(() => {
    const fetchPositions = async () => {
      const data = await getPositions();
      setPositions(data);
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getToken();
    if (!token) {
      alert("Failed to retrieve authentication token.");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("position_id", formData.position_id);
    submitData.append("photo", formData.photo);

    try {
      const response = await createUser(token, submitData);
      console.log("Registration success:", response);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Position:</label>
        <select
          name="position_id"
          value={formData.position_id}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="">Select a position</option>
          {positions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Photo:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

