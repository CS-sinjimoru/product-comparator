// src/ModelSelector.js

import React from 'react';

function ModelSelector({ models, onSelectModel, selectedModel }) {
  // select 태그의 값이 변경될 때 호출될 함수
  const handleChange = (event) => {
    // event.target.value 에는 선택된 option의 value가 들어 있습니다.
    onSelectModel(event.target.value);
  };

  return (
    <div>
      <h2>기종을 선택하세요</h2>
      {/* select 태그로 드롭다운 메뉴를 만듭니다. */}
      <select 
        onChange={handleChange} 
        value={selectedModel || ''} // 현재 선택된 기종을 표시, 아무것도 선택 안됐으면 빈 값
        style={{ padding: '8px', fontSize: '16px' }}
      >
        {/* 맨 처음 기본 옵션 */}
        <option value="" disabled>
          --- 아래에서 선택 ---
        </option>

        {/* phoneModels 데이터를 바탕으로 선택 옵션을 만듭니다. */}
        {models.map((model) => (
          <option key={model.model_code} value={model.model_code}>
            {model.model_name}
          </option>
        ))}
      </select>
      
    </div>
  );
}

export default ModelSelector;