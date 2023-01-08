import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
//fucntions
import { readQuestion } from "../../functions/user";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Query
import { loadQuestionType } from "../../functions/query";
import { updateQuestion } from "../../functions/user";

//Toastify
import { toast } from "react-toastify";

//Zoomimg
import ImageViewer from "react-simple-image-viewer";

const EditQuestion = () => {
  //IMG ZOOM START
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const images = [process.env.REACT_APP_API_IMG + "/" + modalViewValue.qst_img];
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  //IMG ZOOM END

  // const { qst_id } = useParams();
  const question_id = localStorage.question_id;
  const [editValue, setEditValue] = useState([]);
  const [questionType, setQuestionType] = useState([]);
  const [value, setValue] = useState({
    type_id: 0,
    qst_title: "",
    qst_img: "",
    qst_detail: "",
    qst_name: "",
    qst_mail: "",
  });
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const loadDataTypeQ = async () => {
    loadQuestionType(user.token)
      .then((res) => {
        // console.log("EditQ Type :", res.data);
        setQuestionType(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const loadDataQuestion = async () => {
    readQuestion(user.token, { qst_id: question_id })
      .then((res) => {
        // console.log(res.data);
        if (res.data[0].sta_id != 3) {
          navigate("/user-question");
        } else {
          setEditValue(res.data);
          setValue({
            sta_id: res.data[0].sta_id,
            type_id: res.data[0].type_id,
            qst_title: res.data[0].qst_title,
            qst_img: res.data[0].qst_img,
            qst_detail: res.data[0].qst_detail,
            qst_name: res.data[0].qst_name,
            qst_mail: res.data[0].qst_mail,
            qst_id: res.data[0].qst_id,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (question_id == null) {
      navigate("/user-question");
    } else {
      loadDataTypeQ().then(() => {
        loadDataQuestion();
        // console.log("editValue : ", question_id);
      });
    }
  }, []);

  //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
  const handleChang = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // console.log(value);
  const onChange = (e) => {
    if (e.target.files[0] != null) {
      setFile(e.target.files[0]);
      // console.log("File : ", file);
      setValue({ ...value, [e.target.name]: e.target.value });
    } else {
      setFile("null");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (value.type_id === 0 && file == "") {
    //    toast.warning("คุณยังไม่ได้แก้ไขข้อมูล");
    // } else {
    const formData = new FormData();
    //    console.log("file : ", file);
    //    console.log("value : ", value);

    formData.append("sta_id", value.sta_id);
    formData.append("type_id", value.type_id);
    formData.append("qst_title", value.qst_title);
    formData.append("qst_img", value.qst_img);
    formData.append("qst_detail", value.qst_detail);
    formData.append("qst_name", value.qst_name);
    formData.append("qst_mail", value.qst_mail);
    formData.append("qst_id", value.qst_id);
    formData.append("file", file);
    // console.log("submit Edit Question", value);
    // console.log("submit Edit Question", value.sta_id);
    // console.log("submit Edit Question", value.type_id);
    updateQuestion(user.token, formData)
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data);
        navigate("/user-question");
      })
      .catch((err) => {
        // console.log(err.response.data);
        toast.warning(err.response.data);
      });
    // }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>แก้ไขคำถาม</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/index-user">หน้าแรก</Link>
                </li>
                <li className="breadcrumb-item float-sm-right">
                  <Link
                    to="/user-question"
                    onClick={() => {
                      localStorage.setItem("question_id", null);
                      dispatch({
                        type: "REMOVEQUESTION",
                      });
                    }}
                  >
                    คำถามของฉัน
                  </Link>
                </li>
                <li className="breadcrumb-item font-weight-bold">แก้ไขคำถาม</li>
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
              <div className="card">
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
                  {editValue.map((value, key) => (
                    <form key={key} onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <label className="col-sm-2 col-form-label">
                          หมวดคำถาม
                        </label>
                        <select
                          name="type_id"
                          className="form-control col-sm-6"
                          onChange={handleChang}
                          defaultValue={value.type_id}
                        >
                          <option value={0}>กรุณาเลือก</option>
                          {questionType.map((questionType) => (
                            <option
                              key={questionType.type_id}
                              value={questionType.type_id}
                            >
                              {questionType.type_name}
                            </option>
                          ))}
                        </select>
                        <div className="col-sm-2"></div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <label className="col-sm-2">หัวข้อคำถาม</label>
                        <input
                          type="text"
                          className="form-control col-sm-6"
                          name="qst_title"
                          defaultValue={value.qst_title}
                          placeholder="กรอกหัวข้อคำถาม"
                          onChange={handleChang}
                        />
                        <div className="col-sm-2"></div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <label className="col-sm-2">รายละเอียด</label>
                        <textarea
                          className="form-control col-sm-6"
                          name="qst_detail"
                          defaultValue={value.qst_detail}
                          rows="3"
                          onChange={handleChang}
                        ></textarea>
                        <div className="col-sm-2"></div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <label className="col-sm-2">ผู้ตั้งคำถาม</label>
                        <input
                          type="text"
                          className="form-control col-sm-6"
                          name="qst_name"
                          defaultValue={value.qst_name}
                          placeholder="Input Username 4 characters or more"
                          onChange={handleChang}
                          disabled={true}
                        />
                        <div className="col-sm-2"></div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <label className="col-sm-2">อีเมล</label>
                        <input
                          type="email"
                          className="form-control col-sm-6"
                          name="qst_mail"
                          defaultValue={value.qst_mail}
                          placeholder="example@example.com"
                          pattern="^(?=\b[a-zA-Z0-9._-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{2,}\b).*$"
                          title="Please input correct format Email"
                          onChange={handleChang}
                          disabled={true}
                        />
                        <div className="col-sm-2"></div>
                      </div>
                      {value.qst_img != 0 && (
                        <>
                          <div className="form-group row">
                            <div className="col-sm-2"></div>
                            <label className="col-sm-2">ไฟล์ที่แนบไว้</label>

                            {value.qst_img != 0 ? (
                              <>
                                {value.qst_img.match(/\.(pdf|PDF)$/) ? (
                                  <>
                                    {/* <h1>/user-read-pdf</h1> */}
                                    {/* <Link to="/user-read-pdf" className="btn btn-success">
                                                         อ่านไฟล์ PDF
                                                      </Link> */}
                                    <a
                                      className="btn btn-success"
                                      href={
                                        process.env.REACT_APP_API_IMG +
                                        "/" +
                                        value.qst_img
                                      }
                                      target="_blank"
                                    >
                                      อ่านไฟล์ PDF
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      className="btn btn-success"
                                      href={
                                        process.env.REACT_APP_API_IMG +
                                        "/" +
                                        value.qst_img
                                      }
                                      target="_blank"
                                    >
                                      เปิดไฟล์
                                    </a>
                                    {/* <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() => openImageViewer(0)}
                                    >
                                      เปิดไฟล์
                                    </button>
                                    {isViewerOpen && (
                                      <ImageViewer
                                        src={[
                                          process.env.REACT_APP_API_IMG +
                                            "/" +
                                            value.qst_img,
                                        ]}
                                        currentIndex={currentImage}
                                        zoomScale=""
                                        disableScroll={true}
                                        closeOnClickOutside={true}
                                        onClose={closeImageViewer}
                                      />
                                    )} */}
                                  </>
                                )}
                              </>
                            ) : (
                              <>-</>
                            )}
                            <div className="col-sm-2"></div>
                          </div>
                        </>
                      )}

                      <div className="form-group row">
                        <div className="col-md-2"></div>
                        <label className="col-md-2">
                          แนบไฟล์ใหม่ (JPEG, JPG, PNG, PDF)
                        </label>
                        <div className="form-group">
                          <div className="btn btn-default btn-file">
                            <i className="fas fa-paperclip" /> แนบไฟล์
                            <input
                              type="file"
                              className="form-control-file col-sm-6"
                              name="qst_img_test"
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
                        {/* <div className="col-sm-2"></div>
                                    <label className="col-sm-2">แนบไฟล์ใหม่ (JPEG,JPG,PNG)</label>
                                    <input
                                       type="file"
                                       className="form-control-file col-sm-6"
                                       name="qst_img_test"
                                       onChange={onChange}
                                    />
                                    <div className="col-sm-2"></div> */}
                      </div>
                      <div className="form-group" align="center">
                        <button
                          // style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                          className="btn btn-success col-sm-2 m-1"
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </form>
                  ))}
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

export default EditQuestion;
