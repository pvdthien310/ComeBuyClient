/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Stack } from '@mui/material';
import Fab from '@mui/material/Fab';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';

import ChatIcon from '@mui/icons-material/Chat';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import TypingAnim from '../TypingAnim';
import botAvatar from '../../assets/img/logo.png';
import Loading from '../LoadingChatbot';
import ChatbotApi from '../../api/chatbotAPI';
import { currentUser } from '../../redux/selectors';
import productAPI from '../../api/productAPI';
import ProductItem from '../RecommendedProductLine/ProductItem';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const openFormHandle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="chatbot__container">
            {isOpen ? (
                <FormChat openFormHandle={openFormHandle} />
            ) : (
                <Fab color="primary" aria-label="add" onClick={openFormHandle}>
                    <ChatIcon />
                </Fab>
            )}
        </div>
    );
}

function FormChat({ openFormHandle }) {
    let userName = useSelector(currentUser).name;
    if (userName == null) {
        userName = ' ';
    } else {
        userName += ' ';
    }

    const [loading, setLoading] = useState(false);
    const today = format(new Date(), 'PP p');
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            message: `Hi, ${userName}nice to meet you. I am Bot Dam and I am a virtual assistant of Comebuy to help you with your support needs. What are your looking for?`,
            listBtn: [],
            dateTime: today,
        },
    ]);

    // const navigate = useNavigate();
    const sendMessageHandle = (text) => {
        if (text === '') return;
        const currentTime = new Date();
        const dateFormat = format(currentTime, 'PP p');
        const messageObj = {
            type: 'user',
            message: text,
            listBtn: [],
            dateTime: dateFormat,
            typeMes: '',
        };
        setMessages([...messages, messageObj]);
        // const messageTemp = [...messages, messageObj];

        const sendObj = {
            text,
        };
        setLoading(true);
        ChatbotApi.getResponse(sendObj)
            .then(async (res) => {
                if (res.status === 200) {
                    console.log(res);
                    if (
                        res.data.parameters.fields.eFeature === null ||
                        res.data.parameters.fields.eFeature === undefined
                    ) {
                        const newMesObj = {
                            type: 'bot',
                            message: res.data.fulfillmentText,
                            listBtn: [],
                            dateTime: dateFormat,
                            typeMes: '',
                        };
                        setLoading(false);
                        setMessages((prev) => [...prev, newMesObj]);
                    } else {
                        const responseForProductList = await productAPI.getRecordsFilter({
                            brand: [],
                            ram: [],
                            cpu: [],
                            gpu: [],
                            screendimension: [],
                            weight: [],
                            memory: [],
                            year: [],
                            prices: [0, 3000],
                            demand: [res.data.parameters.fields.eFeature.stringValue],
                            offset: 1,
                        });
                        if (responseForProductList.status === 200) {
                            const newMessages = responseForProductList.data.data.map((item) => ({
                                type: 'bot',
                                message: item.productID,
                                listBtn: [],
                                dateTime: dateFormat,
                                typeMes: 'link',
                            }));
                            const mes2 = {
                                type: 'bot',
                                message: 'There are some laptops that maybe fit to you!',
                                listBtn: [],
                                dateTime: dateFormat,
                                typeMes: '',
                            };
                            setLoading(false);
                            setMessages((prev) => prev.concat([...newMessages, mes2]));
                        }
                    }
                } else {
                    setLoading(false);
                    const newMesObj = {
                        type: 'bot',
                        message: 'Tian is broken :(((. I am so sorry, please try again or contact with us! Thank you.',
                        listBtn: [],
                        dateTime: dateFormat,
                        typeMes: '',
                    };
                    setMessages((prev) => [...prev, newMesObj]);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="form__container">
            <Header openFormHandle={openFormHandle} />
            <MessList messages={messages} loading={loading} />
            <SendBox sendMessageHandle={sendMessageHandle} />
        </div>
    );
}

function Header({ openFormHandle }) {
    return (
        <div className="form__header">
            <div className="form__header__bot">
                <Avatar alt="Remy Sharp" src={botAvatar} />
                <div className="form__header__bot__text">
                    <p>Bot Dam</p>
                    <p style={{ fontSize: 13 }}>Online</p>
                </div>
            </div>

            <IconButton onClick={openFormHandle}>
                <CloseRoundedIcon />
            </IconButton>
        </div>
    );
}

function MessList({ messages, loading }) {
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    return (
        <div className="form__messList">
            {messages ? (
                <div>
                    {messages.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <MessageItem key={i} item={item} />
                    ))}

                    {loading && <TypingAnim style={{ height: 100 }} />}
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

function MessageItem({ item }) {
    return (
        <div>
            {item.type === 'bot' ? (
                <div className="form__messList__item">
                    <Avatar sx={{ marginRight: 1 }} alt="Remy Sharp" src={botAvatar} />
                    <div className="form__messList__item__text">
                        <b>Bot Dam</b>
                        {item.typeMes === 'link' ? (
                            <Stack sx={{ marginTop: 1 }}>
                                <ProductItem product={item.message} />
                            </Stack>
                        ) : (
                            <p className="form__messList__item__message">{item.message}</p>
                        )}
                        <p>{item.dateTime}</p>
                    </div>
                </div>
            ) : (
                <div className="form__messList__item">
                    <div className="form__messList__item__text form__messList__item__text--right">
                        <p className="form__messList__item__message form__messList__item__message--right">
                            {item.message}
                        </p>
                        <p>{item.dateTime}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function SendBox({ sendMessageHandle }) {
    const [message, setMessage] = useState('');

    return (
        <div className="form__sendBox">
            <OutlinedInput
                placeholder="Type your message..."
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        sendMessageHandle(message);
                        setMessage('');
                    }
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ fontSize: 15, width: 'stretch', height: 45, borderRadius: 6, margin: 1 }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => {
                                sendMessageHandle(message);
                                setMessage('');
                            }}
                            edge="end"
                            sx={{ color: '#42a5f5', marginRight: 0.3 }}
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </div>
    );
}

export default ChatBot;
