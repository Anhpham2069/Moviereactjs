import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutPage from '../components/layout';
import LoadingData from '../components/loading';
import { getDataFilmById } from '../services/api';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const DetailMoviePage = () => {
  const { id } = useParams();
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailMovie, setDetailMovie] = useState({});

  useEffect(() => {
    const getDataMovie = async () => {
      setLoadingDetail(true);
      const data = await getDataFilmById(id);
      if(data) {
        setDetailMovie(data);
        setLoadingDetail(false);
      }
    }
    getDataMovie();
  }, [id]);

  if(loadingDetail){
    return (
      <LayoutPage>
        <LoadingData/>
      </LayoutPage>
    )
  }

  return (
    <LayoutPage>
      <Row>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w300/${detailMovie.poster_path}`} />}
          >
            <Meta title={detailMovie.tagline} />
          </Card>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <h1>{detailMovie.title}</h1>
              <p>{detailMovie.overview}</p>
              <p>vote rage : {detailMovie.vote_average}</p>
              <p>vote count : {detailMovie.vote_count}</p>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
          {detailMovie.images !== undefined ? detailMovie.images.backdrops.map((item, index) => (
            <Col key={index} span={24}>
              <Card
                hoverable
                bordered={false}
                style={{ width: 400 }}
                cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w400/${item.file_path}`} />}
              ></Card>
            </Col>
          )) : null}

            
          </Row>
        </Col>
      </Row>
    </LayoutPage>
  )
}
export default React.memo(DetailMoviePage);