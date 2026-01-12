/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import{
    Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  notification,
  Space,
  Table,
  type TableProps,
} from "antd";


import { useEffect, useState } from "react";
import { createCollection, deleteCollectionService, getCollections, updateCollection } from "../../services/collection.service.ts";    
export interface ICollection {
  collection_id: number;
  collection_name: string;
  collection_descriptions: string;
}
const CollectionListPage = () => {
  const columns: TableProps<ICollection>["columns"] = [
    {
        title: "Name",
        dataIndex: "collection_name",
        key: "collection_name",
        render: (text) => <a>{text}</a>,
        },
        {
        title: "Description",
        dataIndex: "collection_descriptions",
        key: "collection_descriptions",
        },  
    {
      title: "Action",
      key: "action",
        render: (_:any, record) => (
        <Space size="middle">
          <Button onClick={()=>{
            collectionForm.setFieldsValue(record)   
            setCollectionId(record?.collection_id)
            setIsEditing(true);
            setIsModalOpen(true);
          }} type="link">Edit</Button>
          <Button onClick={()=>{
            Modal.confirm({
                title: "Are you sure you want to delete?",
                okText: "Yes",
                onOk: ()=>{
                const showDeletingStatus = message.loading("Deleting....");
                deleteCollectionService(record.collection_id).then(()=>{
                    fetchCollections();
                }
                ).catch(()=>{
                    message.error("Something went wrong");
                }).finally(()=>{
                    showDeletingStatus();
                })
                }           
            })
          }} type="link" danger>Delete</Button>
        </Space>
      ),
    },
  ];    
    const [collectionForm] = Form.useForm();
    const [collections, setCollections] = useState<ICollection[]>([]);
    const[collectionCount,setCollectionCount]=useState<number>(0);
   const [currentPageNo, setCurrentPageNo] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [collectionId, setCollectionId] = useState<number | null>(null);

    const onCollectionFormSubmit=(values: any)=>{

        const showMessageCreateOrUpdate = message.loading(
          isEditing ? "Updating Collection..." : "Creating Collection..."
        );
        if(isEditing){
            updateCollection(collectionId as number,values).then((_response)=>{
                notification.success({
                    message:"Collection updated successfully"
                });
                fetchCollections();
                setIsModalOpen(false);
            }).catch((_err:any)=>{
                message.error("Something went wrong");
            }).finally(()=>{
                showMessageCreateOrUpdate();
            });
            return
        }
        createCollection(values).then((_response)=>{
            notification.success({
                message:"Collection created successfully",
                description: "Collection has been created successfully."
            });
            collectionForm.resetFields();
            fetchCollections();
            setIsModalOpen(false);  

        })
        .catch((err:any)=>{
            message.error("Something went wrong");
        })
        .finally(()=>{
            showMessageCreateOrUpdate();
        });
    } 

//modal handlers
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};

//fetch collections
const fetchCollections = async () => {
    try{
        const offset = (pageSize * currentPageNo)- pageSize;
        const response= await getCollections(null, offset,pageSize);
        setCollections(response.data?.collections || []);
        setCollectionCount(response.data?.totalCount || 0);
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
  
  };

  useEffect(() => {
    fetchCollections();
  }, [currentPageNo]);

  return(
    <div>
       <Card
        title="Collections"
        className="mb-4"
      extra={
  <Button onClick={() => {
    setIsEditing(false); 
    collectionForm.resetFields(); 
    setIsModalOpen(true);
  }}>
    Add Collection
  </Button>
}
      >
        <Table
         rowKey={"category_id"}
          columns={columns}
          dataSource={collections}
          pagination={{
            current: currentPageNo,
            pageSize: pageSize,
            total: collectionCount,
            onChange: (pageNo) => {
              setCurrentPageNo(pageNo);

            },

          onShowSizeChange: (pageSizeFromParam)=>{
            setCurrentPageNo(pageSizeFromParam)
            }
          }}
        />
      </Card>

      <Modal
        title={isEditing ? "Edit Collection" : "Add Collection"}
          closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
        >

        <Form
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        form={collectionForm}
        name="control-hooks"
        onFinish={onCollectionFormSubmit}  
        style={{maxWidth:600}}     

        > 
        <Form.Item
            name="collection_name"
            label="Collection Name"
            rules={[{ required: true, message: "Please enter collection name" }]}
          >
            <Input />
          </Form.Item>
            <Form.Item
            name="collection_descriptions"
            label="Collection Description"
            rules={[{required:false}]}
            >
                <Input.TextArea/>
            </Form.Item>
            <div  className="flex justify-end items-center gap-3">
             <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={()=>{collectionForm.resetFields()}} htmlType="button">Reset</Button>
            </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CollectionListPage;