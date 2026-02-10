import { message, Table, Modal, Tooltip, Space, Divider, Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { Edit2, Mail, Plus, Trash } from "lucide-react";
import Input from "../../../components/Input/Input";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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
    } catch {
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
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleAddOpen = () => {
    setEditId(null);
    setFormData({ username: "", email: "", password: "" });
    setIsOpen(true);
  };

  const handleOpenModal = (item) => {
    setEditId(item.id);
    setFormData({
      username: item.username || "",
      email: item.email || "",
      password: "",
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    const { username, email, password } = formData;

    if (!username || !email) {
      setError("Username and Email required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`https://fakestoreapi.com/users/${editId}`, {
          username,
          email,
          password,
        });

        const updated = users.map((u) =>
          u.id === editId ? { ...u, username, email } : u
        );

        setUsers(updated);
        message.success("User updated");
      } else {
        const res = await axios.post("https://fakestoreapi.com/users", {
          username,
          email,
          password,
        });

        const newUser = {
          ...res.data,
          name: { firstname: "New", lastname: "User" },
          phone: "—",
          address: {},
        };

        setUsers([newUser, ...users]);
        message.success("User added");
      }

      setIsOpen(false);
    } catch {
      message.error("Operation failed");
    }
  };

  const handleDel = (id) => {
    Modal.confirm({
      title: "Delete user?",
      okType: "danger",
      onOk: async () => {
        await axios.delete(`https://fakestoreapi.com/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
        message.success("User deleted");
      },
    });
  };

  const columns = [
     {
         title: "User Profile",
         key: "name",
         render: (_, record) => (
           <div className="flex items-center gap-3">
             <Avatar className="bg-indigo-500 text-white border-2 border-indigo-100 uppercase">
               {record.name.firstname[0]}{record.name.lastname[0]}
             </Avatar>
             <div>
               <div className="font-bold text-slate-800 capitalize leading-tight">
                 {record.name.firstname} {record.name.lastname}
               </div>
               <div className="text-xs text-slate-400 font-mono italic">@{record.username}</div>
             </div>
           </div>
         ),
       },
    { title: "Username", render: (i) => i.username },
    { title: "Email", render: (i) => <>
      <div className="flex items-center gap-2 text-slate-600">
            <Mail size={14} className="text-indigo-400" /> {i.email}
          </div></> },
    { title: "Phone", render: (i) => i.phone || "—" },
    {
      title: "Actions",
      align: 'right',
      render: (_, item) => (
        <Space split={<Divider type="vertical" className="bg-slate-200" />}>
          <Tooltip title="Edit Product">
            <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 cursor-pointer hover:text-indigo-600 transition-all hover:bg-indigo-50 rounded-lg">
              <Edit2 size={16} />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button onClick={() => handleDel(item.id)} className="p-2 text-slate-400 cursor-pointer hover:text-red-500 transition-all hover:bg-red-50 rounded-lg">
              <Trash size={16} />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, voluptate!</p>
        </div>
        <Button
          onClick={handleAddOpen}
          className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-indigo-200 p-4 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add New User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
          pagination={{ pageSize: 6, position: ['bottomCenter'] }}

        className="mt-4"
      />

      <Modal
        title={editId ? "Edit User" : "Add User"}
        open={isOpen}
        onOk={handleSave}
        onCancel={() => setIsOpen(false)}
      >
        {error && <p className="text-red-500">{error}</p>}

        <Input
          label="Username"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {!editId && (
          <Input
            label="Password"
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        )}
      </Modal>
    </>
  );
};

export default Users;
