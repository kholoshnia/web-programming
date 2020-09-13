<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="ru.lab.model.HitResult" %>
<%
  HitResult hitResult = (HitResult) request.getAttribute("Hit-Result");
  if (hitResult == null) {
    request.setAttribute("Error-Message", "Hit result not found.");
    request.getRequestDispatcher("/error.jsp").forward(request, response);
    return;
  }

  String theme = (String) request.getAttribute("Theme");
  System.out.println(theme);
  if (theme == null) {
    theme = "light";
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
  <style>
    @media screen and (max-width: 470px) {
      #graph-svg {
        height: 20vw;
      }
    }
  </style>
</head>
<body class="<%=theme%>">
<main id="result">
  <div class="convex-plate no-selection" id="result-graph">
    <svg id="graph-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <!-- circle -->
      <path class="graph-shape" d="M 100 150 A 50 50, 0, 0, 1, 150 100 L 150 150 Z"></path>

      <!-- square -->
      <rect class="graph-shape" height="100" width="100" x="150" y="50"></rect>

      <!-- triangle -->
      <polygon class="graph-shape" points="100,150 150,150 150,250"></polygon>

      <!-- axles -->
      <text class="graph-axle-text" x="290" y="140">x</text>
      <line class="graph-axle-line" x1="0" x2="295" y1="150" y2="150"></line>
      <polygon class="graph-axle-arrow" points="299,150 290,155 290,145"></polygon>

      <text class="graph-axle-text" x="160" y="10">y</text>
      <line class="graph-axle-line" x1="150" x2="150" y1="5" y2="300"></line>
      <polygon class="graph-axle-arrow" points="150,1 145,10 155,10"></polygon>

      <!-- points -->
      <line class="graph-point" x1="50" x2="50" y1="145" y2="155"></line>
      <line class="graph-point" x1="100" x2="100" y1="145" y2="155"></line>
      <line class="graph-point" x1="200" x2="200" y1="145" y2="155"></line>
      <line class="graph-point" x1="250" x2="250" y1="145" y2="155"></line>

      <line class="graph-point" x1="145" x2="155" y1="250" y2="250"></line>
      <line class="graph-point" x1="145" x2="155" y1="200" y2="200"></line>
      <line class="graph-point" x1="145" x2="155" y1="100" y2="100"></line>
      <line class="graph-point" x1="145" x2="155" y1="50" y2="50"></line>

      <!-- labels -->
      <text class="graph-label r-whole-neg" text-anchor="middle" x="50" y="140">-R</text>
      <text class="graph-label r-half-neg" text-anchor="middle" x="100" y="140">-R/2</text>
      <text class="graph-label r-half-pos" text-anchor="middle" x="200" y="140">R/2</text>
      <text class="graph-label r-whole-pos" text-anchor="middle" x="250" y="140">R</text>

      <text class="graph-label r-whole-neg" text-anchor="start" x="160" y="255">-R</text>
      <text class="graph-label r-half-neg" text-anchor="start" x="160" y="205">-R/2</text>
      <text class="graph-label r-half-pos" text-anchor="start" x="160" y="105">R/2</text>
      <text class="graph-label r-whole-pos" text-anchor="start" x="160" y="55">R</text>
    </svg>
  </div>

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
</body>
</html>