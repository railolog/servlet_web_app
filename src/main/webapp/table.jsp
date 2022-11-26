<%@ page import="railolog.web.lab2.utils.Dot" %>
<%@ page import="java.util.List" %>
<%@ page import="railolog.web.lab2.utils.DotsManager" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<table class="results">
    <tbody>
        <tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Попадание</td>
            <td>Время</td>
            <td>Время исполнения скрипта</td>
        </tr>
    </tbody>
    <%
        if (session.getAttribute("dotsManager") != null){
          List<Dot> dotList = ((DotsManager) session.getAttribute("dotsManager")).getDotsList();
          if (dotList != null){
              synchronized (dotList){
                  for (Dot dot: dotList){
                      if (dot != null){
        %>
                          <tr class="correct-dots">
                              <td><%= dot.getX()%></td>
                              <td><%= dot.getY()%></td>
                              <td><%= dot.getR()%></td>
                              <td><%= dot.getInArea()%></td>
                              <td><%= dot.getCreationDate()%></td>
                              <td><%= dot.getExecTime()%></td>
                          </tr>
                  <%} else { %>
                          <tr>
                              <td colspan="6" style="color: red;"><%= "Сервер получил некорректные данные"%></td>
                          </tr>
        <%          }
                  }

              }
          }
        }
%>
</table>