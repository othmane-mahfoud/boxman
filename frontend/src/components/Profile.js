import React, { Component } from 'react'
import axios from 'axios'
import { Form, Icon, Image, Select } from 'semantic-ui-react'
import PlaceholderImg from '../images/profile-placeholder.jpg'
// import FileBase from 'react-file-base64';
import '../styles/Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileImageUrl: "",
            phoneNumber: "",
            address: "",
            status: "customer"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSelect(e, data) {
        this.setState({
            status : data.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.editUser(this.props.currentUser.user._id, this.state)
        .then(() => {
            this.props.history.push('/')
        })
        .catch(() => {
            this.setState({
                profileImageUrl: "",
                phoneNumber: "",
                address: ""
            })
            return;
        });
    }

    uploadImage(e) {
        let imageFormObj = new FormData();
    
        imageFormObj.append("profileImageName", "multer-image-" + Date.now());
        imageFormObj.append("profileImageData", e.target.files[0]);
        debugger;
        // stores a readable instance of 
        // the image being uploaded using multer
        this.setState({
            profileImageUrl: URL.createObjectURL(e.target.files[0])
        });
        debugger;
        const imageData = {
            profileImageName: imageFormObj.get("profileImageName"),
            profileImageData: imageFormObj.get("profileImageData").name
        }
        debugger;
        axios.put(`/api/users/${this.props.currentUser.user._id}/uploadmulter`, imageData)
            .then((data) => {
                if (data.data.success) {
                    alert("Image has been successfully uploaded using multer");
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    getBaseFile(files) {
        // create a local readable base64 instance of an image
        this.setState({
          profileImageUrl: files.base64.toString()
        });
        debugger;
        axios.put(`/api/users/${this.props.currentUser.user._id}/uploadBase64`, { profileImageUrl: this.state.profileImageUrl })
          .then((data) => {
            if (data.data.success) {
              alert("Image has been successfully uploaded using base64 format");
            }
          })
          .catch((err) => {
            alert(err)
          });
      }

    render() {
        const { currentUser } = this.props
        const { profileImageUrl, phoneNumber, address, status } = this.state
        const statusOptions = [
            { key: 0, text: 'Customer', value: 'customer' },
            { key: 1, text: 'Boxman', value: 'boxman' }
        ]
        return (
            <div className='container'>
                <div className='Profile'>
                    <div className='Profile-headings mb-4'>
                        <h2 className='Profile-header'>One more step and you're all set up</h2>
                        <h1 className='Profile-header'>Complete your profile</h1>
                    </div>
                    <div className='Profile-form mt-2'>
                        <div className='Profile-image'>
                            <Image src={profileImageUrl || PlaceholderImg} size='small' circular centered/>
                            <div className='Profile-center'><button className='Profile-upload btn btn-outline-warning mt-3 mb-4'><Icon name='upload'/>Upload</button></div>
                        </div>
                        
                        {/* <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e)} />
                        <img src={profileImageUrl} alt="upload" className="process__image" /> */}

                        {/* <div className="process__upload-btn">
                            <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                        </div>
                        <img src={profileImageUrl} alt="upload" className="process__image" /> */}

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Email</label>
                                <input className='bg-light' value={currentUser.user.email} disabled/>
                            </Form.Field>
                            <Form.Field>
                                <label>Full name</label>
                                <input className='bg-light' value={currentUser.user.name} disabled/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='phoneNumber'>Phone number</label>
                                <input onChange={this.handleChange} name='phoneNumber' id='phoneNumber' value={phoneNumber} placeholder='Phone Number ex: 06 XX XX XX XX' />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='address'>Address</label>
                                <input onChange={this.handleChange} name='address' id='address' value={address} placeholder='Enter your address' />
                            </Form.Field>
                            <Form.Field>
                                {/* <label htmlFor='status'>Status</label>
                                <select className='form-control' id="lang" onChange={this.handleChange} name='status' value={status}>
                                    <option value="Customer">Customer</option>
                                    <option value="Boxman">Boxman</option>
                                </select> */}
                                <Form.Field
                                    control={Select}
                                    options={statusOptions}
                                    label= 'Status'
                                    placeholder='Status'
                                    name='status'
                                    value={status}
                                    onChange={this.handleSelect}
                                />
                            </Form.Field>
                            <div className='Profile-center'><button type='submit' className='btn Profile-submit p-3 mt-2'>EDIT PROFILE</button></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
