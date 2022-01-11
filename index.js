function findBestSpot(landWidth, landHeight, exploitationWidth, exploitationHeight, goldMines) {
	const globalLand = newMatrix(landWidth, landHeight);

	goldMines.forEach(mines => {
		globalLand[mines.x][mines.y] = 1;
	});

	const bestSpot = checkMinesSites(landWidth, landHeight, exploitationWidth, exploitationHeight, globalLand);

	return {
		coordinates: {
			x: bestSpot.xCoordinate,
			y: bestSpot.yCoordinate,
		},
		goldMines: bestSpot.goldMinesAmount
	}
}

function checkMinesSites(landWidth, landHeight, exploitationWidth, exploitationHeight, generalMap) {
	class exploitationBlock {
		constructor(xCoordinate, yCoordinate, goldMinesAmount) {
			this.xCoordinate = xCoordinate;
			this.yCoordinate = yCoordinate;
			this.goldMinesAmount = goldMinesAmount;
		}
	}

	const exploitationBlockArray = [];
	const exploitationBlockArrayMax = [];

	const exploitationBlockSize = checkLandSize(landWidth, landHeight, exploitationWidth, exploitationHeight);

	for (let i = 0; i < landWidth - exploitationBlockSize.width + 1; i++) {
		for (let j = 0; j < landHeight - exploitationBlockSize.height + 1; j++) {
			let goldMinesSum = 0;

			for (let k = 0; k < exploitationBlockSize.width; k++) {
				for (let l = 0; l < exploitationBlockSize.height; l++) {
					if (generalMap[i + k][j + l] !== 0) {
						goldMinesSum += 1;
					}
				}
			}

			exploitationBlockArray.push(new exploitationBlock(
				i,
				j,
				goldMinesSum
			));
		}
	}

	const maximumGoldMines = Math.max.apply(Math, exploitationBlockArray.map((o) => {
		return o.goldMinesAmount;
	}));

	exploitationBlockArray.forEach(location => {
		if (location.goldMinesAmount === maximumGoldMines) {
			exploitationBlockArrayMax.push(location);
		}
	});

	return exploitationBlockArrayMax[0];
}

function checkLandSize(landWidth, landHeight, exploitationWidth, exploitationHeight) {
	let exploitationWidthSize = 0;
	let exploitationHeightSize = 0;

	if (exploitationWidth > landWidth) {
		exploitationWidthSize = landWidth;
	} else {
		exploitationWidthSize = exploitationWidth;
	}

	if (exploitationHeight > landHeight) {
		exploitationHeightSize = landHeight;
	} else {
		exploitationHeightSize = exploitationHeight;
	}

	return {
		width: exploitationWidthSize,
		height: exploitationHeightSize
	};
}

function newMatrix(row, column) {
	if (row === 0 || column === 0) {
		return [[0]];
	} else {
		return new Array(row).fill(0).map(() => new Array(column).fill(0));
	}
}

module.exports = findBestSpot;
