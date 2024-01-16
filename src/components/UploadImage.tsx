import { Form, FormInstance, Input, Spin, Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { api } from "../utillities/api";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export default function UploadImage({
    formName,
    form,
    formLabel,
    formLabelHide
}: {
    formName?: string;
    form: FormInstance;
    formLabel?: string;
    formLabelHide?: boolean;
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
        onChange: async (info: any) => {
            if (info.file.status !== 'uploading') {
                // const { status } = info.file;
                const formData = new FormData()
             
                formData.append("image", info.file.originFileObj)
                setLoading(true)
                await api.post('/upload', formData).then((res) => {
                    message.success(`${info.file.name} file uploaded successfully.`);
                    form.setFieldValue([ formName ? formName : 'image'], res.data.file_url)
                    console.log("res ", res)
                    setImg(info.file.name)
                }).catch(() => {
                    message.error(`${info.file.name} file upload failed.`);
                }).finally(() => {
                    setLoading(false)
                })
            }
        },
    };

    // const handleImage = (e: any) => {

    //     if(!e.target.files){
    //         return
    //     }
    //     const formData = new FormData()
    //     formData.append("image", e.target.files[0])

    //     api.post('/upload',formData).then((res) => {
    //         console.log("res ", res)
    //         form.setFieldValue(['image'], res.data.file_url)
    //     }).catch((err) => {
    //         Modal.error({
    //             title: 'Error to Register',
    //             icon: <CloseCircleOutlined />,
    //             content: `${err.toString()}`,
    //         });
    //     })
    // }

    const propsLabel = formLabelHide ? {} : { label: formLabel ? formLabel : "Upload" }

    return (
        <>
            <Form.Item
                {...propsLabel}
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
                                form.getFieldValue(['image']) ? <img style={{ width: '100px' }} src={form.getFieldValue(['image'])} alt="preview_pic" /> :
                            <InboxOutlined />
                        }
                    </p>
                    <p className="ant-upload-text"> {img ? img : 'Click or drag file to this area to upload'}</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                {/* <Input type="file" onChange={(e) => handleImage(e)} /> */}
                
            </Form.Item>
            <Form.Item
                hidden
                name={['image']}
            >
                <Input />
            </Form.Item>
        </>
    )
}