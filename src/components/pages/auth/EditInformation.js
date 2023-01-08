import React, { useEffect, useState } from "react";
//fucntions
import { updateInformation } from "../../functions/user";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import UserInfo from "../layouts/Header/UserInfo";
const EditInformation = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [value, setValue] = useState({
    mem_id: "",
    mem_name: "",
    mem_mail: "",
    mem_tal: "",
    mem_img: "",
  });

  const [file, setFile] = useState("");

  const navigate = useNavigate();

  //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
  const handleChang = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // console.log(value);
  const onChange = (e) => {
    if (e.target.files[0] != null) {
      setFile(e.target.files[0]);
      console.log("File : ", file);
    } else {
      setFile("null");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("file : ", file);
    console.log("value : ", value);

    formData.append("mem_id", value.mem_id);
    formData.append("mem_name", value.mem_name);
    formData.append("mem_mail", value.mem_mail);
    formData.append("mem_tal", value.mem_tal);
    formData.append("mem_img", value.mem_img);
    formData.append("file", file);

    console.log("submit formData", formData);
    // console.log("submit value", value);
    updateInformation(user.token, formData)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    setValue({
      mem_id: user.mem_id,
      mem_name: user.mem_name,
      mem_mail: user.mem_mail,
      mem_tal: user.mem_tal,
      mem_img: user.mem_img,
    });
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>แก้ไขข้อมูลส่วนตัว</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">หน้าแรก</Link>
                </li>
                <li className="breadcrumb-item font-weight-bold">
                  แก้ไขข้อมูลส่วนตัว
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card card-primary card-outline">
                {/* <div className="card-header">
                             <h3 className="card-title">Title</h3>
                             <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                   <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                   <i className="fas fa-times" />
                                </button>
                             </div>
                          </div> */}
                <div className="card-body">
                  {/* Form Register */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-2"></div>
                      <label className="col-sm-2 col-form-label">
                        ชื่อ - นามสกุล
                      </label>
                      <input
                        type="text"
                        className="form-control col-sm-5"
                        name="mem_name"
                        placeholder="กรอกชื่อ-นามสกุล"
                        pattern="^\w(\w|\s|\[ก-๙]){0,30}"
                        title="กรอกชื่อ - นามสกุล 1 ตัวอักษรขึ้นไป"
                        defaultValue={user.mem_name}
                        onChange={handleChang}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-2"></div>
                      <label className="col-sm-2">อีเมล</label>
                      <input
                        type="email"
                        className="form-control col-sm-5"
                        name="mem_mail"
                        placeholder="กรอกอีเมล"
                        pattern="^(?=\b[a-zA-Z0-9._-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{2,}\b).*$"
                        title="กรุณาข้อมูลตามรูปแบบของอีเมล"
                        defaultValue={user.mem_mail}
                        onChange={handleChang}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-2"></div>
                      <label className="col-sm-2">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        className="form-control col-sm-5"
                        name="mem_tal"
                        placeholder="กรอกเบอร์โทรศัพท์"
                        title="กรอกตามรูปแบบ 0xxxxxxxxx"
                        pattern="^0\d{9}$"
                        defaultValue={user.mem_tal}
                        onChange={handleChang}
                      />
                    </div>
                    <div className="form-group col-md-12 ">
                      <div className="align-items-center"></div>
                    </div>

                    {user.mem_img != null && user.mem_img != "null" ? (
                      <>
                        <div className="form-group row">
                          <div className="col-md-2"></div>
                          <label className="col-md-2">รูปประจำตัว</label>
                          <div className="form-group">
                            <img
                              src={
                                process.env.REACT_APP_API_MEM_IMG +
                                "/" +
                                user.mem_img
                              }
                              width="100"
                            />
                          </div>

                          <div className="col-md-2"></div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="form-group row">
                      <div className="col-md-2"></div>
                      <label className="col-md-2">
                        รูปประจำตัว (JPEG, JPG, PNG)
                      </label>
                      <div className="form-group">
                        <div className="btn btn-default btn-file">
                          <i className="fas fa-paperclip" /> แนบไฟล์
                          <input
                            type="file"
                            className="form-control-file col-md-6"
                            name="mem_img"
                            onChange={onChange}
                          />
                        </div>
                        <pi style={{ wordBreak: "break-word" }}>
                          {" \u00A0\u00A0"}
                          {file ? file.name : <></>}
                        </pi>
                        {/* <p className="help-block">Max. 32MB</p> */}
                      </div>

                      <div className="col-md-2"></div>
                    </div>

                    <div className="form-group" align="center">
                      <Link
                        to="/"
                        style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                        className="btn btn-danger"
                      >
                        ยกเลิก
                      </Link>
                      <button
                        style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                        className="btn btn-success"
                      >
                        ยืนยัน
                      </button>
                    </div>

                    {/*disabled={checkLength()} */}
                  </form>
                </div>
                {/* /.card-body */}
                {/* <div className="card-footer"></div> */}
                {/* /.card-footer*/}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};

export default EditInformation;
