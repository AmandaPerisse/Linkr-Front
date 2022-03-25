import React from "react"
import ContentLoader from "react-content-loader"

const PostLoader = (props) => (
    <ContentLoader 
        speed={2}
        width={410}
        height={210}
        viewBox="0 0 410 210"
        backgroundColor="#c6c6c6"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="20" cy="20" r="20" /> 
        <rect x="48" y="117" rx="3" ry="3" width="370" height="2" /> 
        <rect x="222" y="-80" rx="3" ry="3" width="414" height="2" /> 
        <rect x="318" y="-6" rx="3" ry="3" width="414" height="2" /> 
        <rect x="13" y="215" rx="3" ry="3" width="66" height="0" /> 
        <rect x="80" y="159" rx="3" ry="3" width="99" height="0" /> 
        <rect x="285" y="117" rx="0" ry="0" width="133" height="86" /> 
        <rect x="47" y="118" rx="0" ry="0" width="2" height="86" /> 
        <rect x="60" y="130" rx="3" ry="3" width="196" height="4" /> 
        <rect x="61" y="150" rx="3" ry="3" width="192" height="2" /> 
        <rect x="64" y="192" rx="3" ry="3" width="150" height="3" /> 
        <rect x="47" y="203" rx="3" ry="3" width="370" height="2" /> 
        <rect x="62" y="159" rx="3" ry="3" width="150" height="2" /> 
        <rect x="62" y="170" rx="3" ry="3" width="130" height="2" /> 
        <circle cx="12" cy="138" r="8" /> 
        <circle cx="26" cy="138" r="8" /> 
        <circle cx="19" cy="146" r="8" /> 
        <rect x="32" y="227" rx="6" ry="6" width="42" height="8" /> 
        <rect x="297" y="123" rx="0" ry="0" width="49" height="6" /> 
        <circle cx="19" cy="146" r="8" /> 
        <rect x="-15" y="162" rx="3" ry="3" width="55" height="3" />
    </ContentLoader>
)

export default PostLoader;
