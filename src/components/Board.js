import React, { Component } from "react";
import Row from "./Row";
import Cell from "./Cell";
import "./Board.css";

import Road from "../Rails/Road";
import Trail from "../Rails/Trail";

class Board extends Component {
  state = {};

  render() {
    const rows = [];

    for (let i = 0; i < 8; i++) {
      const buildrow = [];

      for (let y = 0; y < 9; y++) {
        buildrow.push(<div></div>);
      }

      rows.push(<div className="row">{buildrow}</div>);
    }

    return (
      <div id="board">
        <div className="row">
          <Cell />
          <Cell borderBottomColor="rgb(37, 171, 255)" />
          <Cell borderBottomColor="rgb(37, 171, 255)">
            <Road />
          </Cell>
          <Cell borderBottomColor="rgb(37, 171, 255)" />
          <Cell borderBottomColor="rgb(37, 171, 255)">
            <Trail />
          </Cell>
          <Cell borderBottomColor="rgb(37, 171, 255)" />
          <Cell borderBottomColor="rgb(37, 171, 255)">
            <Road />
          </Cell>
          <Cell borderBottomColor="rgb(37, 171, 255)" />
          <Cell />
        </div>

        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" />
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" />
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" rotate="90deg">
            <Trail />
          </Cell>
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" rotate="90deg">
            <Trail />
          </Cell>
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" />
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" />
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" rotate="90deg">
            <Road />
          </Cell>
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" rotate="90deg">
            <Road />
          </Cell>
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" />
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" />
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" rotate="90deg">
            <Trail />
          </Cell>
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" rotate="90deg">
            <Trail />
          </Cell>
        </div>
        <div className="row">
          <Cell borderRightColor="rgb(37, 171, 255)" />
          <Row cellsNum={7} />
          <Cell borderLeftColor="rgb(37, 171, 255)" />
        </div>

        <div className="row">
          <Cell />
          <Cell borderTopColor="rgb(37, 171, 255)" />
          <Cell borderTopColor="rgb(37, 171, 255)">
            <Road />
          </Cell>
          <Cell borderTopColor="rgb(37, 171, 255)" />
          <Cell borderTopColor="rgb(37, 171, 255)">
            <Trail />
          </Cell>
          <Cell borderTopColor="rgb(37, 171, 255)" />
          <Cell borderTopColor="rgb(37, 171, 255)">
            <Road />
          </Cell>
          <Cell borderTopColor="rgb(37, 171, 255)" />
          <Cell />
        </div>
      </div>
    );
  }
}

export default Board;
