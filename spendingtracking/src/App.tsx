import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import Itf from "./components/Itf";
import Itf2 from "./components/Itf2";
import Itf3 from "./components/Itf3";
import Itf4 from "./components/Itf4";
import FaturaTahsilat from "./components/FaturaTahsilat";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
      <Content className="site-layout" style={{ padding: "50px 50px", marginTop: 64 }}>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/records" component={Records} />
        <PrivateRoute path="/itf" component={Itf} />
        <PrivateRoute path="/itf2" component={Itf2} />
        <PrivateRoute path="/itf3" component={Itf3} />
        <PrivateRoute path="/itf4" component={Itf4} />
        <PrivateRoute path="/faturatahsilat" component={FaturaTahsilat} />
        <Route path="/Logout" component={Logout} />
      </Content>
      <Footer style={{ textAlign: "center" }}>Spending Tracking @ {new Date().getFullYear()}</Footer>
    </Layout>
  );
}

export default App;
