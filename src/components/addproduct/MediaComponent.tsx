/* eslint-disable @typescript-eslint/no-explicit-any */
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Card, Image } from "antd";
import applicationConfig from "../../config/applicationConfig";
import React from "react";
const MediaComponent = ({ uploadedImagePath, setUploadedImagePath }:any) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: applicationConfig.FILE_BASE_URL + "/upload",
    onChange(info:any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log("File path:", info.file.response.file.path);
        setUploadedImagePath(info.file.response.file.path);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <Card>
        <h3 style={{ marginBottom: "24px", marginTop: 0, fontWeight: 600 }}>
          Media
        </h3>
        <div>
          {/* <Dragger {...props}>
            {uploadedImagePath!=null ? (
              <img
                src={applicationConfig.FILE_BASE_URL + "/" + uploadedImagePath}
                alt="Uploaded"
                style={{ width: "100%", height: "auto", marginBottom: "16px" }}
              />
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </>
            )}
          </Dragger> */}
          <Upload {...props} showUploadList={false}>
            {uploadedImagePath != null ? (
             <Image preview={false} width={500} src={applicationConfig.FILE_BASE_URL + "/" + uploadedImagePath} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </div>
            )}
          </Upload>
        </div>
      </Card>
    </div>
  );
};

export default MediaComponent;
