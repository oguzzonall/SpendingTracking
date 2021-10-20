import { Button, Table, Tag, Modal, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Mode = "new" | "edit" | "delete";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

function Categories() {
  const { data, loading, error } = useSelector((state: AppState) => state.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    // Mode değerine göre create or update action creator fonksiyonu çağır
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof updateId === "number") dispatch(updateCategory(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number") dispatch(deleteCategory(deleteId));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => (
        <Tag color={category.color} key={category.id}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, category: Category) => (
        <Space>
          <EditOutlined
            style={{ color: "#0390fc" }}
            onClick={() => {
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            style={{ color: "#c20808" }}
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <Button type="primary" onClick={() => showModal("new")}>
            New Category
          </Button>
        </div>
        <Modal
          title={mode == "new" ? "Create New Category" : mode === "edit" ? "Update Category" : "Delete Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Name" required>
                <Input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select value={form.type} defaultValue="expense" onChange={(type) => setForm({ ...form, type: type })}>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                <SketchPicker color={form.color} onChange={(color) => setForm({ ...form, color: color.hex })} />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
