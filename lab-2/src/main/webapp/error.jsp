<%@ page contentType="text/html;charset=UTF-8" %>
<%
  String message = (String) request.getAttribute("Error-Message");
  if (message == null || message.trim().isEmpty()) {
    message = "No description presented.";
  }
%>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta content="width=400, maximum-scale=1" name="viewport"/>
  <title>Lab 2</title>
  <link href="img/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
  <link href="img/favicon/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png">
  <link href="img/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
  <link href="img/favicon/android-icon-192x192.png" rel="icon" sizes="192x192" type="image/png">
  <link href="img/favicon/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120">
  <link href="img/favicon/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152">
  <link href="img/favicon/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180">
  <link href="css/vendors.min.css" rel="stylesheet">
  <link href="css/style.min.css" rel="stylesheet">
</head>
<body class="light">
<div class="absolute-center" id="error">
  <h3 class="convex-plate">Error. <%=message%>
  </h3>
  <button class="convex-button back-button" onclick="window.location.replace('index.jsp')">
    <img alt="back" src="img/back.svg">
    <span>main page</span>
  </button>
</div>
<script>
  const theme = sessionStorage.getItem('theme');
  if (theme != null) document.body.className = theme;
</script>
</body>
</html>