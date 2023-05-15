import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { allBookers } from '../redux/actions/userAction'
import { Button, DataTable } from 'react-native-paper';
import { format } from "date-fns";

const Bookers = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { loading, error, users } = useSelector(state=>state.allUsers)

    useEffect(()=> {
        dispatch(allBookers(user._id))
    },[user])

    return (
        <ScrollView>
            <Button>Add new booker</Button>
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
                        <DataTable.Cell textStyle={{color:"red"}}>DELETE</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    )
}

export default Bookers