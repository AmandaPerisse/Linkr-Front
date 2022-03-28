import styled from "styled-components";

const PostContainer = styled.div`
    height: auto;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;

    article {
        width: 100%;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        
        p {
            font-family: Lato;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
            color: #B7B7B7;
        }

        strong {
            color: #FFFFFF;
        }
    }
`;

const UsernameWrapper = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
    min-height: 30px;

    h1{
        font-weight: 400;
        font-size: 17px;
        text-align: left;
        color: #FFFFFF;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
    }
`;
const IconsWrapper = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    min-height: 30px;
    gap: 8px;
    cursor: pointer;
    svg{
        color: #fff;
        height: 22px;
        width: 22px;
        :hover{
            color: var(--button-color);
            filter: brightness(70%);
        }
    }

`;

const LinkPreview = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    cursor: pointer;
`;

const LinkData = styled.div`
    width: 68%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;

    h1 {
        width: 100%;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #CECECE; 
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;       
    }

    p {
        font-size: 9px;
        font-weight: 400;
        line-height: 11px;
        text-align: left;
        color: #9B9595;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    h2 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 9px;
        font-weight: 400;
        line-height: 11px;
        text-align: left;
        color: #CECECE;
    }
`;

const LinkImage = styled.div`
    width: 32%;
    overflow: hidden;
    background-color: #FFFFFF;
    display: flex;

    img {
        width: 100%;
        object-fit: cover;
    }
`;
const ConfirmBox = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    z-index: 2;
    min-width:100%;
    min-height:100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: 50%;
    justify-content: center;
`
const ConfirmCard = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 597px;
    height: 262px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #333333;
    border-radius: 50px;
    z-index: 2;
    p{
        margin: 8px 0;
        width: 370px;
        font-family: var(--font-family);
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
    }
    button{
        width: 95px;
        p{
            color: #FFFFFF;
        }
    }
    
   @media(max-width: 750px){
       width: 80%;
       height: fit-content;
       padding: 40px 20px;
        border-radius: 20px;

       p{
           
        width: fit-content ;
        font-family: var(--font-family);
        font-weight: 700;;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #FFFFFF;
    }
   }
   
`

const CheckAnswer = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: space-evenly;
`
const GoBackButton = styled.button`
    height: 37px;

    min-width:134px;
    color: #1877F2;
    font-family: var(--font-family);
    font-weight: 700;

    font-size: 18px;
    line-height: 22px;
    text-align: center;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #FFFFFF;
    :hover{
        filter: brightness(95%);
    }
     @media(max-width: 400px){
        font-size: 16px;
        line-height: 20px;
        min-width:fit-content;
    }


`
const ConfirmButton = styled.button`
    height: 37px;
    min-width:134px;
    background-color: #1877F2;
    color: #FFFFFF;
    font-family: var(--font-family);
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:27px ;
    cursor: pointer;
    :hover{
        filter: brightness(95%);
    }
    @media(max-width: 400px){
        font-size: 16px;
        line-height: 20px;
        min-width:fit-content;
    }
     @media(max-width: 290px){
        margin-left:10px ;
    }


`;
const InputEditingPost = styled.input`
    all:unset;
    outline: none;
    border: none;
    text-indent: 17px;  
    margin-bottom :13px ;
    border-radius: 6px;
    
    width: 100%;
    height: 44px;
    
    font-size:14px;
    
    color: #4C4C4C;
    background-color: #FFFFFF;

    :focus{
        filter: brightness(95%);
    }

    ::placeholder {
        color: #4C4C4C;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        
    }
    @media(max-width: 900px) {
    height: 55px;

    }

`

export {
    PostContainer, UsernameWrapper, LinkPreview, LinkData, LinkImage, IconsWrapper,
    ConfirmBox, ConfirmCard, CheckAnswer, GoBackButton, ConfirmButton, InputEditingPost
}