import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { allBookers, deleteBooker } from '../redux/actions/userAction'
import { Button, DataTable } from 'react-native-paper';
import { format } from "date-fns";
import { DELETE_BOOKER_RESET } from '../redux/constants/userConstants';

const Bookers = ({navigation}) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { loading, error, users } = useSelector(state=>state.allUsers)
    const { isDeleted } = useSelector(state=>state.user)

    useEffect(()=> {
        dispatch(allBookers(user._id))

        if(isDeleted){
            dispatch({type: DELETE_BOOKER_RESET})
        }
    },[user, dispatch, isDeleted])

    const deleteBookerHandler = (id) => {
        dispatch(deleteBooker(id))
    }

    return (
        <ScrollView>
            <Button onPress={()=>navigation.navigate("New Booker")}>Add new booker</Button>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Added on</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {users && users.map((booker)=> (
                    <DataTable.Row key={booker._id}>
                        <DataTable.Cell>{booker.name}</DataTable.Cell>
                        <DataTable.Cell>{format(new Date(booker.createdAt), 'dd.MM.yyyy')}</DataTable.Cell>
                        <DataTable.Cell textStyle={{color:"red"}} onPress={()=>deleteBookerHandler(booker._id)}>DELETE</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    )
}

export default Bookers