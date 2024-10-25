import { Outlet } from "react-router-dom";
import Private from "../../routes/Private";
import Container from "../../components/Container";

const Layout = ()=>{
    return(
        <Container>
            <Private>
                <Outlet />
            </Private>
        </Container>
    )
}

export default Layout;