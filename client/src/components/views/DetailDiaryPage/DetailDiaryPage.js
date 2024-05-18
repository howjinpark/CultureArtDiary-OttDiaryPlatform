/*
import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Divider, Button, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { PrivacyOptions, CategoryOptions, GenreOptions } from '../DiaryEditPage/Options';

const { Title, Paragraph, Text } = Typography;

const response = await axios.get('/api/users/auth');      //서버에 유저 인증 정보 요청
const userData = response.data;         //유저 정보 userData에 담음

function DetailDiaryPage(props) {
  const diaryId = props.match.params.diaryId;
  const [DiaryDetail, setDiaryDetail] = useState(null);

  useEffect(() => {
    const diaryVariable = { diaryId };

    axios.post('/api/diary/getDiaryDetail', diaryVariable)
      .then(response => {
        if (response.data.success) {
          setDiaryDetail(response.data.diaryDetail);
        } else {
          alert('Failed to get Diary information');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error fetching Diary information');
      });
  }, [diaryId]);

  const getLabel = (options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : 'Unknown';
  };

  if (DiaryDetail) {
    return (
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Card
          style={{ borderRadius: 8 }}
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={DiaryDetail.writer.image} size={64} />
              <div style={{ marginLeft: '1rem' }}>
                <Title level={3} style={{ marginBottom: 0 }}>{DiaryDetail.writer.name}</Title>
                <Paragraph type="secondary">{moment(DiaryDetail.createdAt).format('YYYY-MM-DD HH:mm')}</Paragraph>
              </div>
            </div>
          }
        >
          <Title level={2} style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>{DiaryDetail.title}</Title>
          <Divider />
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {DiaryDetail.description}
          </Paragraph>
          <Divider />
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>Privacy:</Text> {getLabel(PrivacyOptions, DiaryDetail.privacy)}
            </Col>
            <Col span={12}>
              <Text strong>Category:</Text> {getLabel(CategoryOptions, DiaryDetail.category)}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>Genre:</Text> {getLabel(GenreOptions, DiaryDetail.genre)}
            </Col>
            <Col span={12}>
              <Text strong>Rating:</Text> {DiaryDetail.rating}
            </Col>
          </Row>
          <Divider />
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Button type="primary" style={{ marginRight: '10px' }} href="/">목록으로 돌아가기</Button>
            
            {DiaryDetail.writer._id === userData._id && (   ////DiaryDetail.writer._id와 DiaryDetail._id가 같을 때만 버튼보임
            <Button type="default" href={`/diary/edit/${DiaryDetail._id}`}>수정</Button>  
)}

          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div style={{ width: '85%', margin: '3rem auto', textAlign: 'center' }}>
        <Paragraph>Loading...</Paragraph>
      </div>
    );
  }
}

export default DetailDiaryPage;
*/

import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

function DetailDiaryPage(props) {
    const [diaryDetail, setDiaryDetail] = useState(null);

    useEffect(() => {
        const fetchDiaryDetail = async () => {
            try {
                // 'diaryId' should be passed to this component as a prop
                const response = await axios.post('/api/diary/getDiaryDetail', { diaryId: props.match.params.diaryId });
                if (response.data.success) {
                    setDiaryDetail(response.data.diaryDetail);
                } else {
                    alert('Failed to get diary details');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching diary details');
            }
        };

        fetchDiaryDetail();
    }, [props.match.params.diaryId]);

    if (!diaryDetail) {
        return <div style={{ width: '85%', margin: '3rem auto', textAlign: 'center' }}>
            <Paragraph>Loading...</Paragraph>
        </div>;
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Card style={{ borderRadius: 8 }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Title level={3} style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{diaryDetail.title}</Title>
                    {/* Displaying the image if it exists in the diary details */}
                    {diaryDetail.filePath && (
                        <img src={`http://localhost:5000/${diaryDetail.filePath}`} alt="Diary" style={{ maxWidth: '100%' }} />
                    )}
                    <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                        {diaryDetail.description}
                    </Paragraph>
                </div>
                {/* Additional details can be added here */}
                <Divider />
                <p><b>Date:</b> {diaryDetail.date}</p>
                <p><b>Genre:</b> {diaryDetail.genre}</p>
                <p><b>Rating:</b> {diaryDetail.rating} / 5</p>
            </Card>
        </div>
    );
}

export default DetailDiaryPage;
