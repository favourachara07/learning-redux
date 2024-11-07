import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
// teh old way of accessing the redux store b4 hooks
function mapStateToProps(state){
  return {
    balance: state.account.balance
  }
}

export default connect(mapStateToProps) (BalanceDisplay);
