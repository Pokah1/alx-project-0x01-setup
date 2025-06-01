import { UserData, UserModalProps } from "@/interfaces";
import React, { useState } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setUser((prevUser) => {
        const updatedUser = JSON.parse(JSON.stringify(prevUser));
        let obj = updatedUser;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return updatedUser;
      });
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
  <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-lg max-h-screen overflow-y-auto my-8 mx-4">

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <InputField name="name" label="Full Name" value={user.name} onChange={handleChange} />
          <InputField name="username" label="Username" value={user.username} onChange={handleChange} />
          <InputField name="email" label="Email" value={user.email} onChange={handleChange} type="email" />
          <InputField name="phone" label="Phone" value={user.phone || ""} onChange={handleChange} />
          <InputField name="website" label="Website" value={user.website || ""} onChange={handleChange} />

          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <InputField name="address.street" label="Street" value={user.address?.street || ""} onChange={handleChange} />
            <InputField name="address.suite" label="Suite" value={user.address?.suite || ""} onChange={handleChange} />
            <InputField name="address.city" label="City" value={user.address?.city || ""} onChange={handleChange} />
            <InputField name="address.zipcode" label="Zipcode" value={user.address?.zipcode || ""} onChange={handleChange} />
            <InputField name="address.geo.lat" label="Latitude" value={user.address?.geo.lat || ""} onChange={handleChange} />
            <InputField name="address.geo.lng" label="Longitude" value={user.address?.geo.lng || ""} onChange={handleChange} />
          </div>

          {/* Company */}
          <InputField name="company.name" label="Company Name" value={user.company?.name || ""} onChange={handleChange} />
          <InputField name="company.catchPhrase" label="Catch Phrase" value={user.company?.catchPhrase || ""} onChange={handleChange} />
          <InputField name="company.bs" label="BS" value={user.company?.bs || ""} onChange={handleChange} />

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;

// Reusable input field component
const InputField = ({
  name,
  label,
  value,
  onChange,
  type = "text",
}: {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
