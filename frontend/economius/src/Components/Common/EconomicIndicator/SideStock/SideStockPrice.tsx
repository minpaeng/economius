function SideStockPrice({ companyCategory, companySubCategory, price, rate }) {
  return (
    <div>
      <div>{companyCategory}</div>
      <div>{companySubCategory}</div>
      <div>{price}</div>
      <div>{rate}</div>
    </div>
  );
}

export default SideStockPrice;
