import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { userSignOut } from "../../Redux/Actions/authActions";

const Header = (props) => {
  // const location = useLocation();
  return (
    <>
      <Container>
        <Content>
          <Logo>
            <Link to="/home">
              <img className="brand-logo" src="/images/Logo.png" alt="" />
            </Link>
          </Logo>
          {/* <Search>
            <div>
              <input type="text" placeholder="Search" />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
          </Search> */}
          <h1 style={{ color: "#0a66c2" }}>Social Media App</h1>
          <Navigation>
            <NavigationLists>
              <NavItem className={`${!props.ViewProfile ? "active" : ""}`}>
                <Link to="/home">
                  <img
                    src="/images/NavLogo/nav-home.svg"
                    alt="Home Logo"
                    style={{ opacity: `${props.ViewProfile ? ".6" : "1"}` }}
                  />
                  <span>Home</span>
                </Link>
              </NavItem>

              {/* <NavItem>
                <Link to={location.pathname}>
                  <img
                    src="/images/NavLogo/nav-network.svg"
                    alt="Network logo"
                  />
                  <span>Network</span>
                </Link>
              </NavItem> */}

              {/* <NavItem>
                <Link to={location.pathname}>
                  <img src="/images/NavLogo/nav-jobs.svg" alt="Jobs Logo" />
                  <span>Jobs</span>
                </Link>
              </NavItem> */}

              {/* <NavItem>
                <Link to={location.pathname}>
                  <img
                    src="/images/NavLogo/nav-messaging.svg"
                    alt="Messaging Logo"
                  />
                  <span>Messaging</span>
                </Link>
              </NavItem> */}

              {/* <NavItem>
                <Link to={location.pathname}>
                  <img
                    src="/images/NavLogo/nav-notifications.svg"
                    alt="Notifications Logo"
                  />
                  <span>Notifications</span>
                </Link>
              </NavItem> */}

              <User className={`${props.ViewProfile ? "active" : ""}`}>
                <Link to="/home">
                  {props.user?.photoURL ? (
                    <img src={props.user.photoURL} alt="" />
                  ) : (
                    <img src="/images/NavLogo/user.svg" alt="" />
                  )}
                  <span
                    style={{ color: `${props.ViewProfile ? "black" : "1"}` }}
                  >
                    Me <img src="/images/NavLogo/down-icon.svg" alt="" />
                  </span>
                </Link>
                <ViewDropdown>
                  <ViewProfile>
                    <Link to="/view-profile">View Profile</Link>
                  </ViewProfile>
                  <SignOut onClick={() => props.userSignOut()}>
                    <p>Sign Out</p>
                  </SignOut>
                </ViewDropdown>
              </User>
            </NavigationLists>
          </Navigation>
          {/* <Work>
            <Link to="/home">
              <img src="/images/NavLogo/nav-work.svg" alt="" />
              <span>
                Work
                <img src="/images/NavLogo/down-icon.svg" alt="" />
              </span>
            </Link>
          </Work> */}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.header`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
`;

const Content = styled.nav`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 90%;
  margin: auto;
  min-height: 100%;
  & > h1 {
    img {
      color: red;
      opacity: 0.6;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  & > a > img.brand-logo {
    width: 3rem;
    height: 3rem;
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    input {
      border: none;
      box-shadow: none;
      background-color: #f3f2ef;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 2rem;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

const SearchIcon = styled.div`
  width: 2.5rem;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    opacity: 0.6;
  }
`;

const Navigation = styled.div`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    padding: 0.3rem 0.15rem;
  }
`;
const NavigationLists = styled.ul`
  list-style: none;
  text-decoration: none;
  display: flex;
  flex-flow: row nowrap;
  .active {
    span:after {
      content: "";
      /* transform: scaleX(1); */
      border-bottom: 2px solid rgba(0, 0, 0, 0.9);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      @media (max-width: 768px) {
        border: none;
      }
    }
  }
  @media (max-width: 768px) {
    align-items: center;
    justify-content: space-evenly;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    opacity: 1;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      @media (max-width: 420px) {
        display: none;
      }
    }
    @media (max-width: 768px) {
      min-width: 50px;
    }
  }
  &:hover,
  &:active {
    a {
      /* opacity: 0.75; */
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const ViewDropdown = styled.div`
  position: absolute;
  top: 3.2rem;
  display: none;
  background: white;
  border-radius: 7px 7px 0 0;
  @media (max-width: 768px) {
    top: -5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
const SignOut = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  color: black;
  font-weight: bold;
  a {
    color: black;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    top: -2.5rem;
    right: 3%;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const ViewProfile = styled(SignOut)``;

const User = styled(NavItem)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
    img {
      @media (max-width: 768px) {
        transform: rotate(180deg);
      }
    }
  }

  &:hover {
    ${ViewDropdown} {
      align-items: center;
      display: flex;
      flex-flow: column;
      justify-content: center;
      cursor: pointer;
    }
  }
  a {
    @media (max-width: 768px) {
      flex-flow: column-reverse;
    }
  }
`;

// const Work = styled(User)`
//   border-left: 1px solid rgba(0, 0, 0, 0.08);
// `;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userSignOut: () => dispatch(userSignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
