import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Box } from '@chakra-ui/react';

import Layout from '@/components/layout';
import BoardContainer from './components/board-container';
import { useAuth, useValidateWindowSize } from 'hooks';
import { getBoardById } from 'utils';

const MembersList = dynamic( () => import(/* webpackChunkName: "members-list" */ './components/members-list') );
const BoardDetails = dynamic( () => import(/* webpackChunkName: "board-details" */ './components/board-details') );

interface IProps {
    boardId: string;
}

const Board: NextPage<IProps> = ({ boardId }) => {

   const { push } = useRouter();

    const { data: board } = useQuery(
        ['board', boardId ],
        () => getBoardById( boardId ),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    // Valida si el usuario esta autenticado
    useAuth();

    useValidateWindowSize({
        message: 'Para una mejor experiencia, utiliza una laptop o una computadora de escritorio.',
    })

    return (
        <Layout title="Hola">
            <Box
                p="5"
                pb="0"
                display={["none", "flex"]}
                justifyContent="space-between"
                alignItems="center"
            >
                <MembersList />
                <BoardDetails  />
            </Box>

            <BoardContainer />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ( context ) => ({
    props: {
        boardId: context.query.boardId,
    }
})

export default Board;