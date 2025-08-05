import React from 'react';

// A small helper component for displaying each spec item
const SpecItem = ({ label, value }) => (
  <li style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
    <span style={{ fontWeight: '600', minWidth: '120px', display: 'inline-block' }}>{label}</span>
    <span>{value}</span>
  </li>
);

function ProductCard({ product }) {
  // If there's no product data, don't render anything
  if (!product) return null;

  // Helper to convert boolean (TRUE/FALSE) to O/X for readability
  const toOX = (value) => (value === 'TRUE' ? 'O' : 'X');

  // Main card styling
  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    margin: '10px',
    padding: '16px',
    width: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0 0 0',
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, borderBottom: '2px solid #333', paddingBottom: '8px' }}>
        {product.product_name}
      </h3>
      <p>
        <strong>판매 상태:</strong> {product.sales_status}
      </p>

      {/* Renders specs ONLY if the category is '케이스' */}
      {product.category === '케이스' && (
        <ul style={listStyle}>
          <SpecItem label="선택 가능 색상" value={product.available_colors} />
          <SpecItem label="무게" value={`${product.weight_g}g`} />
          <SpecItem label="가로" value={`${product.width_mm}mm`} />
          <SpecItem label="세로" value={`${product.height_mm}mm`} />
          <SpecItem label="기본 두께" value={`${product.base_thickness_mm}mm`} />
          <SpecItem label="카메라 포함 두께" value={`${product.cam_thickness_mm}mm`} />
          <SpecItem label="전원 버튼" value={product.power_button_type} />
          <SpecItem label="볼륨 버튼" value={product.volume_button_type} />
          <SpecItem label="액션 버튼" value={product.action_button_type} />
          <SpecItem label="맥세이프 호환" value={toOX(product.magsafe_compatible)} />
          <SpecItem label="에어쿠션 기술" value={toOX(product.air_cushion_tech)} />
          <SpecItem label="변색 방지 코팅" value={toOX(product.anti_discoloration)} />
          <SpecItem label="스트랩 홀" value={toOX(product.has_strap_hole)} />
        </ul>
      )}

      {/* Renders specs ONLY if the category is '강화유리' */}
      {product.category === '강화유리' && (
        <ul style={listStyle}>
          <SpecItem label="무게" value={`${product.weight_g}g`} />
          <SpecItem label="가로" dvalue={`${product.width_mm}mm`} />
          <SpecItem label="세로" value={`${product.height_mm}mm`} />
          <SpecItem label="베젤 두께" value={`${product.bezel_thickness_mm}mm`} />
          <SpecItem label="유리 두께" value={`${product.glass_thickness_mm}mm`} />
          <SpecItem label="접착제 두께" value={`${product.adhesive_thickness_mm}mm`} />
          <SpecItem label="빛 투과율" value={`${product.transmittance_pct}%`} />
          <SpecItem label="물방울 각도" value={`${product.water_drop_angle}°`} />
          <SpecItem label="경도" value={product.hardness} />
          <SpecItem label="사생활 보호 각도" value={`${product.privacy_angle}°`} />
          <SpecItem label="카메라 타공" value={product.cutout_type} />
        </ul>
      )}
    </div>
  );
}

export default ProductCard;