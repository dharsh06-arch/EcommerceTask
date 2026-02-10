import React, { useEffect, useState } from "react";
import { Table, Modal, Tag, Space, Tooltip, message, Divider } from "antd";
import { Edit2, Trash, Plus, Package, DollarSign } from "lucide-react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",   
    image: "",
  });

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      const apiProducts = res.data.map(item => ({ ...item, key: item.id }));
      setProducts(apiProducts);
    } catch (err) {
      console.log(err)
      message.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  // const handleOpenModal = (item = null) => {
  //   if (item) {
  //     setEditId(item.id);
  //     setFormData({ ...item });
  //   } else {
  //     setEditId(null);
  //     setFormData({ title: "", price: "", description: "", category: "", image: "" });
  //   }
  //   setIsOpen(true);
  // };

  const handleAddProduct = async()=>{
    setIsOpen(true)
    try {
        const { title, price, description, category, image } = formData;
         if (!title || !price || !description || !category || !image) {
      setError("Please fill in all fields.");
      return;
    }
      const response = await axios.post(`https://fakestoreapi.com/products`, { title, price, description, category, image })
       
      setProducts([response.data , ...products])
      setIsOpen(false)
    setFormData({ title: "", price: "", description: "", category: "", image: "" });
      
    } catch (error) {
    message.error(error.response?.data || "Failed to save product");
      
    }
  }

  const handleOpenModal = (item) => {
    setIsOpen(true)
    setFormData(item)
    setEditId(item.id)
  }

  const handleSaveProduct = async () => {
    try {
       const { title, price, description, category, image } = formData;
         if (!title || !price || !description || !category || !image) {
      setError("Please fill in all fields.");
      return;
    }
    if(editId){
    const response = await axios.put(`https://fakestoreapi.com/products/${editId}`,{
        title, price, description, category, image
      })
      const updatedProducts = products.map(p => p.id === editId ? response.data : p);
setProducts(updatedProducts);
setIsOpen(false)
      message.success("Product updated successfully");
    }else{
      handleAddProduct()
    }
    
    } catch (error) {
      message.error(error.response.data)
    }
  }

 
const handleDel = (id) => {
  Modal.confirm({
    title: 'Are you sure you want to delete this product?',
    content: 'This action cannot be undone.',
    okText: 'Yes, Delete',
    okType: 'danger',
    onOk: () => {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.delete(`https://fakestoreapi.com/products/${id}`);
          setProducts(products.filter(p => p.id !== id));
          message.success("Product removed");
          resolve();
        } catch (error) {
          message.error("Failed to delete product");
          reject();
        }
      });
    }
  });
};


  const columns = [
    {
      title: "Products",
      dataIndex: "title",
      key: "title",
      width: '45%',
   render: (_, item) => (
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0 group relative overflow-hidden">
            <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="max-w-xs">
            <h1 className="font-bold text-slate-800 text-sm truncate">{item.title}</h1>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mt-0.5">
              {item.description}
            </p>
          </div>
        </div>
      ),
    },
    { 
      title: "Category", 
      dataIndex: "category", 
          render: (item) => <Tag className="rounded-md px-3 py-0.5 bg-slate-100 border-none text-slate-600 font-medium capitalize">{item}</Tag>

    },
    { 
      title: "Price", 
      dataIndex: "price", 
      // sorter:(a, b) => a.price - b.price,
      className: "font-semibold text-slate-700",
      render: (p) => (p) 
    },
    {
      title: "Actions",
      align: 'right',
      render: (_, item) => (
        <Space split={<Divider type="vertical" className="bg-slate-200" />}>
          <Tooltip title="Edit Product">
            <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all hover:bg-indigo-50 rounded-lg">
              <Edit2 size={16} />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button onClick={() => handleDel(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg">
              <Trash size={16} />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
   

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Product Managemnet
          </h1>
          <p className="text-slate-500 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, consectetur.</p>
        </div>
        <Button onClick={handleAddProduct} className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 shadow-lg shadow-indigo-100 flex items-center gap-2 border-none">
          <Plus size={20} /> <span className="font-bold">Add Product</span>
        </Button>
      </div>


      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={products} 
          loading={loading}
          pagination={{ pageSize: 6 }}
          className="custom-table"
           pagination={{
            pageSize: 7,
            position: ["bottomCenter"], 
            showSizeChanger: false,
          }}
        />
      </div>

      <Modal
        title={editId ? 'Modify Product' : 'Create New Product'}
        open={isOpen}
        centered
        onCancel={() => setIsOpen(false)}
        onOk={handleSaveProduct}
        // onOk={handleSaveProduct}
        okText={editId ? "Update Product" : "Add Product"}
        okButtonProps={{
    className: "bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors",
  }}
  cancelButtonProps={{
    className: "bg-gray-100 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors",
  }}
       
        width={600}
      >
        <div className="space-y-4 py-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <Input required label="Product Name" name="title" value={formData.title} onChange={handleChange} />
            <Input required label="Category" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <Input required label="Price" type="number" name="price" value={formData.price} onChange={handleChange} />
          <Input required label="Image URL" name="image" value={formData.image} onChange={handleChange} />
          <div className="flex flex-col gap-1">
             <label className="text-sm font-medium text-slate-700">Description</label>
             <textarea 
               name="description" 
               rows="3" 
               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
               value={formData.description} 
               onChange={handleChange}
             />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;