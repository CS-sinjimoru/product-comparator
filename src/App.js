// src/App.js
import React, { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import Papa from 'papaparse';
import ModelSelector from './ModelSelector'; // 컴포넌트 import
import ProductCard from './ProductCard'; // 컴포넌트 import

function App() {
  // 1. 5개 시트 데이터를 저장할 상태 변수들
  const [products, setProducts] = useState([]);
  const [phoneModels, setPhoneModels] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [caseSpecs, setCaseSpecs] = useState([]);
  const [glassSpecs, setGlassSpecs] = useState([]);

  // 1. 선택된 기종을 저장할 상태
  const [selectedModel, setSelectedModel] = useState(null);

  // 2. 앱이 처음 실행될 때 데이터를 불러오는 부분
  useEffect(() => {
    // 5개의 시트 URL을 여기에 붙여넣으세요.
    const sheetURLs = {
      products: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIoDUA5yVxMFcqiMk09FNh9he6pRSr8RdNGdeCcOiLebweawkygeBRWS5VGEwjsMeW63WXJPycVFcU/pub?gid=477723999&single=true&output=csv',
      phoneModels: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIoDUA5yVxMFcqiMk09FNh9he6pRSr8RdNGdeCcOiLebweawkygeBRWS5VGEwjsMeW63WXJPycVFcU/pub?gid=1149605427&single=true&output=csv',
      productDetails: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIoDUA5yVxMFcqiMk09FNh9he6pRSr8RdNGdeCcOiLebweawkygeBRWS5VGEwjsMeW63WXJPycVFcU/pub?gid=1111743457&single=true&output=csv',
      caseSpecs: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIoDUA5yVxMFcqiMk09FNh9he6pRSr8RdNGdeCcOiLebweawkygeBRWS5VGEwjsMeW63WXJPycVFcU/pub?gid=315176205&single=true&output=csv',
      glassSpecs: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIoDUA5yVxMFcqiMk09FNh9he6pRSr8RdNGdeCcOiLebweawkygeBRWS5VGEwjsMeW63WXJPycVFcU/pub?gid=649671374&single=true&output=csv',
    };

    // 각 URL에서 데이터를 비동기적으로 가져옴
    Promise.all(
      Object.entries(sheetURLs).map(([key, url]) =>
        fetch(url)
          .then((response) => response.text())
          .then((csv) => Papa.parse(csv, { header: true }).data)
      )
    ).then((results) => {
      // 가져온 데이터를 각 상태에 저장
      setProducts(results[0]);
      setPhoneModels(results[1]);
      setProductDetails(results[2]);
      setCaseSpecs(results[3]);
      setGlassSpecs(results[4]);
      console.log('데이터 로딩 완료!', results);
    });
  }, []); // []는 이 코드가 한번만 실행되도록 함

  // 3. 선택된 기종에 맞는 제품 데이터를 '조합'하고 '필터링'하는 핵심 로직
  const displayedProducts = useMemo(() => {
    console.log('선택된 모델 코드:', selectedModel); // ◀◀◀ 1. 선택된 모델 코드가 잘 들어오는지 확인

    if (!selectedModel) return []; // 선택된 기종이 없으면 빈 배열 반환

    console.log('선택된 모델 코드:', selectedModel); // ◀◀◀ 1. 선택된 모델 코드가 잘 들어오는지 확인


    // 선택된 기종에 해당하는 '공통 상세스펙' 찾기
    const details = productDetails.filter(d => d.model_code === selectedModel);

    console.log('필터링된 상세 정보 개수:', details.length); // ◀◀◀ 2. 여기서 개수가 0이면 model_code 불일치!



    // 각 상세스펙에 해당하는 모든 정보를 조합하여 완전한 제품 객체 만들기
    return details.map(detail => {
      const baseProduct = products.find(p => p.product_id === detail.product_id);
      let categorySpecs = {};

      if (baseProduct.category === '케이스') {
        categorySpecs = caseSpecs.find(spec => spec.detail_id === detail.detail_id) || {};
      } else if (baseProduct.category === '강화유리') {
        categorySpecs = glassSpecs.find(spec => spec.detail_id === detail.detail_id) || {};
      }

      // 모든 정보를 하나의 객체로 합치기
      return { ...baseProduct, ...detail, ...categorySpecs };
    });
  }, [selectedModel, products, productDetails, caseSpecs, glassSpecs]); // 의존성 배열

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>제품 비교 페이지</h1>

      {/* ModelSelector에 selectedModel prop을 추가로 전달합니다. */}
      <ModelSelector 
        models={phoneModels} 
        onSelectModel={setSelectedModel}
        selectedModel={selectedModel} 
      />

      <hr />

      {/* 제품 목록 UI */}
      <h2>{selectedModel ? `${phoneModels.find(m => m.model_code === selectedModel)?.model_name}용 제품` : '기종을 선택해주세요.'}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {displayedProducts.map(product => (
          <ProductCard key={product.detail_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;