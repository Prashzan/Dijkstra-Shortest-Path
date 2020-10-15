import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import './PathfindingVisualizer.css';
import photo from './photo.png';



let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW =10;
let FINISH_NODE_COL =35;
let doubleClick = 1;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    this.customRender();
  }

  customRender(){
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleDoubleClick(row,col){
    // console.log('hello world');
    if(doubleClick===1){
      START_NODE_ROW = row;
      START_NODE_COL = col;
      doubleClick++;
      this.customRender();

    }else if(doubleClick===2){
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      doubleClick--;
      this.customRender();
    }

  }

  // handleMouseOver() {
  //   this.
  // }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 20 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 100 * i);
    }
  }

  // visualizeAStar(){
  //   const { grid } = this.state;
  //   const startNode = grid[START_NODE_ROW][START_NODE_COL]
  //   const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
  //   const start_time = new Date().getTime();
  //   const astar_algo = astar(grid,startNode,finishNode);
  //   console.log("bellman_output>>",astar_algo);
  //   const end_time = new Date().getTime();
  //   const actual_time = end_time - start_time;
  // }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const start_time = new Date().getTime();
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const end_time = new Date().getTime();
    const actual_time = end_time - start_time;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // console.log(actual_time);
    setTimeout(() => {
      document.write( "<h1> The time taken by the algorithm is: " + actual_time + " milliseconds. </h1> ");
    }, 25000);



  }



  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
        
      <>
      <div className="jumbotron">
        {/* <img src = "photo.png"></img> */}
        <div className="bau">
        <img src={photo} alt="" />;
        </div>
        <h1>Path Finding Visulizer</h1>
        <p>This is the implementation of shortest path algorithm</p>
      </div>
        <nav className="navbar navbar-expand-md sticky-top">
          <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
            <span className="navbar-toggler-icon"></span>
          </button>

          <ul className="navbar-nav">
            
            {/* <li className="nav-item">
              <button>Clear Board</button>
            </li>
            <li className="nav-item">
            <button>Clear Walls</button>
            </li>
            <li className="nav-item">
            <button>Clear Path</button>
            </li> */}
         
          </ul>
          
        </nav>



        <div id='mainText'>
        <ul>
          <li>
            <div className="start"></div>Start Node</li>
          <li>
            <div className="target"></div>Target Node</li>
          <li>
            <div className="unvisited"></div>Unvisited Node</li>
          <li>
            <div className="visited"></div><div className="visitedobject"></div>Visited Nodes</li>
          <li>
            <div className="shortest-path"></div>Shortest-path Node</li>
          <li>
            <div className="wall"></div>Wall Node</li>
        </ul>
      </div>

      

        <button id="vizbut" onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>

      
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onDoubleClick = {(row,col)=>this.handleDoubleClick(row,col)}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      // onMouseOver={() => this.handleMouseOver(row, col)}
                      row={row}></Node>
                  );  
                })}
              </div>
            );
          })}
        </div>

        <div className="foot">
        <footer className="footer text-center">
                <div className="container">
                    <p className="footer-text" style={{fontWeight: "bold"}}>This is the demo of Path finding Algorithm... <br>
                    </br>Copyright 2020 Visualization. ALl rights reserved</p>
                </div>
        </footer>
          </div>

      </>
    );
  }
}





// const v1 = performance.now();
// this.visualizeDijkstra();
// const v2 = performance.now();
// console.log("Function took " + (v1-v2) + " milliseconds");

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  // console.log(grid);
  return grid;
};



const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,

    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

