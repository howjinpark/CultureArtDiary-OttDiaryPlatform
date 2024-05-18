import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, DatePicker, Select } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import StarRating from './StarRating'; // 별점 컴포넌트 경로 확인
import { GenreOptions, PrivacyOptions, CategoryOptions } from '../DiaryEditPage/Options';
const { TextArea } = Input;
const { Title } = Typography;

function DiaryUploadPage(props) {
    const user = useSelector(state => state.user);
    const [DiaryTitle, setDiaryTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Privacy, setPrivacy] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [DiaryDate, setDiaryDate] = useState(null);
    const [Genre, setGenre] = useState("");
    const [Rating, setRating] = useState(0);
    const [FilePath, setFilePath] = useState(""); // 저장된 파일 경로 상태 추가

    const onTitleChange = (e) => {
        setDiaryTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivacyChage = (e) => {
        setPrivacy(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onGenreChange = (e) => {
        setGenre(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = { headers: { 'content-type': 'multipart/form-data' } };
        formData.append("file", files[0]);

        Axios.post('/api/diary/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setFilePath(response.data.filePath); // 파일 경로 상태 업데이트
                    message.success('Image uploaded successfully');
                } else {
                    message.error('Failed to upload image');
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                message.error('Error uploading image');
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!DiaryTitle || !Description || !Genre) {
            message.error('Please fill all the fields!');
            return;
        }

        const variables = {
            writer: user.userData._id,
            title: DiaryTitle,
            description: Description,
            privacy: Privacy,
            category: Category,
            genre: Genre,
            date: DiaryDate,
            rating: Rating,
            filePath: FilePath // 이미지 경로 포함
        };

        Axios.post('/api/diary/uploadDiary', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('Successfully uploaded the diary!');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 3000);
                } else {
                    alert('Failed to upload the diary!');
                }
            });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Diary</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop an image here, or click to select an image</p>
                            </div>
                        )}
                    </Dropzone>
                </div>

                {FilePath && (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <img src={`http://localhost:5000/${FilePath}`} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    </div>
                )}

<br />
                <br />
                <label>Title</label>
                <Input onChange={onTitleChange} value={DiaryTitle} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description} />
                <br />
                <br />

                <label>Privacy</label>
        <br />

        <select onChange={onPrivacyChage}>
                    {PrivacyOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
        </select>

                <br />
                <br />
                <label>Category</label>  
        <br />              
        <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (                       
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

        </select>

                <br />
                <br />
                <label>Genre</label>     
        <br />          
        <select onChange={onGenreChange}>
                    {GenreOptions.map((item, index) => (                       
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

        </select>

                <br />
                <br />
                <label>Date</label>
                <DatePicker onChange={setDiaryDate} value={DiaryDate} />

                <br />
                <br />
                <label>Rating</label>
                <StarRating rating={Rating} setRating={setRating} />

                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default DiaryUploadPage;
