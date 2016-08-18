"use strict";

let fs = require('fs');
let _  = require('lodash');

const analyzeCell = (x, y, character, maze) => {
  switch (character) {
  case " " :
    break;
  case "#" :
    maze.walls.push({x: x, y: y});
    break;
  case "O" :
    maze.entrance = {x: x, y: y};
    break;
  case "X" :
    maze.exit = {x: x, y: y};
    break;
  }
};

const execute = (filename) => {
  let initTime = new Date().getTime();
  let maze = {
    entrance: {x: 0, y: 0},
    exit: {x: 0, y: 0},
    size: {x: 0, y: 0},
    walls: []
  };

  fs.readFile(filename, 'utf8', (err, data) => {
    data = data.split("\n");

    let separatedData = data.map((line) => {
      line = line.split("");
      return line;
    });

    separatedData.forEach((line, Y) => {
      if (line.length === 0) {return;}
      line.forEach((char, X) => {
        analyzeCell(X, Y, char, maze);
      });
    });

    maze.size.x = separatedData[0].length;
    maze.size.y = separatedData.length - 1;

    startSolving(maze, maze.entrance, []);

    let endTime = new Date().getTime();
    console.log(`DONE!, executed in  ${endTime - initTime} ms`);
  });
};

const noWallOn = (x, y, maze) => {
  if (x >= maze.size.x || y >= maze.size.y) {return false;}
  if (x < 0 || y < 0) {return false;}

  let matched = _.filter(maze.walls, {x: x, y: y});
  return (matched.length === 0);
};

const notOnPathStack = (x, y, paths) => {
  let matched = _.filter(paths, {x: x, y: y});
  return (matched.length === 0);
};

const startSolving = (maze, currentPos, paths) => {
  let x = currentPos.x;
  let y = currentPos.y;

  if (noWallOn(x, y - 1, maze) && notOnPathStack(x, y - 1, paths)) {
    paths.push({x: x, y: y});
    y -= 1;
  }
  else if (noWallOn(x + 1, y , maze) && notOnPathStack(x + 1, y, paths)) {
    paths.push({x: x, y: y});
    x += 1;
  }
  else if (noWallOn(x, y + 1 , maze) && notOnPathStack(x, y + 1, paths)) {
    paths.push({x: x, y: y});
    y += 1;
  }
  else if (noWallOn(x - 1, y , maze) && notOnPathStack(x - 1, y, paths)) {
    paths.push({x: x, y: y});
    x -= 1;
  }
  else {
    // dirty, I know :(
    maze.walls.push({x: x, y: y});
    x = paths[paths.length - 1].x;
    y = paths[paths.length - 1].y;
    paths.pop();
  }

  if (maze.exit.x === x && maze.exit.y === y) {
    paths.push({x: x, y: y});
    analyzePath(paths);
  }
  else {
    currentPos = {x: x, y: y};
    startSolving(maze, currentPos, paths);
  }
};

const analyzePath = (path) => {
  let reversePath = _.reverse(path);
  let startCoord  = reversePath[0];
  let travelArray = [];

  reversePath.forEach((coord, index) => {
    if (index + 1 >= reversePath.length) {return; }

    let nextCoord = reversePath[index + 1];
    if (coord.x + 1 === nextCoord.x && coord.y === nextCoord.y)      { travelArray.push('west'); }
    else if (coord.x - 1 === nextCoord.x && coord.y === nextCoord.y) { travelArray.push('east'); }
    else if (coord.x === nextCoord.x && coord.y + 1 === nextCoord.y) { travelArray.push('north'); }
    else if (coord.x === nextCoord.x && coord.y - 1 === nextCoord.y) { travelArray.push('south'); }
  });

  console.log(_.reverse(travelArray).join("\n"));
  console.log(`${travelArray.length} steps`);
};

module.exports = execute;
