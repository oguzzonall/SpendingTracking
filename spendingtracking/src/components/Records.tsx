import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Button, Table, Tag, Modal, Form, Input, Select, Space } from "antd";
import { Record, RecordForm } from "../types/record";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { addRecord, deleteRecord, getRecords, updateRecord } from "../store/actions/recordActions";
import { useEffect, useState } from "react";
import { Mode } from "../types/general";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

function Records() {
  const { data, loading } = useSelector((state: AppState) => state.records);
  const { data: categories } = useSelector((state: AppState) => state.categories);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") dispatch(addRecord(form));
    else if (mode === "edit" && typeof updateId === "number") dispatch(updateRecord(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number") dispatch(deleteRecord(deleteId));
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => (
        <>
          {Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(amount)}
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Record["category"], record: Record) => {
        return (
          <Tag color={category.color} key={category.id}>
            {category.name.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return (
          <>
            {new Date(updatedAt).toLocaleDateString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space>
            <EditOutlined
              style={{ color: "#0390fc" }}
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              style={{ color: "#c20808" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button type="primary" onClick={() => showModal("new")}>
          New Record
        </Button>
      </div>
      <Modal
        title={mode === "new" ? "Create New Record" : mode === "edit" ? "Update Record" : "Delete Record"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
      >
        {mode === "new" || mode === "edit" ? (
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Title" required>
              <Input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Form.Item>
            <Form.Item label="Amount" required>
              <Input
                name="amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              />
            </Form.Item>
            <Form.Item label="Category">
              <Select
                value={form.category_id}
                defaultValue={form.category_id}
                onChange={(category_id) => setForm({ ...form, category_id })}
              >
                <Select.Option value={0} disabled>
                  Select a category
                </Select.Option>
                {categories.map((category) => {
                  return (
                    <Select.Option value={category.id} key={category.id}>
                      {category.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <>Are you sure?</>
        ) : null}
      </Modal>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}

export default Records;
