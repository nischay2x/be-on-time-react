import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, signBucketRef, storage } from "../firebase/index.js";
import { query, collection, getDocs, where, setDoc, doc, updateDoc } from "firebase/firestore";
import CONFIG from "../config.json";
import "./dashboard.css";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const fakeUserData = {
  email : "example@example.com",
  name : "Nischay Chandra",
  uid : "gUdWy3ihVAdnFI9oYhwfvwbNyhb2",
  profile : CONFIG.defaultUserImage,
  docId : "u72W8nAqJmZBfxDYPctd",
  personal : {
    father : "",
    dob : "",
    adhaar : "",
    drivingLicence : "",
    contact : "",
  },
  address : {
    tempAddress : "",
    permanentAddress : "",
  },
  relative : {
    name : "",
    relation : "",
    contact : ""
  },
  signature : "./images/upload_sign_180x180.png"
}

// const hirer = {
//   "serial": 233 ,
//   "customerId": "u72W8nAqJmZBfxDYPctd",
//   "name": "Someone",
//   "father": "Some One",
//   "email": "cha@sss.com",
//   "dob": "2022-02-08",
//   "date": "new Date()",
//   "adhaar": "12 digit number",
//   "drivingLicence": "/^[A-Z]+/",
//   "otherId": "",
//   "contact": "10 digit number",
//   "tempAddress": "Tapri near Central Library, Bilaspur, Chhattisgarh",
//   "permanentAddress": "Tapri near Central Library, Bilaspur, Chhattisgarh",
//   "bloodRelative": {
//     "name": "Some",
//     "contact": "10 digit number"
//   },
//   "signature" : "./images/bot_180x180.png"
// }

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [personal, setPersonal] = useState(fakeUserData.personal);
  const [address, setAddress] = useState(fakeUserData.address);
  const [relative, setRelative] = useState(fakeUserData.relative);
  const [signUrl, setSignUrl] = useState("");
  const [signFile, setSignFile] = useState("");
  const [docId, setDocId] = useState("");
  const [userImage, setUserImage] = useState('');
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

  // const fetchUserData = async () => {
  //   setUserData(fakeUserData);
  //   setUserImage(fakeUserData.profile);
  // }

  // useEffect(() => {
  //   setPersonal(fakeUserData.personal);
  //   setAddress(fakeUserData.address);
  //   setRelative(fakeUserData.relative);
  //   setSignUrl(fakeUserData.signature);
  //   setUserData(fakeUserData);
  // }, [setPersonal, setAddress, setRelative, setSignUrl]);

  const onSignChange = (e) => {
    const file = e.target.files[0];
    if(!file) return
    setSignFile(file);
    const fileUrl = URL.createObjectURL(file);
    setSignUrl(fileUrl);
  }

  const onSignUpload = () => {
    if(!signFile) alert("No File Choosen");
    if(!signFile.type.startsWith("image")) alert("Not a valid Image Type");
    const fileRef = ref(storage, `signatures/sign-${userData?.uid}`);
    uploadBytes(fileRef, signFile).then(() => {
      alert("Signature image Uploaded");
      getDownloadURL(fileRef).then((url) => {
        updateSignUrlOnFirestore(url, docId);
      });
    }).catch(err => {
      console.log(err);
      alert("Some Error Occured while Uploading Signature")
    })
  }

  const onPersonalInfoChange = (e) => {
    if(!editable) return
    setPersonal(prev => {
      return {...prev, [e.target.name] : e.target.value}
    })
  }

  const onAddressChange = (e) => {
    if(!editable) return
    setAddress(prev => {
      return {...prev, [e.target.name] : e.target.value}
    })
  }

  const onRelativeChange = (e) => {
    if(!editable) return
    setRelative(prev => {
      return {...prev, [e.target.name] : e.target.value};
    })
  }

  const onDataSave = async () => {
    try {
      const data = { personal, relative, address };
      await updateDoc(doc(db, 'users', docId), data);
      alert("Data Updated Succesfully");
      setEditable(prev => !prev);
    } catch (error) {
      console.log(error);
      alert("An Error Occured while Updating Data"); 
    }
  }


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    getDocs(q).then((d) => {
      const data = d.docs[0].data();
      const docId = d.docs[0].id;
      setDocId(docId);
      setUserData(data);
      setAddress(data.address);
      setPersonal(data.personal);
      setRelative(data.relative);
      setSignUrl(data.signature ? data.signature : fakeUserData.signature);
    }).catch((err) => {
      console.log(err);
      alert("An Error Occured While Fetching Data");
    })
  }, [user, loading, navigate, setDocId, setUserData, setAddress, setAddress, setRelative, setSignUrl]);

  return (
    <main className="dashboard-main">
      <div className="w-100 wrapper">
        <div className="container user-info card-body rounded">
          <div className="d-flex justify-content-between">
            <div className="col-4">
              <div className="user-img-hold">
                <img src={userData.profile ? userData.profile : CONFIG.defaultUserImage} alt="Profile Picture" width="100%" />
              </div>
            </div>
            <div className="col-8 col-sm-6 text-right">
              <h4>{userData.name}</h4>
              <p>{userData.email}</p>
              <button className="btn btn-danger" onClick={logout}>
                LOGOUT
              </button>
            </div>
          </div>
          <br />
          <div className="update-form rounded">
            <br />
            <div className="p-2 text-center">
              <h3 style={{fontWeight : '600', letterSpacing : '3px'}}>H<span className="text-small">IRER</span> D<span className="text-small">ETAILS</span></h3>
            </div>
            <hr />
            {/* personal details */}
            <div className="p-2">
              <div className="container d-flex justify-content-between">
                <h4>Personal Details</h4>
                {
                  editable ? 
                  <div className="d-flex justify-content-end" style={{ gap : '5px' }}>
                    <button className="btn btn-success" onClick={onDataSave} title="Save">
                      <i className="far fa-save"></i> <span className="no-small">SAVE</span>
                    </button>
                    <button className="btn btn-warning" title="Cancel Edit" onClick={() => setEditable(prev => !prev)}>
                      <i className="far fa-window-close"></i> <span className="no-small">CANCEL</span>
                    </button>
                  </div>
                  :
                  <button className="btn btn-warning" title="Edit" onClick={() => setEditable(prev => !prev)}>
                    <i className="fas fa-edit"></i> EDIT
                  </button>
                }
              </div>
              <br />
              <div className="d-flex flex-wrap justify-content-between">
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={userData?.name} 
                    placeholder="Your Name will appear here."
                    disabled
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="father">Father's Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="father" 
                    value={personal?.father} 
                    onChange={onPersonalInfoChange}
                    placeholder="Put your father's name."
                    disabled={!editable}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="dob">Date Of Birth</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="dob" 
                    onChange={onPersonalInfoChange} 
                    value={personal?.dob} 
                    placeholder="Choose Date of Birth"
                    disabled={!editable} 
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="adhaar">Aadhaar Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="adhaar" 
                    onChange={onPersonalInfoChange} 
                    value={personal?.adhaar} 
                    placeholder="12 Digit Adhaar Number"
                    disabled={!editable} 
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="drivingLicence">Driving Licence Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="drivingLicence" 
                    onChange={onPersonalInfoChange} 
                    value={personal?.drivingLicence} 
                    placeholder="Your Driving Licence Number"
                    disabled={!editable} 
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="contact">Contact</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="contact" 
                    onChange={onPersonalInfoChange} 
                    placeholder="10 Digit Mobile Number"
                    value={personal?.contact} 
                    disabled={!editable} 
                  />
                </div>
              </div>
            </div>
            <hr />
            {/* blood relations */}
            <div className="p-2">
              <div className="container">
                <h4>Blood Relation</h4>
              </div>
              <br />
              <div className="d-flex flex-wrap justify-content-between">
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="relativeName">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    placeholder="Name of Relative"
                    value={relative?.name} 
                    onChange={onRelativeChange} 
                    disabled={!editable} 
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="relation">Relation</label>
                  <select className="form-select form-control" name="relation" value={relative?.relation} onChange={onRelativeChange} disabled={!editable} placeholder="Choose a relation">
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                    <option value="mother">Mother</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="realtive-contact">Contact</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="contact" 
                    placeholder="Relative's Mobile Number"
                    value={relative?.contact} 
                    onChange={onRelativeChange} 
                    disabled={!editable} 
                  />
                </div>
              </div>
            </div>
            <hr />
            {/* address details */}
            <div className="p-2">
              <div className="container">
                <h4>Address</h4>
              </div>
              <br />
              <div className="d-flex flex-wrap justify-content-between">
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="tempAddress">Temprory Address</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="tempAddress" 
                    placeholder="Your Local Address"
                    value={address?.tempAddress} 
                    onChange={onAddressChange} 
                    disabled={!editable} 
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="permanentAddress">Permanent Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="permanentAddress" 
                    placeholder="Your Permanent Address"
                    value={address?.permanentAddress} 
                    onChange={onAddressChange} 
                    disabled={!editable} 
                  />
                </div>
              </div>
            </div>
            <hr />
            {/* Signature Details */}
            <div className="p-2">
              <div className="container">
                <h4>Signature</h4>
              </div>
              <br />
              <div className="d-flex flex-wrap justify-content-between">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="sign-hold mb-2">
                    <img src={signUrl} alt="User Signature" width="100%" />
                  </div>
                </div>
                <div className="col-10 col-md-6 col-lg-6">
                 { editable &&
                  <div>
                    <input type="file" className="form-control-file m-2" placeholder="Upload Signature" onChange={onSignChange}/>
                    <button className="btn btn-primary m-2" onClick={onSignUpload}>
                      <i className="fas fa-upload"></i> UPLOAD
                    </button>
                  </div>
                 }
                  </div>
              </div>
            </div>
            <div className="d-flex py-2 justify-content-center">
              <a href="tel:+918461095556" className="btn btn-warning">
                <i className="fa fa-phone-alt mr-1"></i> Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;

async function updateSignUrlOnFirestore(url, docid){
  try {
    await updateDoc(doc(db, 'users', docid), {
      signature : url
    })
  } catch (error) {
    console.log(error);
    alert("An Error Occured while updating Signature");
  } 
}
