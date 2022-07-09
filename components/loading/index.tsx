import { FC } from 'react';
import {
    Box,
    Text
} from '@chakra-ui/react';
import DotLoader from 'react-spinners/DotLoader';

interface IProps {
    message: string;
}

const Loading: FC<IProps> = ({ message }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#F8F9FD'
            }}
        >
            <DotLoader color="#3182CE" size="12rem" />
            <p
                style={{
                    color: '#3182CE',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginTop: '3rem',
                    fontFamily: 'sans-serif'
                }}
            >
                { message }
            </p>
        </div>
    )
}

export default Loading;
