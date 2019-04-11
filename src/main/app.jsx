
import React from "react";
import Header from '../common/template/header';
import Sidebar from '../common/template/sidebar';
import Footer from '../common/template/footer';
import Routes from './routes';
import Messages from '../common/msg/messages';
import { HashRouter } from "react-router-dom";

export default props => (
  <HashRouter>
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
          <Routes/>
      </div>
      <Footer />
      <Messages />
    </div>
  </HashRouter>
);