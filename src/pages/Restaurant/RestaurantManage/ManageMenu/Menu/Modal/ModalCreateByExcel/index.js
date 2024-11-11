import { Button, Form, message, Typography, Upload } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import { ModalCreateByExcelContainer } from "./styled";
import * as XLSX from "xlsx";
import UserService from "../../../../../../../services/UserService";

const ModalCreateByExcel = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('');
    const [form] = Form.useForm()
    
    

    const exportToExcel = () => {
        const table = document.getElementById("myTable");
        if (!table) {
            console.error("Table element not found");
            return;
        }
        const wb = XLSX.utils.table_to_book(table, { sheet: "SheetJS" });
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAsExcelFile(wbout, "excel.xlsx");
    };
    
    const saveAsExcelFile = (buffer, fileName) => {
        try {
            const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = fileName;
            document.body.appendChild(link); 
            link.click(); 
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href); 
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    const handleBeforeUpload = (file) => {
        const allowedExtensions = ['.xls', '.xlsx'];
        const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
        const isAllowedType = allowedExtensions.includes(`.${fileExtension}`);

        if (isAllowedType) {
            setFileName(file.name);
        } else {
            message.error('Vui lòng chọn file có định dạng đúng (xlsx hoặc xls).');
        }

        return isAllowedType || Upload.LIST_IGNORE;
    };

    const handleChangeUpload = (info) => {
        if (info.file.status === 'done') {
            setFileName(info.file.name);
        }
    };

    const handleCreateMenu = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const file = values.excel.file.originFileObj

            await UserService.uploadFileMenu( userId, file )
            message.open({
                content: 'Tải file thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Tải file thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
        }
    }
    
     
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleCreateMenu()} loading={loading}>
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={800}
            style={{marginTop: '200px'}}
        >
            <ModalCreateByExcelContainer>
                <div className="title-type-1">
                    Tải tệp Excel món ăn
                </div>
                <div className="d-flex">
                    <Button type="primary" className="tep-mau" onClick={() => exportToExcel()}>
                        Tải tệp mẫu Excel
                    </Button>

                    <div>
                        <Form form={form}>
                            <Form.Item
                                name="excel"
                                className="m-0 p-0"
                            >
                                <Upload.Dragger
                                    className="dragger"
                                    beforeUpload={file => handleBeforeUpload(file)}
                                    onChange={handleChangeUpload} 
                                    style={{ width: '100%', height: '150px', border: 'none' }}
                                    accept=".xls, .xlsx"
                                    multiple={false}
                                    maxCount={1}
                                    fileList={[]}
                                >
                                    <Button type="primary">
                                        Tải lên
                                    </Button>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form>
                        {fileName && <Typography.Text>{`Tên tệp: ${fileName}`}</Typography.Text>}
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <table id="myTable">
                        <thead>
                            <tr>
                                <th>Tên món ăn</th>
                                <th>Giá tiền</th>
                                <th>Mô tả</th>
                                <th>Ảnh (đường dẫn ảnh)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ModalCreateByExcelContainer>
        </CustomModal>
    );
}
 
export default ModalCreateByExcel;