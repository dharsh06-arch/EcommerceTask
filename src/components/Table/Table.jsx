import React from "react";
import { Table, Card, Input } from "antd";
import { Search } from "lucide-react";

const DataTable = ({ 
  title, 
  subtitle, 
  columns, 
  data, 
  loading, 
  onSearch, 
  extraButtons 
}) => {
  return (
    <div className="flex justify-center w-full">
      {/* max-w-6xl keeps the table from stretching too wide on large screens */}
      <Card className="w-full max-w-6xl shadow-sm border-slate-200 rounded-xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {onSearch && (
              <Input
                placeholder="Search..."
                prefix={<Search size={16} className="text-slate-400" />}
                className="rounded-lg w-full md:w-64"
                onChange={(e) => onSearch(e.target.value)}
              />
            )}
            {/* Slot for "Add Product" or "Export" buttons */}
            {extraButtons}
          </div>
        </div>

        {/* Ant Design Table */}
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 7,
            position: ["bottomCenter"], // Centers pagination
            showSizeChanger: false,
          }}
          // Ensures the table handles overflow on mobile
          scroll={{ x: 'max-content' }} 
          className="border border-slate-100 rounded-lg overflow-hidden"
        />
      </Card>
    </div>
  );
};

export default DataTable;