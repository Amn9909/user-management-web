import { React, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Switch } from '@mui/material';
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from '../redux/apis/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar } from '../redux/slices/snackbarSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import SimpleSnackbar from '../components/common/SnackBar';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const Homepage = () => {
    const [users, setUsers] = useState([])
    const [showPass, setShowPass] = useState({})





    const { data, refetch } = useGetAllUsersQuery();
    const [updateUserStatus] = useUpdateUserStatusMutation()

    const dispatch = useDispatch()


    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])

    function togglePassVisibility(userId) {
        setShowPass((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    }

    const handleStatusChange = (userId, status) => {
        try {
            const response = updateUserStatus({ userId: userId, status: !status })
            dispatch(showSnackbar({message : "Status changed successfully",severity : "success"}))
        } catch (error) {
            dispatch(showSnackbar({message : "Status change failed",severity : "error"}))
        }
    }

    const handleClose = () => {
        setShowMsg(false)
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">First name</TableCell>
                        <TableCell align="center">Last name</TableCell>
                        <TableCell align="center">email </TableCell>
                        <TableCell align="center">password</TableCell>
                        <TableCell align="center">visibility</TableCell>
                        <TableCell align="center">toogle status</TableCell>
                        <TableCell align="center">active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{user?.id}</TableCell>
                            <TableCell align="center">{user?.firstName}</TableCell>
                            <TableCell align="center">{user?.lastName}</TableCell>
                            <TableCell align="center">{user?.email}</TableCell>
                            <TableCell align="center" >  {showPass[user?.id] ? user?.password : '********'}</TableCell>
                            <TableCell align="center">
                                {showPass[user?.id] ? (
                                    <VisibilityOffIcon onClick={() => togglePassVisibility(user?.id)} />
                                ) : (
                                    <VisibilityIcon onClick={() => togglePassVisibility(user?.id)} />
                                )}
                            </TableCell>
                            <TableCell align="center">
                                <Switch
                                    checked={user?.active}
                                    onClick={() => handleStatusChange(user?.id, user?.active)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                {user?.active ? (
                                    <FiberManualRecordIcon sx={{ color: 'green' }} />
                                ) : (
                                    <FiberManualRecordIcon sx={{ color: 'red' }} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <SimpleSnackbar />
        </TableContainer>
    );
}

export default Homepage
