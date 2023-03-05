import React, { Component } from 'react'
import Cell from "./Cell";

export class Row extends Component {
  render() {

    const cellsNum = this.props.cellsNum;
    const generatedCells = [];

    for (let i = 0; i < cellsNum; i++){
        generatedCells.push(<Cell borderColor="rgb(37, 171, 255)" />)
    }

    return (
      generatedCells
    )
  }
}

export default Row