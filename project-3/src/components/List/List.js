import React, { useState } from "react";
import ListRow from "../ListRow/ListRow.js";
import "./List.css";

const List = props => {
  const [expandedRowId, setExpandedRow] = useState(null);
  //Logic to expand selected row (Can be used for test)
  function handleExpanedRow(id) {
    console.log(id);

    if (expandedRowId === id) return null;
    return id;
  }
  //update selected row to be expanded
  function updateExpandedRow(id) {
    setExpandedRow(handleExpanedRow(id));
  }
  let rows = props.listRawData.map(row => (
    <ListRow
      key={row.id}
      id={row.id}
      rowData={row}
      handleClick={updateExpandedRow}
      isExpanded={expandedRowId === row.id}
    ></ListRow>
  ));
  return (
    <ul className="Table">
      <li className="TableHeader">
        <div className="Column">Navn</div>

        <div className="Column">By</div>
        <div id="ColumnFace" className="Column">
          Fjes
        </div>
        <div id="ColumnStar" className="Column">
          Vurdering
        </div>
      </li>
      {rows}
    </ul>
  );
};

export default List;
