import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Slider from 'react-slick';
import './LandingPage.css'; // 스타일을 위한 CSS 파일 추가

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Diary, setDiarys] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [currentPageDiary, setCurrentPageDiary] = useState(1);
  const itemsPerPage = 6;
  const apiKey = '50aaab29ad70cc1875e49e7512650e80';

  useEffect(() => {
    axios.get('/api/diary/getDiarys').then((response) => {
      if (response.data.success) {
        setDiarys(response.data.diarys);
      } else {
        alert('Failed to get Diarys');
      }
    });

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KO&page=1`
        );
        const data = await response.json();
        if (response.ok) {
          setMovies(data.results);
        } else {
          console.error('Failed to fetch movies:', data);
          alert('Failed to fetch movies: ' + data.status_message);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Error fetching movies: ' + error.message);
      }
    };

    const fetchTvShows = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=ko-KO&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setTvShows(data.results);
        } else {
          console.error('Failed to fetch TV shows:', data);
        }
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchMovies();
    fetchTvShows();
  }, []);

  const renderItems = (items, currentPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const renderDiaryCards = renderItems(Diary, currentPageDiary).map((diary) => (
    <Col key={diary._id} span={4}>
      <Card
        hoverable
        style={{ width: 180, marginBottom: 16 }}
        cover={<img alt="diary" src={diary.image} />}
      >
        <Meta
          avatar={<Avatar src={diary.writer.image} />}
          title={<a href={`/diary/${diary._id}`}>{diary.title}</a>}
          description={`${diary.writer.name} - ${moment(diary.createdAt).format('MMM Do YY')}`}
        />
      </Card>
    </Col>
  ));

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderMovieCards = movies.map((movie) => (
    <div key={movie.id}>
      <Card
        hoverable
        style={{ width: 180, marginBottom: 16 }}
        cover={
          <a href={`/detail/movie/${movie.id}`}>
            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          </a>
        }
      >
        <Meta title={movie.title} />
      </Card>
    </div>
  ));

  const renderTvShowCards = tvShows.map((tvShow) => (
    <div key={tvShow.id}>
      <Card
        hoverable
        style={{ width: 180, marginBottom: 16 }}
        cover={
          <a href={`/detail/tv/${tvShow.id}`}>
            <img alt={tvShow.name} src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} />
          </a>
        }
      >
        <Meta title={tvShow.name} />
      </Card>
    </div>
  ));

  const renderPageNumbers = (totalItems, currentPage, setCurrentPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(
        <Button
          key={i}
          type={i === currentPage ? 'primary' : 'default'}
          onClick={() => setCurrentPage(i)}
          className="pagination-button"
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container">
      <Title level={2} className="title">게시글</Title>
      <Row gutter={[16, 16]}>{renderDiaryCards}</Row>
      <div className="pagination-container">
        {renderPageNumbers(Diary.length, currentPageDiary, setCurrentPageDiary)}
      </div>
      <Title level={2} className="title-second">영화</Title>
      <Slider {...sliderSettings}>{renderMovieCards}</Slider>
      <Title level={2} className="title-second">TV 쇼</Title>
      <Slider {...sliderSettings}>{renderTvShowCards}</Slider>
    </div>
  );
}

export default LandingPage;
