<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="ru.lab.model.HitResult" %>
<%
  HitResult hitResult = (HitResult) request.getAttribute("Hit-Result");
  if (hitResult == null) {
    request.setAttribute("Error-Message", "Hit result not found.");
    request.getRequestDispatcher("/error.jsp").forward(request, response);
    return;
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
<main id="result">
  <div class="convex-plate" id="result-plate">
    <table>
      <thead>
      <tr>
        <th>X value</th>
        <th>Y value</th>
        <th>R value</th>
        <th>Area hit</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><%=hitResult.getX()%>
        </td>
        <td><%=hitResult.getY()%>
        </td>
        <td><%=hitResult.getR()%>
        </td>
        <td><%=hitResult.getResult() ? "Yes" : "No"%>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <button class="convex-button back-button" onclick="window.location.replace('index.jsp')">
    <img alt="back" src="img/back.svg">
    <span>main page</span>
  </button>
</main>
<script>
  const theme = sessionStorage.getItem('theme');
  if (theme != null) document.body.className = theme;
</script>
</body>
</html>