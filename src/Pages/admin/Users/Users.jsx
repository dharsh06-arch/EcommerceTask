import { message, Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { Plus } from "lucide-react";
import Input from "../../../components/Input/Input";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/users");
      setUsers(res.data);
    } catch (err) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddUser = async () => {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("https://fakestoreapi.com/users", {
        username,
        email,
        password,
      });

      // Normalize user (IMPORTANT)
      const newUser = {
        ...res.data,
        name: {
          firstname: username,
          lastname: "",
        },
      };

      setUsers([newUser, ...users]);
      setIsOpen(false);
      setFormData({ username: "", email: "", password: "" });
      message.success("User added successfully");
    } catch (err) {
      message.error("Failed to add user");
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, item) => (
        <div className="flex gap-1">
          <span>{item.name?.firstname || "—"}</span>
          <span>{item.name?.lastname || ""}</span>
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "—",
    },
    {
      title: "Address",
      key: "address",
      render: (_, item) => {
        const addr = item.address;
        if (!addr) return "—";

        return (
          <div className="text-sm">
            <p>
              {addr.street} {addr.number}
            </p>
            <p>
              {addr.city}, {addr.zipcode}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-indigo-950 p-3 rounded text-white">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6"
            onClick={() => setIsOpen(true)}
          >
            <Plus size={18} /> Add User
          </Button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm">
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 7,
              position: ["bottomCenter"],
              showSizeChanger: false,
            }}
          />
        </div>
      </div>

      <Modal
        title="Add New User"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={handleAddUser}
        okText="Add User"
        okButtonProps={{
          className:
            "bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",
        }}
        cancelButtonProps={{
          className: "bg-gray-100 rounded-lg",
        }}
        width={500}
      >
        <div className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <Input
            required
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            required
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default Users;
