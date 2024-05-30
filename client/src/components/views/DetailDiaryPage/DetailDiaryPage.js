import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Divider, Button, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { PrivacyOptions, CategoryOptions, GenreOptions } from '../DiaryEditPage/Options';
import './DetailDiaryPage.css';  // Import the CSS file
import StarRating from '../DiaryUploadPage/StarRating';
const { Title, Paragraph, Text } = Typography;

function DetailDiaryPage(props) {
  const diaryId = props.match.params.diaryId;
  const [DiaryDetail, setDiaryDetail] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/auth'); // 서버에 유저 인증 정보 요청
        setUserData(response.data); // 유저 정보를 userData에 담음
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchDiaryDetail = () => {
      axios.post('/api/diary/getDiaryDetail', { diaryId })
        .then(response => {
          if (response.data.success) {
            setDiaryDetail(response.data.diaryDetail);
          } else {
            alert('Failed to get Diary information');
          }
        })
        .catch(error => {
          console.error('Error fetching Diary information:', error);
          alert('Error fetching Diary information');
        });
    };

    fetchUserData();
    fetchDiaryDetail();
  }, [diaryId]);

  const getLabel = (options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : 'Unknown';
  };

  const handleDelete = () => {
    // 여기에 다이어리 삭제 요청을 보내는 코드를 추가하세요
    axios.post('/api/diary/deleteDiary', { diaryId: DiaryDetail._id })
      .then(response => {
        if (response.data.success) {
          // 삭제가 성공한 경우, 사용자를 다른 페이지로 리디렉션하거나 필요한 동작을 수행하세요
          alert('Diary deleted successfully');
          // 예시: 삭제 후 홈페이지로 이동
          props.history.push('/');
        } else {
          alert('Failed to delete Diary');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error deleting Diary');
      });
  };

  if (!DiaryDetail || !userData) {
    return (
      <div className="loading-container">
        <Paragraph>Loading...</Paragraph>
      </div>
    );
  }

  return (
    <div className="diary-detail-page">
      <div className="diary-detail-container">
        <Card
          className="diary-detail-card"
          title={
            <div className="card-header">
              <Avatar src={DiaryDetail.writer.image} size={64} />
              <div className="card-header-text">
                <Title level={3} style={{ marginBottom: 0 }}>{DiaryDetail.writer.name}</Title>
                <Paragraph type="secondary">{moment(DiaryDetail.createdAt).format('YYYY-MM-DD HH:mm')}</Paragraph>
              </div>
            </div>
          }
        >
          <Title level={2} className="diary-title">{DiaryDetail.title}</Title>
          {DiaryDetail.filePath && (
            <img src={`http://localhost:5000/${DiaryDetail.filePath}`} alt="Diary" className="diary-image" />
          )}
          <Divider />
          <Paragraph className="diary-description">
            {DiaryDetail.description}
          </Paragraph>
          <Divider />
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>공개 설정:</Text> {getLabel(PrivacyOptions, DiaryDetail.privacy)}
            </Col>
            <Col span={12}>
              <Text strong>카테고리:</Text> {getLabel(CategoryOptions, DiaryDetail.category)}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>장르:</Text> {getLabel(GenreOptions, DiaryDetail.genre)}
            </Col>
            <Col span={12}>
              <Text strong>평점:</Text>
              <StarRating rating={DiaryDetail.rating} readOnly /> {/* Use the StarRating component */}
            </Col>
          </Row>
          <Divider />
          <div className="action-buttons">
            <Button type="primary" style={{ marginRight: '10px' }} href="/">목록으로 돌아가기</Button>
            {DiaryDetail.writer._id === userData._id && (
                <Button type="default" onClick={handleDelete}>삭제</Button>
              )}

            {DiaryDetail.writer._id === userData._id && (
              <Button type="default" href={`/diary/edit/${DiaryDetail._id}`}>수정</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DetailDiaryPage;
