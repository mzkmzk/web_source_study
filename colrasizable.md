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

