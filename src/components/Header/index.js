import { useContext, useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UserContext from '../../Providers/UserContext.js';
import SearchBar from "../SearchBar/search.js";

export default function Header() {
    const [showLogoutBox, setShowLogoutBox] = useState(false);

    const { userInfos, setUserInfos, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        setUserInfos(null)
        setToken(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userInfos');
        navigate("/");
    }
    function handleClick() {
        navigate("/");
    }

    return (
        <HeaderContainer>
            <Logo onClick={handleClick}>linkr</Logo>

            <SearchBar />

            <div
                onMouseEnter={e => setShowLogoutBox(true)}
                onMouseLeave={e => setShowLogoutBox(false)}
            >
                {showLogoutBox ?
                    <FaChevronUp
                        size={20}
                        color={"#FFFFFF"}
                        onClick={e => setShowLogoutBox(false)}
                    />
                    :
                    <FaChevronDown
                        size={20}
                        color={"#FFFFFF"}
                        onClick={e => setShowLogoutBox(true)}
                    />
                }

                <img src={userInfos.pictureUrl} alt={userInfos.userName} />
                {showLogoutBox &&
                    <LogoutBox
                        onClick={e => handleLogout()}
                    >
                        Logout
                    </LogoutBox>
                }
            </div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    a {
        font-family: Passion One;
        font-size: 45px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-align: left;
        color: #FFFFFF; 
    }
    div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #FFFFFF;
        object-fit: cover;
        cursor: pointer;
    }
    svg{
       cursor: pointer; 
       :hover{
            filter: brightness(95%);
        }
    }
`;

const LogoutBox = styled.div`
    width: 125px;
    height: 43px !important;
    position: absolute;
    top: 72px;
    right: 0;
    border-radius: 0px 0px 0px 20px;
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: center !important;
    
    font-family: Lato;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.05em;
    cursor: pointer;
    :hover{
        filter: brightness(95%);
    }
`;

const Logo = styled.button`
    font-family: Passion One;
    font-size: 45px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: left;
    color: #FFFFFF;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;