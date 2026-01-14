/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Form, Select } from "antd"; //
import {  useEffect, useState } from "react";
import { getCategories } from "../../services/category.service"; 
import { getCollections } from "../../services/collection.service";
import { getVendors } from "../../services/vendor.service"; //


const { Option } = Select; //

const OrganizationComponent = () => {
  const [categories, setCategories] = useState<any[]>([]); 
  const [collections, setCollections] = useState<any[]>([]); 
const [vendors, setVendors] = useState<any[]>([]);
  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        
        const response = await getCategories(null, 0, 100); 
        setCategories(response.data?.categories || []); 
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try { 
        const response = await getCollections(null, 0, 100);
        setCollections(response.data?.collections || []); 
      } catch (error) {
        console.error("Failed to fetch collections", error);
      }
    };

    fetchCollections();
  }, []);

   useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors(null,0,100);
        setVendors(response.data?.vendors ||[])
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div>
      <Card>
        <h3 style={{ marginBottom: '24px', marginTop: 0, fontWeight: 600 }}>Organization</h3>
        <Form layout="vertical">
          <Form.Item label="Vendor">
            <Select placeholder="Select vendor">
              {vendors.map((vendor: any) => (
                <Option key={vendor.vendor_id} value={vendor.vendor_id}>
                  {vendor.vendor_name}
                </Option>
              ))}
              </Select>
          </Form.Item>

          <Form.Item label="Category">
            <Select placeholder="Select category">
              {categories.map((cat: any) => (
                <Option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Collections">
            <Select placeholder="Select collections">
              {collections.map((col: any) => (
                <Option key={col.collection_id} value={col.collection_id}>
                  {col.collection_name}
                </Option>
              ))}
               
            </Select>
          </Form.Item>

          <Form.Item label="Tags">
             <Select mode="tags" placeholder="Enter tags here" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default OrganizationComponent;