const obj =  {data:[

                {itemId:1, itemName:"пункт №1", itemParentId:0},

                {itemId:2, itemName:"пункт №1.1", itemParentId:1},

                {itemId:3, itemName:"пункт №1.2", itemParentId:1},

                {itemId:4, itemName:"пункт №1.2.1", itemParentId:3},

                {itemId:5, itemName:"пункт №1.2.2", itemParentId:3},

                {itemId:6, itemName:"пункт №1.2.3", itemParentId:3},

                {itemId:7, itemName:"пункт №2", itemParentId:0},

                {itemId:8, itemName:"пункт №3", itemParentId:0},

                {itemId:9, itemName:"пункт №3.1", itemParentId:8},

                {itemId:10, itemName:"пункт №3.2", itemParentId:8},

                {itemId:11, itemName:"пункт №3.3", itemParentId:8},

                {itemId:12, itemName:"пункт №3.3.1", itemParentId:11},

                {itemId:13, itemName:"пункт №3.3.1.1", itemParentId:12},

                {itemId:14, itemName:"пункт №3.3.1.2", itemParentId:12},

                {itemId:15, itemName:"пункт №3.3.1.3", itemParentId:12},

                {itemId:16, itemName:"пункт №3.3.2", itemParentId:11},

                {itemId:17, itemName:"пункт №4", itemParentId:0},

                {itemId:18, itemName:"пункт №5", itemParentId:0},

                {itemId:19, itemName:"пункт №5.1", itemParentId:18}

]};




const foldersTree = ((arr) => {
	const treeNode = document.getElementById('tree');
	const tree = treeMaker(obj.data);
	
	function treeMaker(arr) {
  let tree = [];
  let mappedArr = {};
  let mappedElem;

  for(let i = 0; i < arr.length; i++) {
    mappedArr[arr[i].itemId] = arr[i];
    mappedArr[arr[i].itemId]['children'] = [];
  }

  for (const itemId in mappedArr) {
      mappedElem = mappedArr[itemId];
      if (!mappedElem.itemParentId) {
        tree.push(mappedElem);
      }
      else {
      	mappedArr[mappedElem['itemParentId']]['children'].push(mappedElem);
      }
  }
  return tree;
	};


	function displayJsonTree(arr) {
  	let htmlRetStr = "<ul class='folder'>";
  	for (const key in arr) {
    	if (typeof(arr[key]) === 'object' && arr[key].length !== 0) {
      	htmlRetStr += displayJsonTree( arr[key] );
      	htmlRetStr += '</ul></li>';
    	} else if (typeof(arr[key]) === 'string'){
    		if (arr.children.length) {
    			htmlRetStr += "<li class='item'>" + arr[key]+"</li><li class='wrapper hidden'>";
    		} else {
    		htmlRetStr += "<li class='file'>" + arr[key]+"<span class='fileCorner'></span></li><li class='wrapper hidden'>";
    		} 
    	}
  	}
  	return( htmlRetStr );
	};

	function showItems (e) {
		if(e.target && e.target.className === 'item') {
			e.target.parentNode.getElementsByClassName('wrapper')[0].classList.toggle('hidden');
		}
	};

	treeNode.innerHTML = displayJsonTree(tree);
	treeNode.addEventListener('click', showItems);

});

foldersTree(obj.data);