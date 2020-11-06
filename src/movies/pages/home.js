import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import LayoutPage from '../components/layout';
import {getDataMoviesHomePage} from '../services/api';
import { Row, Col, Card, Pagination } from 'antd';
import LoadingData from '../components/loading';

const { Meta } = Card;

const HomePage = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [listMovies, setListMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    const getDataMovies = async () => {
      setLoadingHome(true);
      const data = await getDataMoviesHomePage(page);
      console.log(data);
      if(data){
        setListMovies(data.results);
        setTotalResult(data.total_results);
        if(page < 1){
          setPage(1);
        } else if(page > data.total_pages) {
          setPage(data.total_pages);
        }
        setLoadingHome(false);
      }
    }
    getDataMovies();
  },[page]);

  const changePage = (pages) => {
    setPage(pages);
  }

  if(loadingHome || listMovies.length === 0){
    return (
      <LayoutPage>
        <LoadingData/>
      </LayoutPage>
    )
  }

  return(
    <LayoutPage>
      <h1>This is home page</h1>
      <Row style={{marginTop: '5px'}}>
        {listMovies.map((item,index) => (
          <Col span={4} key={index}>
            <Link to={`/movie/${slugify(item.title)}~${item.id}`}>
            <Card
              hoverable
              style={{ width: 200, marginRight: '5px', marginBottom: '10px' }}
              cover={<img alt={item.title} src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />}
            >
              <Meta title={item.title} />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Row style={{textAlign: 'center', marginTop: '20px' }}>
          <Col span={24}>
            <Pagination
              current={page}
              pageSize={20}
              total={totalResult}
              onChange={(pages) => changePage(pages)}
            />
          </Col>
      </Row>
    </LayoutPage>
  )
}
export default React.memo(HomePage);