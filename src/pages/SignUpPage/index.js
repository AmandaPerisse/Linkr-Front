import React, { useState } from 'react';
import { Button, Container, Input, LinkStyled, LogoWrapper, SignUpCard, SignUpWrapper, Subtitle, Title } from '../../styles/formUser';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api.js';

function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [url, setUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [inputLoading, setInputLoading] = useState("");

    function handleSignUp(e) {
        e.preventDefault();

        setIsLoading(true);
        setInputLoading("disabled");
        if (email === "" || password === "" || userName === "" || url === "") {
            alert("Preencha todos os campos!");
            setIsLoading(false);
            setInputLoading("");
        }
        else {
            const promise = signup({
                name: userName,
                email: email,
                password: password,
                pictureUrl: url
            });

            promise.then(response => {
                alert("Usuário cadastrado. Faça Login agora")
                navigate('/')

            })
            promise.catch(error => {
                if (error.response.status === 409) {
                    alert("Email já cadastrado! Tente novamente")
                }
                else {
                    alert("Erro no sistema! Tente novamente.")
                }
                console.log(error.response.status)
                setIsLoading(false);
                setInputLoading("");
            })
        }
    }

    return (
        <Container>
            <LogoWrapper>
                <motion.LogoCard initial={{ x: -10 }} animate={{ x: 0 }} transition={{
                    stiffness: 260,
                    damping: 20,
                    duration: 0.8
                }}>
                    <Title>linkr</Title>
                    <Subtitle>save, share and discover</Subtitle>
                    <Subtitle>the best links on the web</Subtitle>
                </motion.LogoCard>
            </LogoWrapper>
            <SignUpWrapper>
                <SignUpCard >
                    <motion.form onSubmit={handleSignUp} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                        stiffness: 260,
                        damping: 20,
                        duration: 1
                    }}>
                        <Input
                            type="email"
                            placeholder="e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            disabled={inputLoading}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            disabled={inputLoading}
                        />
                        <Input
                            type="username"
                            placeholder="username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            disabled={inputLoading}
                        />
                        <Input
                            type="url"
                            placeholder="picture url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            disabled={inputLoading}
                        />
                        <Button>{isLoading ? ("loading...") : ("Sign Up")} </Button>

                        <LinkStyled to="/" > Switch back to log in </LinkStyled>
                    </motion.form>
                </SignUpCard>

            </SignUpWrapper>

        </Container>
    );
}

export default SignUpPage;