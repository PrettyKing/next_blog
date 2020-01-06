import React, { useState } from "react";
import Head from "next/head";
import Link from 'next/link'
import { Row, Col, List, Icon } from "antd";
import axios from "axios";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import "../static/style/pages/index.css";
import  servicePath  from '../config/apiUrl'

const Home = list => {
  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" /> {item.addTime}
                    </span>
                    <span>
                      <Icon type="folder" /> {item.typeName}
                    </span>
                    <span>
                      <Icon type="fire" /> {item.view_count}人
                    </span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleList).then(res => {
      //console.log('远程获取数据结果:',res.data.data)
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
