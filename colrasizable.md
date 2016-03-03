# ColRasizable

此插件是用于拖动table的列框的

github地址:

<https://github.com/alvaro-prieto/colResizable>

##1. 使用方法

```javascript
<head>
    <script src="js/jquery.js"></script>
    <script src="js/colResizable.min.js"></script>
    
    $(function(){
        $("table").colResizable();
    });
</head>
<body>	 
  <table width="100%" >
    <tr> <th> header </th> <th> header </th> </tr>
    <tr> <td> cell </td> <td> cell </td> </tr>							
    <tr> <td> cell </td> <td> cell </td> </tr>					
  </table>	
  
</body>
```

##2. 配置参数解析

在colResizable方法中,可以提供一下对象来自定义

1. draggingClass

    这个会在table的外面一层添加一个div,class设置为draggingClass的值.
    
    ```css
    .JColResizer {
	table-layout:fixed;
    }
    .JColResizer td,.JColResizer th {
    	overflow:hidden;
    	padding-left:0!important;
    	padding-right:0!important;
    }
    .JCLRgrips {
    	height:0px;
    	position:relative;
    }
    .JCLRgrip {
    	margin-left:-5px;
    	position:absolute;
    	z-index:5;
    }
    .JCLRgrip .JColResizer {
    	position:absolute;
    	background-color:red;
    	filter:alpha(opacity=1);
    	opacity:0;
    	width:10px;
    	height:100%;
    	cursor:e-resize;
    	top:0px
    }
    .JCLRLastGrip {
    	position:absolute;
    	width:1px;
    }
    <!--默认-->
    .JCLRgripDrag {
    	border-left:1px dotted black;
    }
    .JCLRFlex {
    	width:auto!important;
    }

    ```
2. 3

```javascript
//attributes:
draggingClass: 'JCLRgripDrag',	//css-class used when a grip is being dragged (for visual feedback purposes)
gripInnerHtml: '',				//if it is required to use a custom grip it can be done using some custom HTML
liveDrag: false,				//enables table-layout updating while dragging
fixed: true,                    //table width does not change if columns are resized
minWidth: 15, 					//minimum width value in pixels allowed for a column
headerOnly: false,				//specifies that the size of the the column resizing anchors will be bounded to the size of the first row
hoverCursor: "e-resize",  		//cursor to be used on grip hover
dragCursor: "e-resize",  		//cursor to be used while dragging
postbackSafe: false, 			//when it is enabled, table layout can persist after postback or page refresh. It requires browsers with sessionStorage support (it can be emulated with sessionStorage.js).
flush: false, 					//when postbakSafe is enabled, and it is required to prevent layout restoration after postback, 'flush' will remove its associated layout data
marginLeft: null,				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
marginRight: null, 				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
disable: false,					//disables all the enhancements performed in a previously colResized table
partialRefresh: false,			//can be used in combination with postbackSafe when the table is inside of an updatePanel

//events:
onDrag: null, 					//callback function to be fired during the column resizing process if liveDrag is enabled
onResize: null					//callback function fired when the dragging process is over

```