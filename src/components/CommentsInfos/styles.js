import styled from "styled-components";

const CommentsWrapper = styled.div`
    p{
        width: 100%;
        background-color:#1E1E1E;
        z-index: 0;
        position: relative;
        padding: 0 25px;
        padding-top:  12px; 
        border-radius: 0px 0px  16px 16px;
    }

    @media(max-width: 700px){
        border-radius: 0px ;
        width: 100vw;
    }
   
`
const CommentBox = styled.div`
    span{
        display:flex ;
    }
`
const CommentImg = styled.img`
    height:39px;
    border-radius:50% ;
    margin-right: 10px ;
    

`
const CommentUserInfos = styled.div`
    display: flex;
`
const KinshipBox = styled.div`
    display:flex;
    color: #565656;
    margin-bottom: 4px;
`
const Dot = styled.div`
    height:5px ;
    width:5px ;
    background-color: #565656;
    border-radius: 50% ;
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
    margin-top: 6px;
`
const HorizontalBar = styled.div`
    height: 1px;
    width: 100%;
    background-color:#353535;
    margin:16px 0;
`
const KinshipInfo = styled.div`
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
`
const Username = styled.div`
    color: #F3F3F3;
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    
`
const CommentBody = styled.div`
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
`
const InputWrapper = styled.div`
    display:flex;
    svg{
        position: absolute;
        bottom: 16px;
        right: 40px ;
        height: 30px;
        width: 22px;
        color: #F3F3F3;
        cursor: pointer;
        :hover{
            color: var(--button-color);
            filter: brightness(70%);
        }
        ::placeholder {
            color: #F3F3F3;
            font-family: var(--font-subtitle);
            font-weight: 700;
            font-size: 22px;
        }

    }
`
const UserImg = styled.img`
    height:39px;
    border-radius:50% ;
    margin-right: 10px ;
    margin-bottom: 10px;
`
const Input = styled.input`
    all:unset;
    outline: none;
    border: none;
    text-indent: 17px;  

    width: 510px;
    height: 39px;
    left: 319px;
    top: 741px;

    background: #252525;
    border-radius: 8px;
    color: #fff;
    ::placeholder {
            color: #ACACAC;
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
        }
    
`

export {
    CommentsWrapper, CommentBox, CommentImg, CommentUserInfos, CommentBody, KinshipBox, Dot,
    KinshipInfo, Username, HorizontalBar, InputWrapper, UserImg, Input
}