"use client"
import React, { useState } from 'react'
interface userinfo {
    id: number;
    name: string;
    role: string;
  }

const UserList = () => {
    const [users, setUsers] = useState<userinfo[]>([
        { id: 1, name: "Juve", role: "Admin" },
        { id: 2, name: "James", role: "Moderator" },
        { id: 3, name: "Dave", role: "User" },
      ]);
      const [isEditing, setIsEditing] = useState(false);
      const [formData, setFormData] = useState<userinfo>({
          id: 0,
          name: "",
          role: "",
        });
      const handleEdit = (user: { id: number; name: string; role: string }) => {
        setIsEditing(true);
        setFormData(user);
      };
      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
          e.preventDefault();
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
        const untoggleForm = () => {
            setIsModalOpen(false); // Toggle the form invisibility
          };
        
      const toggleModal = () => {
        setIsModalOpen(true); // Toggle the form visibility
      };
      const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
      
          try {
            console.log("Values of user edition ", formData);
            const response = await fetch("http://localhost:3000/user/eedition", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(formData),
            });
      
            console.log("Values of user edition ", formData);
            if (response.ok) {
              alert("User edited s successfully!");
              // Refetch the user data to update the list
              const fetchResponse = await fetch(
                `http://localhost:3000/user/getuser?userid=${formData.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
      
              if (fetchResponse.ok) {
                const updatedData: userinfo[] = await fetchResponse.json();
                setUsers(updatedData);
              } else {
                console.error(
                  "Error fetching updated floors:",
                  fetchResponse.statusText
                );
              }
            } else {
              console.error("Error creating Floor:", response.statusText);
            }
          } catch (error) {
            console.error("Error creating Floor:", error);
          }
      
          setIsEditing(false);
          setFormData({ id: 0, name: "", role: "" });
        };
        const handleDelete = async (id: number) => {
            try {
              const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
                method: "DELETE",
              });
        
              if (response.ok) {
                setUsers(users.filter((a) => a.id !== id));
              } else {
                console.error("Failed to delete user");
              }
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          };
  return (
    <div className=" bg-gray-100 flex  p-6 w-full">
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">List of Users</h1>

            <table className="w-full text-left border-collapse">
            <thead>
                <tr>
                <th className="border-b p-3">Name</th>
                <th className="border-b p-3">Role</th>
                <th className="border-b p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                    <button
                        className="text-blue-500 hover:underline mr-4"
                        onClick={() => handleEdit(user)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 hover:underline"
                        onClick={() => toggleModal()}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            {isEditing && (
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Edit User</h2>

                <form onSubmit={handleSave}>
                <div className="flex flex-col gap-4">
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border p-2 rounded-md"
                    />
                    <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md"
                    >
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                    </select>
                    <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            )}

            {/* Modal */}
            {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-custom-bluewhite text-blue-950 rounded-lg shadow-md p-6 max-w-2xl w-full relative">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">
                    Are you sure you want to delete this user? This action
                    cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                    onClick={untoggleForm}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                    No
                    </button>
                    <button
                    onClick={() => handleDelete(formData.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                    Yes
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
    </div>
        )}


export default UserList