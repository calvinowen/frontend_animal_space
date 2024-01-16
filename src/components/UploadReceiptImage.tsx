import { Form, Spin, Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { api } from "../utillities/api";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export default function UploadReceiptImage({
    // formName,
    // form,
    // formLabel,
    setList,
    list,
    index,
    uploadDisable
}: {
    // formName?: string;
    // form: FormInstance;
    // formLabel?: string;
    setList: Function;
    list: any[];
    index: number;
    uploadDisable?: boolean;
}) {
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState<any>()

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e.fileList;
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        disabled: uploadDisable,
        onChange: async (info: any) => {
            if (info.file.status !== 'uploading') {
                // const { status } = info.file;
                const formData = new FormData()
             
                formData.append("image", info.file.originFileObj)
                setLoading(true)
                await api.post('/upload', formData).then((res) => {
                    let tmpList = [...list]
                    tmpList[index].Images = res.data.file_url
                    setList(tmpList)
                    setImg({
                        url: res.data.file_url,
                        name: info.file.name
                    })
                    message.success(`${info.file.name} file uploaded successfully.`);
                }).catch(() => {
                    message.error(`${info.file.name} file upload failed.`);
                }).finally(() => {
                    setLoading(false)
                })
            }
        },
    };

    return (
        <>
            <Form.Item
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                        message: 'Image is required',
                    },
                ]}
            >
                <Dragger
                    {...props}
                >
                    <p className="ant-upload-drag-icon">
                        { 
                            loading ? <Spin size="large" /> : 
                            list && list[index]?.Images ? 
                                <img style={{ width: '500px' }} src={list[index]?.Images } alt="preview_pic" /> :
                            <InboxOutlined />
                        }
                    </p>
                    <p className="ant-upload-text"> {img?.name ? img?.name : 'Click or drag file to this area to upload'}</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                
            </Form.Item>
        </>
    )
}