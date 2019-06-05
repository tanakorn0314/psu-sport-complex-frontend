# รวมทุกประเด็นการพัฒนาเว็บนี้ ด้วย Next js

## 1. การติดตั้ง styled-components และ antd
### 1.1 ติดตั้ง module ดังนี้
npm i -s antd styled-components
### 1.2 ทำการ preload css และ แก้ปัญหาการกระพริบเมื่อใช้ styled-components
ในโฟลเดอร์ pages ทำการสร้าง _document.js สำหรับดึง css ของ antd

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>
          sheet.collectStyles(<App {...props} />)
        );
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
      }

    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.min.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

## 2. การตั้งค่าให้สามรถ import รูปจาก folder ตรง ๆ ใช้ next-optimized-images 
### 2.1 ติดตั้ง module
npm i -s next-optimized-images imagemin-mozjpeg imagemin-optipng imagemin-svgo next-compose-plugins
ในที่นี้จะซัพพอร์ตเฉพาะ jpg, jpegm png, svg ถ้าต้องการเพิ่มตัวอื่น ต้องติดตั้ง module เพิ่มเติม ดูได้จาก https://github.com/cyrilwanner/next-optimized-images
### 2.2 สร้างไฟล์ next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages],
  // your other plugins here
]);

## 3. การใช้ font จากไฟล์ 
### 3.1 ติดตั้ง module
npm i -s next-fonts 

### 3.2 ตัวอย่างการ config
ดูได้จาก https://github.com/rohanray/next-fonts
ถ้าใช้กับ styled-components ดูวิธีแก้ใน https://github.com/rohanray/font-error

## 4 การใช้ redux
### 4.1 ติดตั้ง module
npm i -s redux redux-thunk react-redux next-redux-wrapper
### 4.2 วางโครงสร้าง
สร้างโฟลเดอร์ redux สำหรับเก็บโครงสร้าง redux ภายในมีลักษณะ แบบนี้
redux
|-/Screen (ตัวอย่าง 1 ใน reducer)
|--actions.js
|--reducer.js
|
|-/Screen (ตัวอย่าง 1 ใน reducer)
|--actions.js
|--reducer.js
|
|-/etc.. (มี reducer อื่น ๆ ได้อีก)
|--actions.js
|--reducer.js
|
|-reducers.js
|-store.js

### 4.3 ตัวอย่าง reducer.js
import types from './actions';

const initialState = {
    isLoading: true,
    isMobile: false
}

export default function ScreenReducer(state = initialState, action) {
    switch(action.type) {
        case types.START_LOAD:
            return {
                ...state,
                isLoading: true
            }
        case types.END_LOAD:
            return {
                ...state,
                isLoading: false
            }
        case types.CHANGE_SIZE:
            return {
                ...state,
                isMobile: action.isMobile
            }
        default: 
            return state;
    }
}

### 4.4 ตัวอย่าง actions.js
const actions = {
    CHANGE_SIZE: 'CHANGE_SIZE',
    START_LOAD: 'START_LOAD',
    END_LOAD: 'END_LOAD',
    startLoad: () => (dispatch) => {
        dispatch({type: actions.START_LOAD})
    },
    endLoad: () => (dispatch) => {
        dispatch({type: actions.END_LOAD})
    },
    setMobileScreen: (isMobile) => async (dispatch) => {
        dispatch({type: actions.CHANGE_SIZE, isMobile})
    }
}

export default actions

### 4.5 reducers.js
import { combineReducers } from 'redux';
import Screen from './screen/reducer';

export default combineReducers({
    Screen
})

### 4.6 store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  );

  return store;
}

export default configureStore;

### 4.7 ในโฟลเดอร์ pages สร้าง _app.js
import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import initialStore from '../redux/store';
import { Provider } from 'react-redux';

class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component pageContext={this.pageContext} {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withRedux(initialStore)(CustomApp);