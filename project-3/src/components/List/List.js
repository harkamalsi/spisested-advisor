import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { isTSExpressionWithTypeArguments } from '@babel/types';
import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import IconButton from '@material-ui/core/IconButton';
import { Brightness7Rounded } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));

/* function createData(data){
  let tmpArray = [];
  for (let i = 0; i< data.lengt;i++){
    tmpArray.push({data[i][0])
  }
}
function formatData(name, address, city, rating) { //raw data is a props passed down, an array with data
  let dataArray = []
  for (let i = 0; i< arguments.length; i++){
      dataArray.push({name , address, city, rating });
  }
  return dataArray;
} */

//Component visualises a list of elements in this format:
//[{name:xxx, address:xxx, city:xxx, rating:xxx},
// name:xxx, address:xxx, city:xxx, rating:xxx},
// .
// .
// . 
// name:xxx, address:xxx, city:xxx, rating:xxx}
//]
/* const columns = [
  new ColumnModel('Navn'),
  new ColumnModel('Adressen'),
  new ColumnModel('By'),
  new ColumnModel('Rating')
]; */
const columns = [
  new ColumnModel('OrderID'),
  new ColumnModel('CustomerName'),
  new ColumnModel('ShipperCity')
];
const List = props => {
  const classes = useStyles();
  let rows = props.listData// formatData(props.listData);
  return (
    <DataGrid     columns={columns}
    dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
    gridName='Tubular-React'>
    </DataGrid>
/* 
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Navn</TableCell>
            <TableCell align="right">Adress</TableCell>
            <TableCell align="right">By</TableCell>
            <TableCell align="right">Vurderinger</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper> */
  );
}

export default List;