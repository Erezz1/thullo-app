import { FC } from 'react';

interface IProps {
    message: string;
}

const Loading: FC<IProps> = ({ message }) => {
    return (
        <div>
            <p>{ message }</p>
        </div>
    )
}

export default Loading;
